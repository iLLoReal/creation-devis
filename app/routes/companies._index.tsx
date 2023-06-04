import { LoaderArgs, json, redirect } from "@remix-run/node";
import { Link, useLoaderData, useParams, useSubmit } from "@remix-run/react";
import { getUserCompanies } from "~/db.server";
import { getUser, isUserLoggedIn } from "~/helpers/session";
import { getSession } from "~/session";
import { company, user } from "~/types/global";

export async function loader({ request }: LoaderArgs) {
    const loggedIn = await isUserLoggedIn(request);
    if (!loggedIn) {
        return redirect('/login/');
    }
    const user = await getUser(request);
    const userCompanies = await getUserCompanies(user.login)!;
    return userCompanies;
}

export function ErrorBoundary({ error }: any) {
    console.error(error);
    const data = useParams();
    return (
        <div>
            Erreur lors de la récupération des entreprises
            <div>
                <Link to={"/profile/"}>Revenir au profile</Link>
            </div>
        </div>
    )
}

export default function CompaniesIndexRoute() {
    const companies = useLoaderData<company[]>();
    return (
        <main>
            <div>
                {companies.map((company, id) =>
                    <div key={"company/" + id}>
                        <Link to={"/companies/" + company.name + ""}>
                            {company.name}
                        </Link>
                    </div>
                )}
            </div>
        </main>
    );
}