
export const Number = ({num}: {num: string}) => {
    return (
        <>
            <p>
                FACTURE N°{num}
            </p>
        </>
    )
}

export const BillNumber = ({number}: {number: string}) => {
    const style = {
        container: "flex-row-centered flex-grow",
    }
    return (
        <div className={style.container}>
            <Number num={number} />
        </div>
    )
}