import axios from "axios";
import { redirect } from "react-router-dom";

export function http() {
    const token = localStorage.getItem('token');
    const prodUrl = process.env.REACT_APP_API_URL;
    if (!token) redirect('/login');

    return axios.create({
        baseURL: prodUrl || 'http://localhost:3000',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}