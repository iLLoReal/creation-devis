import { useMemo } from "react";
import { paginate, revisitedIsAddendSegmentNecessary } from "~/helpers/segments";
import { prestation } from "~/types/global";


export const ReferenceTable = () => {
    return (
        <>
            <h2>
                Prestations
            </h2>
            <p>
                Référence
            </p>
            <p>
                Quantité
            </p>
            <p>
                Prix à l'unité
            </p>
            <p>
                Prix total
            </p>
        </>
    )
}

export const Prestation = ({ prestation, currency }: { prestation: prestation, currency: string }) => {
    const getPrice = (prestation: { quantity: number, unitPrice: number }) => {
        return (prestation.quantity * prestation.unitPrice);
    }
    return (
        <>
            <h2>
                {prestation.title}
            </h2>
            <p>
                {prestation.ref}
            </p>
            <p>
                {prestation.quantity}
            </p>
            <p>
                {prestation.unitPrice}{currency}
            </p>
            <p>
                {getPrice(prestation)}{currency}
            </p>
        </>
    )
}


export const TotalPrice = ({ prestations, currency }: { prestations: prestation[], currency: string }) => {
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
    prestationsSegment: prestation[];
    currency?: string;
};

export const BillPrestations = ({ prestationsSegment, currency = '€' }: BillPrestationsProps) => {
    return (
        <>
            {
                prestationsSegment.map((prestation: prestation) =>
                    <div key={prestation.ref}>
                        <Prestation prestation={prestation} currency={currency} />
                    </div>)
            }
        </>
    )
}

export const TrailingSpace = ({ segmentKey, segmentLength, totalLength }: { segmentKey: number, segmentLength: number, totalLength: number }) => {
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
        container: "flex-row-evenly flex-grow card",
        container__lastItem: "flex-column-centered-end",
    }

    const paginatedData = useMemo<prestation[][]>(() => {
        return paginate(prestations, pagination);
    }, [prestations]);
    const numberOfSegments = paginatedData.length;

    return (
        <div>
            {paginatedData.map((prestationsSegment, id) => {
                return (
                    <div key={id} className={style.container}>
                        <div>
                            <ReferenceTable />
                        </div>
                        <BillPrestations prestationsSegment={prestationsSegment} />
                        <TrailingSpace
                            segmentKey={id}
                            segmentLength={prestationsSegment.length}
                            totalLength={pagination}
                        />
                        {id === paginatedData.length - 1 && revisitedIsAddendSegmentNecessary(pagination, prestations.length) ?
                            <div className={style.container__lastItem}>
                                <TotalPrice prestations={prestations} currency={currency} />
                            </div> : <></>
                        }
                    </div>
                )
            })}
            {!revisitedIsAddendSegmentNecessary(pagination, prestations.length) &&
                <div className={style.container}>
                    <div className={style.container__lastItem}>
                        <TotalPrice prestations={prestations} currency={currency} />
                    </div>
                </div>}
        </div>
    )

}