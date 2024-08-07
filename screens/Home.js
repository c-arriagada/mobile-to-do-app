import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";
// import Tooltip from "react-native-walkthrough-tooltip";

export default Home = ({navigation}) => {
  const [taskList, setTaskList] = useState([]);

  const today = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = today.toLocaleDateString("en-US", options);

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{formattedDate}</Text>
          <Button
            style={styles.button}
            onPress={() => {
              navigation.navigate("Add Task")
            }}
          >
            <Icon name="plus" color={"white"}></Icon>
          </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  date: {
    color: "gray",
    marginTop: 50,
  },
  button: {
    backgroundColor: "#6BA2EA",
    position: "absolute",
    bottom: 70, // 50 units from the top
    right: 20, // 20 units from the left
  },
});
