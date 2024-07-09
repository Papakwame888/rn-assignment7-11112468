import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Product Detail" component={ProductDetailScreen} />
        <Drawer.Screen name="Cart" component={CartScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const CustomDrawerContent = (props) => (
  <DrawerContentScrollView {...props}>
    <DrawerItemList {...props} />
  </DrawerContentScrollView>
);

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products', error);
      }
    };

    const loadCart = async () => {
      try {
        const storedCart = await AsyncStorage.getItem('cart');
        if (storedCart) {
          setCart(JSON.parse(storedCart));
        }
      } catch (error) {
        console.error('Failed to load cart', error);
      }
    };

    fetchProducts();
    loadCart();
  }, []);

  const addToCart = async (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const renderProductCard = (product) => (
    <View style={styles.card} key={product.id}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Product Detail', { product })}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <Text style={styles.name}>{product.title}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.price}>
          ${Number(product.price).toFixed(2)}
        </Text>
      </TouchableOpacity>
      <Button title="Add to Cart" onPress={() => addToCart(product)} />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Product List</Text>
      <View style={styles.row}>{products.map(renderProductCard)}</View>
      <Button
        title="View Cart"
        onPress={() => navigation.navigate('Cart')}
        style={styles.viewCartButton}
      />
    </ScrollView>
  );
};

const ProductDetailScreen = ({ route }) => {
  const { product } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.imageDetail} />
      <Text style={styles.nameDetail}>{product.title}</Text>
      <Text style={styles.descriptionDetail}>{product.description}</Text>
      <Text style={styles.priceDetail}>
        ${Number(product.price).toFixed(2)}
      </Text>
    </ScrollView>
  );
};

const CartScreen = ({ navigation }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const storedCart = await AsyncStorage.getItem('cart');
        if (storedCart) {
          setCart(JSON.parse(storedCart));
        }
      } catch (error) {
        console.error('Failed to load cart', error);
      }
    };
    loadCart();
  }, []);

  const removeFromCart = async (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const renderCartProductCard = (product) => (
    <View style={styles.card} key={product.id}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.name}>{product.title}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Text style={styles.price}>${Number(product.price).toFixed(2)}</Text>
      <Button
        title="Remove from Cart"
        onPress={() => removeFromCart(product.id)}
      />
    </View>
  );

  const total = cart.reduce((sum, item) => sum + (Number(item.price) || 0), 0);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Cart</Text>
      <View style={styles.row}>{cart.map(renderCartProductCard)}</View>
      <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
      <Button
        title="Back to Home"
        onPress={() => navigation.navigate('Home')}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  card: {
    width: '48%',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
  },
  imageDetail: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  description: {
    fontSize: 14,
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  nameDetail: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  descriptionDetail: {
    fontSize: 18,
    marginVertical: 10,
  },
  priceDetail: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  viewCartButton: {
    marginVertical: 10,
    alignSelf: 'center',
  },
});

export default App;
