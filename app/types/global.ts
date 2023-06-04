export type prestation = {
    title: string,
    ref: string,
    quantity: number,
    unitPrice: number
};

export type bill = {
    billNumber: string,
    prestations: prestation[],
    fkCompanyName: string,
    description: string,
    emissionDate: string,
    paymentDetails: paymentDetails,
    status: string
}

export type estimate = bill & {
    status: "estimate";
}

export type user = {
    login: string;
    password?: string;
}

export type company = {
    name: string,
    fkUserLogin: string,
    siret: string,
    email: string,
    address: string,
    departement: string,
    billsRefs: {
        [billReference: string]: number
    },
}

export type paymentDetails = {
    name: string,
    address: string,
    signatureDescription: string,
    mean: string,
    type: string[],
}

export type clientBill = {
    billNumber: string;
    status: string;
}

export type client = {
    name: string,
    address: string,
    bills: clientBill[];
}