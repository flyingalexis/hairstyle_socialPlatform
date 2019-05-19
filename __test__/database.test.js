import {createProfile, updateProfile, removeProfile} from '../utils/database';
import firebase from 'firebase';

jest.setTimeout(10000)
var config = {
    // put this in .env
    apiKey: "AIzaSyDJRitvjSKtSRsFfqPOzzrNcUFrw7UGb4o",
    authDomain: "comp4521-9f866.firebaseapp.com",
    databaseURL: "https://comp4521-9f866.firebaseio.com",
    projectId: "comp4521-9f866",
    storageBucket: "comp4521-9f866.appspot.com",
    messagingSenderId: "122458253507"
  };

firebase.initializeApp(config);

test('CreateUserProfileTest', async () =>{
    let profileObj = {uid: 'testing'}
    let updates= {update: 'someUpdates'}
    await createProfile(profileObj);
    await updateProfile(updates, profileObj['uid'])
    let output = await removeProfile(profileObj['uid'])
    // expect(output).toBe(expect.anything());
    expect(output).toBeUndefined();
})

import {createSalonProfile, updateSalonProfile, removeSalonProfile} from '../utils/database';

test('CreateSalonProfileTest', async () =>{
    let profileObj = {sid: 'testing'}
    let updates= {update: 'someUpdates'}
    
    let sid = await createSalonProfile(profileObj, 'someone')
    await updateSalonProfile(updates, sid)
    let output = await removeSalonProfile(sid)
    expect(output).toBeUndefined();
})


import {createHairstyleWork, removeHairstyleWork} from '../utils/database';

test('CreateHairstyleWorkTest', async () => {
    let demoInfo = {'someInfo': '1'}
    let workId = await createHairstyleWork(demoInfo, demoInfo);
    let output = await removeHairstyleWork(workId);
    expect(output).toBeUndefined();
})

import {loadHairstyleWorkByCategory} from '../utils/database';

test('CategorySearchTest', async () => {
    let output = await loadHairstyleWorkByCategory('Afro')
    expect(Array.isArray(output)).toBe(true);
})

import {getUserByEmail, getUserById} from '../utils/database'
test('GetUserByIDTest', async () => {
    let output = await getUserById('a18ArPQIw1bf4U2GwO8KTaw1RHY2');
    expect(typeof(output)).toBe('object');
})

test('GetUserByEmailTest', async () => {
    let output = await getUserByEmail('slave1@demo.com')
    expect(typeof(output)).toBe('object');
})

import {getWorksByuserId} from '../utils/database'
test('GetWorksByUserIdTest', async () => {
    let output = await getWorksByuserId('a18ArPQIw1bf4U2GwO8KTaw1RHY2')
    expect(Array.isArray(output)).toBe(true);
})

import {getUsersByIds} from '../utils/database'
test('GetUserByIdsTest', async() => {
    let ids= ['a18ArPQIw1bf4U2GwO8KTaw1RHY2', 'wlQR3avkExYYp4mHrEpYza3kCw82']
    let output = await getUsersByIds(ids)
    expect(typeof(output)).toBe('object');
})

import {getSalonById,getWorksBySalonId} from '../utils/database'
test('getSalonByIdTest', async() => {
    let output = await getSalonById("sZwHQZXFw3dXUmnM3a86")
    expect(typeof(output)).toBe('object');
})

test('getWorksBySalonIdTest', async() => {
    let output = await getWorksBySalonId("sZwHQZXFw3dXUmnM3a86")
    expect(Array.isArray(output)).toBe(true);
})

import {inviteUserToSalon, removeInvitations} from '../utils/database'
test('inviteUserToSalonTest', async() => {
    // user not exist
    await expect(inviteUserToSalon("some one who never exist","sZwHQZXFw3dXUmnM3a86")).rejects.toThrow();
    // user who already got a salon
    await expect(inviteUserToSalon("slave1@demo.com","sZwHQZXFw3dXUmnM3a86")).rejects.toThrow();
    //user who already been invited to that salon 
    await expect(inviteUserToSalon("goodkit@demo.com","sZwHQZXFw3dXUmnM3a86")).rejects.toThrow();
    // valid user
    await inviteUserToSalon("crazyshit@kkk.com2","sZwHQZXFw3dXUmnM3a86")
    let output = await removeInvitations("sZwHQZXFw3dXUmnM3a86","ORgCWWWyyep9CpDNlMnX")
    
    expect(output).toBeUndefined();
})

import {getInvitations} from '../utils/database';
test('getInvitationsTest', async () => {
    let output = await getInvitations("C47VsMChGVPtBKU7Cy9UZaCzjg62")
    expect(Array.isArray(output)).toBe(true);
})

import {removeAdminFromSalon, addAdminToSalon} from '../utils/database';
test('addAdminToSalonTest', async () => {
    await addAdminToSalon("sZwHQZXFw3dXUmnM3a86", "fakeUID")
    let output = await removeAdminFromSalon("sZwHQZXFw3dXUmnM3a86", "fakeUID")
    expect(output).toBeUndefined();
})

import {rateAUser, loadRatingAndLikesOnUser} from '../utils/database';
test('rateAUserTest', async () => {
    await rateAUser("C47VsMChGVPtBKU7Cy9UZaCzjg62",5 ,"ORgCWWWyyep9CpDNlMnX")
    let output = await rateAUser("C47VsMChGVPtBKU7Cy9UZaCzjg62",5 ,"ORgCWWWyyep9CpDNlMnX")
    expect(typeof(output)).toBe("number");
})

test('loadRatingAndLikesOnUserTest', async () => {
    let output = await loadRatingAndLikesOnUser("ORgCWWWyyep9CpDNlMnX" ,"C47VsMChGVPtBKU7Cy9UZaCzjg62")
    expect(typeof(output)).toBe('object');
})

import {rateASalon, loadRatingAndLikesOnSalon} from '../utils/database';
test('rateASalon', async () => {
    await rateASalon("sZwHQZXFw3dXUmnM3a86",5 ,"ORgCWWWyyep9CpDNlMnX")
    let output = await rateASalon("sZwHQZXFw3dXUmnM3a86",5 ,"ORgCWWWyyep9CpDNlMnX")
    expect(typeof(output)).toBe("number");
})

test('loadRatingAndLikesOnSalonTest', async () => {
    let output = await loadRatingAndLikesOnSalon("ORgCWWWyyep9CpDNlMnX" ,"sZwHQZXFw3dXUmnM3a86")
    expect(typeof(output)).toBe('object');
})


import {likeAUser, likeASalon} from '../utils/database';
test('likeAUserTest', async () => {
    await likeAUser("ORgCWWWyyep9CpDNlMnX",true ,"a18ArPQIw1bf4U2GwO8KTaw1RHY2")
    let output = await likeAUser("ORgCWWWyyep9CpDNlMnX",false ,"a18ArPQIw1bf4U2GwO8KTaw1RHY2")
    expect(typeof(output)).toBe("number");
})

test('likeASalonTest', async () => {
    await likeASalon("ikhk8BVKPkVr3tfN3Ati",true ,"ORgCWWWyyep9CpDNlMnX")
    let output = await likeASalon("ikhk8BVKPkVr3tfN3Ati",false ,"ORgCWWWyyep9CpDNlMnX")
    expect(typeof(output)).toBe("number");
})

let subOutput = null
import {searchHairstyleWorksByTag} from '../utils/database';
test('searchHairstyleWorksByTagTest', async () => {
    subOutput = await searchHairstyleWorksByTag(null, null, null);
    expect(typeof(subOutput)).toBe('object');
})

test('searchHairstyleWorksByTagPaginationTest', async () => {
    let output = await searchHairstyleWorksByTag(null, null, subOutput.endOfPage);
    expect(typeof(output)).toBe('object');
})

test('searchHairstyleWorksByTagParamTest', async () => {
    let output = await searchHairstyleWorksByTag("likes", "cool", null);
    expect(typeof(output)).toBe('object');
})

import {likeAHairstyleWork} from '../utils/database';
test('likeAHairstyleWorkTest', async () => {
    let userId = "ORgCWWWyyep9CpDNlMnX"
    let workID = "0PNBAf2cw26tFWTHNoSk"
    await likeAHairstyleWork(userId, workID, true)
    let output = await likeAHairstyleWork(userId, workID, false)
    expect(typeof(output)).toBe("number");
})

import {loadLikesOnHairstyleWork} from '../utils/database'
test('loadLikesOnHairstyleWorkTest', async () => {
    let userId = "ORgCWWWyyep9CpDNlMnX"
    let workID = "0PNBAf2cw26tFWTHNoSk"
    let output = await loadLikesOnHairstyleWork(userId, workID)
    expect(output).toBe(false);
})

import{commentOnHairstyleWork, getCommentsOnHairstyleWork} from '../utils/database'
test('commentOnHairstyleWorkTest', async () => {
    let userId = "ORgCWWWyyep9CpDNlMnX"
    let workID = "0PNBAf2cw26tFWTHNoSk"
    let username = "nobody"
    let comment = "testing comment"
    let output = await commentOnHairstyleWork(userId, username , workID, comment)
    expect(output).toBeUndefined();
})

test('getCommentsOnHairstyleWorkTest', async () => {
    let workID = "0PNBAf2cw26tFWTHNoSk"
    let subOutput = await getCommentsOnHairstyleWork(workID, null)
    let output = await getCommentsOnHairstyleWork(workID, subOutput.endOfPage)
    expect(typeof(output)).toBe('object');
})

import{commentOnUser, getCommentsOnUser} from '../utils/database'
test('commentOnUserTest', async () => {
    let userId = "ORgCWWWyyep9CpDNlMnX"
    let targetUid = "nRCaOefTUQ7j1AAykbsG"
    let username = "nobody"
    let comment = "testing comment"
    let output = await commentOnUser(userId, username , targetUid, comment)
    expect(output).toBeUndefined();
})

test('getCommentsOnUserTest', async () => {
    let targetUid = "nRCaOefTUQ7j1AAykbsG"
    let subOutput = await getCommentsOnUser(targetUid, null)
    let output = await getCommentsOnUser(targetUid, subOutput.endOfPage)
    expect(typeof(output)).toBe('object');
})

import {commentOnSalon, getCommentsOnSalon} from '../utils/database'
test('commentOnSalonTest', async () => {
    let userId = "ORgCWWWyyep9CpDNlMnX"
    let sid = "TDTxMz1OlM0wBRtmAMeS"
    let username = "nobody"
    let comment = "testing comment"
    let output = await commentOnSalon(userId, username , sid, comment)
    expect(output).toBeUndefined();
})

test('getCommentsOnSalon', async () => {
    let sid = "TDTxMz1OlM0wBRtmAMeS"
    let subOutput = await getCommentsOnSalon(sid, null)
    let output = await getCommentsOnSalon(sid, subOutput.endOfPage)
    expect(typeof(output)).toBe('object');
})

import {getNewsFeed} from '../utils/database'
test('getNewsFeedTest', async () => {
    let output = await getNewsFeed()
    expect(typeof(output)).toBe('object');
})

import {searchSalonByName} from '../utils/database'
test('searchSalonByNameTest', async () => {
    let output = await searchSalonByName(null,null,null,null)
    await searchSalonByName(1,1,null,output.endOfPage)
    await searchSalonByName(2,2,"Pisca salon",null)
    await searchSalonByName(3,3,null,null)
    await searchSalonByName(4,1,null,null)
    await searchSalonByName(5,1,null,null)
    expect(typeof(output)).toBe('object');
})