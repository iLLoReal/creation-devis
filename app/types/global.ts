export type prestation = {
    title: string,
    ref: string,
    quantity: number,
    unitPrice: number
};

export type company = {
    name: string,
    siret: string,
    email: string,
    address: string,
    departement: string,
}

export type paymentDetails = {
    description: string,
    name: string,
    address: string,
    signatureDescription: string,
    mean: string,
    type: string,
}