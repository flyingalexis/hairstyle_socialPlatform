import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image ,Alert, TextInput, ListView} from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import navOptions from '../../utils/drawerBarNavOptions'
import {getSalonById, likeAHairstyleWork, loadLikesOnHairstyleWork, commentOnHairstyleWork,getCommentsOnHairstyleWork, getUserById} from '../../utils/database'
import {connect} from 'react-redux'

class HairstyleWork extends Component {

    static navigationOptions = ({navigation}) => {
        let headerTintColor = "#EA6652";
        let headerStyle = {borderBottomColor:'transparent',borderBottomWidth: 0 ,elevation:0}
        return {headerTintColor, headerStyle}
    }

    constructor() {
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            comments : [],
            loading:true,
            lastCommentRef: null,
            dataSource: ds.cloneWithRows([])
        }
    }

    componentWillMount(){
        this.hairstyleWork = this.props.navigation.getParam('hairstyleWork');
        getSalonById(this.hairstyleWork.salonId).then((data) => {
            this.salonInfo = data
            if(!this.props.auth){
                return false
            }
            return loadLikesOnHairstyleWork(this.props.auth.uid, this.hairstyleWork.hairstyleWorkId)
        }).then((liked) => {
            this.setState({liked})
            return this.loadComments()
        }).then( () => {
            this.setState({loading:false})
        })
        .catch(e => Alert.alert(e.message))

        if (! this.hairstyleWork['ownerIcon']){
            // load owner Icon if we dont have
            
            console.log('loading icon')
            getUserById(this.hairstyleWork.ownerId).then((res)=>{
                this.hairstyleWork['ownerIcon'] = res.image
            })
        }
    }

    navigateToSalon(){
        const banBrowse = this.props.navigation.getParam('banBrowse')
        if(banBrowse){
            Alert.alert('not allow further browse from profile')
            return
        }
        this.props.navigation.navigate('ViewSalonProfile', {
            salonId: this.hairstyleWork.salonId
        })
    }
    
    navigateToUserProfile(){
        const banBrowse = this.props.navigation.getParam('banBrowse')
        if(banBrowse){
            Alert.alert('not allow further browse from profile')
            return
        }
        this.props.navigation.navigate('ViewProfile', {
            userId: this.hairstyleWork.ownerId
        })
    }

    handleLike(){
        if(!this.props.auth){
            Alert.alert('please Login to proceed')
            return
        }
        console.log('like some artwork like a boss')
        likeAHairstyleWork(this.props.auth.uid, this.hairstyleWork.hairstyleWorkId, !this.state.liked).then(() => {
            this.setState({liked: !this.state.liked})
        }).catch(e => Alert.alert(e.message))
    }

    async loadComments(){
        // for scroll loading
        let res = await getCommentsOnHairstyleWork(this.hairstyleWork.hairstyleWorkId,this.state.lastCommentRef)
        if(res.endOfPage){
            this.setState({lastCommentRef: res.endOfPage})
        }
        let newComments = [...this.state.comments, ... res.comments]
        let newDataSource = this.state.dataSource.cloneWithRows(newComments)
        this.setState({comments: newComments, dataSource: newDataSource})
    }

    async hardRefreshComments(){
        console.log('hard refresh')
        let res = await getCommentsOnHairstyleWork(this.hairstyleWork.hairstyleWorkId,null)
        let newComments = res.comments
        let newDataSource = this.state.dataSource.cloneWithRows(newComments)
        this.setState({comments: newComments,lastCommentRef: res.endOfPage,dataSource: newDataSource})
    }

    handleComment(){
        if(!this.props.auth){
            Alert.alert('please Login to proceed')
            return
        }
        if(!this.state.comment || this.state.comment == ""){
            Alert.alert('please type comments ')
            return
        }
        commentOnHairstyleWork(this.props.auth.uid,this.props.auth.name,this.hairstyleWork.hairstyleWorkId,this.state.comment).then( () => {
            Alert.alert('commented successfully')
            return this.hardRefreshComments()
        }).catch(e => Alert.alert(e.message))
    }
    render() {
        if(this.state.loading){
            return null;
        }

        // demo_comment= [{'username':'Alex', 'comment': 'it Looks great', 'commentId' : 'demo1'}, {'username':'Alex2', 'comment': 'it does not Looks great', 'commentId' : 'demo2'}]
        // let comments = demo_comment.map( (commentObj) => {
        //     // make comments into JSX
        //     return (
        //         <View key={`${commentObj['commentId']}CommentWrapper`} style={styles.commentWrapper}>
        //             <Text key={`${commentObj['commentId']}CommentUsername`} style={styles.commentUsername}>{commentObj['username']}</Text>
        //             <Text key={`${commentObj['commentId']}CommentContent`} style={styles.comment}>{commentObj['comment']}</Text>
        //         </View>
        //     )
        // })
        let Comment =  (props) => { 
            return (
                <View style={styles.commentWrapper}>
                    <Text style={styles.commentUsername}>{props['username']}</Text>
                    <Text style={styles.comment}>{props['comment']}</Text>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <Image source={{ uri: `data:image/gif;base64,${this.hairstyleWork['hairstyleWorkImage']}` }} style={styles.hairstyleWork} />
                <View style={styles.responsePanel}>
                    <TouchableOpacity style={styles.ownerWrapper} onPress={() => this.navigateToUserProfile()}>
                        <Image source={{ uri: `data:image/gif;base64,${this.hairstyleWork['ownerIcon']}` }} style={styles.ownerIcon}/>
                        <Text>{this.hairstyleWork['ownerName']}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.salonWrapper} onPress={() => this.navigateToSalon()}>
                        <Image source={{ uri: `data:image/gif;base64,${this.salonInfo['salonIcon']}` }} style={styles.ownerIcon}/>
                        <Text>{this.salonInfo['salonName']}</Text>
                    </TouchableOpacity>
                    <View style={styles.likeDescription}>
                        <AntDesign name={this.state.liked ? "like1": 'like2'} size ={30} style={{marginRight: 5}}onPress={ () => this.handleLike()}/>
                        <Text>{this.hairstyleWork['description']}</Text>
                    </View>
                    <View style={styles.separationLine}/>
                    {/* {comments} */}
                    <View style={styles.commentsWrapper}>
                        <FontAwesome name="refresh" style={styles.refreshIcon} size={30} onPress={ () =>this.hardRefreshComments()}/>
                        <ListView dataSource={this.state.dataSource} enableEmptySections={true} onEndReached={ async () =>{
                            console.log('reach the end ?')
                            await this.loadComments()}} 
                        renderRow={(rowData) => <Comment username={rowData.username} comment={rowData.comment}/>}/>
                    </View>
                </View>
                <View style={styles.bottomWrapper}>
                    <TextInput placeholder="Type in your comments" placeholderTextColor='#888888' onChangeText={(comment) => this.setState({comment}) } style={styles.textBox}/>
                    <TouchableOpacity onPress={async ()=> await this.handleComment()} style={styles.inviteButton}>
                        <Text style={styles.inviteButtonText}>Comment</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        width: '100%',
        alignSelf: 'center',
        flex: 1
    }, 
    hairstyleWork: {
        width: '100%', 
        aspectRatio: 1,
        // borderWidth: 2,
        // borderColor:"#EA6652",
        resizeMode:'stretch'
    },
    responsePanel:{
        width:'90%',
        paddingVertical: 10,
        flex: 1
    },
    ownerIcon:{
        width: 30,
        height: 30,
        borderRadius: 15
    },
    ownerWrapper:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    salonWrapper:{
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        right:0
    },
    likeIcon:{
        marginBottom: 5
    },
    separationLine:{
        backgroundColor: '#cccccc',
        width: '100%',
        height: 1
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
    commentsWrapper:{
        flexDirection: 'column',
        flex: 1,
        paddingVertical: 5
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
    refreshIcon:{
        position:'absolute',
        right: 0,
        top:0,
        fontSize: 20,
        paddingTop: 10
    },
    likeDescription:{
        flexDirection: 'row',
        paddingVertical:5,
        alignItems: 'center'
    }
})

const mapStateToProps = state => ({
    auth: state.auth
})

const mapDispatchToProps = dispatch => ({
    updateLoginState: auth => dispatch(storeLoginState(auth))
})

export default connect(mapStateToProps, mapDispatchToProps)(HairstyleWork)