import { ActivityIndicator, Dimensions, FlatList, Image, Linking, Platform, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Header, NavigationType } from '../../components/Header';
import { strings } from '../../constants';
import firestore from '@react-native-firebase/firestore';


interface Props {
  navigation: NavigationType;
}

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

const Photos = (props: Props) => {
  const { navigation } = props;

  const [geoData, setGeoData] = useState<any[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  useLayoutEffect(() => {
    Header.setNavigation(navigation, strings.photos, () => { });
    navigation.BackButtonPress = () => {
      navigation.goBack();
    };
  }, [navigation]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('geoPhoto')
      .onSnapshot(querySnapshot => {
        const geoPhotoData: any = [];
        querySnapshot.forEach(documentSnapshot => {
          geoPhotoData.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
          });
        });
        setGeoData(geoPhotoData);
        setLoading(false);
      });

    return () => subscriber();
  }, [])


  const openMap = (latitude: number, longitude: number) => {
    const url: any =
      Platform.select({
        ios: `maps:0,0?q=@${latitude},${longitude}`,
        android: `geo:0,0?q=${latitude},${longitude}`,
      });

    Linking.openURL(url);
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {geoData.length && <FlatList
        data={geoData}
        numColumns={3}
        keyExtractor={(_, i) => i.toString()}
        removeClippedSubviews={false}
        renderItem={({ item }) => (
          <Pressable
            style={styles.itemContainer}
            onPress={() => openMap(item.latitude, item.longitude)}>
            <Image source={{ uri: item.image_url }} style={{ flex: 1 }} />
            <Text style={styles.latLongText}>{`${item.latitude},${item.longitude}`}</Text>
            <View style={styles.dateView}>
              <Text style={[styles.latLongText, { textAlign: 'center' }]}>{
                `${new Date(item.created_at._seconds * 1000).toLocaleString()}`}
              </Text>
            </View>
          </Pressable>
        )}
        contentContainerStyle={{ paddingTop: 5 }}
      />}
    </SafeAreaView>
  );
};

export default Photos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  itemContainer: {
    width: WIDTH / 3,
    height: 150,
    backgroundColor: 'red',
    borderWidth: 1,
    borderColor: '#FFF',
  },
  latLongText: {
    fontSize: 10,
    color: '#FFF',
    fontWeight: '500'
  },
  dateView: {
    backgroundColor: 'green',
    position: 'absolute',
    right: 3,
    borderRadius: 10,
    minWidth: 100,
    alignItems: 'center',
    paddingHorizontal: 4,
    top: 3
  }
});
