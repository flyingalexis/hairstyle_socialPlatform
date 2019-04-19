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

export let createSalonProfile = async (salonProfileObj, uid) => {
  console.log('create salon profile')
  salonProfileObj = {...salonProfileObj, owner: uid}
  let db = firebase.firestore()
  let newRecord = await db.collection("salonProfile").doc();
  await newRecord.set(salonProfileObj)
  return newRecord.id;
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
    // let userIdList = new Set();
    for (hairstylework of hairstyleWorksData.docs){
      data = hairstylework.data()
      userDoc = await getUserById(data['ownerId'])
      data = {...data, hairstyleWorkId :hairstylework.id, ownerIcon: userDoc['image']}
      console.log(data['title'])
      hairstyleWorks.push(data)
    }
    return hairstyleWorks
}

export let getUserById = async (id) => {
  let db = firebase.firestore()
  doc = await db.collection("profile").doc(id).get()
  return doc.data()
}


