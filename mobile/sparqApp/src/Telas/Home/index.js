import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'

export default function Home() {
  return (
    <View style={styles.container}>
      <View>
        <View>
          {/* <Image source={require("")}></Image> */}
        </View>
        <View>
          <Text></Text>
          <Text></Text>
        </View>
        <View>
          <View>
            <ion-icon name="map-outline"></ion-icon>
            <Text>Mapa de sensores</Text>
          </View>
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
    justifyContent: 'center',
  },
});
