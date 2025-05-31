import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootNavigator from './src/navigator/RootNavigator';
import {LogBox} from 'react-native';
import {GluestackUIProvider} from '@gluestack-ui/themed';

function App(): React.JSX.Element {
  useEffect(() => {
    LogBox.ignoreAllLogs(true);
  }, []);

  return (
    <SafeAreaProvider>
      <GluestackUIProvider>
        <RootNavigator />
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}

export default App;
