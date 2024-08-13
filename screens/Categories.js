import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Card, Text } from 'react-native-paper';

const Categories = ({ navigation }) => {
  const today = new Date();
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const dayIndex = today.getDay();
  const monthDate = today.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  });

  const [moreCategories, setMoreCategories] = useState(['Work', 'Personal']);

  function addNewCategory(newCategory) {
    setMoreCategories([...moreCategories, newCategory]);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text variant="bodyLarge" style={[styles.content, styles.text]}>
        {days[dayIndex]}
      </Text>
      <Text
        variant="headlineSmall"
        style={[
          styles.content,
          {
            color: '#000',
          },
        ]}
      >
        {monthDate}
      </Text>
      <View style={styles.cardRow}>
        <Card
          style={styles.card}
          onPress={() => navigation.navigate('Home')}
          mode="contained"
        >
          <Card.Title
            left={(props) => (
              <Avatar.Icon
                {...props}
                icon="inbox-outline"
                color={styles.icon.color}
                style={styles.icon}
              />
            )}
          />
          <Card.Content>
            <Text variant="bodyMedium" style={styles.text}>
              Inbox
            </Text>
          </Card.Content>
        </Card>

        {moreCategories.map((category, index) => (
          <Card
            key={index}
            style={styles.card}
            onPress={() => navigation.navigate('Home')}
            mode="contained"
          >
            <Card.Title
              left={(props) => (
                <Avatar.Icon
                  {...props}
                  icon="tag-outline"
                  color={styles.icon.color}
                  style={styles.icon}
                />
              )}
            />
            <Card.Content>
              <Text variant="bodyMedium" style={styles.text}>
                {category}
              </Text>
            </Card.Content>
          </Card>
        ))}

        <Card
          style={styles.addCard}
          onPress={() =>
            navigation.navigate('Add Category', { addNewCategory })
          }
          mode="contained"
        >
          <Card.Title
            left={(props) => (
              <Avatar.Icon
                {...props}
                icon="plus-circle-outline"
                color={styles.addIcon.color}
                style={styles.addIcon}
              />
            )}
          />
          <Card.Content>
            <Text variant="bodyMedium" style={styles.hiddenText}>
              Add a Category
            </Text>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

Categories.title = 'Categories';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  content: {
    padding: 10,
  },
  cardRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#cfe2f8',
    margin: 5,
    flex: 1,
    maxWidth: '48%',
    minWidth: '47%',
  },
  addCard: {
    backgroundColor: '#fff',
    border: 'dashed #6BA2EA',
    margin: 5,
    flex: 1,
    maxWidth: '48%',
  },
  icon: {
    backgroundColor: '#cfe2f8',
    color: '#6b7280',
  },
  addIcon: {
    backgroundColor: '#fff',
    color: '#6BA2EA',
  },
  text: {
    color: '#6b7280',
    paddingLeft: 10,
  },
  hiddenText: {
    visibility: 'hidden',
  },
});

export default Categories;
