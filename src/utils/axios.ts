import axios from "axios";
import { redirect } from "react-router-dom";

export function http() {
    const token = localStorage.getItem('token');
    if (!token) redirect('/login');

    return axios.create({
        baseURL: 'http://localhost:3000',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}