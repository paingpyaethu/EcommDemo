import React from 'react';
import {StatusBar} from 'react-native';
import ApplicationNavigator from './navigators/ApplicationNavigator';

const App = () => {
  return (
    <>
      <StatusBar translucent backgroundColor={'transparent'} barStyle={'dark-content'}/>
      <ApplicationNavigator />
    </>
  );
};

export default App;
