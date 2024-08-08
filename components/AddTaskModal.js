import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/AntDesign";
import { useTaskContext } from "../TaskContext";

export default AddTaskModal = ({ navigation}) => {
  const [task, setTask] = useState("")
  const {taskList, setTaskList} = useTaskContext()

  return (
    <View style={styles.container}>
      <View style={styles.newTaskBox}>
        <TextInput
          style={styles.textInput}
          label="task"
          value={task}
          onChangeText={(task) => setTask(task)}
          placeholder="add a new task"
          keyboardType="default"
        />
        <Button
          style={styles.button}
          onPress={() => {
            setTaskList(...taskList, task);
            navigation.navigate("Home");
          }}
        >
          <Icon name="enter"></Icon>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  newTaskBox: {
    flexDirection: "row",
  },
  textInput: {
    width: "75%",
    backgroundColor: "white",
  },
});
