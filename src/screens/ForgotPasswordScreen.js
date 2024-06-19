import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native';
import GradientText from '../components/GradientText';

const ForgotPasswordScreen = ({ navigation }) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');

  const handleForgotPassword = () => {
    if(emailOrPhone.length>10){
    alert('OTP sent to your email or phone \n go and click on link ');
    setEmailOrPhone('')
    }
  };
  const isSubmitDisabled = () => {
    return emailOrPhone.length <= 10; 
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={styles.container}>
        <GradientText text="GLOCAL Prayer Network" />
        <View style={styles.formContainer}>
          <Text style={styles.title}>Forgot Password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email or Phone"
              value={emailOrPhone}
              onChangeText={setEmailOrPhone}
              keyboardType="email-address" // Optional: if expecting an email input
            />
          </View>
          <TouchableOpacity
            style={[styles.submitButton, isSubmitDisabled() && styles.submitButtonDisabled]}
            onPress={handleForgotPassword}
            disabled={isSubmitDisabled()} // Disable the button conditionally
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 20,
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
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    marginVertical: 30,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    color: '#333',
  },
  submitButton: {
    width: '30%',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#10109c',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc', // Style for disabled button
  },
});

export default ForgotPasswordScreen;
