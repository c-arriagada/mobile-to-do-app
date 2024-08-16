import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import db from "../db/dbConnection";
import TaskRow from "../components/TaskRow";
import AddTaskModal from "../components/AddTaskModal";

export default Home = ({ route }) => {
  const [taskList, setTaskList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const tag = route.params?.category;

  const today = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = today.toLocaleDateString("en-US", options);

  const updateTask = async (completedStatus, taskId) => {
    try {
      const task = await db.sql(
        "UPDATE tasks SET isCompleted=? WHERE id=? RETURNING *",
        completedStatus,
        taskId
      );
      getTasks();
    } catch (error) {
      console.error("Error updating tasks", error);
    }
  };

  const getTasks = async () => {
    try {
      if (tag) {
        const result = await db.sql(
          "SELECT tasks.*, tags.id AS tag_id, tags.name AS tag_name FROM tasks JOIN tasks_tags ON tasks.id = tasks_tags.task_id JOIN tags ON tags.id = tasks_tags.tag_id WHERE tag_name=?",
          tag
        );
        setTaskList(result);
      } else {
        const result =
          await db.sql`SELECT tasks.*, tags.id AS tag_id, tags.name AS tag_name FROM tasks JOIN tasks_tags ON tasks.id = tasks_tags.task_id JOIN tags ON tags.id = tasks_tags.tag_id`;
        setTaskList(result);
      }
    } catch (error) {
      console.error("Error getting tasks", error);
    }
  };

  const addTaskTag = async (newTask, tag) => {
    try {
      const addNewTask = await db.sql(
        "INSERT INTO tasks (title, isCompleted) VALUES (?, ?) RETURNING *",
        newTask.title,
        newTask.isCompleted
      );
      addNewTask[0].tag_id = tag.id;
      addNewTask[0].tag_name = tag.name;
      setTaskList([...taskList, addNewTask[0]]);
      await db.sql(
        "INSERT INTO tasks_tags (task_id, tag_id) VALUES (?, ?)",
        addNewTask[0].id,
        tag.id
      );
    } catch (error) {
      console.error("Error adding task to database", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const result = await db.sql("DELETE FROM tasks WHERE id=?", taskId);
      console.log(`deleted ${result[0].TOTAL_CHANGES} task`);
      getTasks();
    } catch (error) {
      console.error("Error deleting task", deleteTask);
    }
  };

  const handleDelete = (taskId) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this task?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => deleteTask(taskId),
          style: "destructive",
        },
      ]
    );
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{formattedDate}</Text>
      <FlatList
        style={styles.taskList}
        data={taskList}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => (
          <TaskRow
            task={item}
            updateTask={updateTask}
            handleDelete={handleDelete}
          />
        )}
      />
      <Button
        style={styles.button}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Icon name="plus" color={"white"} />
      </Button>
      <AddTaskModal
        modalVisible={modalVisible}
        addTaskTag={addTaskTag}
        setModalVisible={setModalVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  date: {
    color: "gray",
    marginTop: 50,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#6BA2EA",
    position: "absolute",
    bottom: 70,
    right: 20,
  },
  taskList: {
    paddingTop: 40,
  },
});
