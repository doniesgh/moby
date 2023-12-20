/*import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';

export default function ScannerQR() {
  const [hasPermission, setHasPermission] = React.useState(false);
  const [scanData, setScanData] = React.useState();
  const navigation = useNavigation();

  useEffect(() => {
    (async() => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text>Authorization d'utilisation de la caméra</Text>
      </View>
    );
  }

  const handleBarCodeScanned = ({type, data}) => {
    setScanData(data);
    console.log(`Data: ${data}`);
    console.log(`Type: ${type}`);
    navigation.goBack('Reclamation'); // Cette ligne permet de revenir à l'écran précédent
  };
  

  return (
    <View style={styles.container}>
      <BarCodeScanner 
        style={StyleSheet.absoluteFillObject}
        onBarCodeScanned={scanData ? undefined : handleBarCodeScanned}
        />
      {scanData && <Button title='Scanner une autre fois?' onPress={() => setScanData(undefined)} />}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function ScannerQR() { 
  const { userInfo } = useContext(AuthContext);
  const [hasPermission, setHasPermission] = useState(false);
  const [reclamations, setReclamations] = useState([]);
  const [scanData, setScanData] = useState();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [formVisible, setFormVisible] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const [scanDate, setScanDate] = useState("");
  const [scanTime, setScanTime] = useState("");
  const [description, setDescription] = useState("");
  const heurecloture = route.params?.heurecloture || null;
  const [loading, setLoading] = useState(false);
  const [reported, setReported] = useState(false);
  // const [selectedReclamationId, setSelectedReclamationId] = useState(null);

  const handleButtonCloturer = async (reclamationId) => {
    if (reclamationId === null) {
      console.error(
        "ReclamationId is null. Cannot proceed with the request.",
        reclamationId
      );
      return;
    }

    try {
      // Make a request to update the reclamation status on the server
      const url = `http://192.168.163.90:4000/api/rec/cloture/${reclamationId}/cloture`;
      console.log("Request URL:", url);

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      if (response.ok) {
        // Log the updated status
        const updatedStatusData = await response.json();
        console.log("Status updated:", updatedStatusData.reclamation.etat);
      } else {
        // Handle the case where the server request to update status is not successful
        console.error("Error updating reclamation status:", response.status);
        // You can handle this error, show an error message, or perform other actions
      }
    } catch (error) {
      console.error("Error:", error);
      console.error("Response status:", error.status);
    }
  };

  const handleBarCodeScanned = ({ type, data, reclamationId }) => {
    setScanData(data);
    console.log(`Data: ${data}`);
    console.log(`Type: ${type}`);
    console.log("reclamationId", reclamationId); //undefiend
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDate.toLocaleTimeString();
    setScanDate(formattedDate);
    setScanTime(formattedTime);
    setShowModal(true);
  };

  const handlecloture = (data, reclamationId) => {
    setShowModal(true);
    console.log("reclamationid", reclamationId);
    console.log("data", data);
  };

  const showForm = () => {
    setFormVisible(true);
  };

  return (
    <View style={styles.container}>
      <BarCodeScanner
        style={StyleSheet.absoluteFillObject}
        onBarCodeScanned={scanData ? undefined : handleBarCodeScanned}
      />
      <View style={styles.rectangleContainer}>
        <View style={styles.rectangle} />
      </View>
      <Modal visible={showModal} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={{
                position: "absolute",
                top: 7,
                right: 9,
                padding: 10,
                zIndex: 1, // Pour garantir que le bouton 'x' est au-dessus des autres éléments
              }}
              onPress={() => {
                setFormVisible(false);
                setShowModal(false);
              }}
            >
              <Ionicons name="close-circle" size={30} color="red" />
            </TouchableOpacity>
            {formVisible ? (
              <View>
                <Text
                  style={{
                    color: "red",
                    marginLeft: 80,
                    fontFamily: "Poppins-Bold",
                    fontSize: 17,
                  }}
                >
                  Fiche Intervention
                </Text>
                <View
                  style={{ flexDirection: "row", marginTop: 20, fontSize: 40 }}
                >
                  <View>
                    <Text style={styles.label}>Numero Rapport :</Text>
                    <Text style={styles.label}>type :</Text>
                    <Text style={styles.label}>client :</Text>
                    <Text style={styles.label}>Heure Debut :</Text>
                    <Text style={styles.label}>Heure Cloture :</Text>
                    <Text style={styles.label}>Action Envisagée:</Text>
                  </View>

                  <View>
                    <TextInput
                      style={styles.input}
                      placeholder="Numero Rapport"
                      onChangeText={(text) =>
                        setFormData({ ...formData, numRapport: text })
                      }
                      value={formData.numRapport}
                      autoCapitalize="none"
                      autoCorrect={false}
                      keyboardType="numeric"
                    />

                    <TextInput
                      style={styles.input}
                      placeholder="Type"
                      onChangeText={(text) =>
                        setFormData({ ...formData, type: text })
                      }
                      value={formData.type}
                      autoCapitalize="words"
                      autoCorrect={true}
                    />

                    <TextInput
                      style={styles.input}
                      placeholder="client"
                      onChangeText={(text) =>
                        setFormData({ ...formData, client: text })
                      }
                      value={formData.client}
                      autoCapitalize="sentences"
                      autoCorrect={true}
                    />

                    <TextInput
                      style={styles.input}
                      placeholder="HeureDebut"
                      onChangeText={(text) =>
                        setFormData({ ...formData, heureDebut: text })
                      }
                      value={scanTime}
                      editable={false}
                    />

                    <TextInput
                      style={styles.input}
                      placeholder="HeureCloture"
                      onChangeText={(text) =>
                        setFormData({ ...formData, heureCloture: text })
                      }
                      value={new Date().toLocaleTimeString("fr-FR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      editable={false}
                    />

                    <TextInput
                      style={styles.input}
                      placeholder="Enter description"
                      multiline={true}
                      numberOfLines={4}
                      onChangeText={(text) =>
                        setFormData({ ...formData, description: text })
                      }
                      value={formData.description}
                      autoCapitalize="sentences"
                      autoCorrect={true}
                    />
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleButtonCloturer()}
                >
                  <Text style={{ fontFamily: "Poppins-Light", color: "white" }}>
                    save
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <Text
                  style={{
                    marginTop: 90,
                    fontSize: 20,
                    fontFamily: "Poppins-Bold",
                    color: "#696969",
                  }}
                >
                  J'ai terminé l'intervention
                </Text>

                <TouchableOpacity
                  style={{
                    backgroundColor: "red",
                    width: 100,
                    height: 28,
                    marginBottom: 10,
                    marginTop: 20,
                    borderRadius: 5,
                  }}
                  onPress={() => {
                    handlecloture(scanData);
                    console.log("Bouton Cloturer appuyé");
                    showForm();
                  }}
                >
                  <Text
                    style={{ color: "white", paddingLeft: 25, paddingTop: 4 }}
                  >
                    Cloturer
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  ligne: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginTop: 15,
    marginLeft: 5,
  },
  label: {
    fontSize: 15,
    fontFamily: "Poppins-Light",
    color: "#696969",
    marginBottom: 10,
  },
  input: {
    fontSize: 15,
    borderWidth: 0.3, // Add border width
    borderColor: "#696969", // Add border color
    borderRadius: 3,
    width: 180,
    marginLeft: 20,
    paddingLeft: 8,
    marginBottom: 10,
    color: "#696969",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  rectangleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  rectangle: {
    height: width * 0.7,
    width: width * 0.7,
    borderWidth: 2,
    borderColor: "red",
    backgroundColor: "transparent",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 350,
    alignItems: "center",
    height: 500,
  },
  button: {
    backgroundColor: "red",
    marginTop: 30,
    borderRadius: 4,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 40,
    width: 120,
    marginLeft: 100,
  },
});
