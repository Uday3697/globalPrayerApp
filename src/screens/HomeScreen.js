import React from 'react';
import { View, Text } from 'react-native';
import { Header, Icon } from 'react-native-elements';

const HomeScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header
        leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{ text: 'Home', style: { color: '#fff' } }}
        rightComponent={<Icon name="alarm" type="font-awesome" color="#fff" />}
      />
      {/* Your home screen content */}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home Screen Content</Text>
      </View>
    </View>
  );
};

export default HomeScreen;
