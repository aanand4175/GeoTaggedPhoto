import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ParamListBase} from '@react-navigation/native';
import {colors, fonts, images, vw} from '../../constants';

export interface NavigationType
  extends NativeStackNavigationProp<ParamListBase> {
  BackButtonPress: Function;
}
export interface RouteType {
  key: any;
  name: any;
  params: any;
  path: any;
}
export const Header = {
  setNavigation: (
    navigation: NavigationType,
    title: string | undefined,
    renderRight?: Function | undefined,
    renderLeft?: Function | undefined,
  ) => {
    navigation.setOptions({
      headerTitle: () =>
        title ? (
          <View style={[styles.headerTextView]}>
            <Text
              numberOfLines={1}
              style={[styles.titleText, {color: colors.black}]}>
              {title}
            </Text>
          </View>
        ) : (
          <View />
        ),
      headerRight: () => (renderRight ? renderRight() : () => {}),
      headerLeft: () =>
        renderLeft ? (
          renderLeft()
        ) : (
          <TouchableOpacity
            style={styles.backBttnContainer}
            hitSlop={styles.backBttnHitSlop}
            onPress={() => navigation.BackButtonPress()}>
            <Image
              source={images.arrow_back}
              style={[styles.backButton, {tintColor: colors.black}]}
            />
          </TouchableOpacity>
        ),
      headerStyle: {
        backgroundColor: colors.white,
      },
      headerTitleAlign: 'center',
      headerTintColor: colors.white,
      headerBackVisible: false,
      headerShown: true,
      headerShadowVisible: true,
    });
  },
};

const styles = StyleSheet.create({
  titleText: {
    textAlign: 'center',
    fontSize: vw(20),
    color: colors.black_1,
    fontFamily: fonts.Roboto_Medium,
    letterSpacing: vw(0.3),
  },
  backButton: {
    width: vw(24),
    height: vw(24),
    resizeMode: 'contain',
  },
  headerTextView: {
    width: vw(250),
  },

  backBttnContainer: {
    marginLeft: vw(0),
  },
  backBttnHitSlop: {
    left: vw(25),
    right: vw(25),
    bottom: vw(25),
    top: vw(25),
  },
});
