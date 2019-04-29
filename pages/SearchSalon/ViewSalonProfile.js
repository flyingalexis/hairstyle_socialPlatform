import React, {Component} from 'react'
import {StyleSheet, Text, View , Image , TouchableOpacity, Alert, Button} from 'react-native'
import {connect} from 'react-redux'
import { ImagePicker, Permissions, ImageManipulator } from 'expo';
import {Icon} from 'native-base';
import {likeASalon, getSalonById, getWorksBySalonId, updateSalonProfile, rateASalon, loadRatingAndLikesOnSalon} from '../../utils/database';
import navOptions from '../../utils/drawerBarNavOptions';
import { FontAwesome , AntDesign} from '@expo/vector-icons';

class ViewSalonPage extends Component{
    // this page is for other user to view your salon
    state={
        loading: true,
    }
    
    static navigationOptions = ({navigation}) => {
        let headerTintColor = "#EA6652";
        let headerStyle = {borderBottomColor:'transparent',borderBottomWidth: 0 ,elevation:0}
        return {headerTintColor, headerStyle}
    }

    componentDidMount(){
        rightIcon = <Icon name="save" onPress={() => this.handleUpdateSalonProfile()} />
        // pass the right icon the nav then our navbar would have the icon !
        this.props.navigation.setParams({ rightIcon: rightIcon });
        this.salonId = this.props.navigation.getParam('salonId');
        this.loadSalonInfo()
    }

    loadSalonInfo(){
        // load all the required info of this page * can use for hot reload
        this.setState({loading: true})
        getSalonById(this.salonId).then((data) => {
            this.setState({salonInfo: data});
            this.setState({icon_source: { uri: `data:image/gif;base64,${data['salonIcon']}` }})
            this.setState({rating: data.rating});
            this.setState({likes: data.likes});
            return getWorksBySalonId(this.salonId)
        }).then((data) => {
            this.setState({portfolio: data})
            if(this.props.auth){
                return loadRatingAndLikesOnSalon(this.props.auth.uid, this.salonId);
            }else{
                return {selfLike:false,selfRate:0}
            }
        }).then((data) => {
            this.setState({selfRate: data['selfRate']})
            this.setState({selfLike: data['selfLike']})
            this.setState({loading: false})
        }).catch(e => {
            Alert.alert(e.message)
        })
    }

    handleRatingActive(){
        if(!this.props.auth){
            Alert.alert('please login to proceed')
            return
        }
        activeRating = !this.state.activeRating
        this.setState({activeRating})
    }

    handleLikesActive(){
        if(!this.props.auth){
            Alert.alert('please login to proceed')
            return
        }
        activeLikes = !this.state.activeLikes
        this.setState({activeLikes})
    }

    handleRateSalon(rate){
        rateASalon(this.salonId, rate, this.props.auth.uid).then((rating)=>{
            Alert.alert('rated a user sucessfully')
            this.setState({selfRate: rate})
            this.setState({rating: rating})
        })
    }

    handleLikeSalon(like){
        likeASalon(this.salonId, like, this.props.auth.uid).then((likes)=>{
            Alert.alert('liked a user sucessfully')
            this.setState({selfLike: like})
            this.setState({likes: likes})
        }).catch(e => Alert.alert(e.message))
    }

    render(){
        if(this.state.loading){
            return null
        }
        let portfolioCards = this.state.portfolio.map((work) => {
            let key = work.hairstyleWorkId;
            return (
                <TouchableOpacity onPress={() => { }} style={styles.card} key={`${key}button`}>
                    <Image source={{ uri: `data:image/gif;base64,${work['hairstyleWorkImage']}` }} style={styles.cardsImage} key={`${key}OwnerImg`} />
                </TouchableOpacity>
            )
        })

        let inactiveRatingGrid = (
            <TouchableOpacity style={styles.statusGrid} onPress={() => {this.handleRatingActive()}}>
                <Text style={styles.statusNumber}>{this.state.rating}</Text>
                <Text>Ratings</Text>
                <Text style={{fontSize:10, left:'50%', position: 'absolute', bottom: 0}}>Press to rate</Text>
            </TouchableOpacity>
        )

        let ratingIcons = [];
        for(i = 1 ; i < 6 ; i ++){
            let likeRef = i;
            ratingIcons.push(<FontAwesome key={`${i}rate`} name={(this.state.selfRate >= likeRef ?'star':'star-o')} style={{ color: 'black' }} onPress={() => this.handleRateSalon(likeRef)}/>)
        }

        let activeRatingGrid = (
            <TouchableOpacity style={styles.statusGrid} onPress={() => {this.handleRatingActive()}}>
                <View style={{flexDirection: 'row'}}>{ratingIcons}</View>
            </TouchableOpacity>
        )

        let inactiveLikesGrid = (
            <TouchableOpacity style={styles.statusGrid} onPress={() => {this.handleLikesActive()}}>
                <Text style={styles.statusNumber}>{this.state.likes}</Text>
                <Text>Likes</Text>
                <Text style={{fontSize:10, left:'50%', position: 'absolute', bottom: 0}}>Press to like</Text>
            </TouchableOpacity>
        )

        let activeLikesGrid = (
            <TouchableOpacity style={styles.statusGrid} onPress={() => {this.handleLikesActive()}}>
                <View style={{flexDirection: 'row'}}>
                    <AntDesign name={this.state.selfLike ? "like1": 'like2'} onPress={ () => this.handleLikeSalon(!this.state.selfLike)}/>
                </View>
            </TouchableOpacity>
        )
        
        return (
            <View style={styles.container}>
                <View style={{ ...styles.halfWrapper }}>
                    <View style={{ flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', flex: 1 }}>
                        <View />
                        <Image source={this.state.icon_source} style={styles.icon} />
                        <Text style={styles.name}>{this.state.salonInfo.salonName}</Text>
                        <Text>{this.state.salonInfo.contactEmail}</Text>
                        <Text>{this.state.salonInfo.description}</Text>
                        <View />
                    </View>
                    {/* status bar */}
                    <View style={styles.statusWrapper}>
                        {this.state.activeLikes? activeLikesGrid: inactiveLikesGrid}
                        <View style={{ flexDirection: 'row', flex: 4 }}>
                            <View style={styles.verticalSeparationLine} />
                            <View style={styles.statusGrid}>
                                <Text style={styles.statusNumber}>{this.state.portfolio.length}</Text>
                                <Text>Gallery</Text>
                            </View>
                            <View style={styles.verticalSeparationLine} />
                        </View>
                        {this.state.activeRating? activeRatingGrid: inactiveRatingGrid}
                    </View>
                </View>
                {/* End of status bar */}
                <View style={styles.portfolioWrapper}>
                    {portfolioCards}
                </View>
            </View>
        )
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
    }
})

const mapStateToProps = state => ({
    auth: state.auth
  })

export default connect(mapStateToProps)(ViewSalonPage);