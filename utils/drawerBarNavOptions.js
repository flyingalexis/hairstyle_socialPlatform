import React from 'react'
import { TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';

export default navigationOptions = ({ navigation }) => ({
    // title: "Profile",
    headerStyle: {borderBottomColor:'transparent',borderBottomWidth: 0 ,elevation:0},
    headerLeft: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Icon name="menu" style={{color: "#EA6652", marginVertical: 0, marginHorizontal: 10,}}/>
        </TouchableOpacity>
    ),

})

export const navigationCustomOptions = (customComponent) => {
    return ({ navigation }) => ({
        // title: "Profile",
        headerStyle: {borderBottomColor:'transparent',borderBottomWidth: 0 ,elevation:0},
        headerLeft: (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <Icon name="menu" style={{color: "#EA6652", marginVertical: 0, marginHorizontal: 10,}}/>
            </TouchableOpacity>
        ),
        headerRight: (
            customComponent
        )
    
    })
}
