import {SafeAreaView, StyleSheet, Text} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {Header, NavigationType} from '../../components/Header';
import {strings} from '../../constants';

interface Props {
  navigation: NavigationType;
}
const Photos = (props: Props) => {
  const {navigation} = props;

  useLayoutEffect(() => {
    Header.setNavigation(navigation, strings.photos, () => {});
    navigation.BackButtonPress = () => {
      navigation.goBack();
    };
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Text>index</Text>
    </SafeAreaView>
  );
};

export default Photos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
