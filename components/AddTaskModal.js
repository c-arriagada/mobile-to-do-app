import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

export default AddTaskModal = () => {
  return (
    <View style={styles.container}>
      <TextInput placeholder="add a new task" keyboardType="default"/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
});
