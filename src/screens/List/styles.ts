import {StyleSheet} from 'react-native';
import R from '../../resources/R';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: R.colors.aquamarineBlue,
  },
  empty: {
    color: R.colors.white,
    fontSize: 24,
    lineHeight: 30,
  },
  listContainer: {
    padding: 10,
    backgroundColor: R.colors.aquamarineBlue,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: R.colors.white,
    marginBottom: 15,
    padding: 10,
    minHeight: 140,
  },
  infoContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    width: '70%',
    paddingRight: 15,
  },
  title: {
    color: R.colors.regentGrey,
    flexWrap: 'nowrap',
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 10,
  },
  text: {
    color: R.colors.regentGrey,
    fontSize: 14,
    lineHeight: 16,
    marginBottom: 5,
  },
  image: {
    width: 90,
    height: '90%',
    resizeMode: 'cover',
    marginRight: 15,
    backgroundColor: R.colors.regentGrey,
  },

  filterContainer: {
    height: 100,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: R.colors.blueCyan,
    padding: 10,
  },
  filterItem: {
    width: '50%',
    height: 54,
    backgroundColor: R.colors.white,
    elevation: 8,
    borderRadius: 12,
  },
  filterItemMargin: {
    marginRight: 10,
  },
  piker: {
    width: '100%',
    height: '100%',
    color: R.colors.regentGrey,
  },
  sectionContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: R.colors.solitude,
    padding: 10,
  },

  sectionTitle: {
    color: R.colors.black,
    fontSize: 16,
    lineHeight: 18,
    marginBottom: 10,
  },

  sectionItem: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: R.colors.white,
    borderColor: R.colors.zanah,
    borderWidth: 1,
    marginBottom: 10,
    marginRight: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: 130,
    height: 40,
  },
  sectionItemText: {
    textTransform: 'capitalize',
    color: R.colors.regentGrey,
    fontSize: 14,
    lineHeight: 16,
  },
  sectionItemActive: {
    borderColor: R.colors.mediumBlue,
  },
  sectionItemTextActive: {
    color: R.colors.mediumBlue,
  },
});
