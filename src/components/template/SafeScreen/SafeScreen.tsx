import type {PropsWithChildren} from 'react';
import {SafeAreaView} from 'react-native';
import {useHeaderHeight} from '@react-navigation/elements';

function SafeScreen({children}: PropsWithChildren) {
  const headerHeight = useHeaderHeight();
  return (
    <SafeAreaView
      className="flex-1 bg-white dark:bg-ecomm-black"
      // style={{paddingTop: headerHeight}}
      >
      {children}
    </SafeAreaView>
  );
}

export default SafeScreen;
