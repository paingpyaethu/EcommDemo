import React from 'react';
import {StatusBar} from 'react-native';
import ApplicationNavigator from './navigators/ApplicationNavigator';
import {Provider} from 'react-redux';
import {persistor, store} from './store';
import {PersistGate} from 'redux-persist/lib/integration/react';
import Toast from 'react-native-toast-message';
import {toastConfig} from './utils/toastConfig';
import {ThemeProvider} from './context/ThemeProvider';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

if (__DEV__) {
  require('@/devtools/ReactotronConfig');
}

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <GestureHandlerRootView>
            <BottomSheetModalProvider>
              <StatusBar backgroundColor={'transparent'} />
              <ApplicationNavigator />
              <Toast config={toastConfig} />
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
