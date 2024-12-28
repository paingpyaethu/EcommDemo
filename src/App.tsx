import React from 'react';
import {View, Text} from 'react-native';
import {useColorScheme} from 'nativewind';

const App = () => {
  const {colorScheme, setColorScheme} = useColorScheme();

  return (
    <View className="flex-1 items-center justify-center bg-zinc-400 dark:bg-slate-900">
      <Text className="text-3xl text-center dark:text-slate-400">
        Tailwind Css with nativewind Setup
      </Text>

      <Text
        onPress={() =>
          setColorScheme(colorScheme === 'light' ? 'dark' : 'light')
        }
        className="text-xl mt-5 dark:text-slate-200">
        {`The color scheme is ${colorScheme}`}
      </Text>
    </View>
  );
};

export default App;
