/* eslint-disable no-useless-catch */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { API_HOST } from "../constants/Api";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function request(url: string | URL, method: string, requestBody?: string): Promise<any> {
    try {

        if (typeof url != "object") {
            url = API_HOST + url
        }

        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: requestBody ? requestBody : null
        });

        if (!response.ok) {
            var err = await response.text()
            throw new Error(JSON.parse(err)?.error);
        }

        if (response.status === 204) {
            return null
        }
        try {
            return await response.json()
        } catch (e) {
            return null;
        }
    } catch (err) {
        throw err;
    }
}