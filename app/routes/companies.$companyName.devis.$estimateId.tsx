import { LoaderArgs, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { getCompanyByName, getEstimateByBillNumber } from "~/db.server";
import { isUserLoggedIn } from "~/helpers/session";
import { BillDate } from "./Bill/BillDate";
import { BillDetails } from "./Bill/BillDetails";
import { BillNumber } from "./Bill/BillNumber";
import { BillPayment } from "./Bill/BillPayment";
import { BillPrestations } from "./Bill/BillPrestations";
import { CompanyDetails } from "./Company/CompanyDetails";

export const loader = async ({ request, params }: LoaderArgs) => {
    const { estimateId, companyName } = params;
    if (!isUserLoggedIn(request))
        return redirect('/login ');
    if (estimateId === undefined)
        return redirect('../');

    const company = await getCompanyByName(companyName!)!;
    const estimate = await getEstimateByBillNumber(estimateId);
    return {
        estimate: estimate,
        company: company
    }
};

export default function CompaniesCompanyRouteDevisRoute() {
    const loaderData = useLoaderData();

    const [currentEstimate, setCurrentEstimate] = useState<typeof loaderData>({
        estimate: loaderData.estimate,
        login: loaderData.login
    });
    const [company, setCompany] = useState(loaderData.company);

    console.log('company: ', company);
    return (
        <main>
            <CompanyDetails company={company} />
            <BillNumber number={currentEstimate.estimate.billNumber} />
            <BillDetails
                description={currentEstimate.estimate.description}
                details={currentEstimate.estimate.paymentDetails}
                timestamp={currentEstimate.estimate.emissionDate}
            />
            <BillPrestations prestations={currentEstimate.estimate.prestations} />
            <BillDate />
            <BillPayment payment={currentEstimate.estimate.paymentDetails} />
        </main>
    )
}