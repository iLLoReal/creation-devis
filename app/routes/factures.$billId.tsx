import { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { bill, company } from "~/types/global";
import { BillDate } from "./Bill/BillDate";
import { BillDetails } from "./Bill/BillDetails";
import { BillNumber } from "./Bill/BillNumber";
import { BillPayment } from "./Bill/BillPayment";
import { BillPrestations } from "./Bill/BillPrestations";
import { CompanyDetails } from "./Company/CompanyDetails";
import { getFactureById } from "~/db.server";


export const loader = async ({ params }: LoaderArgs) => {
    const { billId } = params;
    return getFactureById(Number(billId));
};

export default function FactureRoute() {

    const [currentBill, setCurrentBill] = useState<{ bill: bill }>({
        bill: useLoaderData<typeof loader>(),
    });
    const [company, setCompany] = useState<company>({
        name: "SuperCompany",
        siret: "552 178 639 00132",
        email: "contact@SuperCompany.com",
        address: "36 rue des Rosiers",
        departement: "75016",
    })

    return (
        <main>
            <CompanyDetails company={company} />
            <BillNumber number={currentBill.bill.billNumber} />
            <BillDetails
                description={currentBill.bill.description}
                details={currentBill.bill.paymentDetails}
                timestamp={currentBill.bill.emissionDate}
            />
            <BillPrestations prestations={currentBill.bill.prestations} />
            <BillDate />
            <BillPayment payment={currentBill.bill.paymentDetails} />
        </main>
    )
}