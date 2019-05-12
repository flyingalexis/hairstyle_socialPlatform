import React, {Component} from 'react'
import {StyleSheet, Text, View ,Button, Alert, Image, TextInput, TouchableOpacity} from 'react-native'
import {createSalonProfile, updateProfile} from '../../utils/database'
import {storeLoginState} from '../../store/auth/actions'
import {connect} from 'react-redux'
import navOptions from '../../utils/drawerBarNavOptions'
import { ImagePicker, Permissions, ImageManipulator } from 'expo';
import {updateLoginState} from '../../store/auth/actions'
import {areaList} from '../../utils/areaList'
import ModalSelector from 'react-native-modal-selector'
// import PageWrapper from '../utils/pageWrapper'

const pickAreaPlaceholder = "pick your Area -->"
class CreateSalon extends Component{
    state = {}
    static navigationOptions = navOptions

    async componentWillMount(){
        await this.getCameraRollPermission().catch(e => Alert.alert(e.message))
    }

    render(){
        
        let areaPickerData = []
        for (let i = 0 ; i < areaList.length; i++){
            areaPickerData.push({key: i+1, label: areaList[i]});
        }
        return(
            <View style={styles.container}>
                <Text>Salon Icon</Text>
                <TouchableOpacity onPress={ () => this._pickImage()}>
                    <Image source={this.state.salonIcon && {uri: `data:image/gif;base64,${this.state.salonIcon}`} || require('../../assets/demo.jpeg')} style={styles.icon}/>
                </TouchableOpacity>

                <TextInput style={styles.textBox} placeholder="Salon Name" placeholderTextColor='#888888' onChangeText={(salonName) => this.setState({salonName})} underlineColorAndroid="transparent"/><ModalSelector
                    data={areaPickerData}
                    initValue={pickAreaPlaceholder}
                    onChange={(option)=>{ this.setState({location: option.label}) }} />
                <TextInput style={styles.textBox} placeholder="Average Price" keyboardType={'numeric'} value={this.state.averagePrice} placeholderTextColor='#888888' onChangeText={(averagePrice) => this.handlePriceChange(averagePrice)} underlineColorAndroid="transparent"/>
                
                <TextInput style={styles.textBox} placeholder="contact email" placeholderTextColor='#888888' onChangeText={(contactEmail) => this.setState({contactEmail})} underlineColorAndroid="transparent"/>
                <TextInput style={styles.multilineTextBox} placeholder="description" placeholderTextColor='#888888' multiline = {true} numberOfLines = {4} onChangeText={(description) => this.setState({description})} underlineColorAndroid="transparent"/>
                <TouchableOpacity style={styles.loginButton} onPress={() => this.handleCreateSalon()}>
                    <Text style={styles.loginButtonText}>CreateSalon</Text>
                </TouchableOpacity>
            </View>
            
        );
    }

    
    handlePriceChange(input){
        input = input.toString()
        let lastDigit = input[input.length -1]
        if ('0123456789'.includes(lastDigit)) {
            this.setState({averagePrice:input})
        }
    }

    handleCreateSalon(){
        if (this.props.auth.salonId){
            //reject user if they have already owned a salon
            Alert.alert('You already owned a salon (each user can only register one salon)');
            return
        }
        if (this.state.contactEmail && this.state.salonName && this.state.description && this.state.salonIcon && this.state.location && this.state.averagePrice) {
            uid = this.props.auth.uid
            salonProfileObj = {
                contactEmail: this.state.contactEmail, salonName: this.state.salonName, description: this.state.description , salonIcon: this.state.salonIcon,
                location: this.state.location, averagePrice: parseInt(this.state.averagePrice)
            };
            let profileObj;
            createSalonProfile(salonProfileObj,uid).then((salonId) => {
                profileObj = {salonId}
                return updateProfile(profileObj,uid)
            }).then( () => {
                console.log('new profile Obj')
                this.props.updateLoginState(profileObj)
                Alert.alert('created Salon sucessfully');
                this.props.navigation.navigate('Salon');
            }).catch((e) => {
                Alert.alert(e.message);
            })
        }else{
            Alert.alert('Please fill in all the information to create a Salon');
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
        result = await ImageManipulator.manipulateAsync(result.uri, [{resize:{height: 200, width: 200}}], { format: 'png' , base64: true});

        if (!result.cancelled) {
            this.setState({ salonIcon: result.base64 });
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateSalon)

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        flex: 1,
        alignItems: 'center',
        width: '80%',
        alignSelf: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    icon: {
        height: 100, 
        width: 100, 
        borderRadius: 50,
        borderWidth: 2,
        borderColor:"#EA6652"
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
        marginHorizontal: 16,
        fontSize:16,
        paddingLeft:5,
        color: '#888888',
        borderBottomWidth: 2,
        borderBottomColor: '#ACACAC',
        marginVertical:'3%'
    },
    multilineTextBox:{
        width: '100%',
        marginHorizontal: 16,
        fontSize:16,
        padding:5,
        color: '#888888',
        borderWidth: 2,
        borderColor: '#ACACAC',
        marginVertical:'3%'
    }
})
