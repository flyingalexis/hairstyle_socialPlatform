import React from 'react';
import Splash from'./components/Splash'
import Login from'./components/Login'
import {AppDrawerNavigator, Drawer}from './utils/Drawer'
import { StyleSheet, Text, View , SafeAreaView, ScrollView ,Dimensions, Image, TouchableOpacity} from 'react-native';
import { createDrawerNavigator , createAppContainer , DrawerItems} from 'react-navigation'

export default class App extends React.Component {
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
