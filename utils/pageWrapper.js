import React, {Component} from 'react';
import {View, Text, Platform, StatusBar} from 'react-native';
import {Header, Left, Right, Icon} from 'native-base';
import { DrawerActions } from 'react-navigation'



export default class PageWrapper extends Component{
    render(){
        return (
            <View style={style=styles.wrapper}>
                <Header style={styles.header}>
                    <Left>
                        <Icon name="menu" style={styles.icon} onPress={() => this.props.navigation.dispatch(DrawerActions.toggleDrawer())}/>
                    </Left>
                    <Right />
                </Header>
                {this.props.children}
            </View>
            );
    }
}


const styles = {
    wrapper: {
        width: "100%", 
        height: "100%",
        flexDirection: 'column'
    },
    header: {
        borderBottomWidth: 0, 
        backgroundColor:'transparent',
        elevation:0,
        paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
    },
    icon: {
        color: "#EA6652",
        marginTop:5,
        marginLeft:5
    }
}