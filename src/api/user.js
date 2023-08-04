import { client } from './client';

export const loginRequest = (credentials, admin) => client.post('users/login', credentials, { params: { admin } });

export const fetchUser = () => client.get('users');

export const fetchUsers = () => client.get('users/all');

export const adminChangeReuqest = (userId, approve) => client.patch(`users/${userId}/admin`, approve);

export const deleteUser = (userId) => client.delete(`users/${userId}`);