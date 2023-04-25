import type { V2_MetaFunction } from "@remix-run/node";

export const meta: V2_MetaFunction = () => {
  return [{ title: "creation-devis" }];
};

export default function Index() {
  return (
    <div className="flex-centered-column">
      <h1>
        Gérez vos factures et vos devis sans prise de tête !
        <a href="/layout">Voir les factures</a>
      </h1>
    </div>
  );
}
