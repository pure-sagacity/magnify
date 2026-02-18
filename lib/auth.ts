import { betterAuth } from "better-auth";
import { admin, anonymous } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db"; // your drizzle instance
import { account, session, user, verification } from "./schema";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            user,
            account,
            verification,
            session
        }
    }),

    emailAndPassword: {
        enabled: true
    },

    plugins: [
        nextCookies(),
        admin(),
        anonymous(),
    ]
});