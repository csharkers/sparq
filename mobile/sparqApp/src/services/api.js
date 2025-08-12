import axios from 'axios';

//coloque o IP da sua máquina aqui
<<<<<<< HEAD
const BASE_URL = 'http://192.168.0.102/sparq-mobile-api';
=======
const BASE_URL = 'http://localhost/sparq/api';
>>>>>>> d6c29e9d5ebf0df7ea24f1da81b435fb1629996c

const api = axios.create({
    baseURL: BASE_URL,
});
