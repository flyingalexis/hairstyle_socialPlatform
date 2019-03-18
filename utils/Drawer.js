
import { StyleSheet, Text, View , SafeAreaView, ScrollView ,Dimensions, Image, TouchableOpacity} from 'react-native';
import { createDrawerNavigator , createAppContainer , DrawerItems} from 'react-navigation'
import React from 'react'
import Login from '../pages/Login'
import Splash from '../pages/Splash'

const CustomDrawerComponent = (props) => (
  <SafeAreaView style={{flex: 1}}>
  <View style={{ height: 120, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
    <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
      <Image source={require('../assets/demo.jpeg')} style={{ height: 120, width: 120, borderRadius: 60}}/>
    </TouchableOpacity>
  </View>
    <ScrollView>
      <DrawerItems {...props}/>
    </ScrollView>
  </SafeAreaView>
)

export const AppDrawerNavigator = (props) => (createDrawerNavigator({
  Splash: Splash,
  Login: Login
},{
  contentComponent: CustomDrawerComponent
}))

// const AppDrawerNavigator = createDrawerNavigator({
//   Splash: Splash,
//   login: Login
// })


// export const Drawer = (props) => {
//   return createAppContainer(AppDrawerNavigator(props));
// }
