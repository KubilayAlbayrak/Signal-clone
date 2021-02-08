import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View ,Alert ,TouchableOpacity,ScrollView} from 'react-native';
import * as firebase from "firebase";
import {loggingOut} from '../API/FirebaseMethods';
import CustomListItem from '../components/CustomListItem';
import { Avatar } from 'react-native-elements';
import { SimpleLineIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import 'firebase/firestore';

const HomeScreen= ({navigation}) => {

const [chats, setChats] = useState([]);

const signOut= () => {
        loggingOut();
        navigation.replace('LoginScreen');
};

const enterChat = (id,chatName) => {
    navigation.navigate('ChatScreen',{
        id,
        chatName
    })
};

 useEffect(() => {
    const unsubscribe = firebase.app().firestore()
                        .collection('chats')
                        .onSnapshot((snapshot) => 
                        setChats(snapshot.docs.map(doc => ({
        id:doc.id,
        data:doc.data()
    }))
    )
    );
    return unsubscribe;
},[]);   


    return (
        <View>
            <ScrollView>
                {chats.map(({id,data :{chatName}})=>
                (
                <CustomListItem  
                key={id} 
                id={id} 
                chatName={chatName}
                enterChat={enterChat}
                />
                ))}
        </ScrollView>
        </View>
    )
};


export const homeScreenOptions = ({navigation,props}) => {
    return{
        headerStyle:{
            backgroundColor:'#fff'
        },
        headerTintColor:'black',
        headerTitle:"Signal",
        headerTitleStyle:{
        color:'black',
        marginLeft:90
        },
        headerLeft:() => (
            <View style={{marginLeft:20}}>
                <TouchableOpacity>
                <Avatar 
                rounded
                source={require('../assets/images/vesikalık.png')}
                />
                </TouchableOpacity>
            </View>
        ),
        headerRight:() => (
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity style={{marginRight:20}}>
                <Ionicons name="ios-camera-outline" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={{marginRight:10}} onPress={() => navigation.navigate('AddChatScreen')}>
                <SimpleLineIcons name="pencil" size={24} color="black" />
                </TouchableOpacity>
            </View>
        )
    }
};


export default HomeScreen;

const styles = StyleSheet.create({

});






