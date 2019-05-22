import firebase from 'firebase';
import 'firebase/firestore';
import {Alert} from 'react-native'

var config = {
  apiKey: "AIzaSyDJRitvjSKtSRsFfqPOzzrNcUFrw7UGb4o",
  authDomain: "comp4521-9f866.firebaseapp.com",
  databaseURL: "https://comp4521-9f866.firebaseio.com",
  projectId: "comp4521-9f866",
  storageBucket: "comp4521-9f866.appspot.com",
  messagingSenderId: "122458253507",
  appId: "1:122458253507:web:72dfb58b556c6663"
};

// yet tested
export let authLoading = async (callback) => {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
  await firebase.auth().onAuthStateChanged(async (user) => {
    if(user){
      
      let uid = user['uid']
      let db = firebase.firestore()
      let userProfile = await db.collection("profile").doc(uid).get()
      let profileData = userProfile.data()
      profileData['auth'] = user
      // store.dispatch(storeLoginState(profileData))
      callback(profileData)
    }
  })
}

export let createAccount = async (email, password) => {
  console.log('create account')
  return firebase.auth().createUserWithEmailAndPassword(email, password)
}

export let firebaseLogin = async (email, password) => {
  console.log(`login in with ${email} and  ${password}`)
  let credential = await firebase.auth().signInWithEmailAndPassword(email, password)
  if (credential.user){
    let uid = credential.user['uid']
    let db = firebase.firestore()
    let userProfile = await db.collection("profile").where('uid', '==' , uid).limit(1).get()
    let profileData = null
    userProfile.forEach(element => {
      profileData = element.data()
    });
    profileData['auth'] = credential.user
    return profileData
  }
}

export let firebaseLogout = async () => {
  return firebase.auth().signOut()
}