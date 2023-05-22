import { Link, useLoaderData } from "@remix-run/react";
import { useEffect, useMemo, useState } from "react";
import { getClients } from "~/db.server";
import { client } from "~/types/global";


export async function loader() {
    return getClients();
}

export default function ClientsIndexRoute() {
    const [filterInput, setFilterInput] = useState('');
    const clientsDb = useLoaderData();
    const [clients, setClients] = useState<client[]>(clientsDb);

    const handleFilterClients = (text: string) => {
        const result = [...clientsDb.filter((client: client) => client.name.includes(text))];
        setClients(result);
    }

    const handleResetClients = () => {
        setClients([...clientsDb]);
    }

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
                    <p className="flex-column-between align-items-end">Facture(s): {client.bills.map((billNumber: string, id: number) =>
                        <span key={'billNumbers/' + id}>{billNumber}</span>)}
                    </p>
                </fieldset>
            )}
        </main>
    )
}