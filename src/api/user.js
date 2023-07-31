import { client } from './client';

export const loginRequest = (credentials) => client.post('users/login/admin', credentials);