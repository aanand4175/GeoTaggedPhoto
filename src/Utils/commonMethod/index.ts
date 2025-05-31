import {
  launchCamera,
  launchImageLibrary,
  Asset,
  ImageLibraryOptions,
  CameraOptions,
} from 'react-native-image-picker';
import {
  Alert,
  Linking,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
} from 'react-native';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import {strings} from '../../constants';

export const PickImage = {
  getSinglePic: async (
    includeBase64: boolean,
    callback: (imgContent: any, mime: string, filename: string) => void,
  ) => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) return;

    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: includeBase64,
    };

    launchImageLibrary(options, response => {
      if (
        response.didCancel ||
        response.errorCode ||
        !response.assets ||
        response.assets.length === 0
      ) {
        return;
      }

      const image: Asset = response.assets[0];
      const filename = image.fileName ?? 'image.jpg';
      const imgContent = includeBase64 ? image.base64 : image.uri;
      const mime = image.type ?? 'image/jpeg';

      callback(imgContent, mime, filename);
    });
  },

  getCamera: async (
    includeBase64: boolean,
    callback: (imgContent: any, mime: string, filename: string) => void,
  ) => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    const options: CameraOptions = {
      mediaType: 'photo',
      includeBase64: includeBase64,
      saveToPhotos: true,
      cameraType: 'front',
    };

    launchCamera(options, response => {
      if (
        response.didCancel ||
        response.errorCode ||
        !response.assets ||
        response.assets.length === 0
      ) {
        return;
      }

      const image: Asset = response.assets[0];
      const filename = image.fileName ?? 'photo.jpg';
      const imgContent = includeBase64 ? image.base64 : image.uri;
      const mime = image.type ?? 'image/jpeg';

      callback(imgContent, mime, filename);
    });
  },
};

export const requestCameraPermission = async () => {
  const permission =
    Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;

  const result = await check(permission);

  if (result === RESULTS.GRANTED) return true;

  const requestResult = await request(permission);
  if (requestResult === RESULTS.GRANTED) return true;

  showPermissionAlert(strings.camera_permission_req);
  return false;
};

export const requestGalleryPermission = async () => {
  if (Platform.OS === 'android') {
    if (Platform.Version >= 33) {
      const result = await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
      if (result === RESULTS.GRANTED) return true;
    } else {
      const result = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      if (result === RESULTS.GRANTED) return true;
    }
  } else {
    const result = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
    if (result === RESULTS.GRANTED) return true;
  }

  showPermissionAlert(strings.storage_permission_req);
  return false;
};

const showPermissionAlert = (message: string) => {
  Alert.alert(
    strings.permission_required,
    message,
    [
      {
        text: strings.cancel,
        style: 'cancel',
      },
      {
        text: strings.open_setting,
        onPress: () => {
          openSettings();
        },
      },
    ],
    {cancelable: true},
  );
};

const hasPermissionIOS = async () => {
  const openSetting = () => {
    Linking.openSettings().catch(() => {
      Alert.alert('Unable to open settings');
    });
  };
  const status = await Geolocation.requestAuthorization('whenInUse');

  if (status === 'granted') {
    return true;
  }

  if (status === 'denied') {
    Alert.alert(strings.location_permission_denied);
  }

  if (status === 'disabled') {
    Alert.alert(strings.turn_on_location_service, '', [
      {text: strings.go_to_setting, onPress: openSetting},
      {text: strings.dont_use_location, onPress: () => {}},
    ]);
  }

  return false;
};

export const hasLocationPermission = async () => {
  if (Platform.OS === 'ios') {
    const hasPermission = await hasPermissionIOS();
    return hasPermission;
  }

  if (Platform.OS === 'android' && Platform.Version < 23) {
    return true;
  }

  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (status === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
  }

  if (status === PermissionsAndroid.RESULTS.DENIED) {
    ToastAndroid.show(strings.location_denied_by_user, ToastAndroid.LONG);
  } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    ToastAndroid.show(strings.location_invoked_by_user, ToastAndroid.LONG);
  }

  return false;
};
