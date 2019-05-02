import React, { Component } from 'react';
import { View, Text, TouchableOpacity ,StyleSheet} from 'react-native';
import { Icon } from 'native-base';
import navOptions from '../../utils/drawerBarNavOptions'

class SearchHome extends Component {

    static navigationOptions = navOptions;
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={ () => {this.props.navigation.navigate('CategorySearch')}}>
                    <Text style={styles.buttonText}>Category Search</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={ () => {this.props.navigation.navigate('TagSearch')}}>
                    <Text style={styles.buttonText}>Tag Search</Text>
                </TouchableOpacity>
            </View>
        
        );
    }
}

const styles = StyleSheet.create({
    container:{
        width: '90%',
        alignSelf:'center',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100%'
    },
    button:{
        width: '100%',
        backgroundColor: "#EA6652",
        alignItems: 'center',
        justifyContent: 'center',
        height:50,
        marginVertical: 10
    },
    buttonText:{
        color:'white',
    }
})
export default SearchHome;