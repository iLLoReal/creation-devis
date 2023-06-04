import { useMemo } from "react";
import { paginate } from "~/helpers/segments";
import { prestation } from "~/types/global";



type TotalPriceProps = {
    prestations: prestation[];
    currency: string;
};

export const TotalPrice = ({ prestations, currency }: TotalPriceProps) => {
    type prestationTotal = { quantity: number, total: number };
    const totalPrestation: prestationTotal = prestations.reduce((total: prestationTotal, prestation: prestation) => ({
        quantity: total.quantity + prestation.quantity,
        total: total.total + (prestation.quantity * prestation.unitPrice)
    }), { quantity: 0, total: 0 })

    return (
        <>
            <p>
                Total HT: {totalPrestation.total} {currency}
            </p>
            <p>
                Total ttc: {totalPrestation.total} {currency}
            </p>
        </>
    )
}

type BillPrestationsProps = {
    prestations: prestation[];
    currency?: string;
};

export const BillPrestations = ({ prestations, currency = '€' }: BillPrestationsProps) => {
    const style = {
        container: "table table-separate vertical-margin-1 border-1 full-space",
        container__itemTh: "table__th padding-bottom-10px",
        container__itemTd: "table__td padding-bottom-10px",
    }
    const getPrice = (prestation: { quantity: number, unitPrice: number }) => {
        return (prestation.quantity * prestation.unitPrice);
    }
    return (
        <table className={style.container}>
            <thead>
                <tr >
                    <th className={style.container__itemTh}>Prestations</th>
                    <th className={style.container__itemTh}>Référence</th>
                    <th className={style.container__itemTh}>Quantité</th>
                    <th className={style.container__itemTh}>Prix à l'unité</th>
                    <th className={style.container__itemTh}>Prix total</th>
                </tr>
            </thead>
            <tbody style={{ textAlign: 'center' }}>
                {prestations.map((prestation) =>
                    <tr key={'prestation/'+prestation.ref}>
                        <td className={style.container__itemTd}>{prestation.title}</td>
                        <td className={style.container__itemTd}>{prestation.ref}</td>
                        <td className={style.container__itemTd}>{prestation.quantity}</td>
                        <td className={style.container__itemTd}>{prestation.unitPrice}{currency}</td>
                        <td className={style.container__itemTd}>{getPrice(prestation)}{currency}</td>
                    </tr>
                )}
                <tr>
                    <td className={style.container__itemTd} style={{ paddingBottom: '10px' }}>Total</td>
                    <td className={style.container__itemTd} style={{ paddingBottom: '10px' }} colSpan={3}></td>
                    <td className={style.container__itemTd} style={{ paddingBottom: '10px', textAlign: 'center' }}>
                        <TotalPrice prestations={prestations} currency={currency} />
                    </td>
                </tr>
            </tbody>
        </table >
    )
}

type TrailingSpaceProps = {
    segmentKey: number;
    segmentLength: number;
    totalLength: number;
};

export const TrailingSpace = ({ segmentKey, segmentLength, totalLength }: TrailingSpaceProps) => {
    const trailing = [];

    for (let i = 0; i < totalLength - segmentLength; i++) {
        trailing.push(<span key={`${segmentKey}/${i}`}>Prestation</span>)
    }
    return (
        <>
            {trailing.map((element) => element)}
        </>
    )
}

type BillPrestationsPaginateProps = {
    prestations: prestation[],
    currency?: string,
    pagination?: number,
}


export const BillPrestationsPaginate = ({ prestations, currency = '€', pagination = 4 }: BillPrestationsPaginateProps) => {
    const style = {
        container: "container flex-column-centered flex-grow flex-wrap card",
        container__lastItem: "container__item--last-item flex-column-centered-end",
        container__item: "container__item flex-row-evenly"
    }

    const paginatedData = useMemo<prestation[][]>(() => {
        return paginate(prestations, pagination);
    }, [prestations]);

    return (
        <div className={style.container}>
            {
                paginatedData.map((data: prestation[], id: number) =>
                    <div key={id} className={style.container__item}>
                        <BillPrestations prestations={data} currency={currency} />
                    </div>
                )
            }

        </div>
    )

}