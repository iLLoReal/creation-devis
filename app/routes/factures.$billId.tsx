import { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectBill } from "~/state/billsSlice";
import { RootState } from "~/state/store";
import { bill, company } from "~/types/global";
import { BillDate } from "./Bill/BillDate";
import { BillDetails } from "./Bill/BillDetails";
import { BillNumber } from "./Bill/BillNumber";
import { BillPayment } from "./Bill/BillPayment";
import { BillPrestations } from "./Bill/BillPrestations";
import { CompanyDetails } from "./Company/CompanyDetails";


export const loader = async ({ params }: LoaderArgs) => {
    const { billId } = params;
    console.log('process.env.PORT = ' , process.env.PORT);
    return billId;
};

export default function FactureRoute() {
    let billId = useLoaderData();
    const state = useSelector((state: RootState) => state);

    const [currentBill, setCurrentBill] = useState<{ bill: bill }>({
        bill: selectBill(state, billId) ?? selectBill(state, 0)
    });
    const [company, setCompany] = useState<company>(state.company.company)

    return (
        <main>
            <CompanyDetails company={company} />
            <BillNumber number={currentBill.bill.billNumber}/>
            <BillDetails
                description={currentBill.bill.description}
                details={currentBill.bill.paymentDetails}
                date={currentBill.bill.emissionDate} 
                />
            <BillPrestations prestations={currentBill.bill.prestations} />
            <BillDate />
            <BillPayment payment={currentBill.bill.paymentDetails} />
        </main>
    )
}