import {StatusBar} from 'expo-status-bar';
import React,{useLayoutEffect, useState} from 'react';
import { KeyboardAvoidingView,StyleSheet,View,Text,TouchableOpacity,Alert} from 'react-native';
import {Button,Input} from 'react-native-elements';
import { registration } from '../API/FirebaseMethods';

const RegisterScreen = ({navigation}) => {

const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [photoUrl, setPhotoUrl] = useState('');

const emptyState = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setPhotoUrl('');
};


const registerHandler = () => {
    if (!firstName) {
        Alert.alert('First name is required');
      } else if (!email) {
        Alert.alert('Email field is required.');
      } else if (!password) {
        Alert.alert('Password field is required.');
      } else if (!confirmPassword) {
        setPassword('');
        Alert.alert('Confirm password field is required.');
      } else if (password !== confirmPassword) {
        Alert.alert('Password does not match!');
      } else if (!photoUrl) {
        Alert.alert('Photo Url field is required.');
      } else {
          registration(
            firstName , 
            lastName,
            password,
            email,
            photoUrl
          );
          navigation.navigate('LoginScreen');
      }
};


    return (
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar  style='light'/>
            <View style={styles.textview}>
            <Text style={styles.text}>Create a Signal Account</Text>
            </View>
            <View style={styles.inputContainer}>
            <Input 
            placeholder='First Name'
            autoFocus={true}
            type='text'
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
            />
            <Input 
            placeholder='Last Name'
            autoFocus={true}
            type='text'
            value={lastName}
            onChangeText={(text) => setLastName(text)}
            />
            <Input 
            placeholder='Password'
            autoFocus={true}
            type='text'
            value={password}
            onChangeText={(password) => setPassword(password)}
            />
            <Input 
            placeholder='Email'
            autoFocus={true}
            type='text'
            value={email}
            onChangeText={(text) => setEmail(text)}
            />
            <Input 
            placeholder='Retype your password to confirm'
            autoFocus={true}
            type='text'
            value={confirmPassword}
            onChangeText={(password2) => setConfirmPassword(password2)}
            />
            <Input 
            placeholder='Type your Profil Photo Url'
            autoFocus={true}
            type='text'
            value={photoUrl}
            onChangeText={(photoUrl) => setPhotoUrl(photoUrl)}
            />
            <TouchableOpacity style={styles.button} onPress={registerHandler}>
           <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
         </View>
        </KeyboardAvoidingView>
    )
};

export const registerScreenOptions = () => {
    return{
        headerStyle:{
            backgroundColor:'#2C6BED',
        },
        headerTitle:'Register',
        headerTitleStyle:{
            marginLeft:100
        },
        headerBackTitleVisible:true,
        headerBackTitle:'Back to Login',
        headerTruncatedBackTitle:'Back to Login'
    }
};


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white'
    },
    inputContainer:{
        width:300,
    },
    text:{
        fontWeight:'bold',
        fontSize:20
    },
    textview:{
        marginBottom:70
    }
});


export default RegisterScreen;


