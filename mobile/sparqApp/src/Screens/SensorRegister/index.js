import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

//import da função que puxa a localização
import { getLocation } from '../../services/sensorRegister';

export default function App() {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleGetLocation = async () => {
    try {
      const loc = await getLocation();
      setLocation(loc);
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={getLocation}>
        <Text>Get Location</Text>
      </TouchableOpacity>
      <Text style={styles.paragraph}>
         {errorMsg ? errorMsg : location ? JSON.stringify(location) : "Sem dados"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
});
