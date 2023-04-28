import { json } from '@remix-run/node';
import factures from './mockdb.json';

export const getFactures = async () => {
    console.log(factures);
    return factures;
}

export const getFactureById = async (id:number) => {
   return (factures.bills[id]); 
}