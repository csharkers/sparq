import api from "./api";
import { useState, useEffect } from 'react';
import * as Location from "expo-location";
import { Alert } from "react-native";


export const getLocation = async (sensorType, sensorName) => {

    //verifica se o serviço de loc esta ligado
    const service = await Location.hasServicesEnabledAsync();
    if (!service) {
        Alert.alert("GPS desligado", "Ative a localização do dispositivo e tente novamente");
        return;
    }
    const { status, canAskAgain } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
        if (canAskAgain) {
            Alert.alert("Permissão negada", "tente novamente")
        }
        return;
    }
    const pos = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
    });

    const latitude = pos.coords.latitude
    const longitude = pos.coords.longitude
    console.log(latitude, longitude, sensorType, sensorName)

    try {
        const res = await api.post('/registerSensor.php', { latitude, longitude, sensorType, sensorName });
        return Alert.alert("Sensor cadastrado com sucesso"), res.data;
    }
    catch (error) {
        throw error;
    }



};
