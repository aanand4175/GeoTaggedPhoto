import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootNavigator from './src/navigator/RootNavigator';
import {LogBox} from 'react-native';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';

function App(): React.JSX.Element {
  useEffect(() => {
    LogBox.ignoreAllLogs(true);
  }, []);

  return (
    <SafeAreaProvider>
      <GluestackUIProvider config={config}>
        <RootNavigator />
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}

export default App;
