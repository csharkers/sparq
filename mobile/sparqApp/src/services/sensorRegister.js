import api from "./api";
import { useState, useEffect } from 'react';


export const getLocation = async () => {

    let { status } = await Location.requestForegroundPermissionsAsync();

    if( status != 'grated'){
        throw new Error('Permissão de localização negada');
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    return currentLocation
};
