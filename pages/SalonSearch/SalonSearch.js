import React, { Component } from 'react';
import { View, Text, TouchableOpacity ,StyleSheet, ListView, Alert} from 'react-native';
import {searchSalonByName} from '../../utils/database'
import { Icon } from 'native-base';
import navOptions from '../../utils/drawerBarNavOptions'
import SalonSearchBar from '../../components/hairSalonSearchBar'
import {SalonCard} from '../../components/salonCard'


class SalonSearch extends Component {

    static navigationOptions = ({navigation}) => {
        let headerTintColor = "#EA6652";
        let headerStyle = {borderBottomColor:'transparent',borderBottomWidth: 0 ,elevation:0}
        return {headerTintColor, headerStyle}
    }
   
    constructor() {
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            salons: [],
            dataSource: ds.cloneWithRows([]),
            endOfPage: null,
            searching: false
        };
    }

    searchSalon(price = null , location = null , salonname = null){
        console.log('on search');
        searchSalonByName(price, location, salonname).then((res) => {
            let newSalon = [...res.salons];
            let newDataSource = this.state.dataSource.cloneWithRows(newSalon);
            this.setState({price, location, salonname});
            this.setState({salons: newSalon, dataSource: newDataSource, searching: true, endOfPage: res.endOfPage});
        });
    }

    navigationFuction(salon){
        this.props.navigation.navigate('ViewSalonProfile', {
            salonId: salon.salonId
        });
    }

    getNewPage(){
        if (this.state.searching === false || this.state.endOfPage == null){
            // reach the end or not searching
            console.log('reached the end');
            return;
        }
        console.log('hot refresh');
        searchSalonByName(this.state.price,this.state.location,this.state.salonname,this.state.endOfPage).then((res) => {
            let salon = [...this.state.salons, ...res.salons];
            let newDataSource = this.state.dataSource.cloneWithRows(salon);
            this.setState({salons: salon, dataSource: newDataSource, searching: true, endOfPage: res.endOfPage});
        }).catch(e => Alert.alert(e.message));
    }

    render() {
        return (
                <View style={styles.container}>
                    <SalonSearchBar onSearch={this.searchSalon.bind(this)} />
                    {this.state.searching && <ListView dataSource={this.state.dataSource} enableEmptySections={true}
                    onScrollEndDrag={ () => {this.getNewPage()}} 
                    renderRow={(rowData) => <SalonCard salon={rowData} onPress={ this.navigationFuction.bind(this)}/>}
                    contentContainerStyle= {styles.Wrapper}/>}
                </View>

                

        );
    }
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        alignSelf:'center',
        
        height: '100%'
    },
    button:{
        width: '100%',
        backgroundColor: "#EA6652",
        alignItems: 'center',
        justifyContent: 'center',
        height:50,
        marginVertical: 10
    },
    buttonText:{
        color:'white',
    },
    Wrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'

    },
})

export default SalonSearch;