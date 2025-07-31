import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <View>
          {/* <TouchableOpacity>
            <Ionicons name="menu" size={24} color="white" />
          </TouchableOpacity> */}
        </View>
        <View>
          <Image style={styles.imageProfile} source={require("../../../assets/profileIMG.jpg")}></Image>
        </View>
        <View>
          <Text style={styles.textName}>Davi Lambari</Text>
          <Text style={styles.textFunction}>Guarda mata</Text>
        </View>
      </View>
      <View style={styles.buttonContainer} >
        <TouchableOpacity style={styles.button}
          onPress={() =>
            navigation.navigate('Map')
          }
      >
        {/* <Ionicons  name="map-outline"></Ionicons > */}
        <Text style={styles.textButton}>Mapa de sensores</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        {/* <Ionicons  style={styles.iconButton} name="server" size={24} color="black" /> */}
        <Text style={styles.textButton}>informação dos sensores</Text>
      </TouchableOpacity>
    </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  navbar: {
    display: "flex",
    backgroundColor: '#111111',
    width: "100%",
    height: "30%",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  button: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    padding: 10,
    alignItems: "center"
  },
  iconButton: {
    fontSize: 50
  },
  textButton: {
    padding: 10,
    fontSize: 20
  },
  textName: {
    color: "#fff",
    fontSize: 30
  },
  textFunction: {
    color: "#fff",
    fontSize: 15
  },
  buttonContainer: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    textAlign: "center"
  },
  imageProfile: {
    width: 90,
    height: 90,
    borderRadius: 100,
    marginRight: 20
  }
});
