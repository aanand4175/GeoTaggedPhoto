import React, {forwardRef} from 'react';
import {Text, View, Pressable, Image, Platform, StyleSheet} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {colors, fonts, images, strings, vh, vw} from '../../constants';
import {SCREEN_WIDTH} from '../../constants/dimensions';

interface Props {
  onCameraPress: () => void;
  onGalleryPress: () => void;
}

export type ImagePickerModalRef = Modalize;

export const ImagePickerModal = forwardRef<Modalize, Props>(
  ({onCameraPress, onGalleryPress}, ref) => {
    return (
      <Modalize
        ref={ref}
        snapPoint={300}
        avoidKeyboardLikeIOS={true}
        keyboardAvoidingBehavior={Platform.OS === 'ios' ? undefined : 'height'}
        handleStyle={{backgroundColor: colors.border1, marginTop: vh(15)}}
        modalHeight={180}>
        <View style={{width: SCREEN_WIDTH, marginTop: vh(30)}}>
          <Text style={styles.titleText}>{strings.upload_image}</Text>
          <View style={styles.optionRow}>
            <Pressable style={styles.optionContainer} onPress={onCameraPress}>
              <View style={styles.iconWrapper}>
                <Image source={images.camera} style={styles.iconImage} />
              </View>
              <Text style={styles.optionLabel}>{strings.camera}</Text>
            </Pressable>
            <Pressable style={styles.optionContainer} onPress={onGalleryPress}>
              <View style={styles.iconWrapper}>
                <Image source={images.picture} style={styles.iconImage} />
              </View>
              <Text style={styles.optionLabel}>{strings.gallery}</Text>
            </Pressable>
          </View>
        </View>
      </Modalize>
    );
  },
);

const styles = StyleSheet.create({
  titleText: {
    fontSize: vw(16),
    fontFamily: fonts.Roboto_Medium,
    color: colors.black,
    marginLeft: vw(18),
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: vh(25),
  },
  optionContainer: {
    alignItems: 'center',
  },
  iconWrapper: {
    width: vw(45),
    height: vw(45),
    borderRadius: vw(25),
    borderWidth: 1,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionLabel: {
    fontSize: vw(14),
    fontFamily: fonts.Roboto_Regular,
    color: colors.primary,
    marginTop: vh(10),
  },
  iconImage: {
    width: vw(20),
    height: vw(20),
    resizeMode: 'contain',
    tintColor: colors.primary,
  },
});
