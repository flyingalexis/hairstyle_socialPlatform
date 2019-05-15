import React, { Component } from 'react';
import { View, Text, TouchableOpacity ,StyleSheet, TextInput} from 'react-native';
import { Icon } from 'native-base';
import ModalSelector from 'react-native-modal-selector'


class SalonSearchBar extends Component {
    state={
        price: null,
        district: null,
        salonname: null
    }
    handleSearch(){
        this.props.onSearch(this.state.price, this.state.location, this.state.salonname);
    }

    render() {
        let PriceList = [
            {key: 1, label: '$1-50'},
            {key: 2, label: '$51-100'},
            {key: 3, label: '$101-150'},
            {key: 4, label: '$151-200'},
            {key: 5, label: '>$200'},
        ]

        let LocationList = [
            {key: 1, label: 'Hong Kong Island'},
            {key: 2, label: 'Kowloon'},
            {key: 3, label: 'New Territories'},
        ]

        return (
            <View>
                <View style={styles.searchBar}>
                    <View style={styles.sortByWrapper}>
                        <Text>Price:</Text>
                        <ModalSelector
                            style={styles.select}
                            selectStyle= {styles.select}
                            data={PriceList}
                            initValue={""}
                            onChange={(option)=>{ this.setState({price: option.key})}}
                            selectedItemTextStyle = {styles.selectText}/>
                    </View>

                    <View style={styles.sortByWrapper}>
                        <Text>Location:</Text>
                        <ModalSelector
                            style={styles.select}
                            selectStyle= {styles.select}
                            data={LocationList}
                            initValue={""}
                            onChange={(option)=>{ this.setState({location: option.key})}}
                            selectedItemTextStyle = {styles.selectText}/>
                    </View>
                </View>
                <View style={styles.searchBar2}>
                    <View style={styles.sortByWrapper}>
                        <Text>Salon Name:</Text>
                        <TextInput style={styles.textInput} onChangeText={ (text) => this.setState({salonname: text})} placeholder="Enter Salon Name"></TextInput>
                    </View>

                    <TouchableOpacity style={styles.searchButton} onPress={() => this.handleSearch()}>
                        <Text>Search</Text>
                    </TouchableOpacity>
                </View>
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
        paddingHorizontal: 20,
    },
    searchBar2:{
        width: '100%',
        backgroundColor: "#FFFFFF",
        height:50,
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
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
        width: 200,
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

export default SalonSearchBar;