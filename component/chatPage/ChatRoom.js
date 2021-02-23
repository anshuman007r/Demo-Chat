import React, { Component } from 'react'
import {View, Text, TouchableOpacity, Alert, TextInput} from 'react-native'
import { Icon, Button, KeyboardAvoidingView  } from 'native-base'
import { GiftedChat, Bubble, Composer, ActionsProps, Actions} from 'react-native-gifted-chat'
import styles from '../../style';
import { widthPercentageToDP, heightPercentageToDP } from '../../consts'
import { connect } from 'react-redux'
import firestore from '@react-native-firebase/firestore'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import moment from 'moment'
import base64 from 'base-64'
import RBSheet from 'react-native-raw-bottom-sheet'
import storage from '@react-native-firebase/storage'
import Giphy from 'react-native-giphy'
class ChatRoom extends Component {
    constructor(props){
        super(props)
        let navigation = this.props.navigation.state.params
        this.state={
            messages :[],
            messageData :[],
            imageMessage : [],
            gifMessage :[],
            chatData :navigation.chatData,
            profile:props.profile,
            image:{},
            buttonsView : true,
            search :'',
            selectedGifURL :''
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            profile:nextProps.profile
        })
    }

    componentDidMount(){
        this.fetchMessage()
        this.fetchImageData()
        this.fetchGIFData()
    }

    uploadImageFile = (path, imageName) =>{
        let reference = storage().ref(imageName)
        let upload = reference.putFile(path)
        upload.then((res)=>{
            console.log('Image is uploaded successfully !!', res)
            this.imageToGiftChatFormat()
        }).catch((error)=>{
            console.log(error)
        })
    }

    fetchImageData= async () =>{
        let {chatData} = this.state
        const unsubscribeListener = await firestore()
        .collection('USE_FIRESTORE')
        .doc(chatData._id)
        .collection('IMAGES')
        .orderBy('createdAt', 'desc')
        .onSnapshot(querySnapshot => {
        this.setState({imageMessage : []})
        const messageData = querySnapshot.docs.map(doc => {
            const firebaseData = doc.data()
            const data = {
            _id: doc.id,
            createdAt: moment().valueOf(),
            ...firebaseData,
            }

            if (!firebaseData.system) {
            data.user = {
                ...firebaseData.user,
                name: firebaseData.user.displayName
            }
            }

            return data
        })
        this.setState({messageData},()=>this.processImage())
        })
    }

    processImage =() =>{
        let { messageData } = this.state
        messageData.map((item)=>{
            this.fetchImage(item)
        })
    }

     fetchImage = async (item) => {
         let imageMessage = this.state.imageMessage
        let imageRef = await storage().ref('/'+item.image)
        .getDownloadURL().then((res)=>{
                console.log(res)
                let value ={ ...item, image:res}
                imageMessage.push(value)
                this.setState(imageMessage)
            }).catch((error)=>{
                return ''
            })
    }

    fetchGIFData = async () =>{
        let {chatData} = this.state
        const unsubscribeListener = await firestore()
        .collection('USE_FIRESTORE')
        .doc(chatData._id)
        .collection('GIF')
        .orderBy('createdAt', 'desc')
        .onSnapshot(querySnapshot => {
        const gifMessage = querySnapshot.docs.map(doc => {
            const firebaseData = doc.data()
            const data = {
            _id: doc.id,
            text: '',
            createdAt: moment().valueOf(),
            ...firebaseData,
            image:firebaseData.gif
            }

            if (!firebaseData.system) {
            data.user = {
                ...firebaseData.user,
                name: firebaseData.user.displayName
            }
            }

            return data
        })
        this.setState({
            gifMessage
        })
        })

    }


    fetchMessage = async () =>{
        let {chatData} = this.state
        const unsubscribeListener = await firestore()
        .collection('USE_FIRESTORE')
        .doc(chatData._id)
        .collection('MESSAGES')
        .orderBy('createdAt', 'desc')
        .onSnapshot(querySnapshot => {
        const messages = querySnapshot.docs.map(doc => {
            const firebaseData = doc.data()
            const data = {
            _id: doc.id,
            text: '',
            createdAt: moment().valueOf(),
            ...firebaseData
            }

            if (!firebaseData.system) {
            data.user = {
                ...firebaseData.user,
                name: firebaseData.user.displayName
            }
            }

            return data
        })
        if(messages && messages.length >0){
            messages.map((item)=>{
                item.text = base64.decode(item.text)
            })
        }
        this.setState({
            messages
        })
        })

    }

    onSend =(messages = [], type ='') => {

        if(type == 'image'){
            this.sendImageToFirebase(messages)
        }else{
            this.sendTextToFirebase(messages)            
        }
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, messages),
        }))
      }

    sendTextToFirebase = async (messages) =>{
        console.log(messages)
        let { chatData } = this.state
        let message = await firestore()
        .collection('USE_FIRESTORE')
        .doc(chatData._id)
        .collection('MESSAGES')
        .add({
          text:base64.encode(messages[0].text),
          createdAt: moment().valueOf(),
          user: {
            _id: messages[0].user._id,
            displayName: this.state.profile.email
          }
        })
        console.log(message)
    }

    sendImageToFirebase = async (messages ='') =>{
        console.log(messages)
        let { chatData, image } = this.state
        let message = await firestore()
        .collection('USE_FIRESTORE')
        .doc(chatData._id)
        .collection('IMAGES')
        .add({
          image:image.fileName,
          createdAt: moment().valueOf(),
          user: {
            _id: this.state.profile.uid,
            displayName: this.state.profile.email
          }
        })
        console.log(message)
    }

    sendGIFToFirebase = async (messages ='') =>{
        console.log(messages)
        let { selectedGifURL, chatData } = this.state
        let message = await firestore()
        .collection('USE_FIRESTORE')
        .doc(chatData._id)
        .collection('GIF')
        .add({
          gif:selectedGifURL,
          createdAt: moment().valueOf(),
          user: {
            _id: this.state.profile.uid,
            displayName: this.state.profile.email
          }
        })
        console.log(message)
    }

    renderActions = (props: Readonly<ActionsProps>) => {
        return (
          <Actions
            {...props}
            onPressActionButton={this.handleMessage}
            icon={() => (
              <Icon name='add' size={28} color={'#c3c3c3'} />
            )}
            onSend={args => console.log(args)}
          />
        )
      }

    handleMessage =()=>{
        this.RBSheet.open()
    }

    takePhotoFromCamera = () => {
        launchCamera(options, (response) => {
            console.log(response)
            this.RBSheet.close();
            if(response){

                if(response.fileSize <= 20971520){
                    this.setState({
                        image : response
                    },()=>this.uploadImageFile(response.uri, response.fileName))
                }else if(response.fileSize > 20971520){
                    Alert.alert('','Image size should be less than 20MB')
                }
            }
        });
    }

    imageToGiftChatFormat = () =>{
        let { image } = this.state
        let message = {}
        message.image= image.uri,
        message.user={
            _id : this.state.profile.uid
        }
        message._id = JSON.stringify(moment().valueOf())
        message.createdAt=moment().valueOf()
        this.sendImageToFirebase(message)  
    }

    takePhotoFromGallery = () =>{
        launchImageLibrary(options, (response) => {
            this.RBSheet.close();
            console.log(response)
            if(response){
                if(response.fileSize <= 20971520){
                    this.setState({
                        image : response
                    },()=>this.uploadImageFile(response.uri, response.fileName))
                }else if(response.fileSize > 20971520){
                    Alert.alert('','Image size should be less than 20MB')
                }
            }
        });
    }

    toggleButtonView = () =>{
        let buttonsView = this.state.buttonsView
        this.setState({
            buttonsView : !buttonsView
        })
    }

    changeSearch = (search) =>{
        this.setState({
            search
        })
    }

    selectedGif = (url) => {
        this.setState({
            selectedGifURL : url,
            search :''
}       ,()=>this.callGIFFunction())
    }

    callGIFFunction = () =>{
        this.RBSheet.close()
        this.toggleButtonView()
        this.sendGIFToFirebase()
    }

    onCross = () =>{
        this.RBSheet.close()
        this.toggleButtonView()
    }

    render() {
        console.log(this.state.messages, this.state.imageMessage,this.state.gifMessage)
        let messages = this.state.messages
        messages = messages.concat(this.state.imageMessage)
        messages = messages.concat(this.state.gifMessage)
        messages = messages.sort((valueA, valueB)=> valueB.createdAt - valueA.createdAt)
        return (
            <View style={{flex : 1}}>
                <View style ={{backgroundColor :'#c3c3c3', height :50,flexDirection :'row',alignItems:'center'}}>
                    <Text style={{left :15, fontSize :28,flex:1}} onPress={()=>this.props.navigation.goBack()}>X</Text>
                    <Text style={styles.chat_header}>{this.state.chatData.name}</Text>
                </View>
                <GiftedChat
                    listViewProps={{
                        style: {
                            backgroundColor: '#e3e3e3',
                        },
                    }}
                    messages={messages}
                    placeholder='Type a message...'
                    onSend={(messages) => this.onSend(messages)} 
                    // renderSend= {() => this.renderSend()}
                    // alwaysShowSend = {true}
                    user={{
                        _id: this.state.profile.uid,
                    }}
                    renderComposer={props=>{
                        return(
                            <Composer
                            { ...props}

                            />
                        )
                    }}
                    renderActions={(props)=>this.renderActions(props)}
                    renderBubble={props => {
                        return (
                            <Bubble
                                {...props}
                                textStyle={{
                                    right: {
                                        color: 'white',
                                        fontFamily: "WorkSans-Regular"
                                    },
                                    left: {
                                        color: 'white',
                                        fontFamily: "WorkSans-Regular"
                                    },
                                }}
                                wrapperStyle={{
                                    left: {
                                        backgroundColor: '#2e3033',
                                    },
                                    right: {
                                        backgroundColor: "#b2b2b2",
                                    },
                                }}
                            />
                        );
                    }}
                />
                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    // height={heightPercentageToDP(33) + 140}
                    duration={300}
                    customStyles={{  
                        container:{
                            justifyContent: "center",
                            alignItems: "center",
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            height : this.state.buttonsView? 300 : 260
                        }      
                    }}
                >
                {
                    this.state.buttonsView ? 
                    <View style={{alignItems: "center", width: widthPercentageToDP(100), height: "100%", justifyContent:'space-evenly' }}>

                    <TouchableOpacity
                        disabled={this.state.disableCTA}
                        onPress={this.takePhotoFromCamera}
                        style={[styles.button_disable,
                        {
                            backgroundColor:  "#000",
                            borderColor : '#c3c3c3',
                            borderWidth : 2,
                            height : 60,

                        }]
                        }
                    >
                        <Text style={[styles.continue_text, { color: 'white' }]}>Take photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        disabled={this.state.disableCTA}
                        onPress={this.takePhotoFromGallery}
                        style={[styles.button_disable,
                        {
                            backgroundColor:  "#000",
                            borderColor : '#c3c3c3',
                            borderWidth : 2,
                            height : 60,
                        }]
                        }
                    >
                        <Text style={[styles.continue_text, { color: 'white' }]}>Choose from gallery</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        disabled={this.state.disableCTA}
                        onPress={this.toggleButtonView}
                        style={[styles.button_disable,
                        {
                            backgroundColor:  "#000",
                            borderColor : '#c3c3c3',
                            borderWidth : 2,
                            height : 60,
                        }]
                        }
                    >
                        <Text style={[styles.continue_text, { color: 'white' }]}>Add GIF</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        disabled={this.state.disableCTA}
                        onPress={() => this.RBSheet.close()}
                        style={[styles.button_disable,
                        {
                            backgroundColor:  "#000",
                            borderColor : '#c3c3c3',
                            borderWidth : 2,
                            height : 60,
                        }]
                        }
                    >
                        <Text style={[styles.continue_text, { color: 'white' }]}>Cancel</Text>
                    </TouchableOpacity>
                </View>:
                <View style={{alignItems: "center", width: widthPercentageToDP(100), height: "100%"}}>
                        <View style ={{height : 32, marginTop :10, width :'100%'}}>
                          <Text style={{fontSize :28,textAlign :'right',right :20}} onPress={this.onCross}>X</Text>
                        </View>
                        <View style={{width:'90%', marginHorizontal :20, marginVertical:10}}>
                            <Text style={styles.userName_div}>
                                Search gif
                             </Text>
                            <TouchableOpacity style={styles.userNameDiv_section}>
                                    <TextInput
                                        selectionColor={"#4d5054"}
                                        defaultValue={this.state.search}
                                        maxLength={256}
                                        placeholder="Search gif"
                                        autoCapitalize="none"
                                        placeholderTextColor="grey"
                                        editable={true}
                                        onChangeText={search =>
                                            this.changeSearch(search)
                                        }
                                        style={[styles.userName_inbox,
                                        ]}
                                    />
                            </TouchableOpacity>
                        </View>
                        <Giphy
                            inputText={ this.state.search }
                            handleGifSelect={ (url) => this.selectedGif(url)}
                        />
                </View>
                }
                </RBSheet>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.authReducer.profile,
    };
};

export default connect(mapStateToProps)(ChatRoom)

const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};
