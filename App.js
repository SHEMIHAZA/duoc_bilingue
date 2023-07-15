import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StackNavigator from './StackNavigator';
import { ModalPortal } from 'react-native-modals';


export default function App() {
  return (
    <>
      <StackNavigator/>
      <ModalPortal/>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#272525',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
