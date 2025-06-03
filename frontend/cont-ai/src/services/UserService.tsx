import { API_HOST } from "../constants/Api";
import { User } from "../interfaces/User";

export async function userLogin (email: string, password: string) {
    const response = await fetch(`${API_HOST}/api/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(JSON.parse(error)?.error);
    }

    return await response.json();
}


export async function createUser(user: User) {
    const response = await fetch(`${API_HOST}/api/create-user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user.email, password: user.password }),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(JSON.parse(error)?.error);
    }

    return await response.json();
}