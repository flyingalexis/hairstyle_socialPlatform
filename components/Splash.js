import React, {Component} from 'react'
import {StyleSheet, Text, View ,Button } from 'react-native'
export default class Splash extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.title}> Hey this is the Splash page</Text>
                <Button onPress={() => this.props.navigation.navigate('login')} title="Learn More" color="#841584"/>
            </View>
        );
    }
}

const styles = StyleSheet.create({  
    container: {
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title:{
        fontWeight: 'bold',
        fontSize: 18
    }
})