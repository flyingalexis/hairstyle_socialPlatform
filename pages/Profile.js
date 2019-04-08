import React, {Component} from 'react'
import {StyleSheet, Text, View , Image } from 'react-native'
import {connect} from 'react-redux'
import PageWrapper from '../utils/pageWrapper'
import { Row } from 'native-base';

class Profile extends Component{
    componentWillMount(){
        if (!this.props.auth){
            this.props.navigation.navigate('Login')
        }
        console.log(this.props.auth)
    }
    render(){
        return(
            <PageWrapper navigation={this.props.navigation}>
                <View style={styles.container}>
                    <Image source={require('../assets/demo.jpeg')} style={styles.icon}/>
                    <Text style={styles.name}>{this.props.auth.name}</Text>
                    <Text>{this.props.auth.email}</Text>
                    <Text>{this.props.auth.description && this.props.auth.description}</Text>
                    <View style={styles.statusWrapper}>
                        <View style={styles.statusGrid}>
                            <Text>236</Text>
                            <Text>Views</Text>
                        </View>
                        <View style={{flexDirection:'row', flex: 4}}>
                            <View style={styles.verticalSeparationLine}/>
                            <View style={styles.statusGrid}>
                                <Text>236</Text>
                                <Text>Gallery</Text>
                            </View>
                            <View style={styles.verticalSeparationLine}/>
                        </View>
                        <View style={styles.statusGrid}>
                            <Text>23.6</Text>
                            <Text>Ratings</Text>
                        </View>
                    </View>
                </View>
            </PageWrapper>
        );
    }
}

const styles = StyleSheet.create({  
    container: {
        backgroundColor: 'transparent',
        flex: 1,
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center'
    },
    icon: {
        height: 80, 
        width: 80, 
        borderRadius: 40,
        marginTop: 40,
        marginBottom: 5,
        borderWidth: 2,
        borderColor:"#EA6652"
    },
    name:{
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 5
    },
    statusWrapper:{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#cccccc',
        marginVertical: 12
    },
    verticalSeparationLine: {
        backgroundColor: '#cccccc',
        height: '100%',
        width: 1,
    },
    statusGrid: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        flex:4
    }
})

const mapStateToProps = state => ({
    auth: state.auth
  })

export default connect(mapStateToProps)(Profile);