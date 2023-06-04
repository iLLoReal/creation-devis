
import { Session, SessionData } from "@remix-run/server-runtime";
import { login } from "~/db.server";
import { SessionFlashData, getSession } from "~/session";
import { user } from "~/types/global";

export const isUserLoggedIn = async (request: Request) => {
    try {
        return (await getSession(request.headers.get("Cookie")))
            .has("loggedIn");
    } catch (e) {
        console.log(e);
        return false;
    }
}

//Simplifier logUserIn Pour ne renvoyer que la session, avec un session.flash pour l'erreur.

export const logUserIn = async (request: Request): Promise<{ loggedIn?: boolean, error?: Error, session: Session<SessionData, SessionFlashData> }> => {
    const session = await getSession(request.headers.get('Cookie'));
    try {
        const formData = await request.formData();
        const formDataLogin = String(formData.get('login'));
        const formDataPassword = String(formData.get('password'));
        const user: user = {
            login: formDataLogin,
            password: formDataPassword,
        }
        const loggedIn = await login(user);
        if (!loggedIn) {
            session.flash("error", "Invalid username/password");
        } else {
            session.set("loggedIn", true);
            session.set("user", { 
                login: user.login
            });
        }
        return {
            loggedIn: loggedIn,
            session: session
        }
    } catch (e: any) {
        console.log(e);
        return {
            session: session,
            error: e,
        }
    }
}
export const getUser = async (request: Request): Promise<user> => {
    const session = (await getSession(request.headers.get('Cookie')));
    const user = session.get('user')!;

    return user;
}
