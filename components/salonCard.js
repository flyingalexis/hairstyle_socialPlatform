import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const SalonCard = (props) => {
    let key = props.salon['salonId']
    let salon = props.salon
    let ownericon, salonicon;
    if(salon['ownerIcon']!=undefined){
        ownericon = <Image source={{ uri: `data:image/gif;base64,${salon['ownerIcon']}` }} style={styles.ownerIcon} key={`${key}OwnerImg`} />;
    } else{
        ownericon = <Image source={require('../assets/owner_default_icon.jpg')} style={styles.ownerIcon} key={`${key}OwnerImg`} />;
    }
    if(salon['salonIcon']!=undefined){
        salonicon = <Image source={{ uri: `data:image/gif;base64,${salon['salonIcon']}` }} style={styles.hairstyleWorkImage} key={`${key}Img`} />;
    } else{
        salonicon = <Image source={require('../assets/salon_default_image.jpg')} style={styles.hairstyleWorkImage} key={`${key}Img`} />;
    }

    return (
        <View key={`${key}Card`} style={styles.card}>
            <TouchableOpacity onPress={ () => props.onPress(salon)} key={`${key}Button`}>
                <View key={`${key}OwnerWrapper`} style={styles.ownerWrapper}>
                    {ownericon}
                    <Text>{salon['ownername']}</Text>
                </View>
                {salonicon}
                <Text key={`${key}Description`}>{salon['description']}</Text>
            </TouchableOpacity>
            <View style={styles.infoWrapper}>
                <Text>In </Text>
                <Text>{(salon['location']? salon['location'] : '-' )}</Text>
            </View>
            <View style={styles.infoWrapper}>
                <Text>Price: </Text>
                <Text>{(salon['avgprice']? salon['avgprice'] : '-' )}</Text>
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
    infoWrapper:{
        flexDirection: 'row', 
        marginTop: 10,
    },
    likeIcon: {
        marginRight: 5
    }
})