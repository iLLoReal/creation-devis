import { paymentDetails } from "~/types/global"

type MainDescriptionProps = {
    details: paymentDetails;
    timestamp?: string;
};

export const MainDescription = ({ details, timestamp = (new Date()).toString() }: MainDescriptionProps) => {
    const date = new Date(timestamp);
    console.log(details);
    return (
        <>
            <p>
                CLIENT {details.name}
            </p>
            <p>
                ADRESSE {details.address}
            </p>
            <p>
                Emis le {date.toLocaleDateString("fr-FR")}
            </p>
        </>
    )
}

type BillDetailsProps = {
    details: paymentDetails,
    description: string,
    timestamp: string,
}

export const BillDetails = ({ details, description, timestamp }: BillDetailsProps) => {
    const style = {
        container: "card flex-column-between flex-grow",
    }
    return (
        <div className={style.container}>
            <p style={{ color: 'grey' }}>
                {description}
            </p>
            <MainDescription details={details} timestamp={timestamp} />
        </div>
    )
}
