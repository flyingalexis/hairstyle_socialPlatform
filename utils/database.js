import firebase from 'firebase';


export let createProfile = async (profileObj) => {
    console.log('creating db')
    let db = firebase.firestore()
    return db.collection("profile").add(profileObj)
  }