import React from 'react';
import {AppDrawerNavigator, Drawer}from './utils/Drawer'
import { StyleSheet, Text, View , SafeAreaView, ScrollView ,Dimensions, Image, TouchableOpacity} from 'react-native';
import { createDrawerNavigator , createAppContainer , DrawerItems} from 'react-navigation'
import {authLoading} from './utils/auth.js'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import authReducer from './store/auth/reducer'
import {androidTimerFix} from './utils/platformFix'

androidTimerFix()
const store = createStore(authReducer)

export default class App extends React.Component {
  constructor(){
    super()
  }
  async componentDidMount(){
    await authLoading(store);
  }
  render() {
    const Drawer_nav = createAppContainer(AppDrawerNavigator(this.props));
    return (
      <Provider store={store}>
        <Drawer_nav/>
      </Provider>
    );
  }
}

