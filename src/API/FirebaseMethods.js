import * as firebase from 'firebase';
import 'firebase/firestore';
import {Alert} from 'react-native';


export async function registration (firstName,lastName,password,email,photoUrl){
    try{
        await firebase.auth().createUserWithEmailAndPassword(email,password);
        const currentUser = firebase.auth().currentUser;

        const db = firebase.app().firestore();
        db.collection('users')
        .doc(currentUser.uid)
        .set({
            firstName:firstName,
            lastName:lastName,
            email:currentUser.email,
            photoUrl:currentUser.photoUrl
        })
    } catch(err){
        Alert.alert('There is something wrong' , err.message)
    }
}


export async function signIn(email,password){
    try{
        await firebase.auth().signInWithEmailAndPassword(email,password);
    } catch(err){
        Alert.alert('There is something wrong' , err.message)
    }
}


export async function loggingOut () {
    try{
        await firebase.auth().signOut();
    } catch(err){
        Alert.alert('There is something wrong' , err.message)
    }
}