import React from 'react';
import Splash from'./components/Splash'
import Login from'./components/Login'
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator , createAppContainer} from 'react-navigation'

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

const AppDrawerNavigator = createDrawerNavigator({
  Splash: Splash,
  login: Login
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
