import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import CreateSalon from './CreateSalon';
import JoinSalon from './JoinSalon';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import React from 'react'

export default createBottomTabNavigator({
    CreateSalon: {
        screen: createStackNavigator({CreateSalon}),
        navigationOptions: {
            title:"Create Salon",
            tabBarIcon: ({ tintColor }) => (
                <AntDesign name="profile" size={20} style={{ color: tintColor}}/>
            )
          }
    },
    JoinSalon: {
        screen:createStackNavigator({JoinSalon}),
        navigationOptions: {
            title:"Join Salon",
            tabBarIcon: ({ tintColor }) => (
                <MaterialIcons name="people" size={20} style={{ color: tintColor}}/>
            )
          }
    }
});