import React from 'react';
import Splash from'./components/Splash'
import Login from'./components/Login'
import { StyleSheet, Text, View , SafeAreaView, ScrollView ,Dimensions, Image, TouchableOpacity} from 'react-native';
import { createDrawerNavigator , createAppContainer , DrawerItems} from 'react-navigation'

export default class App extends React.Component {
  render() {
    return (
      // <Splash/>
      <App_con />
      // <View style={styles.container}>
      //   {/* <Splash/> */}
      // </View>
    );
  }
}

const CustomDrawerComponent = (props) => (
  <SafeAreaView style={{flex: 1}}>
  <View style={{ height: 120, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
    <TouchableOpacity >
      <Image source={require('./assets/demo.jpeg')} style={{ height: 120, width: 120, borderRadius: 60}}/>
    </TouchableOpacity>
  </View>
    <ScrollView>
      <DrawerItems {...props}/>
    </ScrollView>
  </SafeAreaView>
)

const AppDrawerNavigator = createDrawerNavigator({
  Splash: Splash,
  login: Login
},{
  contentComponent: CustomDrawerComponent
})

const App_con = createAppContainer(AppDrawerNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
