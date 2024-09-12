import { http } from "@/utils/axios";
import { useState } from "react";

export function usePost(){
    const [error, setError] = useState('');
    const [sucess, setSucess] = useState(false);
    const [response, setResponse] = useState('');

    async function registerData<T>({ url, data, token }: { url: string, data: T, token?: string }) {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        }

        if (token) headers['Authorization'] = `Bearer ${token}`;

        try {
            const response = await http().post(url, data, { headers });

            setSucess(true);
            setResponse(response.data);
            return response.data;
        } catch (error){
            setError('Not possible to register');
        }
    }

    return { error, sucess, response, registerData };
}