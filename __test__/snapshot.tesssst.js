import 'react-native';
import React from 'react';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Profile from '../pages/Profile/Profile';
import ViewProfile from '../pages/common/ViewProfile';
import ViewSalonProfile from '../pages/common/ViewSalonProfile';
import SalonProfile from '../pages/Salon/SalonPage';
import ManageMember from '../pages/Salon/ManageMember';
import AddHairstyleWork from '../pages/AddHairstyleWork/main';
import CreateSalon from '../pages/CreateSalon/CreateSalon';
import JoinSalon from '../pages/CreateSalon/JoinSalon';
import CategorySearch from '../pages/HairstyleSearch/CategorySearch';
import HairstyleWorkList from '../pages/HairstyleSearch/HairstyleWorkList';
import SearchHome from '../pages/HairstyleSearch/SearchHome';
import TagSearch from '../pages/HairstyleSearch/TagSearch';
import renderer from 'react-test-renderer';
import authReducer from '../store/auth/reducer';
import SalonSearch from '../pages/SalonSearch/SalonSearch';
import SalonSearchHome from '../pages/SalonSearch/SearchHome';
import NewsFeed from '../pages/Splash/Splash'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {storeLoginState} from '../store/auth/actions'
import {firebaseLogin} from '../utils/auth'
import firebase from 'firebase';
import 'firebase/firestore';

const testStore = createStore(authReducer)
var config = {
    apiKey: "AIzaSyDJRitvjSKtSRsFfqPOzzrNcUFrw7UGb4o",
    authDomain: "comp4521-9f866.firebaseapp.com",
    databaseURL: "https://comp4521-9f866.firebaseio.com",
    projectId: "comp4521-9f866",
    storageBucket: "comp4521-9f866.appspot.com",
    messagingSenderId: "122458253507",
    appId: "1:122458253507:web:72dfb58b556c6663"
};

beforeAll(() => {
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
      }
});

let preLogin = async () => {
    let user = await firebaseLogin('test@demo.com', 'password');
    await testStore.dispatch(storeLoginState(user))
}

test('Login snapShot',async  () => {
    const navigation = { navigate: jest.fn(), setParams: (a) =>{}};
    await preLogin()
    const snap = await renderer.create(
        <Provider store={testStore}>
            <Login navigation={navigation}/>
        </Provider>
    )
    expect(snap).toMatchSnapshot();
})

test('Register snapShot',async  () => {
    const navigation = { navigate: jest.fn(), setParams: (a) =>{}};
    await preLogin()
    const snap = await renderer.create(
        <Provider store={testStore}>
            <Register navigation={navigation}/>
        </Provider>
    )
    expect(snap).toMatchSnapshot();
})

test('Profile snapShot',async  () => {
    const navigation = { navigate: jest.fn(), setParams: (a) =>{}};
    await preLogin()
    const snap = await renderer.create(
        <Provider store={testStore}>
            <Profile navigation={navigation}/>
        </Provider>
    )
    expect(snap).toMatchSnapshot();
})

test('Salon Profile snapShot',async  () => {
    const navigation = { navigate: jest.fn(), setParams: (a) =>{}};
    await preLogin()
    const snap = await renderer.create(
        <Provider store={testStore}>
            <SalonProfile navigation={navigation}/>
        </Provider>
    )
    expect(snap).toMatchSnapshot();
})

test('Manage Member snapShot',async  () => {
    const navigation = { navigate: jest.fn(), setParams: (a) =>{}};
    await preLogin()
    const snap = await renderer.create(
        <Provider store={testStore}>
            <ManageMember navigation={navigation}/>
        </Provider>
    )
    expect(snap).toMatchSnapshot();
})


test('ViewProfile snapShot',async  () => {
    const navigation = { navigate: jest.fn(), setParams: (a) =>{}, getParam: (a)=> 'mJW4jQdZNVWR5H3OikP3XIVAET42'};
    await preLogin()
    const snap = await renderer.create(
        <Provider store={testStore}>
            <ViewProfile navigation={navigation}/>
        </Provider>
    )
    expect(snap).toMatchSnapshot();
})

test('AddHairstyleWork snapShot',async  () => {
    const navigation = { navigate: jest.fn(), setParams: (a) =>{}};
    await preLogin()
    const snap = await renderer.create(
        <Provider store={testStore}>
            <AddHairstyleWork navigation={navigation}/>
        </Provider>
    )
    expect(snap).toMatchSnapshot();
})

test('JoinSalon snapShot',async  () => {
    const navigation = { navigate: jest.fn(), setParams: (a) =>{}};
    await preLogin()
    const snap = await renderer.create(
        <Provider store={testStore}>
            <JoinSalon navigation={navigation}/>
        </Provider>
    )
    expect(snap).toMatchSnapshot();
})

test('CreateSalon snapShot',async  () => {
    const navigation = { navigate: jest.fn(), setParams: (a) =>{}};
    await preLogin()
    const snap = await renderer.create(
        <Provider store={testStore}>
            <CreateSalon navigation={navigation}/>
        </Provider>
    )
    expect(snap).toMatchSnapshot();
})

test('CategorySearch snapShot',async  () => {
    const navigation = { navigate: jest.fn(), setParams: (a) =>{}};
    await preLogin()
    const snap = await renderer.create(
        <Provider store={testStore}>
            <CategorySearch navigation={navigation}/>
        </Provider>
    )
    expect(snap).toMatchSnapshot();
})
test('HairstyleWorkList snapShot',async  () => {
    const navigation = { navigate: jest.fn(), setParams: (a) =>{}};
    await preLogin()
    const snap = await renderer.create(
        <Provider store={testStore}>
            <HairstyleWorkList navigation={navigation}/>
        </Provider>
    )
    expect(snap).toMatchSnapshot();
})

test('SalonSearchHome',async  () => {
    const navigation = { navigate: jest.fn(), setParams: (a) =>{}};
    await preLogin()
    const snap = await renderer.create(
        <Provider store={testStore}>
            <SalonSearchHome navigation={navigation}/>
        </Provider>
    )
    expect(snap).toMatchSnapshot();
})

test('ViewSalonProfile snapShot',async  () => {
    const navigation = { navigate: jest.fn(), setParams: (a) =>{}, getParam: (a)=> '35yIbyvb1dWK3uiq3V6o'};
    await preLogin()
    const snap = await renderer.create(
        <Provider store={testStore}>
            <ViewSalonProfile navigation={navigation}/>
        </Provider>
    )
    expect(snap).toMatchSnapshot();
})

test('NewsFeed snapShot',async  () => {
    const navigation = { navigate: jest.fn(), setParams: (a) =>{}};
    await preLogin()
    const snap = await renderer.create(
        <Provider store={testStore}>
            <NewsFeed navigation={navigation}/>
        </Provider>
    )
    await Promise.resolve()
    expect(snap).toMatchSnapshot();
})

test('SearchHome snapShot',async  () => {
    const navigation = { navigate: jest.fn(), setParams: (a) =>{}};
    await preLogin()
    const snap = await renderer.create(
        <Provider store={testStore}>
            <SearchHome navigation={navigation}/>
        </Provider>
    )
    expect(snap).toMatchSnapshot();
})
test('TagSearch snapShot',async  () => {
    const navigation = { navigate: jest.fn(), setParams: (a) =>{}};
    await preLogin()
    const snap = await renderer.create(
        <Provider store={testStore}>
            <TagSearch navigation={navigation}/>
        </Provider>
    )
    expect(snap).toMatchSnapshot();
})

test('SalonSearch snapShot',async  () => {
    const navigation = { navigate: jest.fn(), setParams: (a) =>{}};
    await preLogin()
    const snap = await renderer.create(
        <Provider store={testStore}>
            <SalonSearch navigation={navigation}/>
        </Provider>
    )
    expect(snap).toMatchSnapshot();
})