import React, {Component} from 'react'
import {StyleSheet, Text, View ,Button, Alert, Image, TextInput, TouchableOpacity,KeyboardAvoidingView} from 'react-native'
import {createAccount} from '../../utils/auth'
import {createProfile} from '../../utils/database'
import {storeLoginState} from '../../store/auth/actions'
import {connect} from 'react-redux'
import navOptions from '../../utils/drawerBarNavOptions'
// import {createProfile} from '../utils/database'

class Register extends Component{
    state = {}

    static navigationOptions = navOptions
    
    render(){
        return(
                <KeyboardAvoidingView style={styles.container}>
                    <Image style={styles.logo} source={require('../../assets/hairo_logo.gif')}/>
                    <View style={styles.greetingsWrapper}>
                        <Text style={styles.greetings}>Welcome to Hairo! </Text>
                        <Text style={styles.greetings}>Can I know you? </Text>
                    </View>
                    <View style={styles.textBoxWrapper}>
                        <TextInput style={styles.textBox} placeholder="Name" placeholderTextColor='#888888' value={this.state.name} onChangeText={(name) => this.setState({name})} underlineColorAndroid="transparent"/>
                        <TextInput style={styles.textBox} placeholder="Email" placeholderTextColor='#888888' value={this.state.email} onChangeText={(email) => this.setState({email})} underlineColorAndroid="transparent"/>
                        <TextInput style={styles.textBox} placeholder="Password" placeholderTextColor='#888888' value={this.state.password} secureTextEntry={true} onChangeText={(password) => this.setState({password})} underlineColorAndroid="transparent"/>
                    </View>
                    <View/>
                    <TouchableOpacity style={styles.loginButton} onPress={() => this.handleRegister()}>
                        <Text style={styles.loginButtonText}>Register</Text>
                    </TouchableOpacity>
                    <View/>
                    <View style={styles.signupWrapper}>
                        <Text style={{color: '#888888'}}>You have an account ? </Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                            <Text style={styles.signupText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                    <View/>
                </KeyboardAvoidingView>
        );
    }

    async handleRegister(){
        if (this.state.email && this.state.password && this.state.name) {
            // firebaseLogin(this.state.email, this.state.password);
            createAccount(this.state.email, this.state.password).then( (credential) => {
                if (!credential){
                    throw new Error('The email has been registered')
                }
                let profile = {
                    "name": this.state.name,
                    "email": credential['user']['email'],
                    "uid": credential['user']['uid']
                }
                return createProfile(profile)
            }). then( () => {
                Alert.alert('registered sucessfully')
                this.props.navigation.navigate('Profile')
            }).catch( (e) => Alert.alert(e.message))
            .finally( () => this.setState({name:null, email: null, password: null}))
            
        }else{
            Alert.alert('no Register info');
        }
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

const mapDispatchToProps = dispatch => ({
    updateLoginState: auth => dispatch(storeLoginState(auth))
})

export default connect(mapStateToProps, mapDispatchToProps)(Register)

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        flex: 1,
        width: '80%',
        alignSelf: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    title:{
        fontWeight: 'bold',
        fontSize: 18
    },
    logo:{
        width:120,
        height:120
    },
    logoText:{
        fontSize: 18
    },
    loginButton:{
        width: '100%',
        height:50,
        backgroundColor: "#EA6652",
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginButtonText:{
        color: "white",
        fontSize: 18
    },
    textBoxWrapper:{
        flexDirection: 'column'
    },
    textBox:{
        width: '100%',
        height: 40,
        fontSize:16,
        color: '#888888',
        borderBottomWidth: 2,
        borderBottomColor: '#ACACAC',
        marginVertical: 5
    }
    ,
    signupText:{
        color: 'black',
        fontWeight: '500',
        textDecorationLine:'underline'
    }
    ,
    signupWrapper:{
        flexDirection: 'row',
        fontSize: 14,
        alignItems: 'center', 
        justifyContent: 'center'
    }
    ,
    greetings:{
        fontSize: 25,
        color: 'black',
        marginVertical: 2,

    },
    greetingsWrapper:{
    }
})