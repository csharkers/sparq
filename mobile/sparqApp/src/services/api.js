import axios from 'axios';

//coloque o IP da sua máquina aqui
const BASE_URL = 'http://localhost/sparq/api';

const api = axios.create({
    baseURL: BASE_URL,
});
