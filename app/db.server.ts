import { json } from '@remix-run/node';
import { bills, users } from './mockdb.json';
import { bill, client } from './types/global';

export const getFactures = async () => {
    console.log(bills);
    return bills;
}

export const getBillIdFromNumber = (billNumber: string): number => {
    return bills.findIndex((bill: bill) => bill.billNumber === billNumber);
}

const aggregateBillsByClientName = (name: string, bills: bill[]): client => {
    return {
        name: name,
        address: bills.find((bill: bill) => bill.paymentDetails.name === name)?.paymentDetails.address || 'no address',
        bills: [...bills.filter((bill: bill) => bill.paymentDetails.name === name)
        ].map((bill: bill) => bill.billNumber)
    }
}

export const getClients = async (): Promise<client[]> => {
    const rawClients = bills.map((bill: bill) => {
        return bill.paymentDetails.name;
    })
    const uniqueRawClients = [...new Set<string>(rawClients)];
    const clients: client[] = uniqueRawClients.map((rawClient: string) => aggregateBillsByClientName(rawClient, bills))
    return [...new Set<client>(clients)];
}

export const getFactureById = async (id: number) => {
    return (bills[id]);
}

export const login = async ({ login, password }: { login: FormDataEntryValue; password: FormDataEntryValue }) => {
    const user = users.find((user: { login: string; password: string }) => user.login === login)

    return user?.password === password; // encrypt/decrypt
}