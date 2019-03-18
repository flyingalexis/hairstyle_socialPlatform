import firebase from 'firebase';

var config = {
  // put this in .env
  apiKey: "AIzaSyDJRitvjSKtSRsFfqPOzzrNcUFrw7UGb4o",
  authDomain: "comp4521-9f866.firebaseapp.com",
  databaseURL: "https://comp4521-9f866.firebaseio.com",
  projectId: "comp4521-9f866",
  storageBucket: "comp4521-9f866.appspot.com",
  messagingSenderId: "122458253507"
};

export let set_up_auth = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp({});
  }
}

// yet tested
export let authLoading = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if(user){
      return user;
    }
    else{
      return null;
    }
  })
}

