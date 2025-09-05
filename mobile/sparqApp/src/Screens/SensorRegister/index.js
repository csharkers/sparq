import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert, Image } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { getLocation } from "../../services/sensorRegister"
import { useState } from "react";
import { useAuth } from '../../context/authContext';
import { FontAwesome } from '@expo/vector-icons';

export default function SensorRegister({ navigation }) {

  const { user } = useAuth();
  const [sensorType, setSensorType] = useState('')
  const [sensorName, setSensorName] = useState('')

  return (
    
    <View style={styles.container}>
      <View style={styles.menuContainer}>
        <TouchableOpacity
        onPress={() => navigation.goBack()}
        >
          <FontAwesome name="arrow-left" style={styles.iconMenu} size={40} color="#5c5c5cff" />
        </TouchableOpacity>
      </View>
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
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    backgroundColor: "#ddddddff"
  },
  Picker: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 5,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  nameTextInput: {
    width: "100%",
    height: 45,
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 5,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  registerButton: {
    backgroundColor: "#ff9900ff",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
   menuContainer: {
    // backgroundColor: "#fff",
    position: 'absolute',
    top: 0,
    paddingTop: 60,
    zIndex: 1,
    width: "100%",
    justifyContent: "center",
  },

});
