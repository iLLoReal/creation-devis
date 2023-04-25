export const BillDate = () => {
    const style = {
        container: "flex-column-between flex-grow card",
    }
    return (
        <div className={style.container}>
            <p>
                Nombre de jours facturés
            </p>
            <p>
                du XX/XX/XXXX au XX/XX/XXXX
            </p>
        </div>
    )
}
