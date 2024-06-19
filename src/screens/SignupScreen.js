import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GradientText from '../components/GradientText';

const SignupScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async () => {
        try {
            // Save credentials to AsyncStorage
            await AsyncStorage.setItem('userCredentials', JSON.stringify({ username, password }));
            Alert.alert('Account created successfully!');
            navigation.navigate('Login');
        } catch (error) {
            console.error('Error creating account:', error);
        }
    };

    return (
        <View style={styles.container}>
            <GradientText text="GLOCAL Prayer Network" />
            
            <View style={styles.formContainer}>
                <Text style={styles.title}>Sign Up</Text>
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
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>
                <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.signUpButtonL} onPress={() => navigation?.navigate('Login')}>
                    <Text style={styles.buttonText}>Back to Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SignupScreen;

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
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
    },
    input: {
        height: 40,
        paddingHorizontal: 10,
        color: '#333',
    },
    signUpButton: {
        width: '30%',
        alignItems: 'center',
        paddingVertical: 12,
        backgroundColor: '#10109c',
        borderRadius: 5,
        marginTop: 20,
    },
    signUpButtonL: {
        width: '50%',
        alignItems: 'center',
        paddingVertical: 12,
        backgroundColor: '#10109c',
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
   
});
