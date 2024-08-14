import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Swipeable } from "react-native-gesture-handler";

export default TaskRow = ({ task, updateTask, handleDelete }) => {
  const { id, title, isCompleted } = task;
  const [checked, setChecked] = useState(isCompleted);

  const handleIconPress = () => {
    const newCompletedStatus = checked === 1 ? 0 : 1;
    setChecked(newCompletedStatus);
    updateTask(newCompletedStatus, id);
  };

  const renderLeftActions = () => {
    return (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => {
          handleDelete(id);
        }}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderLeftActions={renderLeftActions}>
      <View style={styles.taskRow}>
        {checked === 0 ? (
          <Text style={styles.text}>{title}</Text>
        ) : (
          <Text style={styles.strikethroughText}>{title}</Text>
        )}
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
  text: {
    fontSize: 16,
  },
  strikethroughText: {
    textDecorationLine: "line-through",
    textDecorationColor: "#6BA2EA",
    fontSize: 16,
  },
});
