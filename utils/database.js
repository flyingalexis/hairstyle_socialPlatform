import firebase from 'firebase';
import { TabHeading } from 'native-base';


export let createProfile = async (profileObj) => {
  console.log('creating profile')
  let db = firebase.firestore()
  await db.collection("profile").doc(profileObj['uid']).set(profileObj)
}

export let updateProfile = async (profileObj, uid) => {
  console.log('update profile')
  let db = firebase.firestore()
  await db.collection("profile").doc(uid).update(profileObj);
}

export let removeProfile = async (uid) =>{
  // for testing
  let db = firebase.firestore()
  await db.collection("profile").doc(uid).delete();
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

export let removeSalonProfile = async(sid) => {
  // for testing
  let db = firebase.firestore()
  await db.collection("salonProfile").doc(sid).delete();
}

export let createHairstyleWork = async (salonHairstyleWork, ownerInfo) => {
  console.log('create hairstyle work')
  salonHairstyleWork = {...salonHairstyleWork, ...ownerInfo, date: new Date().valueOf()}
  let db = firebase.firestore()
  let newRecord = await db.collection("hairstyleWork").doc();
  await newRecord.set(salonHairstyleWork)
  return newRecord.id;
}

export let removeHairstyleWork = async (hairstyleWorkId) => {
  //remove
  let db = firebase.firestore()
  await db.collection("hairstyleWork").doc(hairstyleWorkId).delete();
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
  data = salonDoc.data()
  return {...data, sid: salonDoc.id}
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
  //not tested
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

export let rateAUser = async (targetUid, rate, uid) =>{
  let db = firebase.firestore();
  let docRef = db.collection("profile").doc(targetUid).collection('ratings').doc(uid);
  let docSnapshot = await docRef.get();
  let rerate = false
  let pastRate = null
  if (docSnapshot.exists){
    rerate = true
    ratingData = docSnapshot.data()
    pastRate = ratingData['rate']
  }
  await docRef.set({rate});
  let targetUserRef = await db.collection("profile").doc(targetUid).get();
  let targetUserData = targetUserRef.data();
  let numOfRates = (targetUserData.numOfRates?targetUserData.numOfRates:0)
  let rating = (targetUserData.rating?targetUserData.rating:0)
  let totalRate = rating * numOfRates
  if(rerate){
    totalRate = totalRate - pastRate
    numOfRates--;
  }
  rating = (totalRate + rate) / (numOfRates + 1)
  numOfRates++;
  await db.collection("profile").doc(targetUid).update({rating,numOfRates})
  return rating
}

export let loadRatingAndLikesOnUser = async (uid, targetUid) => {
  let db = firebase.firestore();
  let targetUserSnapshot = await db.collection("profile").doc(targetUid).collection('ratings').doc(uid).get();
  let targetUserLikesSnapshot = await db.collection("profile").doc(targetUid).collection('likes').doc(uid).get();
  let rateData = targetUserSnapshot.data();
  let rate = (rateData?rateData['rate']:null)
  return {selfRate: rate, selfLike:targetUserLikesSnapshot.exists}
}

export let rateASalon = async (targetSid, rate, uid) =>{
  let db = firebase.firestore();
  let docRef = db.collection("salonProfile").doc(targetSid).collection('ratings').doc(uid);
  let docSnapshot = await docRef.get();
  let rerate = false
  let pastRate = null
  if (docSnapshot.exists){
    rerate = true
    ratingData = docSnapshot.data()
    pastRate = ratingData['rate']
  }
  await docRef.set({rate});
  let targetSalonRef = await db.collection("salonProfile").doc(targetSid).get();
  let targetSalonData = targetSalonRef.data();
  let numOfRates = (targetSalonData.numOfRates?targetSalonData.numOfRates:0)
  let rating = (targetSalonData.rating?targetSalonData.rating:0)
  let totalRate = rating * numOfRates
  if(rerate){
    totalRate = totalRate - pastRate
    numOfRates--;
  }
  rating = (totalRate + rate) / (numOfRates + 1)
  numOfRates++;
  await db.collection("salonProfile").doc(targetSid).update({rating,numOfRates})
  return rating
}

export let loadRatingAndLikesOnSalon = async (uid, targetSid) => {
  let db = firebase.firestore();
  let targetUserSnapshot = await db.collection("salonProfile").doc(targetSid).collection('ratings').doc(uid).get();
  let targetUserLikesSnapshot = await db.collection("salonProfile").doc(targetSid).collection('likes').doc(uid).get();
  let rateData = targetUserSnapshot.data();
  let rate = (rateData?rateData['rate']:null)
  return {selfRate: rate, selfLike:targetUserLikesSnapshot.exists}
}

export let likeAUser = async (targetUid, like, uid) =>{
  let db = firebase.firestore();
  let docRef = db.collection("profile").doc(targetUid).collection('likes').doc(uid);
  let docSnapshot = await docRef.get();
  let unlike = false
  let pastRate = null
  if (docSnapshot.exists){
    unlike = true
    likesData = docSnapshot.data()
  }
  if(!unlike){
    await docRef.set({like});
  }
  else{
    await db.collection("profile").doc(targetUid).collection('likes').doc(uid).delete()
  }
  let targetUserRef = await db.collection("profile").doc(targetUid).get();
  let targetUserData = targetUserRef.data();
  let numOfLikes = (targetUserData.likes?targetUserData.likes:0)
  numOfLikes = (unlike? numOfLikes -1 :  numOfLikes +1)
  await db.collection("profile").doc(targetUid).update({likes: numOfLikes})
  return numOfLikes
}

export let likeASalon = async (salonId, like, uid) =>{
  let db = firebase.firestore();
  let docRef = db.collection("salonProfile").doc(salonId).collection('likes').doc(uid);
  let docSnapshot = await docRef.get();
  let unlike = false
  let pastRate = null
  if (docSnapshot.exists){
    unlike = true
    likesData = docSnapshot.data()
  }
  if(!unlike){
    await docRef.set({like});
  }
  else{
    await db.collection("salonProfile").doc(salonId).collection('likes').doc(uid).delete()
  }
  let targetSalonRef = await db.collection("salonProfile").doc(salonId).get();
  let targetSalonData = targetSalonRef.data();
  let numOfLikes = (targetSalonData.likes?targetSalonData.likes:0)
  numOfLikes = (unlike? numOfLikes -1 :  numOfLikes +1)
  await db.collection("salonProfile").doc(salonId).update({likes: numOfLikes})
  return numOfLikes
}

export let searchHairstyleWorksByTag = async(sortBy= 'date' , tag = null , lastVisible = null) => {
  // untested
  let db = firebase.firestore();
  let docRef = db.collection("hairstyleWork")
  if (tag != null){
    docRef = docRef.where('tags', 'array-contains', tag)
  }
  if(sortBy != null){
    docRef = docRef.orderBy(sortBy, 'desc')
    //.startAt(((page -1) * 10)).endAt(((1) * 10))
  }else{
    docRef = docRef.orderBy('date', 'desc')
  }

  if (lastVisible != null){
    docRef = docRef.startAfter(lastVisible)
  }

  //ten hairstyle in a page
  docRef = docRef.limit(10)

  let snapshots = await docRef.get()
  let endOfPage = null
  console.log(snapshots.docs.length)
  if (snapshots.docs.length >  0){
    endOfPage = snapshots.docs[snapshots.docs.length-1]
  }
  let hairstyleWorks = []
  for (hairstylework of snapshots.docs){
    console.log('docs')
    data = hairstylework.data()
    userDoc = await getUserById(data['ownerId'])
    data = {...data, hairstyleWorkId :hairstylework.id, ownerIcon: userDoc['image']}
    hairstyleWorks.push(data)
  }
  
  return {hairstyleWorks, endOfPage};
}

export let likeAHairstyleWork = async (uid, hairstyleWorkId, like) =>{
  let db = firebase.firestore();
  let docRef = db.collection("hairstyleWork").doc(hairstyleWorkId).collection('likes').doc(uid);
  let docSnapshot = await docRef.get();
  let unlike = false
  if (docSnapshot.exists){
    unlike = true
    likesData = docSnapshot.data()
  }
  if(!unlike){
    await docRef.set({like});
  }
  else{
    await db.collection("hairstyleWork").doc(hairstyleWorkId).collection('likes').doc(uid).delete()
  }
  let targetHairstyleWorkRef = await db.collection("hairstyleWork").doc(hairstyleWorkId).get();
  let targetHairstyleWorkData = targetHairstyleWorkRef.data();
  let numOfLikes = (targetHairstyleWorkData.likes?targetHairstyleWorkData.likes:0)
  numOfLikes = (unlike? numOfLikes -1 :  numOfLikes +1)
  await db.collection("hairstyleWork").doc(hairstyleWorkId).update({likes: numOfLikes})
  return numOfLikes
}

export let loadLikesOnHairstyleWork = async (uid, targetWid) => {
  let db = firebase.firestore();
  let targetUserLikesSnapshot = await db.collection("hairstyleWork").doc(targetWid).collection('likes').doc(uid).get();
  return targetUserLikesSnapshot.exists
}

export let commentOnHairstyleWork = async (uid, username , hairstyleWorkId, comment) =>{
  let db = firebase.firestore();
  let doc = await db.collection("hairstyleWork").doc(hairstyleWorkId).get()
  let hairstyleWorkData = doc.data()
  let commentCount = (hairstyleWorkData.commentCount?hairstyleWorkData.commentCount + 1: 1)
  let docRef = db.collection("hairstyleWork").doc(hairstyleWorkId).collection('comment').doc();
  await docRef.set({uid,username,comment,index: commentCount,  date: new Date().valueOf()})
  await db.collection("hairstyleWork").doc(hairstyleWorkId).update({commentCount})
}

export let getCommentsOnHairstyleWork = async(hairstyleWorkId, lastVisible = null) => {
  // untested
  let db = firebase.firestore();
  let docRef = await db.collection("hairstyleWork").doc(hairstyleWorkId).collection("comment").orderBy('index', 'desc')

  if (lastVisible != null){
    docRef = docRef.startAfter(lastVisible)
  }

  //5 Comments in a page
  docRef = docRef.limit(10)

  let snapshots = await docRef.get()
  let endOfPage = null
  
  if (snapshots.docs.length >  0){
    endOfPage = snapshots.docs[snapshots.docs.length-1]
  }
  let comments = []
  for (comment of snapshots.docs){
    data = comment.data()
    comments.push(data)
  }
  
  return {comments, endOfPage};
}

export let commentOnUser = async (uid, username , targetUid, comment) =>{
  let db = firebase.firestore();
  let doc = await db.collection("profile").doc(targetUid).get()
  let userData = doc.data()
  let commentCount = (userData.commentCount? userData.commentCount + 1: 1)
  let docRef = db.collection("profile").doc(targetUid).collection('comment').doc();
  await docRef.set({uid,username,comment,index: commentCount,  date: new Date().valueOf()})
  await db.collection("profile").doc(targetUid).update({commentCount})
}

export let getCommentsOnUser = async(uid) => {
  // untested
  let db = firebase.firestore();
  let docRef = await db.collection("profile").doc(uid).collection("comment").orderBy('index', 'desc')
  let snapshots = await docRef.get()
  let comments = []
  for (comment of snapshots.docs){
    data = comment.data()
    comments.push(data)
  }
  
  return comments;
}

export let commentOnSalon = async (uid, username , targetSid, comment) =>{
  let db = firebase.firestore();
  let doc = await db.collection("salonProfile").doc(targetSid).get()
  let salonData = doc.data()
  let commentCount = (salonData.commentCount? salonData.commentCount + 1: 1)
  let docRef = db.collection("salonProfile").doc(targetSid).collection('comment').doc();
  await docRef.set({uid,username,comment,index: commentCount,  date: new Date().valueOf()})
  await db.collection("salonProfile").doc(targetSid).update({commentCount})
}

export let getCommentsOnSalon = async(sid) => {
  // untested
  let db = firebase.firestore();
  let docRef = await db.collection("salonProfile").doc(sid).collection("comment").orderBy('index', 'desc')
  let snapshots = await docRef.get()
  let comments = []
  for (comment of snapshots.docs){
    data = comment.data()
    comments.push(data)
  }
  
  return comments;
}

export let getNewsFeed = async() => {
  let db = firebase.firestore();
  let latestHairstyleSnapshot = await db.collection("hairstyleWork").orderBy('date', 'desc').limit(2).get()
  let latestHairstyle = []
  for (hairstyle of latestHairstyleSnapshot.docs){
    data = hairstyle.data()
    userDoc = await getUserById(data['ownerId'])
    latestHairstyle.push({...data, hairstyleWorkId :hairstyle.id, ownerIcon: userDoc['image']})
  }
  let mostLikedHairstyleSnapshot = await db.collection("hairstyleWork").orderBy('likes', 'desc').limit(2).get()
  let mostLikedHairstyle = []
  for (hairstyle of mostLikedHairstyleSnapshot.docs){
    data = hairstyle.data()
    userDoc = await getUserById(data['ownerId'])
    mostLikedHairstyle.push({...data, hairstyleWorkId :hairstyle.id, ownerIcon: userDoc['image']})
  }
  // let mostLikedSalonSnapshot = await db.collection("salonProfile").orderBy('likes', 'desc').limit(2).get()
  // let mostLikedSalon = []
  // for (salon of mostLikedSalonSnapshot.docs){
  //   data = salon.data()
  //   mostLikedSalon.push(data)
  // }
  // return {mostLikedHairstyle, mostLikedSalon, latestHairstyle}
  return {mostLikedHairstyle, latestHairstyle}
}