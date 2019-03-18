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

export let setup_auth = () => {
  console.log('firebase init')
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
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

export let create_account = async (email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password).then(
      () => Alert.alert('Created user successfully')).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      return Alert.alert(error.message);
  });
}

export let login = async (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password).then(function(){
    return Alert.alert('Logged in sucessfully');
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    return Alert.alert(error.message);
  });
}