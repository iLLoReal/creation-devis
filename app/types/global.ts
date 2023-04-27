export type prestation = {
    title: string,
    ref: string,
    quantity: number,
    unitPrice: number
};

export type bill = {
    prestations: prestation[],
    billNumber: string,
    description: string,
    emissionDate: Date,
    paymentDetails: paymentDetails,
}

export type company = {
    name: string,
    siret: string,
    email: string,
    address: string,
    departement: string,
}

export type paymentDetails = {
    name: string,
    address: string,
    signatureDescription: string,
    mean: string,
    type: string,
}