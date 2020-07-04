import React, {Component} from 'react';
import {View} from 'react-native';
//import Icon from 'react-native-vector-icons/FontAwesome';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
import Login from './pages/login';
import Main from './pages/main';
import Perfil from './pages/perfil'

function TabBottom(isSigned=false) {

  return (
    <Tab.Navigator initialRouteName={isSigned ? 'Main' : 'Perfil'}>
      <Tab.Screen  name="Main" component={Main} ptions={{tabBarLabel:'Main'}}/>
      <Tab.Screen name="Perfil" component={Perfil}  options={{tabBarLabel:'Perfil'}}/>
    </Tab.Navigator>
  );
}
export default function MyStack(isSigned = false) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isSigned ? 'Login' : 'Main'}>
      <Stack.Screen name="Login" options={{headerShown: false}} component={Login} />
        <Stack.Screen name="Routes" component={TabBottom} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
