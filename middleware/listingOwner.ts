import Elysia from "elysia";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { listings } from "@/lib/schema";
import { getSession } from "@/actions/getSession";

export const listingOwnerGuard = new Elysia({ name: "listing-owner-guard" })
    .onBeforeHandle(async ({ params, set }) => {
        const session = await getSession();

        if (!session) {
            set.status = 401;
            return "Unauthorized";
        }

        const { id } = params as { id: string };

        const listing = await db
            .select({ posterId: listings.posterID })
            .from(listings)
            .where(eq(listings.id, id))
            .limit(1);

        if (!listing.length) {
            set.status = 404;
            return { message: "Listing not found" };
        }

        if (listing[0].posterId !== session.user.id) {
            set.status = 401;
            return { message: "Unauthorized: You do not own this listing" };
        }
    });