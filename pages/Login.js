import React, {Component} from 'react'
import {StyleSheet, Text, View ,Button, Alert, Image, TextInput, TouchableOpacity} from 'react-native'
import {login} from '../utils/auth'

export default class Login extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Image style={styles.logo} source={require('../assets/Logo.png')}/>
                <TextInput style={styles.textBox} placeholder="Email" placeholderTextColor='#ABABAB' underlineColorAndroid="transparent"/>
                <TextInput style={styles.textBox} placeholder="Password" placeholderTextColor='#ABABAB' underlineColorAndroid="transparent"/>
                <TouchableOpacity style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>LOGIN</Text>
                </TouchableOpacity>
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
    },
    logo:{
        width:70, height:70
    },
    logoText:{
        marginVertical: 15,
        fontSize: 18
    },
    loginButton:{
        marginTop: 40,
        width: 300,
        height:50,
        backgroundColor: "#EA6652",
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginButtonText:{
        color: "white",
        fontSize: 18
    },
    textBox:{
        width: 300,
        height: 40,
        marginHorizontal: 16,
        fontSize:16,
        color: '#ABABAB',
        borderBottomWidth: 2,
        borderBottomColor: '#ACACAC',
        marginVertical:10
    }
})