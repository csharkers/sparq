//npm install @react-navigation/native @react-navigation/native-stack
//npx expo install react-native-screens react-native-safe-area-context
//npm install @react-navigation/native-stack

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import axios from 'axios';

//import das telas do app
import Home from "./src/Screens/Home";
import Login from "./src/Screens/Login";
import Map from "./src/Screens/Map";
import Sensor from "./src/Screens/Sensor";
import Splash from "./src/Screens/Splash";
import SensorRegister from "./src/Screens/SensorRegister";

//import context
import { AuthProvider } from './src/context/authContext';

const Stack = createNativeStackNavigator();

const MyStack = () => {

  useEffect(() => {
    const BASE_URL = 'http://192.168.0.100/sparq-mobile-api';

    axios.get(`${BASE_URL}/teste.php`)
      .then(res => {
        console.log("Resposta da API:", res.data);
      })
      .catch(err => {
        console.error("Erro na API:", err.message);
      });
  }, []);


  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Splash'
          screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="Home"
            component={Home}
          />
          <Stack.Screen
            name="Login"
            component={Login}
          />
          <Stack.Screen
            name="Map"
            component={Map}
          />
          <Stack.Screen
            name="Sensor"
            component={Sensor}
          />
          <Stack.Screen
            name="Splash"
            component={Splash}
          />
          <Stack.Screen
            name="SensorRegister"
            component={SensorRegister}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default MyStack;