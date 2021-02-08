import {StatusBar} from 'expo-status-bar';
import React,{useEffect, useState} from 'react';
import {View,Text,StyleSheet,KeyboardAvoidingView, Alert} from 'react-native';
import {Button,Input,Image} from 'react-native-elements';
import {signIn} from '../API/FirebaseMethods';
import * as firebase from 'firebase';


const LoginScreen = ({navigation}) => {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');



const signInHandler =() => {
    firebase.auth().onAuthStateChanged((user) => {
        if(user){
            navigation.replace('HomeScreen')
        }else {}});
    if(!email) {
        Alert.alert('Email field is required');
    }
    if(!password){
        Alert.alert('Password is required');
    };
    signIn(email,password);
    setEmail('');
    setPassword('');

};

    return(
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style='light' />
            <Image 
            source={require('../assets/images/signallogo.png')}
            style={styles.signallogo}
            />
            <View style={styles.logintextinput}>
                <Input 
                placeholder='Email' 
                autoFocus={true} 
                keyboardType='email-address' 
                value={email}
                onChangeText={(email)=> setEmail(email)}
                />
                <Input 
                placeholder='Password' 
                secureTextEntry={true} 
                keyboardType='default'
                value={password}
                onChangeText={(password)=> setPassword(password)}
                />
            </View>
            <Button  
            title='Login' 
            onPress={signInHandler} 
            containerStyle={styles.button}
            />
            <Button  
            title='Register'
            onPress={() => navigation.navigate('RegisterScreen')} 
            type='outline' 
            containerStyle={styles.button} />
        </KeyboardAvoidingView>
    )
};


export default LoginScreen;

export const loginScreenOptions = () => {
    return {
    headerStyle:{backgroundColor:'#2C6BED'},
    headerTitle:'Login',
    headerTitleStyle:{
        marginLeft:160
    }
    }
};

const styles = StyleSheet.create({
    signallogo:{
        width:200,
        height:200,
        marginBottom:40,
        borderRadius:20
    },
    logintextinput:{
        width:300
    },
    button:{
        width:200,
        marginTop:10
    },
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:10,
        backgroundColor:'white'
    }
});

