import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const HairstyleCard = (props) => {
    let key = props.hairstyleWork['hairstyleWorkId']
    let hairstyleWork = props.hairstyleWork
    return (
        <View key={`${key}Card`} style={styles.card}>
            <TouchableOpacity onPress={ () => props.onPress(hairstyleWork)} key={`${key}Button`}>
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
}

const styles = StyleSheet.create({
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