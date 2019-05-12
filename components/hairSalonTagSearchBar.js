import React, { Component } from 'react';
import { View, Text, TouchableOpacity ,StyleSheet, TextInput} from 'react-native';
import { Icon } from 'native-base';
import ModalSelector from 'react-native-modal-selector'


class TagSearchBar extends Component {
    componentDidUpdate(){
        console.log('subscribe state changes')  
    }
    
    state={
        sortBy: null,
        tag: null
    }
    handleSearch(){
        this.props.onSearch(this.state.sortBy, this.state.tag);
    }

    render() {
        let sortByList = [
            {key: 1, label: 'likes'},
            {key: 2, label: 'date'}
        ]
        return (
            <View style={styles.searchBar}>
                <View style={styles.sortByWrapper}>
                    <Text>Sort By:</Text>
                    <ModalSelector
                        style={styles.select}
                        selectStyle= {styles.select}
                        selectTextStyle= {{fontSize: 13}}
                        data={sortByList}
                        initValue={""}
                        onChange={(option)=>{ this.setState({sortBy: option.label})}}
                        selectedItemTextStyle = {styles.selectText}/>
                </View>
                
                <View style={styles.sortByWrapper}>
                    <Text>Tag:</Text>
                    <TextInput style={styles.textInput} onChangeText={ (text) => this.setState({tag: text})}></TextInput>
                </View>

                <TouchableOpacity style={styles.searchButton} onPress={() => this.handleSearch()}>
                    <Text>Search</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    searchBar:{
        width: '100%',
        backgroundColor: "#EA6652",
        height:50,
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 5
    },
    sortByWrapper:{
        flexDirection:'row',
        alignItems: 'center'
    },
    select:{
        width: 100,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'white',
        borderRadius: 0
    }
    ,
    textInput:{
        width: 100,
        height: 30,
        borderWidth: 1,
        borderColor:'white',
        paddingLeft: 5
    },
    searchButton:{
        backgroundColor:'white',
        padding: 5,
        borderRadius: 5,
        height: 30,
    },
    selectText:{
        fontSize: 16,
        padding: 0,
    }
})

export default TagSearchBar;