import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {INavigation} from '../../../interface/INavigation';
import {MainRoutes} from '../NavigationTypes';
import {List} from '../../../screens/List/List';
import R from '../../../resources/R';
import {MAIN_STACK} from '../../../resources/constants/navigationStacks';

const Stack = createStackNavigator<any>();
export const MainStack: React.FC<INavigation<MainRoutes>> = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'left',
        ...TransitionPresets.SlideFromRightIOS,
        headerStyle: {},
      }}>
      <Stack.Screen
        name={MAIN_STACK.LIST}
        component={List}
        options={{
          title: R.string.general.title,
          headerStyle: {
            backgroundColor: R.colors.cornflowerBlue,
          },
          headerTintColor: R.colors.white,
        }}
      />
    </Stack.Navigator>
  );
};
