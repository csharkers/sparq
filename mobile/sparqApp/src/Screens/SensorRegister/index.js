import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { getLocation } from "../../services/sensorRegister"
import { useState } from "react";
import { useAuth } from '../../context/authContext';

export default function SensorRegister({ navigation }) {

  const {user} = useAuth();
  const [sensorType, setSensorType] = useState('')
  const [sensorName, setSensorName] = useState('')

  return (
    <View style={styles.container}>
      <Text style={styles.nameText}>Digite o nome do sensor:</Text>
      <TextInput
        style={styles.nameTextInput}
        placeholder="Nome"
        onChangeText={(text) => setSensorName(text)}
        value={sensorName}
      >

      </TextInput>
      <Picker
        sensorType={sensorType}
        style={styles.Picker}
        onValueChange={(itemValue) => setSensorType(itemValue)}
      >
        <Picker.Item label="Terrestre" value="terrestre" />
        <Picker.Item label="Aereo" value="aereo" />
      </Picker>
      <TouchableOpacity style={styles.registerButton} onPress={() => getLocation(sensorType, sensorName, user)}>
        <Text>Cadastrar sensor</Text>
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
  Picker: {
    height: 50,
    width: 200
  },
});
