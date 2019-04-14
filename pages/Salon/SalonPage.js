import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import navOptions from '../../utils/drawerBarNavOptions'

class SalonPage extends Component {

    static navigationOptions = ({navigation}) => {
        let headerTintColor = "#EA6652";
        let headerStyle = {borderBottomColor:'transparent',borderBottomWidth: 0 ,elevation:0}
        return {headerTintColor, headerStyle}
    }
    render() {
        return (
            <Text>Salon Page Screen</Text>
        );
    }
}

export default SalonPage;