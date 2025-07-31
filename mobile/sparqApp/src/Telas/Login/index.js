import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.textTittle}>FAZER LOGIN</Text>
        <TextInput
          style={styles.input}
        // onChangeText={onChangeText}
        // value={text}
        />
        <TextInput
          style={styles.input}
        // onChangeText={onChangeText}
        // value={text}
        />
        <TouchableOpacity style={styles.buttonPassword}>
          <Text style={styles.textButtonPass}>Esqueceu sua senha?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonLogin}>
          <Text style={styles.textButtonLogin}>Login</Text>
        </TouchableOpacity>
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
