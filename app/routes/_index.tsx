import { ActionArgs, LoaderArgs, V2_MetaFunction, redirect } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { isUserLoggedIn } from "~/helpers/session";


export async function loader({ request }: LoaderArgs) {
  if (!await isUserLoggedIn(request)) {
    return redirect("/login/");
  }
  return redirect("/profile") ;
}

export const action = async ({ request }: ActionArgs) => {
  return null;
}

export const meta: V2_MetaFunction = () => {
  return [{ title: "creation-devis" }];
};

export default function Index() {

  return (
    <div className="flex-centered-column">
      <h1>
        Bienvenue
        <Link to="/factures/">
          Mes factures
        </Link>
      </h1>
    </div>
  );
}
