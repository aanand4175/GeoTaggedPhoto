import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Image,
  ActivityIndicator,
} from 'react-native';
import MapViewRN, {Marker} from 'react-native-maps';
import {Header, NavigationType} from '../../components/Header';
import {colors, strings, vw} from '../../constants';

interface Props {
  navigation: NavigationType;
}

const photos = [
  {
    id: '1',
    latitude: 37.78825,
    longitude: -122.4324,
    photoUrl:
      'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=100&q=80',
  },
  {
    id: '2',
    latitude: 37.78925,
    longitude: -122.4334,
    photoUrl:
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=100&q=80',
  },
  {
    id: '3',
    latitude: 37.78725,
    longitude: -122.4314,
    photoUrl:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80',
  },
];

const MapView = (props: Props) => {
  const {navigation} = props;
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    Header.setNavigation(navigation, strings.map_view, () => {});
    navigation.BackButtonPress = () => {
      navigation.goBack();
    };
  }, [navigation]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // 2 second loader
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <MapViewRN
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}>
        {photos.map(photo => (
          <Marker
            key={photo.id}
            coordinate={{latitude: photo.latitude, longitude: photo.longitude}}>
            <Image
              source={{uri: photo.photoUrl}}
              style={styles.markerImage}
              resizeMode="cover"
            />
          </Marker>
        ))}
      </MapViewRN>
    </SafeAreaView>
  );
};

export default MapView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  markerImage: {
    width: vw(40),
    height: vw(40),
    borderRadius: vw(20),
    borderWidth: vw(2),
    borderColor: colors.primary,
  },
});
