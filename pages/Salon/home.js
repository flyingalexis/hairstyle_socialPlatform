import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import navOptions from '../../utils/drawerBarNavOptions'

class SalonHome extends Component {

    static navigationOptions = navOptions
    render() {
        return (
            <Text>Salon Screen</Text>
        );
    }
}

export default SalonHome;