import React, {useLayoutEffect ,useState,useEffect }from 'react'
import { SafeAreaView, StyleSheet,ScrollView, Text, View , TouchableOpacity,TextInput,KeyboardAvoidingView,Platform, Keyboard,TouchableWithoutFeedback } from 'react-native'
import { Avatar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons'; 
import { StatusBar } from 'expo-status-bar';
import * as firebase from 'firebase';
import 'firebase/firestore';
import {GiftedChat} from 'react-native-gifted-chat';


const ChatScreen = ({route}) => {
const {id}=route.params;
const [input, setInput] = useState('');
const [messages, setMessages] = useState([]);

const sendMessage = () => {
    const currentUser = firebase.auth().currentUser;
    Keyboard.dismiss();
    firebase.app().firestore().collection('chats').doc(id).collection('messages').add({
        timeStap:firebase.firestore.FieldValue.serverTimestamp(),
        message:input,
        displayName:firebase.auth().currentUser.displayName,
        email:firebase.auth().currentUser.email,
        //photoUrl: firebase.auth().currentUser.photoUrl
    });
    setInput('');
};

useLayoutEffect(() => {
    const currentUser = firebase.auth().currentUser;
    const unsubscribe = firebase.app().firestore().collection('chats')
    .doc(currentUser.id).collection('messages')
    .orderBy('timestamp' , 'desc')
    .onSnapshot((snapshot) =>
    setMessages(
    snapshot.docs.map((doc) => ({
        id:doc.id,
        data:doc.data()
    }))
    )
    );
    return unsubscribe;
},[messages]);


    return (
        <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
            <StatusBar  style="light"/>
            <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
            keyboardVerticalOffset={90}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <>
                <ScrollView style={styles.mainchat}>
                    {messages.map(({id,data}) => 
                        data.email === firebase.auth().currentUser.email ? (
                            <View key={id} style={styles.reciever} >
                                <Avatar />
                                <Text style={styles.receiverText}>{data.message}</Text>
                            </View>
                            ) : (
                            <View key={id} style={styles.sender}> 
                            <Avatar />
                            <Text style={styles.senderText}>{data.message}</Text>
                        </View>
                        )
                    )}
                </ScrollView>
                <View style={styles.footer}>
                <TextInput
                value={input}
                onChangeText={(text) => setInput(text)}
                onSubmitEditing={sendMessage}
                placeholder='Signal Message'
                style={styles.textinput}
                />
                <TouchableOpacity onPress={sendMessage} style={styles.sendicon}>
                <Ionicons name="send" size={24} color="#2B68E6" />
                </TouchableOpacity>
                </View>
                </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
            </SafeAreaView>
    )
}

export default ChatScreen;


export const chatScreenOptions = ({route}) =>{
    const {chatName} = route.params;
    return{
        title:'Chat',
        headerBackTitleVisible:false,
        headerTitleAlign:'left',
        headerTitle:() => (
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Avatar
                rounded
                source={require('../assets/images/defaultavatar.png')}
                />
                <Text style={{color:'white' , fontWeight:'bold',marginLeft:10}}>{chatName}</Text>
            </View>
        ),
        headerRight:() => (
            <View style={{flexDirection:'row', alignItems:'center'}}>
            <TouchableOpacity style={{marginRight:30}}>
            <Ionicons name="videocam" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={{marginRight:15}}>
            <Ionicons name="call" size={24} color="white" />
            </TouchableOpacity>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    mainchat:{
        borderColor:'black',
        borderWidth:1
    },
    footer:{
        flexDirection:'row',
        alignItems:'center',
        width:'100%',
        padding:15
    },
    textinput:{
        bottom:0,
        height:40,
        flex:1,
        marginRight:15,
        backgroundColor:'#ECECEC',
        padding:10,
        color:'grey',
        borderRadius:30
    },
    reciever:{
        padding:15,
        backgroundColor:'#ECECEC',
        borderRadius:20,
        marginRight:15,
        marginBottom:20,
        maxWidth:'80%',
        position:'relative'
    },
    sender:{
        padding:15,
        backgroundColor:'#2B68E6',
        alignSelf:'flex-start',
        borderRadius:20,
        margin:15,
        maxWidth:'80^%',
        position:'relative'
    },
    receiverText:{
        fontSize:25,
        fontWeight:'bold'
    },
    senderText:{
        fontSize:25,
        fontWeight:'bold'
    }
})
