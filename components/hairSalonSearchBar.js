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
        if(this.state.salonname == ''){
            this.props.onSearch(this.state.price, this.state.location, null);
        }

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
                    <View style={{...styles.sortByWrapper, flexBasis: '50%'}}>
                        <Text style={styles.label}>Price:</Text>
                        <ModalSelector
                            style={styles.select}
                            selectStyle= {styles.select}
                            data={PriceList}
                            initValue={""}
                            onChange={(option)=>{ this.setState({price: option.key})}}
                            selectedItemTextStyle = {styles.selectText}/>
                    </View>

                    <View style={{...styles.sortByWrapper, flexBasis: '50%'}}>
                        <Text style={styles.label}>Location:</Text>
                        <ModalSelector
                            style={styles.select}
                            selectStyle= {styles.select}
                            data={LocationList}
                            initValue={""}
                            selectTextStyle= {{fontSize: 12}}
                            onChange={(option)=>{ this.setState({location: option.key})}}
                            selectedItemTextStyle = {styles.selectText}/>
                    </View>
                    <View style={{...styles.sortByWrapper}}>
                        <Text style={styles.label}>Salon Name:</Text>
                        <TextInput style={styles.textInput} onChangeText={ (text) => this.setState({salonname: text})} placeholder="Enter Salon Name"></TextInput>

                    <TouchableOpacity style={{...styles.searchButton}} onPress={() => this.handleSearch()}>
                        <Text style={styles.label}>Search</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
                            
            
        );
    }
}

const styles = StyleSheet.create({
    searchBar:{
        width: '100%',
        backgroundColor: "#EA6652",
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: "flex-start",
        justifyContent: "flex-start",
        paddingHorizontal: 20,
        flexWrap: 'wrap'
    },
    sortByWrapper:{
        flexDirection:'row',
        alignItems: 'center'
    },
    select:{
        flexBasis: "100%",
        height: 30,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'white',
        borderRadius: 0,
        marginVertical: 2
    }
    ,
    textInput:{
        flex: 1,
        width: '100%',
        height: 30,
        borderWidth: 1,
        borderColor:'white',
        paddingLeft: 5,
        marginVertical: 2,
        marginRight: 5
    },
    searchButton:{
        backgroundColor:'white',
        padding: 5,
        borderRadius: 5,
        height: 30,
        marginVertical: 2,
        marginRight: 5
    },
    selectText:{
        fontSize: 16,
        padding: 0,
    },
    label:{
        marginVertical: 2
    }
})

export default SalonSearchBar;