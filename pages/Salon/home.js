import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';

class ProfileHome extends Component {

    static navigationOptions = ({ navigation }) => ({
        // title: "Profile",
        headerStyle: {borderBottomColor:'transparent',borderBottomWidth: 0 },
        headerLeft: (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <Icon name="menu" style={{color: "#EA6652", marginVertical: 0, marginHorizontal: 10,}}/>
            </TouchableOpacity>
        ),

    })
    render() {
        return (
            <Text>Profile Screen</Text>
        );
    }
}

export default ProfileHome;