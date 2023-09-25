import axios from 'axios';
import { getTokenFromLocalStorage } from '../helpers/localstorage.helper';

const baseUrl = 'http://localhost:3001/api';

export const instanse = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: 'Bearer ' + getTokenFromLocalStorage() || '',
  },
});
