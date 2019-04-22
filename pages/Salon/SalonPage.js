import React, {Component} from 'react'
import {StyleSheet, Text, View , Image , TouchableOpacity, Alert, Button} from 'react-native'
import {connect} from 'react-redux'
import { ImagePicker, Permissions, ImageManipulator } from 'expo';
import {Icon} from 'native-base';
import {getSalonById, getWorksBySalonId, updateSalonProfile} from '../../utils/database';
import navOptions from '../../utils/drawerBarNavOptions';
import { FontAwesome } from '@expo/vector-icons';

class SalonPage extends Component{
    state={
        loading: true,
        update_profile: {
            // store what needs to be updated
        }
    }
    
    static navigationOptions = navOptions

    componentDidMount(){
        rightIcon = <Icon name="save" onPress={() => this.handleUpdateSalonProfile()} />
        // pass the right icon the nav then our navbar would have the icon !
        this.props.navigation.setParams({ rightIcon: rightIcon });
        this.loadSalonInfo()
        this.getCameraRollPermission()
    }

    loadSalonInfo(){
        // load all the required info of this page * can use for hot reload
        this.setState({loading: true})
        getSalonById(this.props.auth.salonId).then((data) => {
            this.setState({salonInfo: data});
            this.setState({icon_source: { uri: `data:image/gif;base64,${data['salonIcon']}` }})
            return getWorksBySalonId(this.props.auth.salonId)
        }).then((data) => {
            this.setState({portfolio: data})
            this.setState({loading: false})
        }).catch(e => {
            Alert.alert(e.message)
        })
    }

    render(){
        if(this.state.loading){
            return null
        }
        if (this.state.loading || !this.props.auth) {
            return null
        }
        let portfolioCards = this.state.portfolio.map((work) => {
            let key = work.hairstyleWorkId;
            return (
                <TouchableOpacity onPress={() => { }} style={styles.card} key={`${key}button`}>
                    <TouchableOpacity onPress={() => { }} style={styles.removeImageButton}>
                        <FontAwesome name={'remove'} style={{ color: 'white' }} />
                    </TouchableOpacity>
                    <Image source={{ uri: `data:image/gif;base64,${work['hairstyleWorkImage']}` }} style={styles.cardsImage} key={`${key}OwnerImg`} />
                </TouchableOpacity>
            )
        })
        return (
            <View style={styles.container}>
                <View style={{ ...styles.halfWrapper }}>
                    <View style={{ flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', flex: 1 }}>
                        <View />
                        <TouchableOpacity onPress={() => this._pickImage()}>
                            <Image source={this.state.icon_source} style={styles.icon} />
                        </TouchableOpacity>
                        <Text style={styles.name}>{this.state.salonInfo.salonName}</Text>
                        <Text>{this.state.salonInfo.contactEmail}</Text>
                        <Text>{this.state.salonInfo.description}</Text>
                        <View />
                    </View>
                    {/* status bar */}
                    <View style={styles.statusWrapper}>
                        <View style={styles.statusGrid}>
                            <Text style={styles.statusNumber}>236</Text>
                            <Text>Likes</Text>
                        </View>
                        <View style={{ flexDirection: 'row', flex: 4 }}>
                            <View style={styles.verticalSeparationLine} />
                            <View style={styles.statusGrid}>
                                <Text style={styles.statusNumber}>236</Text>
                                <Text>Gallery</Text>
                            </View>
                            <View style={styles.verticalSeparationLine} />
                        </View>
                        <View style={styles.statusGrid}>
                            <Text style={styles.statusNumber}>23.6</Text>
                            <Text>Ratings</Text>
                        </View>
                    </View>
                </View>
                {/* End of status bar */}
                <View style={styles.portfolioWrapper}>
                    {portfolioCards}
                </View>
            </View>
        )
    }

    handleUpdateSalonProfile = () => {
        if (Object.keys(this.state.update_profile).length > 0) {
            updateSalonProfile(this.state.update_profile, this.props.auth.salonId).then(() => {
                // hot reload
                this.loadSalonInfo()
                Alert.alert('update profile sucessfully')
            }).catch((e) => Alert.alert(e.message))
        } else {
            Alert.alert('please make changes before update your profile')
        }
    }

    getCameraRollPermission = async () => {
        // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
        // run this in componentWillMount in all pages which requires to read image 
        const { status, permissions } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === 'granted') {
            return;
        } else {
            throw new Error('Camera Roll permission not granted');
        }
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [3, 3],
        });
        // resize image to 100 * 100

        if (!result.cancelled) {
            result = await ImageManipulator.manipulateAsync(result.uri, [{ resize: { height: 200, width: 200 } }], { format: 'png', base64: true });
            this.state.update_profile.salonIcon = result.base64
            this.setState({ icon_source: { uri: result.uri } });
        }
    }
}

const styles = StyleSheet.create({  
    container: {
        backgroundColor: 'transparent',
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center'
    },
    halfWrapper: {
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex:6
    },
    icon: {
        height: 100, 
        width: 100, 
        borderRadius: 50,
        borderWidth: 2,
        borderColor:"#EA6652"
    },
    name:{
        fontSize: 20,
        fontWeight: 'bold',
    },
    statusWrapper:{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#cccccc'
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
    statusNumber:{
        fontSize: 20
    },
    portfolioWrapper:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        flex:6

    },
    card: {
        flexBasis: '33%',
        aspectRatio:1,
        padding: 15
    },
    cardsImage:{
        width:'100%',
        height:'100%'
    },
    removeImageButton:{
        width: 20,
        height:20,
        borderRadius:10,
        backgroundColor: "#EA6652",
        position:'absolute',
        zIndex:1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    }
})

const mapStateToProps = state => ({
    auth: state.auth
  })

export default connect(mapStateToProps)(SalonPage);