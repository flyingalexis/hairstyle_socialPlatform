import 'react-native';
import React from 'react';
import Login from '../pages/Login/Login';
import renderer from 'react-test-renderer';
import authReducer from '../store/auth/reducer'
import {createStore} from 'redux'
import {Provider} from 'react-redux'

const testStore = createStore(authReducer)
test('Login snapShot', () => {
    const snap = renderer.create(
        <Provider store={testStore}>
            <Login/>
        </Provider>
    )
    expect(snap).toMatchSnapshot();
})