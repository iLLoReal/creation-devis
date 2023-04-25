import { useState } from "react";
import { company, paymentDetails, prestation } from "~/types/global";
import { BillDate } from "./Bill/BillDate";
import { BillDetails } from "./Bill/BillDetails";
import { BillNumber } from "./Bill/BillNumber";
import { BillPayment } from "./Bill/BillPayment";
import { BillPrestations, BillPrestationsPaginate } from "./Bill/BillPrestations";
import { CompanyDetails } from "./Company/CompanyDetails";

export default function FactureIndexRoute() {
    const [facture, setFacture] = useState<{ prestations: prestation[], paymentDetails: paymentDetails }>({
        prestations: [{
            title: "Prestation",
            ref: "Prestation 1",
            quantity: 2,
            unitPrice: 10,
        },{
            title: "Prestation",
            ref: "Prestation 2",
            quantity: 2,
            unitPrice: 10,
        },{
            title: "Prestation",
            ref: "Prestation 3",
            quantity: 2,
            unitPrice: 10,
        },{
            title: "Prestation",
            ref: "Prestation 4",
            quantity: 2,
            unitPrice: 10,
        },{
            title: "Prestation",
            ref: "Prestation 5",
            quantity: 2,
            unitPrice: 10,
        },{
            title: "Prestation",
            ref: "Prestation 6",
            quantity: 2,
            unitPrice: 10,
        }],
        paymentDetails: {
            description: "Maintenance et intégrations",
            name: 'Nom du client',
            address: 'Addresse de facturation',
            signatureDescription: 'Datée et précédée de la mention "Bon pour accord"',
            mean: 'Carte bancaire',
            type: "Paiement à 30 jours. Pas d'escompte pour règlement anticipé.\n\
                    Les pénalités de retard correspondent à : 2.58% du montant TTC.\n\
                    Dispensé d'immatriculation au RCS et au répertoire des métiers.\n",

        }
    });
    const [company, setCompany] = useState<company>({
        name: "Nom de l'entreprise",
        siret: "Numéro de siret",
        email: "Email de l'entreprise",
        address: "Addresse physique de l'entreprise",
        departement: "Code postal, ville",
    })

    return (
        <main>
            <CompanyDetails company={company} />
            <BillNumber number="2021-001-4" />
            <BillDetails details={facture.paymentDetails}/>
            <BillPrestationsPaginate prestations={facture.prestations} />
            <BillDate />
            <BillPayment payment={facture.paymentDetails} />
        </main>
    )
}