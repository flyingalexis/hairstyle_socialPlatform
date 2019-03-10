import React, {Component} from 'react'
import {StyleSheet, Text, View } from 'react-native'
export default class Login extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.title}> Hey this is the Login Page</Text>
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