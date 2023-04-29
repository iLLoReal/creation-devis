import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getFactures } from "~/db.server";
import { bill } from "~/types/global";

export async function loader() {
    return (json(await getFactures()));
}
export default function FacturesIndexRoute() {
    const { bills } = useLoaderData<typeof loader>();

    return (
        <main>
            {bills.map((bill: bill, id: number) =>
                <div key={bill.billNumber}>
                    <Link to={"/factures/" + id}>
                        {bill.billNumber}
                    </Link>
                </div>)}
        </main >
    )
}