import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {ListItem,Avatar} from 'react-native-elements';
import * as firebase from 'firebase';
import 'firebase/firestore';

const CustomListItem = ({id,chatName,enterChat}) => {

const [chatMessages, setChatMessages] = useState([]);

useEffect ( () => {
    
    const unsubscribe = firebase.firestore()
                        .collection('chats')
                        .doc(id)
                        .collection('messages')
                        .orderBy('timestamp' , 'desc')
                        .onSnapshot((snapshot) => 
                        setChatMessages(snapshot.docs.map((doc) =>doc.data()
                        )
                        ));
        return unsubscribe;
});

    return (
        <ListItem 
        key={id} 
        bottomDivider
        onPress={() => enterChat(id,chatName)}
        >
        <Avatar 
            rounded 
            source={require('../assets/images/defaultavatar.png')}
            />
            <ListItem.Content>
                <ListItem.Title style={styles.title}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'> 
                        {chatMessages?.[0]?.displayName}:{chatMessages?.[0]?.message}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    );
};

export default CustomListItem;

const styles = StyleSheet.create({
    title:{
        fontWeight:'bold'
    },
})


