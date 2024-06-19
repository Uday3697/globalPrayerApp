import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { Header, Icon, Avatar } from 'react-native-elements';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to generate a random color
  const getRandomColor = () => {
    const colors = ['#FF5733', '#FFC300', '#DAF7A6', '#C70039', '#900C3F', '#3498DB'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const renderItem = ({ item }) => (
    <View style={{ marginBottom: 20, borderWidth: 1, padding: 10, borderColor: '#ccc', borderRadius: 5, width: '90%' }}>
      <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>{item.title}</Text>
      <Text>{item.description}</Text>
      <Image source={{ uri: item?.image }} style={{ width: 300, height: 250, marginTop: 10, marginBottom: 10 }} resizeMode="cover" />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ color: '#007bff' }}>Price: ${item.price}</Text>
        <Text>Category: {item.category}</Text>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#10109c" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Header
        leftContainerStyle={{ alignItems: 'flex-start', flex: 1 }}
        centerContainerStyle={{ alignItems: 'center', flex: 2 }}
        rightContainerStyle={{ alignItems: 'flex-end', flex: 1 }}
        leftComponent={
          <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={{ paddingHorizontal: 10 }}>
            <Avatar
              rounded
              icon={{ name: 'user', type: 'font-awesome', color: '#fff' }}
              overlayContainerStyle={{ backgroundColor: getRandomColor() }}
            />
          </TouchableOpacity>
        }
        centerComponent={{ text: 'Product List', style: { color: '#fff', fontSize: 18 } }}
        rightComponent={
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
              <View style={{ position: 'relative' }}>
                <Icon name="bell" type="font-awesome" color="#fff" />
                <View style={{ position: 'absolute', top: -5, right: -5, backgroundColor: 'red', borderRadius: 10, minWidth: 16, paddingHorizontal: 4, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: '#fff', fontSize: 12 }}>4+</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={{ marginLeft: 10 }}>
              <Avatar
                rounded
                icon={{ name: 'user', type: 'font-awesome', color: '#fff' }}
                size={40}
                overlayContainerStyle={{ backgroundColor: '#555' }}
              />
            </TouchableOpacity>
          </View>
        }
        containerStyle={{ backgroundColor: '#10109c', justifyContent: 'space-around' }}
      />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()} // Assuming each item has a unique id
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}
      />
    </View>
  );
};

export default HomeScreen;
