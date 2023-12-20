import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
//import DrawerNavigator from './DrawerNavigator';
import AppStack from './AppStack';
import TabNavigator from './TabNavigator';
//import LoginScreen from '../screens/LoginScreen';


    export default function RoootNavigator() {
        //const [userAuthenticated, setUserAuthenticated] = useState(false);
      
        return (
          <NavigationContainer>
             <DrawerNavigator /> 
          </NavigationContainer>
        )
      }