import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image ,Alert} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import navOptions from '../../utils/drawerBarNavOptions'
import {getSalonById} from '../../utils/database'

class HairstyleWork extends Component {

    static navigationOptions = ({navigation}) => {
        let headerTintColor = "#EA6652";
        let headerStyle = {borderBottomColor:'transparent',borderBottomWidth: 0 ,elevation:0}
        return {headerTintColor, headerStyle}
    }
    state={
        loading:true
    }
    componentWillMount(){
        this.hairstyleWork = this.props.navigation.getParam('hairstyleWork');
        getSalonById(this.hairstyleWork.salonId).then((data) => {
            this.salonInfo = data
            this.setState({loading:false})
        }).catch(e => Alert.alert(e.message))
    }

    navigateToSalon(){
        this.props.navigation.navigate('ViewSalonProfile', {
            salonId: this.hairstyleWork.salonId
        })
    }
    
    navigateToUserProfile(){
        this.props.navigation.navigate('ViewProfile', {
            userId: this.hairstyleWork.ownerId
        })
    }

    render() {
        if(this.state.loading){
            return null;
        }

        demo_comment= [{'username':'Alex', 'comment': 'it Looks great', 'commentId' : 'demo1'}, {'username':'Alex2', 'comment': 'it does not Looks great', 'commentId' : 'demo2'}]
        let comments = demo_comment.map( (commentObj) => {
            // make comments into JSX
            return (
                <View key={`${commentObj['commentId']}CommentWrapper`} style={styles.commentWrapper}>
                    <Text key={`${commentObj['commentId']}CommentUsername`} style={styles.commentUsername}>{commentObj['username']}</Text>
                    <Text key={`${commentObj['commentId']}CommentContent`} style={styles.comment}>{commentObj['comment']}</Text>
                </View>
            )
        })
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
                    <Text>{this.hairstyleWork['description']}</Text>
                    <Ionicons name="ios-heart-empty" size={30} style={styles.likeIcon} />
                    <View style={styles.separationLine}/>
                    {comments}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        flex: 1,
        alignItems: 'center',
        width: '100%',
        alignSelf: 'center'
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
        height:'100%',
        paddingVertical: 10
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
        flex: 9
    },
    commentWrapper:{
        flexDirection:'row'
    }
})
export default HairstyleWork;