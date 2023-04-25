import { company } from "~/types/global";

export const CompanyIdentity = ({ name, siret }: { name: string, siret: string }) => {
    return (
        <>
            <p>
                {name}
            </p>
            <p>
                Siret: {siret}
            </p>
        </>
    )
}

export const CompanyMail = ({ email, address, department }: { email: string; address: string; department: string }) => {
    return (
        <>
            <p>
                {email}
            </p>
            <p>
                {address}
            </p>
            <p>
                {department}
            </p>
        </>
    )
}

type CompanyDetailsProps = {
    company: company;
};

export const CompanyDetails = ({ company }: CompanyDetailsProps) => {
    const style = {
        container: "flex-row-between card flex-grow",
        container__item: "flex-column-even",
    }

    return (
        <div className={style.container}>
            <div className={style.container__item}>
                <CompanyIdentity name={company.name} siret={company.siret} />
            </div>
            <div className={style.container__item}>
                <CompanyMail
                    email={company.email}
                    address={company.address}
                    department={company.departement}
                />
            </div>
        </div>
    )
}