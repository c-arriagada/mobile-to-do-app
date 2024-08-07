import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Button, PaperProvider } from "react-native-paper";

export default function App() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.heading}>Organize Your</Text>
        <Text style={styles.heading}>Tasks with SQLite</Text>
        <Text>Designed for Happiness, Not Just Profuctivity.</Text>
        <Text>Enjoy a Stress-free Way to Manage Your Day.</Text>
        <Button
          style={styles.button}
          buttonColor="#6BA2EA"
          textColor="white"
          onPress={() => console.log("Get started button pressed")}
        >
          Get started
        </Button>
        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: 15,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 40,
    marginBottom: 5,
  },
  button: {
    position: "absolute",
    bottom: 70, // 50 units from the top
    right: 20, // 20 units from the left
  },
});
