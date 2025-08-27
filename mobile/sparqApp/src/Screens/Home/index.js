import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { useAuth } from '../../context/authContext';



export default function Home({ navigation }) {

  const { user } = useAuth()
  console.log(user)

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <View style={styles.menuContainer}>
          <TouchableOpacity>
            <FontAwesome name="house" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.profileContainer}>
          <Image style={styles.imageProfile} source={require('../../../assets/avatar.jpg')}></Image>
          <View>
            <Text style={styles.textName}>{user?.nome}</Text>
            {/* <Text style={styles.textFunction}>{user?.cargo}</Text> */}
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer} >
        <TouchableOpacity style={styles.button}
          onPress={() =>
            navigation.navigate('Map')
          }
        >
          <FontAwesome name="map" size={15} color="#333" style={styles.iconButton} />
          <Text style={styles.textButton}>Mapa de sensores</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <FontAwesome name="database" size={15} color="#333" style={styles.iconButton} />
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
    backgroundColor: '#111111',
    width: "100%",
    height: "30%",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  menuContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  profileContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    padding: 10,
    alignItems: "center"
  },
  iconButton: {
    fontSize: 35
  },
  textButton: {
    padding: 10,
    fontSize: 20
  },
  textName: {
    color: "#fff",
    fontSize: 30,
    fontFamily: "REM"
  },
  textFunction: {
    color: "#fff",
    fontSize: 15,
    fontFamily: "REM"
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
