import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity,ScrollView ,TextInput, Alert} from 'react-native';
import { Icon } from 'native-base';
import {connect} from 'react-redux'
import navOptions from '../../utils/drawerBarNavOptions'
import {getSalonById, getUsersByIds, inviteUserToSalon} from '../../utils/database';

class ManageMembers extends Component {

    static navigationOptions = navOptions

    state={
        loading: true,

    }

    componentDidMount(){
        this.loadSalonInfo()
    }

    loadSalonInfo(){
        // load all the required info of this page * can use for hot reload
        this.setState({loading: true})
        let userIdList = []
        getSalonById(this.props.auth.salonId).then((data) => {
            this.setState({salonInfo: data});
            this.setState({icon_source: { uri: `data:image/gif;base64,${data['salonIcon']}` }})
            userIdList = (data.adminList? data.adminList: [])
            userIdList = (data.invitationList? [...data.invitationList , ...userIdList]: userIdList)
            userIdList.push(data.owner)
            return getUsersByIds(userIdList)
        }).then( (dict) => {
            this.setState({memberInfo: dict});
            this.setState({loading: false});
        }).catch(e => {
            Alert.alert(e.message)
        })
    }

    render() {
        if (this.state.loading){
            return null
        }
        let adminList = []
        if (this.state.salonInfo.adminList){
            adminList = this.state.salonInfo.adminList.map( (uid) => {
                return(
                    <Text key={`${uid}adminText`}>{this.state['memberInfo'][uid].name}</Text>
                )
            })
        }
        let invitationList = []
        if (this.state.salonInfo.invitationList){
            invitationList = this.state.salonInfo.invitationList.map( (uid) => {
                return(
                    <Text key={`${uid}InvitationList`}>{this.state['memberInfo'][uid].name}</Text>
                )
            })
        }
        return (
            <View style={styles.wrapper}>
                <ScrollView style={styles.infoWrapper}>
                    <Text style={styles.titleText}>Manage Staffs in {this.state.salonInfo.salonName}</Text>
                    
                    <Text style={styles.titleText}>Owner: {this.state['memberInfo'][this.state.salonInfo.owner].name}</Text>
                    <Text style={styles.titleText}>Admins:</Text>
                    {adminList.length > 0 ? adminList : <Text>Poor company, no admin :(</Text>}
                    <Text style={styles.titleText}>Invited:</Text>
                    {invitationList.length > 0 ? invitationList : <Text>No invitations</Text>}
                </ScrollView>
                <View style={styles.bottomWrapper}>
                    <TextInput placeholder="Type in email to invite users" placeholderTextColor='#888888' onChangeText={(invitationEmail) => this.setState({invitationEmail}) } style={styles.textBox}/>
                    <TouchableOpacity onPress={()=>{this.handleInvite()}} style={styles.inviteButton}>
                        <Text style={styles.inviteButtonText}>Invite</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    handleInvite(){
        if(this.state.invitationEmail && this.state.invitationEmail != ""){
            inviteUserToSalon(this.state.invitationEmail, this.props.auth.salonId).then( () => {
                Alert.alert('invite sucessfully')
                this.loadSalonInfo()
            })
            .catch( (e) => {
                Alert.alert(e.message)
            })
        }else{
            Alert.alert("Fill in the email before invite")
        }
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(ManageMembers);

const styles = StyleSheet.create({  
    wrapper:{
        width:'90%',
        height:'100%',
        flexDirection: 'column',
        alignSelf: 'center'
    },
    infoWrapper:{
        flex: 11
    },
    titleText:{
        fontSize: 20,
        fontWeight: 'bold',
        color: "#EA6652"
    },
    bottomWrapper:{
        bottom: 0,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginVertical: 5
    },
    textBox:{
        flex: 8,
        height: 40,
        fontSize:16,
        color: '#888888',
        borderBottomWidth: 2,
        borderBottomColor: '#ACACAC'
    },
    inviteButton:{
        height: 40,
        flex: 3,
        marginLeft: 5,
        backgroundColor: "#EA6652",
        justifyContent:'center',
        alignItems: 'center'
    },
    inviteButtonText:{
        color: 'white',
        fontSize: 20
    }
});