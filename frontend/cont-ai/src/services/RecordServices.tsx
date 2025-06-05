import { GroupedRecords } from "../interfaces/GroupedRecords";
import { Record, TYPE_CREDIT, TYPE_DEBIT } from "../interfaces/Record";

const API_HOST = import.meta.env.VITE_API_HOST;

console.log("API_HOST:", API_HOST);

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

// Function to get grouped records
export async function getGroupedRecords(): Promise<GroupedRecords[]> {
    const response = await fetch(`${API_HOST}/api/records/grouped/by-month`);

    if (!response.ok) {
        const error = await response.text();
        throw new Error(JSON.parse(error)?.error);
    }

    return await response.json();
}

// Function to get the literal type description based on the type value
export function getLiteralType(type: number) {

    if (type == TYPE_CREDIT.value) return TYPE_CREDIT.desc;
    if (type == TYPE_DEBIT.value) return TYPE_DEBIT.desc;

}

// Function to validate record fields
export function validateRecordFields(record: Record): string | null {
    if (!record.date || record.date.trim() === '') {
        return 'A data do lançamento é obrigatória.';
    }

    if (!record.description || record.description.trim() === '') {
        return 'A descrição do lançamento é obrigatória .';
    }

    if (!record.amount || record.amount <= 0) {
        return 'O valor do lançamento deve ser um número positivo.';
    }

    if (record.type !== TYPE_CREDIT.value && record.type !== TYPE_DEBIT.value) {
        return 'O tipo do lançamento é obrigatório.';
    }

    return null; // no error
}