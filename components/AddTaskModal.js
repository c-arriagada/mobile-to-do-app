import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Modal } from "react-native-paper";
import Icon from "react-native-vector-icons/AntDesign";

export default AddTaskModal = ({ modalVisible, addTask, setModalVisible }) => {
  const [task, setTask] = useState({});

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <Modal style={styles.container} visible={modalVisible}>
      <Button style={styles.closeButton} onPress={closeModal}>
        <Icon name="close" size={25} color="gray" />
      </Button>
      <View style={styles.newTaskBox}>
        <TextInput
          mode="flat"
          style={styles.textInput}
          underlineColor="transparent"
          activeUnderlineColor="#6BA2EA"
          value={task}
          onChangeText={(task) => setTask({ title: task, isCompleted: false })}
          placeholder="add a new task"
          keyboardType="default"
        />
        <Button
          style={styles.button}
          onPress={() => {
            if (task?.title) {
              addTask(task);
              setTask({})
              setModalVisible(false);
            } else {
              Alert.alert("Please add a new task.");
            }
          }}
        >
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
    borderWidth: 0,
    height: 50,
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
  },
});
