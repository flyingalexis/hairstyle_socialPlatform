import React, { Component } from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Button, Image ,ScrollView} from 'react-native';
import { Icon } from 'native-base';
import navOptions from '../../utils/drawerBarNavOptions'
import {hairstylesWithImg} from '../../utils/hairstyleList'

class CategorySearch extends Component {
    static navigationOptions = ({navigation}) => {
        let headerTintColor = "#EA6652";
        let headerStyle = {borderBottomColor:'transparent',borderBottomWidth: 0 ,elevation:0}
        return {headerTintColor, headerStyle}
    }
    
    constructor(){
        super()
    }
    render() {
        let hairstyleCards=[];

        this.props.navigation.navigate('Details', {
            itemId: 86,
            otherParam: 'anything you want here',
          });

        Object.keys(hairstylesWithImg).map( (key) => {
            navFunc = () => this.props.navigation.navigate('HairstyleWorkList', {
                category: key
              });
            hairstyleCards.push(
                <TouchableOpacity onPress={navFunc} key={`${key}Button`}>
                    <View key={`${key}Card`} style={styles.hairstyleCard}>
                        <Image source={hairstylesWithImg[key]} style={styles.hairstyleImage} key={`${key}Img`}/>
                        <Text key={`${key}Label`} style={styles.hairstyleText}>{key}</Text>
                    </View>
                </TouchableOpacity>
            )
        })

        return (
            <ScrollView>
                <View style={styles.Wrapper}>
                    {hairstyleCards}
                </View>
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({ 
    Wrapper: {
        flexDirection: 'row',
        flexWrap:'wrap',
        width:'100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'

    },
    hairstyleImage: {
        height: 150,
        width: 150
    },
    hairstyleCard:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },
    hairstyleText:{
        justifyContent: 'center'
    }
 });

export default CategorySearch;