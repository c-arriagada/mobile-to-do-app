import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";

export default Home = ({ navigation, route }) => {
  const [taskList, setTaskList] = useState([]);
  const [checked, setChecked] = useState(false)

  const today = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = today.toLocaleDateString("en-US", options);

  const newTask = route.params ? route.params.task : undefined;

  const handleIconPress = () => {
    setChecked(!checked)
  }

  useEffect(() => {
    if (newTask) {
      setTaskList([...taskList, newTask]);
    }
  }, [newTask]);

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{formattedDate}</Text>
      <FlatList
        data={taskList}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => (
          <View style={styles.taskRow}>
            <Text>{item}</Text>
            <TouchableOpacity onPress={handleIconPress}>
            <Icon name={checked ? "check-circle" : "circle-thin"} size={20}/>
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
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    padding: 10
  }
});
