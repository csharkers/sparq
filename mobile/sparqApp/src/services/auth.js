import api from "./api";
import * as Location from "expo-location";

export const loginRequest = async(email, password) => {
    try{
        const res = await api.post('/login.php', { email, password });
        return res.data;
    }
    catch(error){
        throw error;
    }
}