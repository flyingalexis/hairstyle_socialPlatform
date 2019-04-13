import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import { Icon } from 'native-base';
import navOptions from '../../utils/drawerBarNavOptions'

class SalonHome extends Component {

    static navigationOptions = navOptions
    render() {
        return (
            <View>
                <Button
                        onPress={() => this.props.navigation.navigate("SalonPage")}
                        title="Go To Details"
                    />
                <Text>Salon Screen</Text>
            </View>
        );
    }
}

export default SalonHome;