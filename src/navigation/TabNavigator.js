import React, { useState ,useEffect,useContext} from "react";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import HomeScreen from "../screens/HomeScreen";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NotificationScreen from "../screens/NotificationScreen";
import ProfileScreen from "../screens/ProfilScreen";
import LoginScreen from '../screens/LoginScreen';
import { AuthContext } from "./../contexts/AuthContext";

const Tab = createBottomTabNavigator();
import Ionicons from "react-native-vector-icons/Ionicons";

const Stack = createNativeStackNavigator();
const HomeStack = () => {
  return (
    <Stack.Navigator  screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

const TabNavigator = () =>{
const [notifications, setNotifications] = useState([]);
const { userInfo } = useContext(AuthContext);

useEffect(() => {
  const fetchNotifications = async () => {
    try {
      const response = await fetch("http://172.16.1.140:4000/api/notification/get", {
        headers: {
          Authorization: `Bearer ${userInfo.token}`, 
        },
      });
      const data = await response.json();
      setNotifications(data.notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };  
  fetchNotifications(); // Call the fetchNotifications function
}, []);
    return(
        <Tab.Navigator
        screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {backgroundColor: '#fee2e2'},
            tabBarInactiveTintColor: 'black',
            tabBarActiveTintColor: 'red',
          }}>
        <Tab.Screen name="Home1" component={HomeStack}
        options={({route})=>({
            //tabBarStyle :{display:'none'},
            tabBarIcon: ({color, size}) => (
                <Ionicons name="home-outline" color={color} size={size} />
              ),
            })
          }/>
  
         <Tab.Screen name="Notification" component={NotificationScreen} options={{
        //tabBarBadge: notifications.length, 
        tabBarIcon: ({color, size}) => (
          <Ionicons name="chatbox-ellipses-outline" color={color} size={size} />
        ), }}/>

          <Tab.Screen name="Profile" component={ProfileScreen}
        options={{
            tabBarIcon: ({color, size}) => (
                <Ionicons name="person-outline" color={color} size={size} />
              ),
            }
          }/>
        </Tab.Navigator> 
         
    )


}
export default TabNavigator;