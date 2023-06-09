import { createCookieSessionStorage } from "@remix-run/node";
import { company } from "./types/global";

export type SessionData = {
  loggedIn: boolean;
  currentCompany: company;
  user: {
    login: string,
  };
};

export type SessionFlashData = {
  error: string;
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>(
    {
      cookie: {
        name: "__session",
        domain: "localhost",
        httpOnly: true,
        maxAge: 60,
        path: "/",
        sameSite: "lax",
        secrets: ["s3cret1"],
        secure: true,
      },
    }
  );
export { getSession, commitSession, destroySession };