import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {screensName} from '../constants';
import {navigationRef} from './RootNavigation';
import Photos from '../screens/Photos';
import Preview from '../screens/Preview';
import Home from '../screens/Home';
import MapView from '../screens/MapView';

const RootNavigator = () => {
  const RootStackScreen = createNativeStackNavigator();
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStackScreen.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}>
        <RootStackScreen.Screen name={screensName.HOME} component={Home} />
        <RootStackScreen.Screen name={screensName.PHOTOS} component={Photos} />
        <RootStackScreen.Screen
          name={screensName.MAP_VIEW}
          component={MapView}
        />
        <RootStackScreen.Screen
          name={screensName.PREVIEW}
          component={Preview}
        />
      </RootStackScreen.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
