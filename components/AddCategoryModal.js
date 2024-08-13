import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';

export default AddCategoryModal = ({ navigation, route }) => {
  const [category, setCategory] = useState('');
  const { addNewCategory } = route.params;

  function handleAddCategory() {
    if (category) {
      addNewCategory(category);
      navigation.goBack();
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.newCategoryBox}>
        <TextInput
          style={styles.textInput}
          label="category"
          value={category}
          onChangeText={(category) => setCategory(category)}
          placeholder="add a new category"
          keyboardType="default"
        />
        <Button style={styles.button} onPress={handleAddCategory}>
          <Icon name="enter"></Icon>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  newCategoryBox: {
    flexDirection: 'row',
  },
  textInput: {
    width: '75%',
    backgroundColor: 'white',
  },
});
