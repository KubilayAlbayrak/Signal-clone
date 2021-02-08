import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import MainNavigation from './src/navigation/MainNavigation';
import * as firebase from "firebase";
import apiKeys from './src/config/keys';

export default function App() {

  if (!firebase.apps.length) {
    console.log('Connected with Firebase')
    firebase.initializeApp(apiKeys.firebaseConfig);
  }

  return (
      <MainNavigation />
  );
}

