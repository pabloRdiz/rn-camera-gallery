import { useEffect, useState } from 'react';
import {
  Button,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

const App = () => {
  const [products, setProducts] = useState<any>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [tempUri, setTempUri] = useState<string>();

  useEffect(() => {
    fetch('https://6222994f666291106a29f999.mockapi.io/api/v1/products')
      .then(response => {
        return response.json();
      })
      .then(response => setProducts(response));
  }, []);

  if (products.length === 0) return <Text>Loading...</Text>;

  const fakeCall = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const takePhoto = () => {
    launchCamera(
      { mediaType: 'photo', quality: 0.5 },
      (resp: ImagePickerResponse) => {
        if (resp && resp.assets) {
          const uriPhoto = resp.assets[0].uri;
          setTempUri(uriPhoto);
        }
      },
    );
  };

  const getPhoto = () => {
    launchImageLibrary(
      { mediaType: 'photo', quality: 0.5 },
      (resp: ImagePickerResponse) => {
        if (resp && resp.assets) {
          const uriPhoto = resp.assets[0].uri;
          setTempUri(uriPhoto);
        }
      },
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PRODUCTS LIST</Text>

      <ScrollView
        style={styles.productsContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fakeCall} />
        }>
        <Text style={styles.title}>{products[0].product}</Text>
        <Image style={styles.image} source={{ uri: products[0].image }} />
      </ScrollView>
      {tempUri && <Image style={styles.image} source={{ uri: tempUri }} />}
      <Button title="Get photo" onPress={getPhoto} />
      <Button title="Take photo" onPress={takePhoto} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  productsContainer: {
    backgroundColor: '#F3F3F3',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    marginTop: 32,
    borderRadius: 10,
    margin: 20,
    width: 200,
    height: 300,
  },
});

export default App;
