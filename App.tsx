import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Cadastro from './screens/Cadastro';
import Home from './screens/Home';

const Stack = createNativeStackNavigator();



export default function App() {
  return (

    <NavigationContainer>
     <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{headerShown: false }} />
      <Stack.Screen name="Home" component={Home}/>
      <Stack.Screen name="Cadastro" component={Cadastro}/>
     </Stack.Navigator> 
    </NavigationContainer>  
  );
}
