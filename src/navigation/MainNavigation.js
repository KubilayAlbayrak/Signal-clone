import React from 'react';
import {View,Text} from 'react-native';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen , {loginScreenOptions} from '../screens/LoginScreen';
import RegisterScreen ,{registerScreenOptions} from '../screens/RegisterScreen';
import HomeScreen , {homeScreenOptions} from '../screens/HomeScreen';
import AddChatScreen , {addChatScreenOptions} from '../screens/AddChatScreen';
import ChatScreen , {chatScreenOptions} from '../screens/ChatScreen';

const Stack=createStackNavigator();

const MainNavigation =() => {

const globalScreenOptions = {
    headerStyle:{backgroundColor : '#2C6BED'},
    headerTitleStyle:{color:'white'},
    headerTintColor:'white'
    };


    return (
        <NavigationContainer>
        <Stack.Navigator screenOptions={globalScreenOptions}>
            <Stack.Screen name='LoginScreen' component={LoginScreen} options={loginScreenOptions}/>
            <Stack.Screen name='RegisterScreen' component={RegisterScreen} options={registerScreenOptions} />
            <Stack.Screen name='HomeScreen' component={HomeScreen} options={homeScreenOptions} />
            <Stack.Screen name='AddChatScreen' component={AddChatScreen} options={addChatScreenOptions} />
            <Stack.Screen name='ChatScreen' component={ChatScreen} options={chatScreenOptions} />
        </Stack.Navigator>
    </NavigationContainer>
    )
}


export default MainNavigation;
