import api from "./api";

export const loginRequest = async(email, password) => {
    try{
        const res = await api.post('/login.php', { email, password });
        return res.data;
    }
    catch(error){
        throw error;
    }
}