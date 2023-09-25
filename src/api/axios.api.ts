import axios from 'axios';
import { getTokenFromLocalStorage } from '../helpers/localstorage.helper';

const baseUrl = 'https://fullstack-transaction-server.onrender.com/api';

export const instanse = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: 'Bearer ' + getTokenFromLocalStorage() || '',
  },
});
