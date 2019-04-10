import React, {Component} from 'react'
import {StyleSheet, Text, View , Image , TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import PageWrapper from '../utils/pageWrapper'
import { Row } from 'native-base';

class Profile extends Component{
    componentWillMount(){
        console.log()
        if (this.props.auth == null){
            console.log('go to login');
            this.props.navigation.navigate('Login');
        }
    }
    render(){
        if (this.props.auth){
            return (<PageWrapper navigation={this.props.navigation}>
                        <View style={styles.container}>
                            <Image source={require('../assets/demo.jpeg')} style={styles.icon}/>
                            <Text style={styles.name}>{this.props.auth.name}</Text>
                            <Text>{this.props.auth.email}</Text>
                            <Text>{this.props.auth.description && this.props.auth.description}</Text>
                            {/* status bar */}
                            <View style={styles.statusWrapper}>
                                <View style={styles.statusGrid}>
                                    <Text style={styles.statusNumber}>236</Text>
                                    <Text>Likes</Text>
                                </View>
                                <View style={{flexDirection:'row', flex: 4}}>
                                    <View style={styles.verticalSeparationLine}/>
                                    <View style={styles.statusGrid}>
                                        <Text style={styles.statusNumber}>236</Text>
                                        <Text>Gallery</Text>
                                    </View>
                                    <View style={styles.verticalSeparationLine}/>
                                </View>
                                <View style={styles.statusGrid}>
                                    <Text style={styles.statusNumber}>23.6</Text>
                                    <Text>Ratings</Text>
                                </View>
                            </View>
                            {/* End of status bar */}
                            <Text style={styles.RegisterSalonLabel}> You have not register your hairsalon yet </Text>
                            <TouchableOpacity style={styles.salonLabelBackground}>
                                <Text style={styles.salonLabel}>Register Your Hair salon</Text>
                            </TouchableOpacity>
                        </View>
                    </PageWrapper>);
        }
        else{
            return(
                <PageWrapper navigation={this.props.navigation}></PageWrapper>
            );
        }
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
        height: 100, 
        width: 100, 
        borderRadius: 50,
        marginTop: 50,
        marginBottom: 10,
        borderWidth: 2,
        borderColor:"#EA6652"
    },
    name:{
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10
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
        height: 70,
        flex:4
    },
    salonLabelBackground:{
        backgroundColor: "#EA6652",
        height: 40,
        width: 250,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginVertical: 6
    },
    salonLabel:{
        color: 'white',
        fontSize: 20,
        marginVertical: 12
    },
    RegisterSalonLabel:{
        color: '#888888',
        fontSize: 20,
        marginVertical: 12
    },
    statusNumber:{
        fontSize: 20
    }
})

const mapStateToProps = state => ({
    auth: state.auth
  })

export default connect(mapStateToProps)(Profile);