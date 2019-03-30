import React, {Component} from 'react'
import {StyleSheet, Text, View ,Button } from 'react-native'
import {connect} from 'react-redux'
import PageWrapper from '../utils/pageWrapper'

class Splash extends Component{
    render(){
        return(
            <PageWrapper navigation={this.props.navigation}>
                <View style={styles.container}>
                    <Text style={styles.title}> Hey this is the Splash page</Text>
                    <Button onPress={() => this.props.navigation.navigate('Login')} title="GOTO_Login" color="#841584"/>
                    <Button onPress={() => {}} title="Redux test" color="#841584"/>
                </View>
            </PageWrapper>
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

const mapStateToProps = state => ({
    auth: state.auth
  })

export default connect(mapStateToProps)(Splash);