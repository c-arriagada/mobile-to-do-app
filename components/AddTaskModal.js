import React, { useState } from "react";
import { View, StyleSheet, Alert, Platform } from "react-native";
import { TextInput, Button, Modal } from "react-native-paper";
import Icon from "react-native-vector-icons/AntDesign";

export default AddTaskModal = ({ modalVisible, addTask, setModalVisible }) => {
  const [taskTitle, setTaskTitle] = useState("");

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleAddTask = () => {
    if (taskTitle.trim()) {
      addTask({ title: taskTitle.trim(), isCompleted: false });
      setTaskTitle("");
      setModalVisible(false);
    } else {
      Alert.alert("Please add a new task.");
    }
  };

  return (
    <Modal style={styles.container} visible={modalVisible}>
      <Button style={styles.closeButton} onPress={closeModal}>
        <Icon name="close" size={25} color="gray" />
      </Button>
      <View style={styles.newTaskBox}>
        <TextInput
          mode="flat"
          style={[
            styles.textInput,
            Platform.OS === "web" && {
              boxShadow: "none",
              border: "none",
              outline: "none",
            },
          ]}
          contentStyle={styles.textInputContent}
          underlineColor="transparent"
          activeUnderlineColor="#6BA2EA"
          value={taskTitle}
          onChangeText={setTaskTitle}
          placeholder="Add a new task"
          keyboardType="default"
        />
        <Button style={styles.button} onPress={handleAddTask}>
          <Icon name="enter" size={20} color="gray"></Icon>
        </Button>
      </View>
    </Modal>
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
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "lightgray",
  },
  textInput: {
    width: "80%",
    backgroundColor: "transparent",
    height: 50,
  },
  textInputContent: {
    backgroundColor: "transparennt",
    borderWidth: 0,
    paddingLeft: 10,
  },
  button: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    alignItems: "flex-start",
    bottom: 230,
    left: -10,
    zIndex: 1,
  },
});
