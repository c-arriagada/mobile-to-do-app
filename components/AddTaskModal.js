import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Modal } from "react-native-paper";
import Icon from "react-native-vector-icons/AntDesign";

export default AddTaskModal = ({modalVisible, addTask, setModalVisible}) => {
  const [task, setTask] = useState({});

  return (
    <Modal style={styles.container} visible={modalVisible}>
      <View style={styles.newTaskBox}>
        <TextInput
          underlineColor="transparent"
          style={styles.textInput}
          value={task}
          onChangeText={(task) => setTask({title: task, isCompleted: false})}
          placeholder="add a new task"
          // keyboardType="default" // TODO: test keyboard in iphone
        />
        <Button
          style={styles.button}
          onPress={() => {
            addTask(task)
            setModalVisible(false)
          }}
        >
          <Icon name="enter"></Icon>
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
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: "lightgray",
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    backgroundColor: "white",
  },
  button: {
    height: 50,
    width: 50,
    borderRadius: 0,
  },
});
