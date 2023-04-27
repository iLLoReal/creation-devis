import { paymentDetails } from "~/types/global"

export const MainDescription = ({ details, date = new Date() }: { details: paymentDetails, date?: Date }) => {
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
    date: Date,
}

export const BillDetails = ({ details, description, date }: BillDetailsProps) => {
    const style = {
        container: "card flex-column-between flex-grow",
    }
    return (
        <div className={style.container}>
            <p style={{ color: 'grey' }}>
                {description}
            </p>
            <MainDescription details={details} date={date} />
        </div>
    )
}
