import React, {useState, useEffect, useContext } from "react";
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Button,
    TouchableOpacity,
  } from "react-native";
import { colors, parameters } from "../global/styles";
import { AuthContext } from "./../contexts/AuthContext";


const HistoriqueScreen = () => {
    const [reclamations, setReclamations] = useState([]);
    const { userInfo } = useContext(AuthContext);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://192.168.163.90:4000/api/rec/finaltech', {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${userInfo.token}`
              },
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
              }
      
              const data = await response.json();
              console.log("Response Data:", data);
      
              setReclamations(data.reclamations);
            } catch (error) {
              console.error("Error:", error);
            }
        };
    
        fetchData();
      }, [userInfo.token]);

  return (
    <View style={styles.container}>
    <Text style={styles.text}>Réclamations Finalisées</Text>
      <FlatList
        data={reclamations}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ marginLeft: 4 }}>
                <Text style={styles.te}>
                  <Text style={styles.t}>Id :</Text> {item._id}
                </Text>
                <Text style={styles.te}>
                  <Text style={styles.t}>Client :</Text> {item.client}
                </Text>
                <Text style={styles.te}>
                  <Text style={styles.t}>Equipement :</Text> {item.equipement}
                </Text>
                <Text style={styles.te}>
                  <Text style={styles.t}>Etat :</Text> {item.etat}
                </Text>
              </View>
            </View>
          </View>
        )}
      />

  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingBottom: 30,
    paddingTop: parameters.statusBarHeight,
  },
  text: {
    marginTop: 25,
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    color: colors.tunisys,
    textAlign: "center",
  },
  t: {
    fontFamily: "Poppins-Bold",
    fontSize: 15,
  },
  te: {
    fontFamily: "Poppins-Light",
    fontSize: 15,
  },
  card: {
    marginTop: 10,
    borderRadius: 15, // This might be a string value like '0.75rem' in React Native
    padding: 16, // Use a numeric value for padding
    cursor: "pointer",
    backgroundColor: "#f1f1f3",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.03, // Adjust the shadow opacity
    shadowRadius: 16, // Adjust the shadow radius
    position: "relative",
  },
  b: {
    color: colors.white,
    textAlign: "center",
    padding: 10,
    fontFamily: "Poppins-Bold",
  },
  button: {
    backgroundColor: colors.tunisys,
    borderRadius: 10,
    width: 90,
    height: 40,
  },
});

export default HistoriqueScreen;
