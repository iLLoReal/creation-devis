import { Links, Outlet } from "@remix-run/react"
import type { LinksFunction } from "@remix-run/node"

import layoutGlobalStyles from '~/styles/layout.css';
import layoutCompanyStyles from '~/styles/layout.company.css';
import layoutBillStyles from '~/styles/layout.bill.css';

export const links: LinksFunction = () => {
    return ([
        {
            rel: 'stylesheet',
            href: layoutGlobalStyles,
        },
        {
            rel: 'stylesheet',
            href: layoutCompanyStyles,
        },
        {
            rel: 'stylesheet',
            href: layoutBillStyles,
        }
    ])
}
export default function Factures() {
    return (
        <main>
            <Links />
            <Outlet />
        </main>
    )
}