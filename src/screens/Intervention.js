import React from "react";
import {StyleSheet,Text,View,} from "react-native";
import { colors, parameters } from "../global/styles";


const InterventionScreen = () => {

  return (
    <View style={styles.container}>
      <Text>Hello InterventionScreen </Text>
    </View>
  );
};

export default InterventionScreen ;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
      paddingBottom: 30,
      paddingTop: parameters.statusBarHeight,
    },
})


