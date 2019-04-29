import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Icon } from 'native-base';
import navOptions from '../../utils/drawerBarNavOptions'
import { loadHairstyleWorkByCategory } from '../../utils/database'

import { Ionicons } from '@expo/vector-icons';

class HairstyleWorkList extends Component {

    static navigationOptions = ({ navigation }) => {
        let headerTintColor = "#EA6652";
        let headerStyle = { borderBottomColor: 'transparent', borderBottomWidth: 0, elevation: 0 }
        return { headerTintColor, headerStyle }
    }
    state = {loading:true}

    changeData(data) {
        this.setState({ data })
    }

    async componentWillMount() {
        await loadHairstyleWorkByCategory(this.props.navigation.getParam('category')).then(((data) => {
            this.changeData(data)
            console.log(data.length)
            this.setState({loading: false})
        }))
    }
    componentDidMount(){
    }
    createCards() {
        this.hairstyleWorkCards = [];
        if (this.state.data) {
            // console.log(this.state.data)
            // console.log(Object.keys(this.state.data[0]))
            this.state.data.map((hairstyleWork) => {
                navFunc = () => this.props.navigation.navigate('HairstyleWork', {
                    hairstyleWork
                });
                key = hairstyleWork['hairstyleWorkId']
                this.hairstyleWorkCards.push(
                    <View key={`${key}Card`} style={styles.card}>
                        <TouchableOpacity onPress={navFunc} key={`${key}Button`}>
                            <View key={`${key}OwnerWrapper`} style={styles.ownerWrapper}>
                                <Image source={{ uri: `data:image/gif;base64,${hairstyleWork['ownerIcon']}` }} style={styles.ownerIcon} key={`${key}OwnerImg`} />
                                <Text>{hairstyleWork['ownerName']}</Text>
                            </View>
                            <Image source={{ uri: `data:image/gif;base64,${hairstyleWork['hairstyleWorkImage']}` }} style={styles.hairstyleWorkImage} key={`${key}Img`} />
                            <Text key={`${key}Title`}>{hairstyleWork['title']}</Text>
                        </TouchableOpacity>
                        <View style={styles.likeWrapper}>
                            <Ionicons name="ios-heart-empty" size={20} style={styles.likeIcon} />
                            <Text>{(hairstyleWork['likes']?hairstyleWork['likes']:'0')}</Text>
                        </View>
                    </View>
                )
            })
        }
    }
    render() {
        this.createCards();
        let noMatch = <Text>No macthes were found</Text>
        if(this.state.loading){
            console.log('loading')
            return null;
        }
        else{
            console.log('finsih loading')
            return (
                <ScrollView>
                    {/* <Text>{this.props.navigation.getParam('category')}</Text> */}
                    <View style={styles.Wrapper}>
                        {this.hairstyleWorkCards.length == 0? noMatch: this.hairstyleWorkCards}
                    </View>
                </ScrollView>
            );
        }
    }
}


const styles = StyleSheet.create({
    Wrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'

    },
    card: {
        flexDirection: 'column',
        justifyContent: 'center',
        flexBasis: '50%',
        alignItems: 'center',
        marginVertical: 5,
    },
    hairstyleWorkImage: {
        height: 150,
        width: 150,
        marginVertical: 5
    },
    ownerWrapper: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: "flex-start"

    },
    ownerIcon: {
        height: 40,
        width: 40,
        borderRadius: 20,
    },
    likeWrapper:{
        flexDirection: 'row', 
        marginTop: 10,
    },
    likeIcon: {
        marginRight: 5
    }
})

export default HairstyleWorkList;