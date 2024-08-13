import React, { useState, useEffect} from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import { DB_CONNECTION_STRING } from "@env";
import { Database } from "@sqlitecloud/drivers";
import TaskRow from "../components/TaskRow";

export default Home = ({ navigation, route }) => {
  const [taskList, setTaskList] = useState([]);

  const db = new Database({
    connectionstring: DB_CONNECTION_STRING,
    usewebsocket: true,
  });

  const today = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = today.toLocaleDateString("en-US", options);

  // TODO: Check state when adding tasks, is adding new tasks twice
  const newTask = route.params ? route.params.task : undefined;
  console.log("task added", newTask);

  const handleIconPress = () => {
    // setChecked(!checked);
  };

  useEffect(() => {
    async function createTable() {
      try {
        const result = await db.sql(
          "USE DATABASE todo.sqlite; CREATE TABLE IF NOT EXISTS tasks (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, isCompleted INT NOT NULL);"
        );

        if (result === "OK") {
          console.log("Successfully created table");
        }
      } catch (error) {
        console.error("Error creating table", error);
      }
    }
    createTable();
  }, []);

  useEffect(() => {
    async function getTasks() {
      try {
        if (newTask !== undefined) {
          const addNewTask = await db.sql(
            "USE DATABASE todo.sqlite; INSERT INTO tasks (title, isCompleted) VALUES (?, ?)",
            newTask, false
          );
          console.log("Added new task");
        }
        const result = await db.sql`USE DATABASE todo.sqlite; SELECT * FROM tasks`;
        console.log("result", result);
        setTaskList(result);
      } catch (error) {
        console.error("Error getting tasks", error);
      }
    }
    getTasks();
  }, [newTask]);

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{formattedDate}</Text>
      <FlatList
        style={styles.taskList}
        data={taskList}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => (
          <TaskRow item={item} handleIconPress={handleIconPress} />
        )}
      />
      <Button
        style={styles.button}
        onPress={() => {
          navigation.navigate("Add Task");
        }}
      >
        <Icon name="plus" color={"white"} />
      </Button>
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
