import React, {Component} from 'react'
import {StyleSheet, Text, View ,Button, Image,TextInput} from 'react-native'
import {connect} from 'react-redux'
import navOptions from '../../utils/drawerBarNavOptions'
import {getNewsFeed} from '../../utils/database'
import {HairstyleCard} from '../../components/hairstyleCard'
import { FontAwesome } from '@expo/vector-icons';
import {Icon} from 'native-base';


class Splash extends Component{
    static navigationOptions = navOptions

    state={
        loading: true
    }
    componentDidMount(){
        rightIcon = <FontAwesome name="refresh" style={{margin: 5, right: 5}} size={20} onPress={ () => this.loadData()}/>
        this.props.navigation.setParams({rightIcon: rightIcon});
        this.loadData()
    }

    loadData(){
        console.log('load Data')
        this.setState({loading:true})
        getNewsFeed().then(data => {
            this.newsFeedData = data;
            this.setState({loading:false})
            console.log(Object.keys(data.latestHairstyle[0]))
        })
    }

    navigationFuction(hairstyleWork){
        console.log(Object.keys(hairstyleWork))
        this.props.navigation.navigate('HairstyleWork', {
            hairstyleWork
        });
    }

    render(){
        if(this.state.loading){
            return null;
        }
        
        let latestHairstyleCards = []
        for(let i = 0 ; i< this.newsFeedData.latestHairstyle.length ; i++){
            latestHairstyleCards.push(<HairstyleCard hairstyleWork={this.newsFeedData.latestHairstyle[i]} key ={`latestHairstyle${i}`} onPress={ this.navigationFuction.bind(this)}/>)
        }
        let mostLikedHairstyleCards = []
        for(let i = 0 ; i< this.newsFeedData.mostLikedHairstyle.length ; i++){
            mostLikedHairstyleCards.push(<HairstyleCard hairstyleWork={this.newsFeedData.mostLikedHairstyle[i]} key ={`mostLikedHairstyle${i}`} onPress={ this.navigationFuction.bind(this)}/>)
        }
        

        return(
            <View style={styles.container}>
                <Text style={styles.subtitle}>Recent Hairstyle</Text>
                <View style={{flexDirection: 'row'}}>
                    {latestHairstyleCards}
                </View>
                <Text style={styles.subtitle}>Most Liked Hairstyles</Text>
                <View style={{flexDirection: 'row'}}>
                    {mostLikedHairstyleCards}
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({  
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        alignSelf: 'center',
        height:'100%',
        width: '90%',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    title:{
        fontWeight: 'bold',
        fontSize: 20
    },
    subtitle:{
        fontSize: 18
    }
})

const mapStateToProps = state => ({
    auth: state.auth
  })

export default connect(mapStateToProps)(Splash);