import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {BASE_URL }from "../../config"
import React, { createContext, useEffect, useState } from "react";
export const AuthContext = createContext();
//import { useNavigation } from '@react-navigation/native';

export const AuthProvider = ({ children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const res = await axios.post("http://192.168.163.90:4000/api/user/login", {
        email,
        password,
      });
      console.log(res.data);
      setUserToken(res.data.token);
      setUserInfo(res.data);
      await AsyncStorage.multiSet([
        ["userToken", res.data.token],
        ["userInfo", JSON.stringify(res.data)],
      ]);
      setIsLoading(false);
    } catch (error) {
      console.log(`Login error ${error}`);
      setIsLoading(false);
    }
  };
  

  const logout = async () => {
    setIsLoading(true);

    try {
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("userInfo");
      setUserToken(null); // Mettre à jour l'état de l'utilisateur ici
      console.log("Token removed successfully");
    } catch (error) {
      console.log("Error removing Token: ", error);
    }

    setIsLoading(false);
  };
  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userToken = await AsyncStorage.getItem("userToken");
      let userInfo = await AsyncStorage.getItem("userInfo");
      userInfo = JSON.parse(userInfo);
      console.log("User Token:", userToken);
      console.log("User Info:", userInfo);
      if (userInfo) {
        setUserToken(userToken);
        setUserInfo(userInfo);
      }
    } catch (e) {
      console.log("error", e);
    } finally {
      setIsLoading(false);
    }
  };
  
  
  

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{ login, logout, isLoggedIn,isLoading, userToken, userInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
