import * as React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {MainStack} from './Stacks';

const RootStack = createStackNavigator();

export const RootStackScreen = () => {
  return (
    <RootStack.Navigator
      initialRouteName={'MainStack'}
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <RootStack.Screen name={'MainStack'} component={MainStack} />
    </RootStack.Navigator>
  );
};
