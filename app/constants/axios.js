import axios from 'axios';
import { API_URL } from './urls';

export default axios.create({
    baseURL: API_URL + 'api/',
    headers: { 'api-key': localStorage.getItem('PrensaToken') || 'no_token' },
    crossdomain: true
});
