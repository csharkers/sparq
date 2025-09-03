import axios from 'axios';

//coloque o IP da sua máquina aqui
const BASE_URL = 'http://192.168.0.103/sparq-mobile-api';

const api = axios.create({
    baseURL: BASE_URL,
});

export default api;