import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert, Platform } from "react-native";
import { TextInput, Button, Modal } from "react-native-paper";
import Icon from "react-native-vector-icons/AntDesign";
import DropdownMenu from "./DropdownMenu";
import db from "../db/dbConnection";

export default AddTaskModal = ({ modalVisible, addTaskTag, setModalVisible }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [tagsList, setTagsList] = useState([]);
  const [selectedTag, setSelectedTag] = useState({})

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleAddTask = () => {
    if (taskTitle.trim()) {
      addTaskTag({ title: taskTitle.trim(), isCompleted: false }, selectedTag);
      setTaskTitle("");
      setSelectedTag({})
      setModalVisible(false);
    } else {
      Alert.alert("Please add a new task.");
    }
  };

  const getTags = async () => {
    try {
      const tags = await db.sql("SELECT * FROM tags");
      setTagsList(tags);
    } catch (error) {
      console.error("Error getting tags", error);
    }
  };

  useEffect(() => {
    getTags()
  }, [])

  return (
    <Modal
      style={styles.container}
      visible={modalVisible}
      onDismiss={closeModal}
    >
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
      <DropdownMenu tagsList={tagsList} setSelectedTag={setSelectedTag}/>
      <Button textColor="white" style={styles.addTaskButton} onPress={() => {
        console.log(`Adding task ${taskTitle} and tag ${selectedTag.name}` )
        handleAddTask()
      }}>Add task</Button>
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
    bottom: 180,
    left: -10,
    zIndex: 1,
  },
  addTaskButton: {
    backgroundColor: "#6BA2EA",
    marginTop: 10
  }
});
