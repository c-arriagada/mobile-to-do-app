import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Swipeable } from "react-native-gesture-handler";

export default TaskRow = ({ item, handleIconPress, handleDelete }) => {
  const { id, title, isCompleted } = item;
  const [checked, setChecked] = useState(isCompleted);

  const renderLeftActions = () => {
    return (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => {
            handleDelete(id)
        }}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderLeftActions={renderLeftActions}>
      <View style={styles.taskRow}>
        <Text>{title}</Text>
        <TouchableOpacity onPress={handleIconPress}>
          <Icon
            name={isCompleted === 1 ? "check-circle" : "circle-thin"}
            size={20}
            color={"#6BA2EA"}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.dottedBox} />
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
    borderColor: "lightgray",
    borderStyle: "dashed",
  },
  deleteButtonText: {
    color: "white",
  },
});
