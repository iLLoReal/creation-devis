import { ActionArgs, LoaderArgs, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { isUserLoggedIn, logUserIn } from "~/helpers/session";
import { commitSession, getSession } from "~/session";

export async function action({ request }: ActionArgs) {
    const authResponse = await logUserIn(request);

    if (authResponse.loggedIn) {
        return redirect('/profile', {
            headers: {
                "Set-Cookie": await commitSession(authResponse.session)
            }
        })
    }
    return new Response(authResponse.error || authResponse.session.get('error'));
}

export async function loader({ request }: LoaderArgs) {
    const loggedIn = await isUserLoggedIn(request);
    return loggedIn ? redirect('/profile') : new Response('Please log in');
}

export default function Login() {
    const actionData = useActionData();
    return (
        <section>
            <Form method="post">
                <fieldset>
                    <legend>Please login</legend>
                    <input type="text" id="login" name="login" />
                    <label htmlFor="login">Login</label><br />
                    <input type="password" id="password" name="password" />
                    <label htmlFor="password">Password</label><br />
                    <button type="submit">OK</button>
                </fieldset>
            </Form>
            {actionData &&
                <label>
                    {actionData}
                </label>
            }
        </section>
    )
}