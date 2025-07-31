//npm install @react-navigation/native @react-navigation/native-stack
//npx expo install react-native-screens react-native-safe-area-context
//npm install @react-navigation/native-stack

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//import das telas do app
import Home from "./src/Telas/Home";
import Login from "./src/Telas/Login";
import Map from "./src/Telas/Map";
import Sensor from "./src/Telas/Sensor";
import Splash from "./src/Telas/Splash";

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Login'
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;