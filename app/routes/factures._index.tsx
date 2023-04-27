import { useSelector } from "react-redux"
import { useAppDispatch } from "~/state/hooks"
import { RootState } from "~/state/store"
import { bill } from "~/types/global";

export default function FacturesIndexRoute() {
    const bills = useSelector((state: RootState) => state.bills.bills);


    return (
        <main>
            {bills.map((bill: bill, id: number) =>
                <div key={id}>
                    <a href={`/factures/${id}`}>{bill.billNumber}</a>
                </div>
            )}
        </main>
    )
}