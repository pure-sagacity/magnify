import { db } from "@/lib/db";
import { resumes as resumeTable } from "@/lib/schema";
import { Resume } from "@/types";
import { eq } from "drizzle-orm";

export async function getResume(id: string): Promise<Resume> {
    const response: Resume[] = await db.select().from(resumeTable).where(eq(resumeTable.id, id)).limit(1);

    return response[0];
}