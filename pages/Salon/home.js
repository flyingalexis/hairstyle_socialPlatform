import React, { Component } from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Button, Image ,ScrollView} from 'react-native';
import { Icon } from 'native-base';
import navOptions from '../../utils/drawerBarNavOptions'
import {hairstylesWithImg} from '../../utils/hairstyleList'

class SalonHome extends Component {
    static navigationOptions = navOptions
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
                {/* <Button
                        onPress={() => this.props.navigation.navigate("SalonPage")}
                        title="Go To Details"
                    /> */}
                {/* <View style={styles.hairstyleCard}>
                    <Image source={hairstylesWithImg['Afro']} style={styles.hairstyleImage}/>
                </View> */}
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

export default SalonHome;