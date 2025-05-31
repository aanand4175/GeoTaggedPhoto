import {
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Text,
  Alert,
  Linking,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useRef, useLayoutEffect, useState} from 'react';
import Geolocation from 'react-native-geolocation-service';
import {Header, NavigationType} from '../../components/Header';
import {
  ImagePickerModal,
  ImagePickerModalRef,
} from '../../components/ImagePickerModal';
import {
  hasLocationPermission,
  PickImage,
  requestCameraPermission,
  requestGalleryPermission,
} from '../../Utils/commonMethod';
import {colors, fonts, screensName, strings, vh, vw} from '../../constants';

interface Props {
  navigation: NavigationType;
}

const Home = (props: Props) => {
  const {navigation} = props;
  const modalRef = useRef<ImagePickerModalRef>(null);
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    Header.setNavigation(
      navigation,
      strings.home,
      () => {},
      () => {},
    );
  }, [navigation]);

  const openModal = async () => {
    const cameraGranted = await requestCameraPermission();
    const galleryGranted = await requestGalleryPermission();

    if (cameraGranted || galleryGranted) {
      modalRef.current?.open();
    } else {
      Alert.alert(strings.permission_required, strings.permission_desc, [
        {text: strings.cancel},
        {
          text: strings.open_setting,
          onPress: () => {
            Linking.openSettings();
          },
        },
      ]);
    }
  };

  const getLocation = async (imageUri: string) => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      setLoading(false);
      return;
    }

    Geolocation.getCurrentPosition(
      position => {
        setLoading(false);
        const {latitude, longitude} = position.coords;
        if (latitude != null && longitude != null) {
          navigation.navigate(screensName.PREVIEW, {
            imageUri,
            latitude,
            longitude,
          });
          modalRef.current?.close();
        } else {
          Alert.alert(
            strings.location_error,
            strings.could_not_fetch_coordinate,
          );
        }
      },
      error => {
        setLoading(false);
        Alert.alert(`Code ${error.code}`, error.message);
        console.log(error);
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
        forceRequestLocation: true,
        forceLocationManager: true,
        showLocationDialog: true,
      },
    );
  };

  const handleCameraPress = () => {
    PickImage.getCamera(false, image => {
      getLocation(image);
    });
  };

  const handleGalleryPress = () => {
    PickImage.getSinglePic(false, image => {
      getLocation(image);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>{strings.loading}</Text>
        </View>
      )}

      <Text style={styles.title}>{strings.welcome}</Text>
      <Text style={styles.subtitle}>{strings.choose_option}</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={openModal}
          activeOpacity={0.8}>
          <Text style={styles.buttonText}>{strings.upload_image}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(screensName.PHOTOS)}
          activeOpacity={0.8}>
          <Text style={styles.buttonText}>{strings.photos}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(screensName.MAP_VIEW)}
          activeOpacity={0.8}>
          <Text style={styles.buttonText}>{strings.map_view}</Text>
        </TouchableOpacity>
      </View>

      <ImagePickerModal
        ref={modalRef}
        onCameraPress={handleCameraPress}
        onGalleryPress={handleGalleryPress}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: vw(15),
    backgroundColor: colors.white,
    justifyContent: 'center',
  },
  title: {
    fontSize: vw(28),
    fontFamily: fonts.Roboto_Bold,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: vh(8),
  },
  subtitle: {
    fontSize: vw(16),
    fontFamily: fonts.Roboto_Regular,
    color: colors.grey,
    textAlign: 'center',
    marginBottom: vh(25),
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: vh(15),
    marginHorizontal: vw(6),
    borderRadius: vw(14),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: vw(18),
    fontFamily: fonts.Roboto_Bold,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.modalBg,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  loadingText: {
    marginTop: vh(10),
    color: colors.primary,
    fontSize: vw(16),
    fontFamily: fonts.Roboto_Regular,
  },
});
