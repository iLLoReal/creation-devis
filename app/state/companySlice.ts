import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store';
import { prestation } from '~/types/global'
import { company } from '~/types/global';

// Define a type for the slice state
interface CompanyState {
    company: company;
}

// Define the initial state using that type
const initialState: CompanyState = {
    company: {
        name: "Nom de l'entreprise",
        siret: "Siret de l'entreprise",
        email: "email de l'entreprise",
        address: "Addresse de l'entreprise",
        departement: "Département de l'entreprise",
    },
}

export const companySlice = createSlice({
    name: 'company',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        get: (state, action: PayloadAction<string>) => {
            state.company.name = action.payload;
        },
    },
})

export const { get } = companySlice.actions

// Other code such as selectors can use the imported `RootState` type
export default companySlice.reducer;