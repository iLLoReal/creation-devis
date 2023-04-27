import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store';
import { bill, prestation } from '~/types/global'

interface BillsState {
    bills: bill[];
}

const initialState: BillsState = {
    bills: [{
        billNumber: '2023-001-1',
        prestations: [{
            title: "Prestation",
            ref: "Prestation 1",
            quantity: 2,
            unitPrice: 10,
        }, {
            title: "Prestation",
            ref: "Prestation 2",
            quantity: 20303030,
            unitPrice: 10,
        }, {
            title: "Prestation",
            ref: "Prestation 3",
            quantity: 2,
            unitPrice: 10,
        }],
        description: "Maintenance et intégration",
        emissionDate: new Date(),
        paymentDetails: {
            name: 'Nom du client',
            address: 'Addresse de facturation',
            signatureDescription: 'Datée et précédée de la mention "Bon pour accord"',
            mean: 'Carte bancaire',
            type: "Paiement à 30 jours. Pas d'escompte pour règlement anticipé.\n\
                    Les pénalités de retard correspondent à : 2.58% du montant TTC.\n\
                    Dispensé d'immatriculation au RCS et au répertoire des métiers.\n",

        },
    }, {
        billNumber: '2023-001-2',
        prestations: [{
            title: "Prestation",
            ref: "Prestation 4",
            quantity: 2,
            unitPrice: 10,
        }, {
            title: "Prestation",
            ref: "Prestation 5",
            quantity: 2,
            unitPrice: 10,
        }, {
            title: "Prestation",
            ref: "Prestation 6",
            quantity: 2,
            unitPrice: 10,
        }],
        description: "Maintenace et intégration",
        emissionDate: new Date(),
        paymentDetails: {
            name: 'Nom du client',
            address: 'Addresse de facturation',
            signatureDescription: 'Datée et précédée de la mention "Bon pour accord"',
            mean: 'Carte bancaire',
            type: "Paiement à 30 jours. Pas d'escompte pour règlement anticipé.\n\
                    Les pénalités de retard correspondent à : 2.58% du montant TTC.\n\
                    Dispensé d'immatriculation au RCS et au répertoire des métiers.\n",

        },
    }]
}

export const billsSlice = createSlice({
    name: 'bills',
    initialState,
    reducers: {
        addPrestations: (state, action: PayloadAction<bill>) => {
            state.bills.push(action.payload);
        },
    },
})

export const { addPrestations } = billsSlice.actions

export const selectBill = (state: RootState, index: number) => state.bills.bills[index];

export default billsSlice.reducer;