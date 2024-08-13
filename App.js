import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Cover from './screens/Cover';
import Categories from './screens/Categories';
import AddCategoryModal from './components/AddCategoryModal';
import Home from './screens/Home';
import AddTaskModal from './components/AddTaskModal';
import { TaskProvider } from './TaskContext';

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <TaskProvider>
        <PaperProvider>
          <Stack.Navigator>
            <Stack.Screen name="Cover" component={Cover} />
            <Stack.Screen name="Categories" component={Categories} />
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
              <Stack.Screen name="Add Category" component={AddCategoryModal} />
            </Stack.Group>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
              <Stack.Screen name="Add Task" component={AddTaskModal} />
            </Stack.Group>
          </Stack.Navigator>
        </PaperProvider>
      </TaskProvider>
    </NavigationContainer>
  );
}
