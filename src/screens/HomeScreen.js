import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import axios from 'axios';

const HomeScreen = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://api.api-ninjas.com/v1/randomimage?category=nature');
      setData([response.data]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={{ marginBottom: 10 }}>
      <Text>{item.category}</Text>
      <Text>{item.image}</Text>
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
        leftComponent={<Icon name="user" type="font-awesome" color="#fff" />}
        centerComponent={{ text: 'Nature Images', style: { color: '#fff', fontSize: 18 } }}
        rightComponent={<Icon name="alarm" type="font-awesome" color="#fff" />}
        containerStyle={{ backgroundColor: '#10109c', justifyContent: 'space-around' }}
      />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}
      />
    </View>
  );
};

export default HomeScreen;
