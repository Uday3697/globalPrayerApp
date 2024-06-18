import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Header } from 'react-native-elements';
import { View, Text } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';

const HomeScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
};

const PrayerScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Prayer Screen</Text>
    </View>
  );
};

const MessageScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Message Screen</Text>
    </View>
  );
};

const SongsScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Songs Screen</Text>
    </View>
  );
};

const Tab = createBottomTabNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Loading" component={() => null} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home';
              } else if (route.name === 'Prayer') {
                iconName = focused ? 'praying-hands' : 'praying-hands';
              } else if (route.name === 'Message') {
                iconName = focused ? 'envelope' : 'envelope';
              } else if (route.name === 'Songs') {
                iconName = focused ? 'music' : 'music';
              }

              return <Icon name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'blue',
            inactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Prayer" component={PrayerScreen} />
          <Tab.Screen name="Message" component={MessageScreen} />
          <Tab.Screen name="Songs" component={SongsScreen} />
          <Tab.Screen name='Login' component={LoginScreen} />
          <Tab.Screen name='SignUp' component={SignupScreen} />
          <Tab.Screen name='Forgot' component={ForgotPasswordScreen} />
        </Tab.Navigator>
      ) : (
        <LoginScreen />
      )}
    </NavigationContainer>
  );
};

export default App;