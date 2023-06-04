import { LoaderArgs, json, redirect } from "@remix-run/node";
import { Link, useLoaderData, useParams } from "@remix-run/react";
import { ErrorInfo, useState } from "react";
import { getBillByNumber, getCompanyByName } from "~/db.server";
import { getUser, isUserLoggedIn } from "~/helpers/session";
import { bill, company } from "~/types/global";
import { BillDate } from "./Bill/BillDate";
import { BillDetails } from "./Bill/BillDetails";
import { BillNumber } from "./Bill/BillNumber";
import { BillPayment } from "./Bill/BillPayment";
import { BillPrestations } from "./Bill/BillPrestations";
import { CompanyDetails } from "./Company/CompanyDetails";

export const loader = async ({ request, params }: LoaderArgs) => {
    const { billId, companyName } = params;
    if (!isUserLoggedIn(request))
        return redirect('/login');
    else if (!companyName)
        return redirect('/companies');
    else if (billId === undefined)
        return redirect('..');

    const user = await getUser(request)!;
    const company = await getCompanyByName(companyName!)!;
    const bill = await getBillByNumber(billId)!;
    return ({
        bill: bill,
        login: user.login,
        company: company
    })
}

export function ErrorBoundary({error}: any) {

    const { billdId } = useParams();//TODO: Check error type and display correct error message
    return (
        <div>
            Erreur lors de la récupération de la facture {billdId}: {error}
            <div>
                <Link to={".."}>Revenir aux factures</Link>
            </div>
        </div>
    )
}

export default function CompaniesCompanyRouteFactureRoute() {
    console.log('ICI');
    const loaderData = useLoaderData();
    const [currentBill, setCurrentBill] = useState<{ bill: bill, login: string }>({
        bill: loaderData.bill,
        login: loaderData.login
    });
    const [company, setCompany] = useState<company>(loaderData.company);

    console.log(currentBill);
    return (
        <main>
            {company ?
                <>
                    <CompanyDetails company={company!} />
                    <BillNumber number={currentBill.bill.billNumber} />
                    <BillDetails
                        description={currentBill.bill.description}
                        details={currentBill.bill.paymentDetails}
                        timestamp={currentBill.bill.emissionDate}
                    />
                    <BillPrestations prestations={currentBill.bill.prestations} />
                    <BillDate />
                    <BillPayment payment={currentBill.bill.paymentDetails} /> </> : null
            }
        </main>)
}