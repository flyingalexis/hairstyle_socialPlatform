// TANG, Marco Kwan Ho, 20306981, mkhtang@connect.ust.hk
// WONG, Hoi Ming, 20275118, hmwongak@connect.ust.hk

import React from 'react';
import {AppDrawerNavigator, Drawer}from './utils/Drawer'
import { StyleSheet, Text, View , SafeAreaView, ScrollView ,Dimensions, Image, TouchableOpacity} from 'react-native';
import { createDrawerNavigator , createAppContainer , DrawerItems} from 'react-navigation'
import {authLoading} from './utils/auth.js'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import authReducer from './store/auth/reducer'
import {androidTimerFix} from './utils/platformFix'
import {storeLoginState} from './store/auth/actions'

androidTimerFix()
const store = createStore(authReducer)

export default class App extends React.Component {
  constructor(){
    super()
  }
  state={
    loading: true
  }
  
  componentDidMount(){
    this.setState({loading: true})
    console.log('preload')
    let callback = (profileData) => store.dispatch(storeLoginState(profileData))
    authLoading(callback).then(() => {
      this.setState({loading: false})
    });
  }

  render() {
    if(this.state.loading){
      return null
    }
    const Drawer_nav = createAppContainer(AppDrawerNavigator(this.props));
    return (
      <Provider store={store}>
        <Drawer_nav/>
      </Provider>
    );
  }
}

