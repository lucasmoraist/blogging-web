import axios from 'axios';
import { redirect } from 'react-router-dom';

export function http() {
    const token = localStorage.getItem('token');
    if (!token) redirect('/login');

    return axios.create({
        baseURL: 'https://tech-challenge2.grupo8.tech/',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
}