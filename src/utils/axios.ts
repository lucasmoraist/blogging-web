import axios from 'axios';
import { redirect } from 'react-router-dom';

export function http() {
    const token = localStorage.getItem('token');
    const profile = import.meta.env.VITE_PROFILE;
    const apiUrl = profile === 'dev' ? 'http://localhost:3000' : import.meta.env.VITE_API_URL;
    if (!token) redirect('/login');

    return axios.create({
        baseURL: apiUrl,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
}