import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {Header, NavigationType} from '../../components/Header';
import {strings, colors, vh, vw, fonts} from '../../constants';

interface Props {
  navigation: NavigationType;
  route: {
    params: {
      imageUri: string;
      latitude: number;
      longitude: number;
    };
  };
}

const Preview = (props: Props) => {
  const {navigation, route} = props;
  const {imageUri, latitude, longitude} = route.params;

  useLayoutEffect(() => {
    Header.setNavigation(navigation, strings.preview, () => {});
    navigation.BackButtonPress = () => {
      navigation.goBack();
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={{uri: imageUri}} style={styles.image} />
      <Text style={styles.text}>{`${strings.latitude}: ${latitude}`}</Text>
      <Text style={styles.text}>{`${strings.longitude}: ${longitude}`}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.goBack();
        }}>
        <Text style={styles.buttonText}>{strings.submit}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Preview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: vw(20),
  },
  image: {
    width: '100%',
    height: vh(300),
    borderRadius: vw(10),
    marginBottom: vh(20),
  },
  text: {
    fontSize: vw(16),
    fontFamily: fonts.Roboto_Regular,
    marginVertical: vh(5),
    color: colors.black,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: vh(15),
    paddingHorizontal: vw(25),
    borderRadius: vw(12),
    marginBottom: vh(20),
    alignItems: 'center',
    marginTop: vh(30),
  },
  buttonText: {
    color: colors.white,
    fontSize: vw(18),
    fontFamily: fonts.Roboto_Bold,
  },
});
