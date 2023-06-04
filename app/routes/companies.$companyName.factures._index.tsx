import { LoaderArgs, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getCompanyBills } from "~/db.server";
import { isUserLoggedIn } from "~/helpers/session";
import { bill } from "~/types/global";

export async function loader({ request, params }: LoaderArgs) {
    const { companyName } = params;

    if (!isUserLoggedIn(request)) {
        return redirect('/');
    }
    const bills = await getCompanyBills(companyName!)!;
    return {
        bills: bills,
    }
}

export default function CompaniesCompanyRouteFacturesIndexRoute() {
    const { bills } = useLoaderData<{ bills: bill[] }>();

    return (
        <section>
            {bills.map((bill: bill, id: number) => {
                return (
                    <div key={'bill/' + id + '/' + bill.billNumber}>
                        <Link to={bill.billNumber}>
                            {bill.billNumber}
                        </Link>
                    </div>
                )
            })}
        </section >
    )
}