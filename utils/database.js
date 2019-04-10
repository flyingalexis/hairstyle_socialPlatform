import firebase from 'firebase';


export let createProfile = async (profileObj) => {
    console.log('creating profile')
    let db = firebase.firestore()
    return db.collection("profile").doc(profileObj['uid']).set(profileObj)
  }

export let updateProfile = async (profileObj, uid) => {
  console.log('update profile')
  let db = firebase.firestore()
  await db.collection("profile").doc(uid).update(profileObj);
}