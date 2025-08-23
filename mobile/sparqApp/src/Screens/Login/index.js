import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import axios from 'axios';
import { loginRequest } from '../../services/auth';
import { useAuth } from '../../context/authContext';

export default function Login({navigation}) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, setUser } = useAuth();

  const login = async () => {
    try {
      const data = await loginRequest(email, password)

      const status = data.status
      const ativo = data.ativo
      console.log("Resposta da API:", status);
      console.log(data.user)
      
      if (status === 'success') { 
        setUser(data.user);
        console.log(user)
        navigation.replace('Home');
      }
      else {
        console.log(data.message)
      }
    } catch (error) {
      console.log("erro de conexão com a rede", error);
    }
  }


  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.textTittle}>FAZER LOGIN</Text>
        <View style={styles.inputContainer}>
          <FontAwesome name="user" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
        </View>
        <View style={styles.inputContainer}>
          <FontAwesome name="lock" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
        </View>
        <View style={styles.containerButtons}>
          <TouchableOpacity style={styles.buttonPassword}>
            <Text style={styles.textButtonPass}>Esqueceu sua senha?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={login} style={styles.buttonLogin}>
            <FontAwesome name="sign-in" size={16} color="white" style={styles.buttonIcon} />
            <Text style={styles.textButtonLogin}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: "center"
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#ffffffff",
    paddingHorizontal: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    padding: 10,
  },
  formContainer: {
    borderWidth: 2,
    width: "80%",
    height: "40%",
    justifyContent: "center",
    borderRadius: 15,
  },
  textTittle: {
    fontSize: 30,
    padding: 10
  },
  buttonLogin: {
    backgroundColor: "#000",
    width: "35%",
    alignItems: "center",
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
  },
  buttonIcon: {
    marginRight: 8,
  },
  textButtonLogin: {
    color: "#fff"
  },
  containerButtons: {
    alignItems: "center"
  }
});
