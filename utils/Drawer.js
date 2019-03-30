
import { StyleSheet, Text, View , SafeAreaView, ScrollView ,Dimensions, Image, TouchableOpacity, Platform, StatusBar} from 'react-native';
import { createDrawerNavigator , createAppContainer , DrawerItems} from 'react-navigation'
import React from 'react'
import Login from '../pages/Login'
import Splash from '../pages/Splash'
import Register from '../pages/Register'
import {connect} from 'react-redux'
import {firebaseLogout} from '../utils/auth'
import {cleanLoginState} from '../store/auth/actions'

const CustomDrawerComponent = (props) => {
  let iconBar;
  if(props.auth){
    iconBar = (
    <View style={{ height: 120, backgroundColor: 'white', alignItems: 'center', justifyContent: 'space-around'}}>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width:'80%'}}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
          <Image source={require('../assets/demo.jpeg')} style={{ height: 120, width: 120, borderRadius: 60}}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => logout(props)}>
          <Text>LOGOUT</Text>
        </TouchableOpacity>
      </View>
    </View>
    )
  }else {
    iconBar = (
      <View style={{ height: 60, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
          <Text>LOGIN</Text>
        </TouchableOpacity>
      </View>
      )
  }
  return (
    <SafeAreaView style={drawerWrapperStyle}>
      <ScrollView>
        <DrawerItems {...props}/>
      </ScrollView>
      {iconBar}
    </SafeAreaView>
  )
}

const logout = async (props) => {
  await firebaseLogout();
  await props.dispatch(cleanLoginState());
  props.navigation.navigate('Login');
}

const mapStateToProps = state => ({
  auth: state.auth
})

const drawerWrapperStyle = {
  paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
  flex: 1, 
  flexDirection: 'column'
}


export const AppDrawerNavigator = (props) => (createDrawerNavigator({
  Splash: Splash,
  Login: Login,
  Register: Register
},{
  contentComponent: connect(mapStateToProps)(CustomDrawerComponent)
}))

