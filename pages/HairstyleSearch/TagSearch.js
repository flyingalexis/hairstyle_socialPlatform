import React, { Component } from 'react';
import { View, Text, TouchableOpacity ,StyleSheet, ListView, Alert} from 'react-native';
import {searchHairstyleWorksByTag} from '../../utils/database'
import { Icon } from 'native-base';
import navOptions from '../../utils/drawerBarNavOptions'
import TagSearchBar from '../../components/hairSalonTagSearchBar'
import {HairstyleCard} from '../../components/hairstyleCard'


class TagSearch extends Component {

    static navigationOptions = ({navigation}) => {
        let headerTintColor = "#EA6652";
        let headerStyle = {borderBottomColor:'transparent',borderBottomWidth: 0 ,elevation:0}
        return {headerTintColor, headerStyle}
    }
    constructor() {
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            hairstyleWorks: [],
            dataSource: ds.cloneWithRows([]),
            endOfPage: null,
            searching: false
        };
    }

    searchHairstyleWork(sortBy = null, tag = null){
        console.log('on search')
        searchHairstyleWorksByTag(sortBy,tag).then((res) => {
            let newHairstyleWork = [...res.hairstyleWorks]
            let newDataSource = this.state.dataSource.cloneWithRows(newHairstyleWork)
            this.setState({sortBy, tag})
            this.setState({hairstyleWorks: newHairstyleWork, dataSource: newDataSource, searching: true, endOfPage: res.endOfPage})
        })
    }

    navigationFuction(hairstyleWork){
        this.props.navigation.navigate('HairstyleWork', {
            hairstyleWork
        });
    }

    getNewPage(){
        if (this.state.searching === false || this.state.endOfPage == null){
            // reach the end or not searching
            console.log('reached the end')
            return
        }
        console.log('hot refresh') 
        searchHairstyleWorksByTag(this.state.sortBy,this.state.tag,this.state.endOfPage).then((res) => {
            let newHairstyleWork = [...this.state.hairstyleWorks, ...res.hairstyleWorks]
            let newDataSource = this.state.dataSource.cloneWithRows(newHairstyleWork)
            this.setState({hairstyleWorks: newHairstyleWork, dataSource: newDataSource, searching: true, endOfPage: res.endOfPage})
        }).catch(e => Alert.alert(e.message))
    }

    render() {
        return (
            <View style={styles.container}>
                <TagSearchBar onSearch={this.searchHairstyleWork.bind(this)}/>
                {this.state.searching && <ListView dataSource={this.state.dataSource} enableEmptySections={true} onScrollEndDrag={ () => {this.getNewPage()}} 
                renderRow={(rowData) => <HairstyleCard hairstyleWork={rowData} onPress={ this.navigationFuction.bind(this)}/>}
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

export default TagSearch;