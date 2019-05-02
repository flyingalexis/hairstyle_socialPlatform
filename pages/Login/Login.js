import React, {Component} from 'react'
import {StyleSheet, Text, View ,Button, Alert, Image, TextInput, TouchableOpacity} from 'react-native'
import {firebaseLogin} from '../../utils/auth'
import {storeLoginState} from '../../store/auth/actions'
import {connect} from 'react-redux'
import navOptions from '../../utils/drawerBarNavOptions'
// import PageWrapper from '../utils/pageWrapper'

class Login extends Component{
    state = {}
    static navigationOptions = navOptions
    
    render(){
        return(
            <View style={styles.container}>
                <Image style={styles.logo} source={require('../../assets/hairo_logo.gif')}/>
                <TextInput style={styles.textBox} placeholder="Email" placeholderTextColor='#888888' onChangeText={(email) => this.setState({email})} underlineColorAndroid="transparent"/>
                <TextInput style={styles.textBox} placeholder="Password" placeholderTextColor='#888888' onChangeText={(password) => this.setState({password})} underlineColorAndroid="transparent"/>
                <TouchableOpacity style={styles.loginButton} onPress={() => this.handleLogin()}>
                    <Text style={styles.loginButtonText}>LOGIN</Text>
                </TouchableOpacity>
                <View style={styles.signupWrapper}>
                    <Text style={{color: '#888888'}}>Don't have an account ? </Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                        <Text style={styles.signupText}>Signup</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
        );
    }

    async handleLogin(){
        if (this.state.email && this.state.password) {
            // firebaseLogin(this.state.email, this.state.password);
            // temp_email = "demo@demo.com"
            temp_password = "password"
            temp_email = "slave1@demo.com"
            try{
                user = await firebaseLogin(temp_email, temp_password);
                if(user){
                    await this.props.updateLoginState(user);
                    Alert.alert('login sucessfully');
                    this.props.navigation.navigate('Profile')
                }else{
                    throw {message: 'login unsuccessfully'}
                }
            }catch(e){
                Alert.alert(e.message);
            }
        }else{
            Alert.alert('no login info');
        }
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

const mapDispatchToProps = dispatch => ({
    updateLoginState: auth => dispatch(storeLoginState(auth))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)

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
