import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { colors, parameters } from "../global/styles";
import { AuthContext } from "./../contexts/AuthContext";
import { SwipeListView } from "react-native-swipe-list-view";
//import * as Permissions from "expo-permissions";

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const { userInfo } = useContext(AuthContext);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          "http://192.168.163.90:4000/api/notification/get",
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
        const data = await response.json();
        console.log(data);
        setNotifications(data.notifications || []);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
  }, [userInfo.token]);
  const handleDeleteNotification = async (notificationId) => {
    try {
      const response = await fetch(
        `http://172.16.1.140:4000/api/notification/delete/${notificationId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      if (response.ok) {
        // Update the local state to reflect the deletion
        setNotifications((prevNotifications) =>
          prevNotifications.filter((item) => item._id !== notificationId)
        );
      } else {
        console.error("Error deleting notification");
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const renderNotificationItem = ({ item }) => (
    <View style={styles.card}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ marginLeft: 4 }}>
          <Text style={styles.te}>{item.message}</Text>
          <Text style={styles.te}>
            {new Date(item.createdAt).toLocaleString("fr-FR", {
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderHiddenItem = ({ item }) => (
    <View style={styles.hiddenItem}>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteNotification(item._id)}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {notifications.length > 0 ? (
        <SwipeListView
          data={notifications}
          keyExtractor={(item) => item._id}
          renderItem={renderNotificationItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-75}
        />
      ) : (
        <Text style={styles.pas}>Pas de notifications</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingBottom: 50,
    padding: 9,
    paddingTop: parameters.statusBarHeight,
  },
  text: {
    marginTop: 25,
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    color: colors.tunisys,
    textAlign: "center",
  },
  hiddenItem: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    height: "100%",
  },
  deleteButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 75,
    height: "100%",
  },
  deleteText: {
    color: colors.tunisys,
    fontWeight: "bold",
  },
  t: {
    fontFamily: "Poppins-Bold",
    fontSize: 15,
  },
  te: {
    fontFamily: "Poppins-Light",
    fontSize: 15,
    color: "#FFFF",
  },
  card: {
    marginLeft: 4,
    marginTop: 10,
    borderRadius: 15,
    padding: 15,
    backgroundColor: colors.tunisys,
    display: "flex",
  },
  pas: {
    fontFamily: "Poppins-Bold",
    fontSize: 15,
    marginTop: 25,
    textAlign: "center",
  },
});

export default NotificationScreen;
