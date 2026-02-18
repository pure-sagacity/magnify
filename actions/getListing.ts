import { db } from "@/lib/db";
import { listings } from "@/lib/schema";
import { JobListing } from "@/types";
import { eq } from "drizzle-orm";

export async function getListing(id: string): Promise<JobListing> {
    const response: JobListing[] = await db.select().from(listings).where(eq(listings.id, id)).limit(1);
    return response[0];
}