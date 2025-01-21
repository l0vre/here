import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const hardcodedEmail = 'student';
    const hardcodedPassword = '123';

    if (email.trim() === hardcodedEmail && password === hardcodedPassword) {
      Alert.alert('Success!', 'Welcome, Student!', [
        { text: 'Proceed', onPress: () => navigation.navigate('StudentScreen') },
      ]);
    } else {
      Alert.alert('Login Failed', 'Invalid email or password. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Sign in to your account</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#A2B6DF"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#A2B6DF"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={[styles.loginButton, !email || !password ? styles.disabledButton : null]}
        onPress={handleLogin}
        disabled={!email || !password}
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => Alert.alert('Password Recovery', 'Contact support for help.')}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
    paddingHorizontal: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#194aa4',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#5F6A7D',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderColor: '#D3D3D3',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#194aa4',
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#194aa4',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: '#A2B6DF',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPassword: {
    marginTop: 20,
    color: '#004080',
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
