import React, {Component}  from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import Login from './pages/login'
import Routes from './routes'
export default class App extends Component {
  render() {
  return (
    <View>
    <Login/>
    </View>
  );
};
}
const styles = StyleSheet.create({

});

