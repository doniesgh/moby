import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { colors, parameters } from "../global/styles";

const CalendrierScreen = () => {
  const [selectedDate, setSelectedDate] = useState("");

  const onDayPress = (day) => {
   setSelectedDate(day.dateString);
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={onDayPress}
        markedDates={{ [selectedDate]: { selected: true } }}
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
});

export default CalendrierScreen;
