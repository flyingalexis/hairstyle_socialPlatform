import React, {Component} from 'react'
import {StyleSheet, Text, View , Image , TouchableOpacity, Alert, Button, ScrollView, TextInput} from 'react-native'
import {connect} from 'react-redux'
import { ImagePicker, Permissions, ImageManipulator } from 'expo';
import {Icon} from 'native-base';
import {updateProfile, getWorksByuserId,removeHairstyleWork, commentOnUser, getCommentsOnUser} from '../../utils/database'
import {updateLoginState} from '../../store/auth/actions'
import navOptions from '../../utils/drawerBarNavOptions'
import { FontAwesome } from '@expo/vector-icons';

class Profile extends Component{
    constructor(){
        super()
    }
    
    static navigationOptions = navOptions

    state={
        portfolio:[],
        loading: true,
        icon_source : require('../../assets/demo.jpeg') ,
        update_profile: {
            // store what needs to be updated
        },
        comments: []
    }

    async componentWillMount(){
        await this.getCameraRollPermission().catch(e => Alert.alert(e.message))
        this.setState({ icon_source: (this.props.auth.image ? {uri: `data:image/gif;base64,${this.props.auth.image}`}:require('../../assets/demo.jpeg')) });
        if (this.props.auth == null){
            this.props.navigation.navigate('Login');
        }
    
    }

    componentDidMount() {
        rightIcon = <Icon name="save" style={{marginRight: 5}} onPress={ () => this.updateProfile()}/>
        // pass the right icon the nav then our navbar would have the icon !
        this.props.navigation.setParams({rightIcon: rightIcon});
        this.loadData()
    }

    loadData (){
        this.setState({loading: true})
        getWorksByuserId(this.props.auth.uid).then(data => {
            this.setState({portfolio: data})
            this.setState({loading: false})
            // loading state
            return getCommentsOnUser(this.props.auth.uid)
        }).then((data) => {
            this.setState({comments: data})
            this.setState({loading: false})
        }).catch(e => {
            Alert.alert(e.message)
        })
    }

    removeHairstyleWork(workId){
        console.log('remove hairstyle work')
        removeHairstyleWork(workId).then( () => {
            Alert.alert('removed hairstyle work successfully')
            return this.loadData()
        }).catch( e => {
            Alert.alert(e.message)
        })
    }

    handleComment(){
        commentOnUser(this.props.auth.uid, this.props.auth.name, this.props.auth.uid, this.state.yourComment).then(() =>{
            Alert.alert('commented on a user sucessfully')
            this.loadData()
        })
    }

    render(){
        if(this.state.loading || !this.props.auth){
            return null
        }
        let portfolioCards = this.state.portfolio.map((work) => {
            let key = work.hairstyleWorkId;
            return (
                <View style={styles.card} key={`${key}`}>
                    <TouchableOpacity onPress={() => {this.removeHairstyleWork(key)}} style={styles.removeImageButton}>
                        <FontAwesome name={'remove'} style={{color: 'white'}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> {this.props.navigation.navigate('HairstyleWork', {hairstyleWork:work, banBrowse: true})}} key={`${key}Button`}>
                    <Image source={{ uri: `data:image/gif;base64,${work['hairstyleWorkImage']}` }} style={styles.cardsImage} key={`${key}OwnerImg`} />
                    </TouchableOpacity>
                </View>
            )
        })
        let noSalonComponent = (
        <View style={{...styles.halfWrapper, justifyContent: "center"}}>
            <Text style={styles.RegisterSalonLabel}> You have not register your hairsalon yet </Text>
            <TouchableOpacity style={styles.salonLabelBackground} onPress={ () => this.props.navigation.navigate('CreateSalon')}>
                <Text style={styles.salonLabel}>Register Your Hair salon</Text>
            </TouchableOpacity>
        </View>
        )
        let hasSalonComponent = (
            <View style={{flex: 6, width: '100%'}}>
                <ScrollView style={{flex: 1, width: '100%'}}>
                    <View style={styles.portfolioWrapper}>
                        {portfolioCards}
                    </View>
                </ScrollView>
            </View>
        )
        
        let galleryGrid = (
            <View style={{flexDirection:'row', flex: 4}}>
                <View style={styles.verticalSeparationLine}/>
                <TouchableOpacity style={styles.statusGrid} onPress={() => {this.setState({comment: true})}}>
                    <Text style={styles.statusNumber}>{this.state.portfolio.length}</Text>
                    <Text>Gallery</Text>
                    <Text style={{fontSize:10, left:5, position: 'absolute', bottom: 0}}>View comments</Text>
                </TouchableOpacity>
                <View style={styles.verticalSeparationLine}/>
            </View>
        )

        let commentGrid = (
            <View style={{flexDirection:'row', flex: 4}}>
                <View style={styles.verticalSeparationLine}/>
                <TouchableOpacity style={styles.statusGrid} onPress={() => {this.setState({comment: false})}}>
                    <Text style={styles.statusNumber}>{this.state.comments.length}</Text>
                    <Text>Comment</Text>
                    <Text style={{fontSize:10, left:5, position: 'absolute', bottom: 0}}>view gallery</Text>
                </TouchableOpacity>
                <View style={styles.verticalSeparationLine}/>
            </View>
        )
        
        let commentsComponents = [];
        this.state.comments.map(comment => {
            let key = comment.index
            commentsComponents.push(
                <View key={`commentWrapper${key}`} style={styles.commentWrapper}>
                    <Text key={`commentowner${key}`} style={styles.commentUsername}>{comment.username}</Text>
                    <Text key={`comment${key}`} style={styles.comment}>{comment.comment}</Text>
                </View>
            )
        })

        let commentList  = (
            <View style={{flex: 6, width: '100%', justifyContent:'center', alignItems: 'center'}}>
                <ScrollView style={{flex: 1, width: '90%', marginTop: 10}}>
                    {commentsComponents}
                </ScrollView>
                <View style={styles.commentBarWrapper}>
                    <TextInput placeholder="Type in your comments" placeholderTextColor='#888888' onChangeText={(yourComment) => this.setState({yourComment}) } style={styles.textBox}/>
                    <TouchableOpacity onPress={async ()=> await this.handleComment()} style={styles.inviteButton}>
                        <Text style={styles.inviteButtonText}>Comment</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )

        let portfolioCardList = (
            <View style={{flex: 6, width: '100%'}}>
                <ScrollView style={{flex: 1, width: '100%'}}>
                    <View style={styles.portfolioWrapper}>
                        {portfolioCards}
                    </View>
                </ScrollView>
            </View>
        )

        return(
                <View style={styles.container}>
                    <View style ={{...styles.halfWrapper}}>
                    <FontAwesome name="refresh" style={{position:'absolute', margin: 5, right: 0}} size={28} onPress={ () =>this.loadData()}/>
                        <View style={{flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', flex: 1}}>
                            <View/>
                            <TouchableOpacity onPress={ () => this._pickImage()}>
                                <Image source={this.state.icon_source} style={styles.icon}/>
                            </TouchableOpacity>
                            <Text style={styles.name}>{this.props.auth.name}</Text>
                            <Text>{this.props.auth.email}</Text>
                            <View/>
                        </View>
                        {/* status bar */}
                        <View style={styles.statusWrapper}>
                            <View style={styles.statusGrid}>
                                <Text style={styles.statusNumber}>{this.props.auth.likes?this.props.auth.likes:0}</Text>
                                <Text>Likes</Text>
                            </View>
                            {this.state.comment? commentGrid: galleryGrid }
                            <View style={styles.statusGrid}>
                                <Text style={styles.statusNumber}>{this.props.auth.ratings?this.props.auth.ratings:'-'}</Text>
                                <Text>Ratings</Text>
                            </View>
                        </View>
                    </View>
                    {/* End of status bar */}
                    {/* {this.props.auth.salonId ? hasSalonComponent: noSalonComponent} */}
                    {this.state.comment ? commentList : this.props.auth.salonId ? hasSalonComponent: noSalonComponent }
                </View>
                )
    }

    updateProfile = () => {
        if(Object.keys(this.state.update_profile).length > 0){
            updateProfile(this.state.update_profile, this.props.auth.uid).then( () => {
                this.props.dispatch(updateLoginState(this.state.update_profile));
                Alert.alert('update profile sucessfully')
            }).catch((e) => Alert.alert(e.message))
        }else{
            Alert.alert('please make changes before update your profile')
        }
    }
    getCameraRollPermission = async() => {
        // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
        // run this in componentWillMount in all pages which requires to read image 
        const { status, permissions } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === 'granted') {
          return ;
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
            result = await ImageManipulator.manipulateAsync(result.uri, [{resize:{height: 200, width: 200}}], { format: 'png' , base64: true});
            this.state.update_profile.image = result.base64
            this.setState({ icon_source: {uri : result.uri} });
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
        fontSize: 20
    },
    RegisterSalonLabel:{
        color: '#888888',
        fontSize: 20,
        marginVertical: 12
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
    },
    commentBarWrapper:{
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
        borderBottomColor: '#ACACAC',
        backgroundColor: "#ffffff",
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
    },
    commentUsername: {
        fontWeight:'bold',
        flex: 3
    },
    comment: {
        flex: 9,
        marginLeft: 5
    },
    commentWrapper:{
        flexDirection:'row'
    },
})

const mapStateToProps = state => ({
    auth: state.auth
  })

export default connect(mapStateToProps)(Profile);