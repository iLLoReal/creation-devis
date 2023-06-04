import {
    users,
    bills,
    companies,
} from './mockdb.json';

import {
    bill,
    client,
    company,
    estimate,
    user
} from './types/global';

function getBillsAndEstimatesFromBillsRef(billsRefs: { [billReference: string]: number }, billsData: bill[] = bills) {
    const BillsRefArray = Object.keys(billsRefs);
    const billsAndEstimates = BillsRefArray.map((billRef: string) => {
        return billsData && billsData[billsRefs[billRef]]
    });
    return billsAndEstimates;
}

function getBillsFromBillsRefs(billsRefs: { [billReference: string]: number }, billsData: bill[] = bills) {
    const billsAndEstimates = getBillsAndEstimatesFromBillsRef(billsRefs, billsData)
    const billsOnly = billsAndEstimates.filter((bill: bill) => bill.status === 'bill');
    return billsOnly;
}

function getEstimatesFromBillsRefs(billsRefs: { [billReference: string]: number }, billsData: bill[] = bills) {
    const billsAndEstimates = getBillsAndEstimatesFromBillsRef(billsRefs, billsData)
    const estimatesOnly = billsAndEstimates.filter((bill: bill) => bill.status === 'estimate');
    return estimatesOnly;
}

export const getAllBills = async (login: string) => {
    const userCompanies = await getUserCompanies(login);
    return userCompanies.map((company: company) => {
        return getBillsFromBillsRefs(company.billsRefs)
    })
}


export const getCompanyBills = async (companyName: string) => {
    const company: company = await getCompanyByName(companyName);
    return getBillsFromBillsRefs(company.billsRefs);
}

export const getAllEstimates = async (companyName: string) => {
    const estimates = bills.filter(bill => bill.status === "estimate" && bill.fkCompanyName === companyName);
    return estimates as estimate[];
}

const aggregateBillsByClientName = (name: string, bills: bill[]): client => {
    return {
        name: name,
        address: bills.find((bill: bill) => bill.paymentDetails.name === name)?.paymentDetails.address || 'no address',
        bills: [...bills.filter((bill: bill) => bill.paymentDetails.name === name)
        ].map((bill: bill) => {
            return { billNumber: bill.billNumber, status: bill.status }
        })
    }
}

export const getClients = async (): Promise<client[]> => {
    const rawClients = bills.map(bill => {
        return bill.paymentDetails.name;
    })
    const uniqueRawClients = [...new Set<string>(rawClients)];
    const clients: client[] = uniqueRawClients.map((rawClient: string) => aggregateBillsByClientName(rawClient, bills))
    return [...new Set<client>(clients)];
}

export const getEstimateByBillNumber = async (billNumber: string): Promise<estimate> => {
    const estimate = bills.find((bill: bill) => bill.billNumber === billNumber && bill.status === "estimate")!
    //console.log('estimate:', estimate as estimate);
    return estimate as estimate;
}

export const getCompanyEstimates = async (login: string, companyName: string) => {
    const userCompanies = await getUserCompanies(login);
    const company = userCompanies.find((company: company) => company.name === companyName)!;
    return getEstimatesFromBillsRefs(company.billsRefs);
}

export const getBillByNumber = async (billNumber: string): Promise<bill> => {
    const bill = bills.find((bill: bill) => bill.billNumber === billNumber && bill.status === "bill")!;
    return bill;
}

export const login = async ({ login, password }: { login: string; password?: string }) => {
    if (!password) return false;

    const user = users.find((user: user) => user.login === login)
    return user?.password === password; //TODO: encrypt/decrypt
}

export const getCompanyByName = async (companyName: string): Promise<company> => {
    return companies.find((c: company) => c.name === companyName)!;
}

export const getUserCompanyNames = async (login: string) => {
    return (await getUserCompanies(login)).map((c: company) => c.name);
}

export const getUserCompanies = async (login: string) => {
    return companies.filter((c: company) => c.fkUserLogin === login);
}