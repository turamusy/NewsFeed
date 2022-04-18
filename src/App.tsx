import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';

import React from 'react';
import store from './store/store';
import R from './resources/R';
import {RootStackScreen} from './components/Navigation';

const App = () => {
  const Theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: R.colors.white,
    },
  };
  return (
    <Provider store={store}>
      <NavigationContainer theme={Theme}>
        <RootStackScreen />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
