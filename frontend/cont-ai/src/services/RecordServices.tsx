import { API_HOST } from "../constants/Api";
import { Record } from "../interfaces/Record";



// Function to save a new record
export async function save(record: Record): Promise<Record> {
    const response = await fetch(`${API_HOST}/api/records`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(JSON.parse(error)?.error);
    }

    return await response.json();
}

// Function to update an existing record
export async function update(record: Record): Promise<Record> {
    const response = await fetch(`${API_HOST}/api/records/${record.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(JSON.parse(error)?.error);
    }

    return await response.json();
}

// Function to get a record by ID
export async function getById(recordId: number): Promise<Record> {
    const response = await fetch(`${API_HOST}/api/records/${recordId}`);

    if (!response.ok) {
        const error = await response.text();
        throw new Error(JSON.parse(error)?.error);
    }

    return await response.json();
}

// Function to delete a record by ID
export async function remove(recordId: number): Promise<void> {
    const response = await fetch(`${API_HOST}/api/records/${recordId}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(JSON.parse(error)?.error);
    }
}
// Function to get all records
export async function getAllRecords(): Promise<Array<Record>> {
    const response = await fetch(`${API_HOST}/api/records/`);

    if (!response.ok) {
        const error = await response.text();
        throw new Error(JSON.parse(error)?.error);
    }

    return await response.json();
}
