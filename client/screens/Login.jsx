import React, { useState } from 'react';
import {
  StyleSheet, Image, Text, TextInput, TouchableOpacity, View, Alert,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';
import {
  doc, getDoc, query, where, collection, getDocs, getAuth, signInWithEmailAndPassword,
} from '../firebase/utils';
import hatLogo from '../../assets/Hat.png';
import LogoText from '../../assets/LogoText.png';
import { muted } from './Themes';

import { app, db } from '../../database/db';

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
    marginTop: 50,
    resizeMode: 'contain',
  },
  logoText: {
    height: 80,
    width: 380,
    alignSelf: 'center',
    marginBottom: 20,
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
    marginTop: 10,
  },
});

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('ChatBot2@gmail.com');
  const [password, setPassword] = useState('123456');

  const createOneButtonAlert = (message) => (
    Alert.alert('Error', message, [
      { text: 'Try again', onPress: () => console.log('Try again pressed') },
    ])
  );

  const onFooterLinkPress = () => {
    navigation.navigate('SignUp');
  };

  const onGuestLinkPress = () => {
    navigation.navigate('Nav', {
      user: {
        uid: 'yBjkdAwIoXgoczmWPtiX', fullName: 'Guest', email: 'guest@mail.com', zipcode: '94123', category: 'Sailing', radius: '10', profilePhoto: 'https://www.workforcesolutionsalamo.org/wp-content/uploads/2021/04/board-member-missing-image.png',
      },
    });
  };

  const onLoginPress = () => {
    const auth = getAuth(app);
    let userInfo;
    const piratesAdventures = [];
    const interestedAdventures = [];
    let uid;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const { user } = userCredential;
        uid = user.uid;
        const docRef = doc(db, 'pirates', uid);
        return getDoc(docRef);
      })
      .then((docSnap) => {
        userInfo = docSnap.data();
      })
      .then(() => {
        // pa = pirates_adventures collection
        const paRef = query(collection(db, 'pirates_adventures'), where('userId', '==', uid));
        return getDocs(paRef);
      })
      .then((querySnapshot) => {
        querySnapshot.forEach((document) => {
          const adventure = document.data();
          piratesAdventures.push(adventure.adventureId);
        });
      })
      .then(() => {
        const interestedRef = query(collection(db, 'pirates_adventures'), where('userId', '==', uid), where('interested', '==', true));
        return getDocs(interestedRef);
      })
      .then((querySnapshot) => {
        querySnapshot.forEach((document) => {
          const interestedAdventure = document.data();
          interestedAdventures.push(interestedAdventure.adventureId);
        });
        console.log('adventures', piratesAdventures);
        navigation.navigate('Nav', { user: userInfo, pirates_adventures: piratesAdventures, interested: interestedAdventures });
      })
      .catch((error) => {
        createOneButtonAlert('Invalid login credentials');
        console.log('Sign in error: ', error.code, error.message);
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
          placeholder="E-mail"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => onLoginPress()}
        >
          <Text style={styles.buttonTitle}>Log in</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Don&apos;t have an account?
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              &nbsp;Sign up
            </Text>
          </Text>
          <Text onPress={onGuestLinkPress} style={styles.footerLink}>Continue as guest</Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

LoginScreen.propTypes = {
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

export default LoginScreen;
