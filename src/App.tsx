import React from 'react';
import {StatusBar} from 'react-native';
import ApplicationNavigator from './navigators/ApplicationNavigator';
import {Provider} from 'react-redux';
import {persistor, store} from './store';
import {PersistGate} from 'redux-persist/lib/integration/react';
import Toast from 'react-native-toast-message';
import { toastConfig } from './utils/toastConfig';

if (__DEV__) {
  require("@/devtools/ReactotronConfig");
}

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar backgroundColor={'transparent'} />
        <ApplicationNavigator />
        <Toast config={toastConfig} />
      </PersistGate>
    </Provider>
  );
};

export default App;
