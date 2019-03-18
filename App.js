import React from 'react';
import {AppDrawerNavigator, Drawer}from './utils/Drawer'
import { StyleSheet, Text, View , SafeAreaView, ScrollView ,Dimensions, Image, TouchableOpacity} from 'react-native';
import { createDrawerNavigator , createAppContainer , DrawerItems} from 'react-navigation'
import {setup_auth} from './utils/auth.js'

export default class App extends React.Component {
  constructor(){
    super()
    setup_auth()
  }
  render() {
    const Drawer_nav = createAppContainer(AppDrawerNavigator(this.props));
    return <Drawer_nav/>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
