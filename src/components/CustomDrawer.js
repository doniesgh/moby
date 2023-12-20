import React,{useContext,useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import {AuthContext} from '../contexts/AuthContext'
import {View,Text,Image,TouchableOpacity } from 'react-native';
import {DrawerContentScrollView,DrawerItemList} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
 const CustomDrawer = (props) => {
    const { logout } = useContext(AuthContext);
    const navigation = useNavigation(); // Define the navigation variable

  const handleLogout = () => {
    // Define the logout function
    logout(); // Call the logout function
    navigation.navigate("Login"); // Navigate to the Login screen
  };
    
  return (
    <View style={{flex: 1}}>
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{backgroundColor: '#cc1d45'}} >
    
        <Image
          source={require('../../assets/user.png')}
          style={{height: 80, width: 80, borderRadius: 40, padding:10 , marginLeft:20 , marginTop:20}}
        />
        <Text
          style={{
            color: '#fff',
            fontSize: 18,
            fontFamily: 'Poppins-Light',
            marginBottom: 5,
            padding:10
          }}>
          Donia Gharbi
        </Text>
     
      <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
    <View style={{padding: 10, borderTopWidth: 1, borderTopColor: '#ccc'}}>
    <TouchableOpacity onPress={()=>{
          handleLogout ()
        }} style={{ paddingVertical: 15 }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Ionicons name="exit-outline" size={22} />
          <Text
            style={{
              fontSize: 15,
              fontFamily: 'Poppins-Light',
              marginLeft: 5,
            }}>
            Se déconnecter
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  </View>
    
    
  )
}
export default CustomDrawer;