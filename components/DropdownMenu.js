import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Menu, Button } from "react-native-paper";

export default DropdownMenu = ({ tagsList, setSelectedTag }) => {
  // const [tag, setTag] = useState("");
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View style={styles.container}>
      <Menu
        style={styles.menu}
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Button style={styles.button} onPress={openMenu}>
            Add a tag
          </Button>
        }
      >
        <FlatList
          data={tagsList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Menu.Item
              style={styles.menuItem}
              onPress={() => {
                setSelectedTag(item);
              }}
              title={item.name}
            />
          )}
        />
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    height: 50,
    justifyContent: "center",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
    color: "white",
  },
  menuItem: {
    backgroundColor: "#f0f5fd",
  },
});
