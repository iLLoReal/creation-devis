import { paymentDetails } from "~/types/global"

export const MainDescription = ({ details, date = new Date() }: { details: paymentDetails, date?: Date }) => {
    return (
        <>
            <p style={{ color: 'grey' }}>
                {details.description}
            </p>
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

export const BillDetails = ({ details }: { details: paymentDetails }) => {
    const style = {
        container: "card flex-column-between flex-grow",
    }
    return (
        <div className={style.container}>
            <MainDescription details={details} />
        </div>
    )
}
