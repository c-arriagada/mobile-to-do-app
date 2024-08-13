import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Swipeable } from "react-native-gesture-handler";
import { CurrentRenderContext } from "@react-navigation/native";

export default TaskRow = ({ item, handleIconPress }) => {
  const [checked, setChecked] = useState(false); 

  const renderLeftActions = () => {
    return (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => console.log("pressed delete button")}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderLeftActions={renderLeftActions}>
      <View style={styles.taskRow}>
        <Text>{item}</Text>
        <TouchableOpacity onPress={handleIconPress}>
          <Icon
            name={checked ? "check-circle" : "circle-thin"}
            size={20}
            color={"#6BA2EA"}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.dottedBox}/>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  taskRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 16,
    padding: 10,
  },
  deleteButton: {
    backgroundColor: "#6BA2EA",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  dottedBox: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderStyle: 'dashed',
  },
  deleteButtonText: {
    color: "white",
  },
});
