import React, {Component} from 'react'
import {StyleSheet, Text, View ,Button, Alert, Image, TextInput, TouchableOpacity, Picker} from 'react-native'
import {createHairstyleWork} from '../../utils/database'
import {storeLoginState} from '../../store/auth/actions'
import {connect} from 'react-redux'
import navOptions from '../../utils/drawerBarNavOptions'
import { ImagePicker, Permissions, ImageManipulator } from 'expo';
import {hairstyles} from '../../utils/hairstyleList'
import { FontAwesome } from '@expo/vector-icons';
import ModalSelector from 'react-native-modal-selector'

// import PageWrapper from '../utils/pageWrapper'

pickHairstylePlaceholder = "pick the Hairtyle type -->"

class AddHairstyleWork extends Component{
    state = {
        hairstyleType: pickHairstylePlaceholder,
        tags:[]
    }
    static navigationOptions = navOptions

    async componentWillMount(){
        await this.getCameraRollPermission().catch(e => Alert.alert(e.message))
    }

    getTagsFromText(text){
        let tagReg = /([^\ ]*)\ /g;
        result = tagReg.exec(text)
        if(result && result[1] && (this.state.tags.includes(result[1]) || this.state.tags.length >= 3) ){
            this.tagInput.clear()
            return
        }
        if(result && result[1] && !this.state.tags.includes(result[1])){
            let newtags = this.state.tags.map(item => item)
            newtags.push(result[1])
            this.setState({tags:newtags})
            this.tagInput.clear()
        }
    }
    removeTag(text){
        console.log(text)
        newtags = this.state.tags.filter(x => x !== text)
        this.setState({tags:newtags})
    }
    render(){
        let tags = this.state.tags.map( (tag) => {
            return (
                <View key={`${tag}TagBox`} style={styles.tag}>
                    <Text key={`${tag}Tag`} style={styles.tagText}>{tag}</Text>
                    <TouchableOpacity key={`${tag}RemoveButton`} onPress={ () => this.removeTag(tag)}>
                        <FontAwesome name={'remove'} style={styles.tagRemove}/>
                    </TouchableOpacity>
                </View>
            )
        })

        let pickerData = []
        for (let i = 0 ; i < hairstyles.length; i++){
            pickerData.push({key: i+1, label: hairstyles[i]});
        }
        return(
            <View style={styles.container}>
                <TouchableOpacity onPress={ () => this._pickImage()} style={{width: '50%', aspectRatio: 1, backgroundColor: 'blue'}}>
                    <Image source={this.state.hairstyleWorkImage && {uri: `data:image/gif;base64,${this.state.hairstyleWorkImage}`} || require('../../assets/demo.jpeg')} style={styles.hairstyleWork}/>
                </TouchableOpacity>
                <TextInput style={styles.textBox} placeholder="Title" placeholderTextColor='#888888' onChangeText={(title) => this.setState({title})} underlineColorAndroid="transparent"/>
                <ModalSelector
                    data={pickerData}
                    initValue={pickHairstylePlaceholder}
                    onChange={(option)=>{ this.setState({hairstyleType: option.label}) }} />
                
                <View style={styles.tagsWrapper}>
                    {tags && tags}
                </View>
                <TextInput style={styles.textBox} ref={input => this.tagInput = input} placeholder="Separate tags by space" placeholderTextColor='#888888' onChangeText={(tags) => this.getTagsFromText(tags)} underlineColorAndroid="transparent"/>
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
    },
    tag:{
        backgroundColor: "#EA6652",
        height: 32,
        borderRadius: 16,
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    tagText:{
        fontSize: 16,
        color:'white'
    },
    tagRemove:{
        marginLeft: 3,
        color: 'white'
    },
    tagsWrapper:{
        flexDirection:'row'
    }
})
