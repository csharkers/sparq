import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from "react-native";
import * as Location from "expo-location";
import { getLocation } from "../../services/sensorRegister"

export default function TelaSensor() {

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => getLocation()}>
        <Text>PEGAR localização</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center"
  },
});
