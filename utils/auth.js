import firebase from 'firebase';
import 'firebase/firestore';
import {storeLoginState} from '../store/auth/actions'
import {Alert} from 'react-native'

var config = {
  // put this in .env
  apiKey: "AIzaSyDJRitvjSKtSRsFfqPOzzrNcUFrw7UGb4o",
  authDomain: "comp4521-9f866.firebaseapp.com",
  databaseURL: "https://comp4521-9f866.firebaseio.com",
  projectId: "comp4521-9f866",
  storageBucket: "comp4521-9f866.appspot.com",
  messagingSenderId: "122458253507"
};

// yet tested
export let authLoading = async (store) => {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
  await firebase.auth().onAuthStateChanged((user) => {
    if(user){
      store.dispatch(storeLoginState(user))
    }
  })
}

export let createAccount = async (email, password) => {
  console.log('create account')
  return await firebase.auth().createUserWithEmailAndPassword(email, password).then(function(credential){
    return credential;
  }).catch(function(error) {
    Alert.alert(error.message);
    return null;
  });
}


export let firebaseLogin = async (email, password) => {
  console.log(`login in with ${email} and  ${password}`)
  return await firebase.auth().signInWithEmailAndPassword(email, password).then(function(credential){
    Alert.alert('Logged in sucessfully');
    return credential.user;
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    Alert.alert(error.message);
    return null;
  });
}

export let firebaseLogout = async () => {
  await firebase.auth().signOut().then(function(){
    Alert.alert('Loggout sucessfully');
  }).catch(function(err){
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    Alert.alert(error.message);
    return null;
  })
}