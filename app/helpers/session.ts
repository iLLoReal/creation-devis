
import { FlashSessionData, Session, SessionData } from "@remix-run/server-runtime";
import { login } from "~/db.server";
import { SessionFlashData, getSession } from "~/session";

export const isUserLoggedIn = async (request: Request) => {
    try {
        return (await getSession(request.headers.get("Cookie")))
            .has("loggedIn");
    } catch (e) {
        console.log(e);
        return false;
    }
}


export const logUserIn = async (request: Request): Promise<{ loggedIn?: boolean, error?: Error, session: Session<SessionData, SessionFlashData> }> => {
    try {
        const session = await getSession(request.headers.get('Cookie'));
        const formData = await request.formData();
        const user = {
            login: String(formData.get('login')),
            password: String(formData.get('password'))
        }
        const loggedIn = await login(user);
        if (!loggedIn) {
            session.flash("error", "Invalid username/password");
        } else {
            session.set("loggedIn", true);
        }

        return {
            loggedIn: loggedIn,
            session: session
        }
    } catch (e: any) {
        console.log(e);
        return {
            session: await getSession(),
            error: e,
        }
    }
}