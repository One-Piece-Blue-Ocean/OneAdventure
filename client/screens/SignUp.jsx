import React, { useState } from 'react';
import {
  StyleSheet, Image, Text, TextInput, TouchableOpacity, View, Alert,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { app, db } from '../../database/db';
import icon from '../../assets/icon.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {

  },
  logo: {
    flex: 1,
    height: 120,
    width: 90,
    alignSelf: 'center',
    margin: 30,
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
  },
  button: {
    backgroundColor: '#788eec',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerView: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: '#2e2e2d',
  },
  footerLink: {
    color: '#788eec',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

function SignUpScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const createOneButtonAlert = (message) => (
    Alert.alert('Error', message, [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ])
  );

  const onFooterLinkPress = () => {
    navigation.navigate('Login');
  };

  const onSignUpPress = () => {
    if (fullName.length < 1) {
      createOneButtonAlert('Full name is required');
      return;
    }
    if (email.length < 1) {
      createOneButtonAlert('Please enter valid email');
      return;
    }
    if (zipcode.length !== 5) {
      createOneButtonAlert('Please enter valid zipcode');
      return;
    }
    if (password !== confirmPassword) {
      createOneButtonAlert('Passwords do not match.');
      return;
    }
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        const { uid } = response.user;
        const data = {
          email,
          fullName,
          zipcode,
        };
        setDoc(doc(db, 'pirates', uid), data)
          .then(() => {
            navigation.navigate('Nav', { user: data });
          })
          .catch((error) => {
            console.log('Error saving user to database: ', error.code, error.message);
          });
      })
      .catch((error) => {
        console.log('Error Creating User: ', error.code, error.message);
        if (error.code === 'auth/weak-password') {
          createOneButtonAlert('Password must be at least 6 characters');
        } else if (error.code === 'auth/invalid-email') {
          createOneButtonAlert('Invalid email address');
        } else if (error.code === 'auth/email-already-exists') {
          createOneButtonAlert('Email already exists');
        } else {
          createOneButtonAlert('Could not create new account');
        }
      });
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always"
      >
        <Image
          style={styles.logo}
          source={icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setFullName(text)}
          value={fullName}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Zipcode"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setZipcode(text)}
          value={zipcode}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Confirm Password"
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => onSignUpPress()}
        >
          <Text style={styles.buttonTitle}>Create Account</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Already have an account?
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
            &nbsp;Log in
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

SignUpScreen.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    setParams: PropTypes.func.isRequired,
    state: PropTypes.shape({
      key: PropTypes.string.isRequired,
      routeName: PropTypes.string.isRequired,
      path: PropTypes.string,
    }),
  }).isRequired,
};

export default SignUpScreen;
