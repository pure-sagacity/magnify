import { getSession } from "@/actions/getSession";
import Elysia from "elysia";

export const employerChecker = new Elysia({ name: "employerChecker" })
    .onBeforeHandle(async (context) => {
        // Logic to extract and verify session/token (e.g., from headers or cookies)
        const session = await getSession();

        // If authentication fails, you can stop the request early
        if (!session) {
            context.set.status = 401; // Unauthorized
            return "Unauthorized";
        }

        // Ensure that the role is the employer
        if (session?.user.role !== "employer") {
            context.set.status = 401;
            return "Unauthorized";
        }
    })
    .derive(async () => {
        // Grab the session
        const session = await getSession();
        return { session };
    });

export const adminChecker = new Elysia({ name: "adminChecker" })
    .onBeforeHandle(async (context) => {
        // Logic to extract and verify session/token (e.g., from headers or cookies)
        const session = await getSession();

        // If authentication fails, you can stop the request early
        if (!session) {
            context.set.status = 401; // Unauthorized
            return "Unauthorized";
        }

        // Ensure that the role is the admin
        if (session?.user.role !== "admin") {
            context.set.status = 401;
            return "Unauthorized";
        }
    })
    .derive(async () => {
        // Grab the session
        const session = await getSession();
        return { session };
    });