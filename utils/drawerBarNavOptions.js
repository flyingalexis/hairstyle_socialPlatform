import React from 'react'
import { TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';

export default navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return ({
         // title: "Profile",
        headerStyle: {borderBottomColor:'transparent',borderBottomWidth: 0 ,elevation:0},
        headerLeft: (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <Icon name="menu" style={{color: "#EA6652", marginVertical: 0, marginHorizontal: 10,}}/>
            </TouchableOpacity>
        ),
        headerRight: params.rightIcon
    })
}

export let testOpt = (extraIdentity) => {
    console.log('runing with ')
    console.log(extraIdentity)
    return ({ navigation }) => {
        const { params = {} } = navigation.state;
        return ({
            // title: "Profile",
            headerStyle: {borderBottomColor:'transparent',borderBottomWidth: 0 ,elevation:0},
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                    <Icon name="menu" style={{color: "#EA6652", marginVertical: 0, marginHorizontal: 10,}}/>
                </TouchableOpacity>
            ),
            headerRight: params.rightIcon,
            ...extraIdentity
        })
    }
}