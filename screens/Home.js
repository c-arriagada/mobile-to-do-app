import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import { DB_CONNECTION_STRING } from "@env";
import { Database } from "@sqlitecloud/drivers";

export default Home = ({ navigation, route }) => {
  const [taskList, setTaskList] = useState([]);
  const [checked, setChecked] = useState(false); //TODO: check individual tasks versus the whole task list

  const db = new Database({
    connectionstring: DB_CONNECTION_STRING,
    usewebsocket: true,
  });

  const today = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = today.toLocaleDateString("en-US", options);

  const newTask = route.params ? route.params.task : undefined;

  const handleIconPress = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    async function createTable() {
      try {
        const result = await db.sql(
          "USE DATABASE todo.sqlite; CREATE TABLE IF NOT EXISTS tasks (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, task TEXT NOT NULL);"
        );
        console.log(result);

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
            "INSERT INTO tasks (task) VALUES (?)",
            newTask
          );
          console.log("Added new task");
        }
        const result = await db.sql`SELECT * FROM tasks`;
        console.log(result);
        setTaskList(result.map((task) => task.task));
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
          <View style={styles.taskRow}>
            <Text>{item}</Text>
            <TouchableOpacity onPress={handleIconPress}>
              <Icon name={checked ? "check-circle" : "circle-thin"} size={20} />
            </TouchableOpacity>
          </View>
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
  taskRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 16,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    padding: 10,
  },
  taskList: {
    paddingTop: 40,
  },
});
