import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity,ScrollView ,TextInput, Alert, Image} from 'react-native';
import { Icon } from 'native-base';
import {connect} from 'react-redux'
import navOptions from '../../utils/drawerBarNavOptions'
import {getInvitations,updateProfile, removeInvitations, addAdminToSalon} from '../../utils/database';
import { Ionicons } from '@expo/vector-icons';
import {updateLoginState} from '../../store/auth/actions'

class JoinSalon extends Component {

    static navigationOptions = navOptions

    state={
        loading: true,
    }

    loadInvitations(){console.log(Object.keys(this.props.auth))
        getInvitations(this.props.auth.uid).then((invitations)=> {
            this.setState({invitations})
            this.setState({loading:false})
        })
    }

    componentDidMount(){
        this.loadInvitations()
    }

    handleAcceptinvitation(sid){
        updateProfile({salonId: sid},this.props.auth.uid).then(() => {
            return addAdminToSalon(sid, this.props.auth.uid)
        }).then(() => {
            return removeInvitations(sid, this.props.auth.uid)
        }).then(() => {
            this.props.dispatch(updateLoginState({salonId:sid}));
            Alert.alert('You have joined a join !')
            this.props.navigation.navigate('Salon')
        })
        .catch(e => Alert.alert(e.message))
    }

    render() {
        if (this.state.loading){
            return null
        }

        salonCards = this.state.invitations.map( (salon) => {
            let key = salon.sid;
            let onPressFunc = () => this.handleAcceptinvitation(key)
            return (
                <View key={`${key}Card`} style={styles.invitationCards}>
                    <Image style={styles.salonIcon} key={`${key}Icon`} source={{ uri: `data:image/gif;base64,${salon.salonIcon}` }}/>
                    <View style={{flexDirection: 'column'}}>
                        <Text style={styles.salonText}>{salon.salonName}</Text>
                        <Text style={styles.salonText}>{salon.contactEmail}</Text>
                    </View>
                    <TouchableOpacity key={`${key}Accept`} onPress={() => onPressFunc()} style={styles.acceptButton}>
                        <Ionicons name="ios-done-all" size={32} color="white" />
                    </TouchableOpacity>
                </View>
            )
        })
        return (
            <ScrollView style={styles.wrapper}>
                <Text style={styles.titleText}>Invitations</Text>
                {salonCards}
            </ScrollView>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(JoinSalon);

const styles = StyleSheet.create({  
    wrapper:{
        width:'100%',
        height:'100%',
        flexDirection: 'column',
        alignSelf: 'center'
    },
    titleText:{
        fontSize: 20,
        fontWeight: 'bold',
        color: "#EA6652"
    },
    invitationCards:{
        width: '100%',
        marginVertical: 5,
        padding: 7,
        flexDirection: 'row',
        shadowColor: 'rgba(0,0,0, .6)', // IOS
        shadowOffset: { height: 2, width: 2 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        backgroundColor: '#fff',
        elevation: 3, // Android
    },
    salonIcon:{
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 5
    },
    salonText:{
        fontSize: 18,
    },
    acceptButton:{
        right: 0,
        position: 'absolute',
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#EA6652",
    },
    acceptText:{
        color: 'white'
    }
});