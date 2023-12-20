import {  StyleSheet, Text, View } from 'react-native'
import React,{useState,useRef,useEffect} from 'react'
import Reanimated from 'react-native-reanimated';
import tw from 'twrnc';
import AppLoading from 'expo-app-loading'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'; 
import RoootNavigator from './src/navigation/rootNavigator'
import AuthProvider from './src/contexts/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './src/navigation/AppStack';
import AppStack from './src/navigation/AppStack';
import AppNav from './src/navigation/AppNav';
import * as Notifications from 'expo-notifications';
import { HelpRecContextProvider } from './src/contexts/RecContext';
import TabNavigator from './src/navigation/TabNavigator';

const App = () => {
  SplashScreen.preventAutoHideAsync();
  SplashScreen.hideAsync();

  let [fontsLoaded] = useFonts({
    'Poppins-Bold': require('./assets/Poppins/Poppins-Bold.ttf'),
    'Poppins-Light': require('./assets/Poppins/Poppins-Light.ttf'),

  })
  if (!fontsLoaded){
    return
    <AppLoading/>
  }
  return (
    <AuthProvider>
      <HelpRecContextProvider>
     <AppNav/>
     </HelpRecContextProvider>
     </AuthProvider> 
    
  )
  
}
export default App
