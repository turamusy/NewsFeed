import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  FlatList,
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import moment from 'moment';
import {Picker} from '@react-native-picker/picker';

import {styles} from './styles';
import {INavigation} from '../../interface/INavigation';
import {MainRoutes} from '../../components/Navigation';
import {useDispatch, useSelector} from 'react-redux';
import {getStories} from '../../actions/stories.action';
import {IRootState} from '../../interface/IRootState';
import R from '../../resources/R';

import {Loader} from '../../components/Loader';
import {useInterval} from '../../utility/customHooks';
import {IResultItem, Sections} from '../../interface/IStories';

import {
  DEFAULT_SECTION,
  SECTIONS_TOP_STORIES,
} from '../../resources/constants/api';
import {OfflineStatus} from '../../components/OfflineStatus';
import {
  DEFAULT_KEYWORDS,
  DEFAULT_LOCATION,
} from '../../resources/constants/list';

export type IProps = INavigation<MainRoutes, 'List'>;

export const List: React.FC<IProps> = () => {
  // Redux
  const dataList = useSelector(
    (state: IRootState) => state.stories.data.results,
  );
  const loading = useSelector((state: IRootState) => state.stories.loading);
  // State
  const [seconds, setSeconds] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(DEFAULT_LOCATION);
  const [selectedKeyword, setSelectedKeyword] = useState(DEFAULT_KEYWORDS);
  const [locationTag, setLocationTag] = useState<string[]>([]);
  const [keywordsTag, setKeywordsTag] = useState<string[]>([]);
  const [filteredDataList, setFilteredDataList] = useState(dataList);
  const [activeFilters, setActiveFilters] = useState<IResultItem[]>([]);
  const [activeSection, setActiveSection] = useState<string>(DEFAULT_SECTION);
  // Dispatch
  const dispatch = useDispatch();
  // Active section saved value
  const saveActiveSection = useCallback(async (value: Sections) => {
    try {
      await AsyncStorage.setItem('activeSection', value);
      setActiveSection(value);
    } catch (e) {
      setActiveSection(DEFAULT_SECTION);
    }
  }, []);
  const getActiveSection = useCallback(async () => {
    try {
      const value = await AsyncStorage.getItem('activeSection');
      if (value !== null) {
        setActiveSection(value);
        dispatch(getStories({section: value}));
      } else {
        setActiveSection(DEFAULT_SECTION);
        dispatch(getStories({section: DEFAULT_SECTION}));
      }
    } catch (e) {
      setActiveSection(DEFAULT_SECTION);
      dispatch(getStories({section: DEFAULT_SECTION}));
    }
  }, [dispatch]);
  let setLocation: Set<string> = useMemo(() => new Set(), []);
  let setKeywords: Set<string> = useMemo(() => new Set(), []);

  const param = {
    section: activeSection,
  };
  // Logic for selecting filters
  const updateListWithFilter = useCallback(() => {
    const geoFacetData = dataList.filter(item => {
      return item.geo_facet.some(i => i === selectedLocation);
    });
    const searchByLocationData = geoFacetData.filter(item => {
      return item.des_facet.some(i => i === selectedKeyword);
    });
    const desFacetData = dataList.filter(item => {
      return item.des_facet.some(i => i === selectedKeyword);
    });
    if (
      selectedKeyword !== DEFAULT_KEYWORDS &&
      selectedLocation !== DEFAULT_LOCATION
    ) {
      setActiveFilters(searchByLocationData);
    } else {
      setActiveFilters([...geoFacetData, ...desFacetData]);
    }
  }, [dataList, selectedKeyword, selectedLocation]);

  const settingFilters = useCallback(() => {
    if (!dataList || dataList.length === 0) {
      return null;
    }
    dataList.forEach(item => {
      item.geo_facet.forEach(i => setLocation.add(i));
      item.des_facet.forEach(i => setKeywords.add(i));
    });
    setLocationTag([...setLocation]);
    setKeywordsTag([...setKeywords]);
  }, [dataList, setKeywords, setLocation]);

  useEffect(() => {
    settingFilters();
  }, [settingFilters]);
  // Check internet connection
  useEffect(() => {
    const netInfoSubscription = NetInfo.addEventListener(state => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setIsOffline(offline);
    });
    return () => netInfoSubscription();
  }, []);
  // Get data when load first time
  useEffect(() => {
    getActiveSection();
  }, [getActiveSection]);

  useEffect(() => {
    if (
      selectedLocation === DEFAULT_LOCATION &&
      selectedKeyword === DEFAULT_KEYWORDS
    ) {
      setFilteredDataList(dataList);
    } else {
      setFilteredDataList(activeFilters);
    }
  }, [activeFilters, dataList, selectedKeyword, selectedLocation]);

  useEffect(() => {
    updateListWithFilter();
  }, [dataList, selectedLocation, selectedKeyword, updateListWithFilter]);

  // Set interval for limit count request per minute
  useInterval(() => {
    setSeconds(seconds + 1);
  }, 1000);

  const renderSectionItem = useCallback(
    ({item}: {item: Sections}) => {
      const isActive = activeSection === item;
      return (
        <TouchableOpacity
          style={[styles.sectionItem, isActive && styles.sectionItemActive]}
          onPress={() => {
            setSelectedLocation(DEFAULT_LOCATION);
            setSelectedKeyword(DEFAULT_KEYWORDS);
            dispatch(getStories({section: item}));
            saveActiveSection(item);
          }}>
          <Text
            style={[
              styles.sectionItemText,
              isActive && styles.sectionItemTextActive,
            ]}>
            {item}
          </Text>
        </TouchableOpacity>
      );
    },
    [activeSection, dispatch, saveActiveSection],
  );

  const renderItem = useCallback(({item}: {item: IResultItem}) => {
    const byLine = item.byline
      ? `${item.byline.slice(2)}`
      : ` ${R.string.general.unknown}`;
    const published = item.published_date
      ? `${moment(item.published_date).startOf('minute').fromNow()}`
      : `${R.string.general.unknown}`;
    const urlImage = item.multimedia?.length ? item.multimedia[0].url : '';

    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          item.url && Linking.openURL(`${item.url}`);
        }}>
        <Image
          style={styles.image}
          source={{
            uri: urlImage,
          }}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{`${R.string.general.by}${byLine}`}</Text>
          <Text
            style={
              styles.text
            }>{`${R.string.general.published} ${published}`}</Text>
        </View>
      </TouchableOpacity>
    );
  }, []);

  const onRefresh = () => {
    if (seconds > 6) {
      setRefresh(true);
      setSeconds(0);
      setTimeout(() => {
        dispatch(getStories(param));
        setRefresh(false);
      }, 100);
    }
  };
  const renderSection = () => {
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{R.string.general.section}</Text>
        <ScrollView
          horizontal={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <FlatList
            data={SECTIONS_TOP_STORIES}
            renderItem={renderSectionItem}
            numColumns={Math.ceil(SECTIONS_TOP_STORIES.length / 2)}
            keyExtractor={index => String(index)}
            // optimization props
            maxToRenderPerBatch={15}
            initialNumToRender={10}
            windowSize={21}
            updateCellsBatchingPeriod={55}
          />
        </ScrollView>
      </View>
    );
  };
  const renderFilter = () => {
    return (
      <View style={styles.filterContainer}>
        <View style={[styles.filterItem, styles.filterItemMargin]}>
          <Picker
            selectedValue={selectedLocation}
            style={styles.piker}
            dropdownIconColor={R.colors.regentGrey}
            onValueChange={setSelectedLocation}>
            <Picker.Item label={DEFAULT_LOCATION} value={DEFAULT_LOCATION} />
            {locationTag.map((item, index) => {
              return (
                <Picker.Item
                  label={item}
                  value={item}
                  key={String(item + index)}
                />
              );
            })}
          </Picker>
        </View>
        <View style={styles.filterItem}>
          <Picker
            selectedValue={selectedKeyword}
            style={styles.piker}
            dropdownIconColor={R.colors.regentGrey}
            onValueChange={setSelectedKeyword}>
            <Picker.Item label={DEFAULT_KEYWORDS} value={DEFAULT_KEYWORDS} />
            {keywordsTag.map((item, index) => {
              return (
                <Picker.Item
                  label={item}
                  value={item}
                  key={String(item + index)}
                />
              );
            })}
          </Picker>
        </View>
      </View>
    );
  };
  const renderDataList = () => {
    if (!filteredDataList || filteredDataList.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.empty}>{R.string.list.empty}</Text>
        </View>
      );
    }
    if (loading) {
      return <Loader />;
    }
    return (
      <FlatList
        style={styles.listContainer}
        data={filteredDataList}
        renderItem={renderItem}
        keyExtractor={(item, index) => String(item.section + index)}
        // handle updates
        refreshing={refresh}
        onRefresh={onRefresh}
        // optimization props
        maxToRenderPerBatch={25}
        initialNumToRender={10}
        windowSize={21}
        updateCellsBatchingPeriod={55}
      />
    );
  };
  if (isOffline) {
    return <OfflineStatus />;
  }
  return (
    <View style={styles.container}>
      {renderSection()}
      {renderFilter()}
      {renderDataList()}
    </View>
  );
};
