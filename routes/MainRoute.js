import { createStackNavigator } from '@react-navigation/stack';
import MainPage from '../screens/MainPage';

const Stack = createStackNavigator();

function MainRoute() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={MainPage} />
    </Stack.Navigator>
  );
}

export default MainRoute