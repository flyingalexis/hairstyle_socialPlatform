import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import SalonPage from './SalonPage';
import ManageMember from './ManageMember';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import React from 'react'
import HairstyleWork from '../SearchSalon/HairstyleWork'

export default createBottomTabNavigator({
    SalonPage: {
        screen: createStackNavigator({SalonPage, HairstyleWork}),
        navigationOptions: {
            title:"Salon Page",
            tabBarIcon: ({ tintColor }) => (
                <AntDesign name="profile" size={20} style={{ color: tintColor}}/>
            )
          }
    },
    ManageMember: {
        screen:createStackNavigator({ManageMember}),
        navigationOptions: {
            title:"Manage Members",
            tabBarIcon: ({ tintColor }) => (
                <MaterialIcons name="people" size={20} style={{ color: tintColor}}/>
            )
          }
    }
})