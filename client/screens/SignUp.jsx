import React, { useState } from 'react';
import {
  StyleSheet, Image, Text, TextInput, TouchableOpacity, View, Alert,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';
import { setDoc, doc } from 'firebase/firestore';
import { app, db } from '../../database/db';
import hatLogo from '../../assets/Hat.png';
import LogoText from '../../assets/LogoText.png';
import { muted } from './Themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {

  },
  logo: {
    flex: 1,
    height: 100,
    width: 300,
    alignSelf: 'center',
    marginTop: 30,
    resizeMode: 'contain',
  },
  logoText: {
    height: 80,
    width: 380,
    alignSelf: 'center',
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: muted.white,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
  },
  button: {
    backgroundColor: muted.blue,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTitle: {
    color: muted.white,
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
    color: muted.black,
  },
  footerLink: {
    color: muted.blue,
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
      createOneButtonAlert('Please enter a 5-digit zipcode');
      return;
    }
    if (password !== confirmPassword) {
      createOneButtonAlert('Passwords do not match.');
      return;
    }

    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (response) => {
        const { uid } = response.user;
        const chatToken = await axios.post('http://0.0.0.0:3000/chatToken', { input: uid })
          .then(({ data }) => data);
        const data = {
          uid,
          email,
          fullName,
          zipcode,
          category: 'Sailing',
          radius: '10',
          profilePhoto: 'https://www.workforcesolutionsalamo.org/wp-content/uploads/2021/04/board-member-missing-image.png',
          chatToken,
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
          source={hatLogo}
        />
        <Image
          style={styles.logoText}
          source={LogoText}
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
          keyboardType="numeric"
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
