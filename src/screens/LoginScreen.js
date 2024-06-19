import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

import GradientText from '../components/GradientText';

const LoginScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const getUserCredentials = async () => {
      try {
        const credentials = await AsyncStorage.getItem('userCredentials');
        if (credentials) {
          const { username, password } = JSON.parse(credentials);
          setUsername(username);
          setPassword(password);
        }
      } catch (error) {
        console.error('Error fetching user credentials:', error);
      }
    };
    getUserCredentials();
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const showAlert = (title, message) => {
    return new Promise((resolve) => {
      Alert.alert(
        title,
        message,
        [
          {
            text: "OK",
            onPress: () => resolve(true),
          },
        ],
        { cancelable: false }
      );
    });
  };

  const handleLogin = async () => {
    try {
        const credentials = await AsyncStorage.getItem('userCredentials');
        if (credentials) {
            const { username: storedUsername, password: storedPassword } = JSON.parse(credentials);
            if (username === storedUsername && password === storedPassword) {
                await showAlert('Login successful!', 'You are now logged in.');
                navigation.navigate('Home');
            } else {
                showAlert('Invalid username or password', 'Please try again.');
            }
        } else {
            showAlert('No account found', 'Please sign up.');
        }
    } catch (error) {
        console.error('Error logging in:', error);
    }
};

  return (
    <View style={styles.container}>
      <GradientText text="GLOCAL Prayer Network" />
      <Image source={require('../assets/logoGc.png')} style={{ width: 180, height: 180, marginTop: 30 }} />

      <View style={styles.formContainer}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Icon name={showPassword ? 'eye-slash' : 'eye'} type="font-awesome" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButtonG} onPress={() => { }}>
          <Text style={styles.buttonText}> G+ Login with gmail</Text>
        </TouchableOpacity>
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.createAccountText}>Create Account?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
            <Text style={styles.createAccountText}>Forgot Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  formContainer: {
    width: '85%',
    alignItems: 'center',
    minHeight: 350,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
    marginBottom: 10,
    marginTop: 10,
    color: '#333',
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    marginVertical: 30,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    color: '#333',
  },
  loginButton: {
    width: '30%',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#10109c',
    borderRadius: 5,
    marginTop: 10,
  },
  loginButtonG: {
    width: '70%',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#10109c',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    width: '80%',
  },
  createAccountText: {
    color: '#1f1f27',
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default LoginScreen;
