import React, {Component} from 'react'
import {StyleSheet, Text, View ,Button, Image} from 'react-native'
import {connect} from 'react-redux'
import navOptions from '../../utils/drawerBarNavOptions'
import { ImagePicker, Permissions } from 'expo';


class Splash extends Component{
    async componentWillMount(){
        await this.getLocationAsync();
    }

    
    static navigationOptions = navOptions

    state = {
      image: null,
    };
    render(){
      let { image } = this.state;
        return(
                <View style={styles.container}>
                    <Text style={styles.title}> Hey this is the Splash page</Text>
                    <Button onPress={() => this.props.navigation.navigate('Login')} title="GOTO_Login" color="#841584"/>
                    <Button onPress={() => {}} title="Redux test" color="#841584"/>
                    {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                    <Button
                        title="Pick an image from camera roll"
                        onPress={this._pickImage}
                    />
                    
                </View>
        );
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [3, 3],
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          this.setState({ image: result.uri });
        }
    }

    getLocationAsync = async() => {
        // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
        const { status, permissions } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === 'granted') {
          return ;
        } else {
          throw new Error('Location permission not granted');
        }
      }

    // image picker demo
    
}


const styles = StyleSheet.create({  
    container: {
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title:{
        fontWeight: 'bold',
        fontSize: 18
    }
})

const mapStateToProps = state => ({
    auth: state.auth
  })

export default connect(mapStateToProps)(Splash);