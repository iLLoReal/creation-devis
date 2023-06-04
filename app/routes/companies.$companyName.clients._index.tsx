import { LoaderArgs, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { getClients } from "~/db.server";
import { isUserLoggedIn } from "~/helpers/session";
import { client, clientBill } from "~/types/global";


export async function loader({request, params} : LoaderArgs) {
    const { companyName } = params;
    if (!(isUserLoggedIn(request)))
        return redirect('/login');
    
    return {
        clients: await getClients(),
        companyName: companyName
    }
}
//TODO: Trouver un moyen de set le bon link vers la facture ou le devis dans le Link
export default function CompaniesCompanyRouteClientsIndexRoute() {
    const [filterInput, setFilterInput] = useState('');
    const loaderData = useLoaderData();
    const { clients: clientsDb } = loaderData;
    const { companyName } = loaderData;
    const [clients, setClients] = useState<client[]>(clientsDb);

    const handleFilterClients = (text: string) => {
        const result = [...clientsDb.filter((client: client) => client.name.includes(text))];
        setClients(result);
    }

    const handleResetClients = () => {
        setClients([...clientsDb]);
    }

    const estimateOrBillRoute = (billStatus: string) =>  billStatus === 'estimate' ? 'devis/' : 'factures/';

    useEffect(() => {
        handleFilterClients(filterInput);
    }, [filterInput])

    return (
        <main>
            <input
                type="text"
                onChange={(e) => setFilterInput(e.target.value)}
                onBlur={() => handleResetClients()}
            />
            {clients.map((client: client, id: number) =>
                <fieldset className="flex-column-even align-items-centered" key={'clients/' + id}>
                    <h1>CLIENT N°{id + 1}</h1>
                    <p>Nom: {client.name}</p>
                    <p>Adresse: {client.address}</p>
                    <p className="flex-column-between align-items-end">Facture(s): {client.bills.map((clientBill: clientBill, id: number) =>
                        <Link key={'billNumbers/' + id} to={'/companies/'+ loaderData.companyName + '/' + estimateOrBillRoute(clientBill.status) + clientBill.billNumber}>{clientBill.billNumber}</Link>)}
                    </p>
                </fieldset>
            )}
        </main>
    )
}