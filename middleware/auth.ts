import { getSession } from "@/actions/getSession";
import Elysia from "elysia";

export const authMiddleware = new Elysia({ name: "authMiddleware" })
    .onBeforeHandle(async (context) => {
        // Logic to extract and verify session/token (e.g., from headers or cookies)
        const session = await getSession();

        // If authentication fails, you can stop the request early
        if (!session) {
            context.set.status = 401; // Unauthorized
            return "Unauthorized";
        }
        // Note: The context derived here will be merged later.
    })
    .derive(async (context) => {
        // Re-verify the session to derive the user data for type safety
        // This ensures that the 'user' property is only available if the
        // onBeforeHandle check passed.
        const session = await getSession();
        return { session }
    });