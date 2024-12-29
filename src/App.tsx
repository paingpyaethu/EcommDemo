import React from 'react';
import {StatusBar} from 'react-native';
import ApplicationNavigator from './navigators/ApplicationNavigator';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor={'transparent'} />
      <ApplicationNavigator />
    </>
  );
};

export default App;
