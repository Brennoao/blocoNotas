import { createStackNavigator } from '@react-navigation/stack';
import MainPage from '../screens/MainPage';
import InsideNotes from '../screens/InsideNotes';

const Stack = createStackNavigator();

function MainRoute() {
  return (
    <Stack.Navigator screenOptions={{ headerLeftLabelVisible: false }}>
      <Stack.Screen name="Home" component={MainPage} />
      <Stack.Screen name="InsideNotes" component={InsideNotes} />
    </Stack.Navigator>
  );
}

export default MainRoute