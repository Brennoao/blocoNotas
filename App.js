import 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import MainRoute from './routes/MainRoute';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <MainRoute />
      </NavigationContainer>
      <Toast />
    </PaperProvider>
  );
}