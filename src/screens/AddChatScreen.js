import React,{useState} from 'react';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { StyleSheet, Text, View } from 'react-native';
import {Button,Input} from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons'; 


const AddChatScreen = ({navigation}) => {

const [chatInput, setChatInput] = useState('');
    
async function createChat () {
        try{
            await firebase.app().firestore().collection('chats').add({
                chatName:chatInput
            }).then(() => {navigation.goBack()})
        }
        catch(err){
            Alert.alert('There is something wrong' , err.message)
        }
    };




    return (
        <View>
            <Input 
            placeholder='Enter a chat name'
            value={chatInput}
            onChangeText={(chat) => setChatInput(chat)}
            leftIcon={
                <AntDesign name="wechat" size={24} color="black" />
            }
            />
            <Button 
            title='Create a new chat'
            onPress={createChat}
            />

        </View>
    )
}

export default AddChatScreen;


export const addChatScreenOptions = () => {
    return{
        headerTitle:'Add a new Chat',
        headerTitleStyle:{
            marginLeft:50
        },
        headerBackTitleVisible:true,
        headerBackTitle:'Chats',
        headerTruncatedBackTitle:'Chats'
    }
};

const styles = StyleSheet.create({})



