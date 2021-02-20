import React, { Component } from 'react'
import {View, Text, TouchableOpacity } from 'react-native'
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import styles from '../../style';
import { widthPercentageToDP, heightPercentageToDP } from '../../consts'
import { connect } from 'react-redux'
import firestore from '@react-native-firebase/firestore'
import moment from 'moment'
import base64 from 'base-64'
class ChatRoom extends Component {
    constructor(props){
        super(props)
        let navigation = this.props.navigation.state.params
        this.state={
            messages :[],
            chatData :navigation.chatData,
            profile:props.profile
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            profile:nextProps.profile
        })
    }

    componentDidMount(){
        let {chatData} =this.state
        this.fetchMessage()
        // let messages =[]
        //     let object ={}
        //     if(chatData.latestMessage._id){
        //         object._id = chatData.latestMessage._id
        //     }else{
        //         object._id = 1
        //     }
        //     object.text=chatData.latestMessage.text
        //     object.createdAt = chatData.latestMessage.createdAt
        //     messages.push(object)
        // this.setState({
        //     messages,
        //   })
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
            createdAt: new Date().getTime(),
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

    onSend =(messages = []) => {
        this.sendToFirebase(messages)
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, messages),
        }))
      }

    sendToFirebase = async (messages) =>{
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

    render() {
        console.log(this.state.chatData)
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
                    messages={this.state.messages}
                    placeholder='Type a message...'
                    onSend={(messages) => this.onSend(messages)} 
                    // renderSend= {() => this.renderSend()}
                    // alwaysShowSend = {true}
                    user={{
                        _id: this.state.profile.uid,
                    }}
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