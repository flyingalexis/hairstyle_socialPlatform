import firebase from 'firebase';
import { TabHeading } from 'native-base';


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

export let createSalonProfile = async (salonProfileObj, uid) => {
  console.log('create salon profile')
  salonProfileObj = {...salonProfileObj, owner: uid}
  let db = firebase.firestore()
  let newRecord = await db.collection("salonProfile").doc();
  await newRecord.set(salonProfileObj)
  return newRecord.id;
}

export let updateSalonProfile = async (profileObj, sid) => {
  console.log('update salon profile')
  let db = firebase.firestore()
  return db.collection("salonProfile").doc(sid).update(profileObj);
}

export let createHairstyleWork = async (salonHairstyleWork, ownerInfo) => {
  console.log('create hairstyle work')
  salonHairstyleWork = {...salonHairstyleWork, ...ownerInfo}
  let db = firebase.firestore()
  let newRecord = await db.collection("hairstyleWork").doc();
  await newRecord.set(salonHairstyleWork)
  return newRecord.id;
}

export let loadHairstyleWorkByCategory = async (category) => {
    let db = firebase.firestore()
    let hairstyleWorksQuery = await db.collection("hairstyleWork").where('hairstyleType', '==' , category)
    let hairstyleWorksData = await hairstyleWorksQuery.get()
    let hairstyleWorks = []
    // let outputData = []
    let ownerIdList = new Set();
    let ownerImage ={}
    for (hairstylework of hairstyleWorksData.docs){
      data = hairstylework.data()
      ownerIdList.add(data['ownerId'])
      //-----------noob version---------------------------------------
      // userDoc = await getUserById(data['ownerId'])
      // data = {...data, hairstyleWorkId :hairstylework.id, ownerIcon: userDoc['image']}
      data = {...data, hairstyleWorkId :hairstylework.id}
      hairstyleWorks.push(data)
    }
    for (ownerId of ownerIdList){
      userDoc = await getUserById(data['ownerId'])
      ownerImage[ownerId] =  userDoc['image']
    }
    for(hairstyleWork of hairstyleWorks){
      hairstyleWork['ownerIcon'] = ownerImage[hairstyleWork['ownerId']]
    }
    return hairstyleWorks
}

export let getUserById = async (id) => {
  let db = firebase.firestore()
  doc = await db.collection("profile").doc(id).get()
  return doc.data()
}

export let getUserByEmail = async (email) => {
  let db = firebase.firestore()
  console.log('getUserByEmail')
  docs = await db.collection("profile").where('email', '==' , email).get()
  let userData = null;
  for (doc of docs.docs){
    userData = await doc.data()
    userData = {...userData, id: doc.id}
  }
  return userData
}

export let getWorksByuserId = async (ownerId) => {
  let db = firebase.firestore()
  let hairstyleWorksQuery = await db.collection("hairstyleWork").where('ownerId', '==' , ownerId)
  let hairstyleWorksData = await hairstyleWorksQuery.get()
  let hairstyleWorks = []
  for (hairstylework of hairstyleWorksData.docs){
    data = hairstylework.data()
    data = {...data, hairstyleWorkId :hairstylework.id}
    hairstyleWorks.push(data)
  }
  return hairstyleWorks
}

export let getSalonById = async (id) => {
  let db = firebase.firestore()
  let salonDoc = await db.collection("salonProfile").doc(id).get()
  return salonDoc.data()
}

export let getWorksBySalonId = async (salonId) => {
  let db = firebase.firestore()
  let hairstyleWorksQuery = await db.collection("hairstyleWork").where('salonId', '==' , salonId)
  let hairstyleWorksData = await hairstyleWorksQuery.get()
  let hairstyleWorks = []
  for (hairstylework of hairstyleWorksData.docs){
    data = hairstylework.data()
    data = {...data, hairstyleWorkId :hairstylework.id}
    hairstyleWorks.push(data)
  }
  return hairstyleWorks
}

export let getUsersByIds = async (ids) => {
  let db = firebase.firestore()
  let outputs = {}
  for (id of ids){
    let doc = await db.collection("profile").doc(id).get()
    outputs[id] = doc.data()
  }
  return outputs
}

export let inviteUserToSalon = async (email, sid) => {
  let db = firebase.firestore()
  let doc = await db.collection("salonProfile").doc(sid).get()
  let salonData = doc.data()
  let newInvitationList = []
  let userData = await getUserByEmail(email)
  if (!userData){
    throw new Error("that user does not exist");
  }
  if (userData.salonId){
    throw new Error("user has owned a salon");
  }
  if(salonData.invitationList){
    newInvitationList = salonData.invitationList 
  }
  if(newInvitationList.includes(userData.id)){
    throw new Error("InvitationList already has that email");
  }
  else{
    newInvitationList.push(userData.id);
    let newData = {...salonData, invitationList: newInvitationList}
    return db.collection("salonProfile").doc(sid).set(newData)
  }
}

export let getInvitations = async (id) => {
  let db = firebase.firestore();
  let snapshots = await db.collection("salonProfile").where('invitationList', 'array-contains', id).get()
  let salonInvitations = []
  for(doc of snapshots.docs){
    data = doc.data()
    salonInvitations.push({...data, sid: doc.id})
  }
  return salonInvitations
}

export let removeInvitations = async (sid, uid) => {
  let db = firebase.firestore();
  let docRef = db.collection("salonProfile").doc(sid);
  return docRef.update({
    invitationList: firebase.firestore.FieldValue.arrayRemove(uid)
  })
}

export let addAdminToSalon = async (sid, uid) => {
  let db = firebase.firestore();
  let docRef = db.collection("salonProfile").doc(sid);
  return docRef.update({
    adminList: firebase.firestore.FieldValue.arrayUnion(uid)
  })
}