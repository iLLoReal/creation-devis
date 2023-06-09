import { paymentDetails } from "~/types/global"

export const PaymentType = ({ mean }: { mean: string }) => {
    console.log('PaymentType, mean:', mean);
    return (
        <>
            <h1>PAIEMENT</h1>
            <p>
                {mean}
            </p>
        </>
    )
}

export const Conditions = ({ textLines }: { textLines: string[] }) => {
    return (
        <>
            <h1>
                CONDITIONS
            </h1>
            <p>
                {textLines.map((textLine: string, id: number) => {
                    return (<p key={"cond/" + id}>{textLine}</p>)
                })}
            </p>
        </>
    )
}

export const MainSignature = ({ description }: { description: string }) => {
    return (
        <>
            <h1>
                SIGNATURE
            </h1>
            <p>
                {description}
            </p>
        </>
    )
}


export const BillPayment = ({ payment }: { payment: paymentDetails }) => {
    const style = {
        container: "card flex-grow n-breaks",
        container__shiftedItem: "margin-5",
    }
    return (
        <div className={style.container}>
            <PaymentType mean={payment.mean} />
            <Conditions textLines={payment.type} />
            <div className={style.container__shiftedItem}>
                <MainSignature description={payment.signatureDescription} />
            </div>
        </div>
    )
}