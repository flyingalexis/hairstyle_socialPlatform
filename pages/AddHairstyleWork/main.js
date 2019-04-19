import React, {Component} from 'react'
import {StyleSheet, Text, View ,Button, Alert, Image, TextInput, TouchableOpacity, Picker} from 'react-native'
import {createHairstyleWork} from '../../utils/database'
import {storeLoginState} from '../../store/auth/actions'
import {connect} from 'react-redux'
import navOptions from '../../utils/drawerBarNavOptions'
import { ImagePicker, Permissions, ImageManipulator } from 'expo';
import {hairstyles} from '../../utils/hairstyleList'
// import PageWrapper from '../utils/pageWrapper'

pickHairstylePlaceholder = "pick the Hairtyle type -->"

class AddHairstyleWork extends Component{
    state = {
        hairstyleType: pickHairstylePlaceholder
    }
    static navigationOptions = navOptions

    async componentWillMount(){
        await this.getCameraRollPermission().catch(e => Alert.alert(e.message))
    }

    render(){
        return(
            <View style={styles.container}>
                <TouchableOpacity onPress={ () => this._pickImage()} style={{width: '100%', aspectRatio: 1, backgroundColor: 'blue'}}>
                    <Image source={this.state.hairstyleWorkImage && {uri: `data:image/gif;base64,${this.state.hairstyleWorkImage}`} || require('../../assets/demo.jpeg')} style={styles.hairstyleWork}/>
                </TouchableOpacity>
                <TextInput style={styles.textBox} placeholder="Title" placeholderTextColor='#888888' onChangeText={(title) => this.setState({title})} underlineColorAndroid="transparent"/>
                <Picker
                    // bug : cannot disable the placehold
                    selectedValue={this.state.hairstyleType}
                    style={{height: 50, width: 300}}
                    onValueChange={(itemValue, itemIndex) =>{this.setState({hairstyleType: itemValue})}
                    }>
                    {hairstyles.map( item => {
                        return <Picker.Item label={item} value={item} key={item}/>
                    })}
                    <Picker.Item enabled={false} label={pickHairstylePlaceholder} value={pickHairstylePlaceholder} key={pickHairstylePlaceholder}/>
                </Picker>
                <TextInput style={styles.multilineTextBox} placeholder="description" placeholderTextColor='#888888' multiline = {true} numberOfLines = {4} onChangeText={(description) => this.setState({description})} underlineColorAndroid="transparent"/>
                <TouchableOpacity style={styles.loginButton} onPress={() => this.handleAddHairstyleWork()}>
                    <Text style={styles.loginButtonText}>Add hairstyleWork</Text>
                </TouchableOpacity>
            </View>
            
        );
    }

    handleAddHairstyleWork(){
        console.log(`${this.props.auth} ${this.props.auth.salonId}`)
        if (!this.props.auth || !this.props.auth.salonId){
            //reject user if they have already owned a salon
            Alert.alert('Unauthorized, Please login and create your salon to proceed');
            return
        }
        if (this.state.title && this.state.description && this.state.hairstyleWorkImage && this.state.hairstyleType != pickHairstylePlaceholder) {
            ownerInfo = 
            {ownerId : this.props.auth.uid,
            ownerName : this.props.auth.name,
            salonId : this.props.auth.salonId}
            hairstyleWorkObj = {...this.state}
            createHairstyleWork(hairstyleWorkObj, ownerInfo).then(() => {Alert.alert("created hairstyle work sucessfully")}).catch((e) => Alert.alert(e.message))
            // save the hairstyle work into database
        }else{
            Alert.alert('Please fill in all the information to Add a hairstyle work');
        }
    }

    getCameraRollPermission = async() => {
        // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
        // run this in componentWillMount in all pages which requires to read image 
        const { status, permissions } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === 'granted') {
          return ;
        } else {
          throw new Error('Camera Roll permission not granted');
        }
      }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [3, 3],
        });
        
        // resize image to 100 * 100
        // temp_result = await ImageManipulator.manipulate(result.uri, [{resize:{height: 100, width: 100}}], {format:'png'})

        if (!result.cancelled) {
            result = await ImageManipulator.manipulateAsync(result.uri, [{resize:{height: 500, width: 500}}], { format: 'png' , base64: true});
            this.setState({ hairstyleWorkImage: result.base64 });
            console.log('save image to state');
        }
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

const mapDispatchToProps = dispatch => ({
    updateLoginState: auth => dispatch(storeLoginState(auth))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddHairstyleWork)

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        flex: 1,
        alignItems: 'center',
        width: '80%',
        alignSelf: 'center'
    },
    hairstyleWork: {
        width: '100%', 
        height: '100%',
        borderWidth: 2,
        borderColor:"#EA6652",
        resizeMode:'stretch'
    },
    title:{
        fontWeight: 'bold',
        fontSize: 18
    },
    logoText:{
        marginVertical: 15,
        fontSize: 18
    },
    loginButton:{
        marginTop: 40,
        width: '100%',
        height:50,
        backgroundColor: "#EA6652",
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginButtonText:{
        color: "white",
        fontSize: 18
    },
    textBox:{
        width: '100%',
        height: 30,
        marginHorizontal: 16,
        fontSize:16,
        color: '#888888',
        borderBottomWidth: 2,
        borderBottomColor: '#ACACAC',
        marginVertical:'3%'
    },
    multilineTextBox:{
        width: '100%',
        marginHorizontal: 16,
        fontSize:16,
        height: 60,
        color: '#888888',
        borderWidth: 2,
        borderColor: '#ACACAC',
        marginVertical:'3%'
    }
})
