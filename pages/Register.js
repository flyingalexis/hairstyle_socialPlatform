import React, {Component} from 'react'
import {StyleSheet, Text, View ,Button, Alert, Image, TextInput, TouchableOpacity} from 'react-native'
import {createAccount} from '../utils/auth'
import {createProfile} from '../utils/database'
import {storeLoginState} from '../store/auth/actions'
import {connect} from 'react-redux'
import PageWrapper from '../utils/pageWrapper'
// import {createProfile} from '../utils/database'

class Register extends Component{
    state = {}
    render(){
        return(
            <PageWrapper navigation={this.props.navigation}>
                <View style={styles.container}>
                    <Image style={styles.logo} source={require('../assets/hairo_logo.gif')}/>
                    <TextInput style={styles.textBox} placeholder="Email" placeholderTextColor='#888888' onChangeText={(email) => this.setState({email})} underlineColorAndroid="transparent"/>
                    <TextInput style={styles.textBox} placeholder="Password" placeholderTextColor='#888888' onChangeText={(password) => this.setState({password})} underlineColorAndroid="transparent"/>
                    <TouchableOpacity style={styles.loginButton} onPress={() => this.handleRegister()}>
                        <Text style={styles.loginButtonText}>Register</Text>
                    </TouchableOpacity>
                    <View style={styles.signupWrapper}>
                        <Text style={{color: '#888888'}}>You have an account ? </Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                            <Text style={styles.signupText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </PageWrapper>
        );
    }

    async handleRegister(){
        if (this.state.email && this.state.password) {
            // firebaseLogin(this.state.email, this.state.password);
            let credential = await createAccount(this.state.email, this.state.password);
            if(credential){
                // route to login
                console.log(credential.user)
                let profile = {
                    "email": credential['user']['email'],
                    "uid": credential['user']['uid']
                }
                createProfile(profile).then(() => 
                    Alert.alert('Registered sucessfully'))
                    .catch(err => 
                        Alert.alert(error.message))
            }
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
        alignItems: 'center',
        width: '80%',
        alignSelf: 'center'
    },
    title:{
        fontWeight: 'bold',
        fontSize: 18
    },
    logo:{
        marginTop:'10%',
        marginBottom:'17%',
        width:120,
        height:120
    },
    logoText:{
        marginVertical: 15,
        fontSize: 18
    },
    loginButton:{
        marginTop: 40,
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
    textBox:{
        width: '100%',
        height: 40,
        marginHorizontal: 16,
        fontSize:16,
        color: '#888888',
        borderBottomWidth: 2,
        borderBottomColor: '#ACACAC',
        marginVertical:'3%'
    }
    ,
    signupText:{
        color: 'black',
        fontWeight: '500',
        textDecorationLine:'underline'
    }
    ,
    signupWrapper:{
        marginVertical: 30,
        flexDirection: 'row',
        fontSize: 14,
        alignItems: 'center', 
        justifyContent: 'center'
    }
})