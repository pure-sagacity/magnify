import { db } from '@/lib/db';
import { type InferInsertModel } from "drizzle-orm";
import { listings as listingTable } from '@/lib/schema';
import { employerChecker } from '@/middleware/role';
import { JobListing } from '@/types';
import { eq } from 'drizzle-orm';
import { Elysia } from 'elysia';
import z, { string } from "zod";
import { listingOwnerGuard } from '@/middleware/listingOwner';

type NewJobListing = InferInsertModel<typeof listingTable>;

const PriceSchema = z.object({
    min: z.number(),
    max: z.number()
}),

const JobSchema = z.object({
    id: z.string(),
    jobTitle: string;
    posterID: z.string(),
    summary: z.string(),
    salary: PriceSchema,
    status: z.enum(["hiring", "filled", "capacity"]),
    skills: z.array(z.string()).nullable(),
    minimum: z.array(z.string()).nullable(),
    workEnvironment: z.string().nullable(),
    company: z.string(),
    location: z.object({
        street: z.string(),
        city: z.string(),
        state: z.string(),
        zipCode: z.string()
    })
})

const listings = new Elysia({ prefix: "/listings" })
    .get("/", async () => {
        const response = await db.select().from(listingTable) satisfies JobListing[];

        return response;
    }, {
        response: z.array(JobSchema)
    })
    .get("/search", async ({ params }) => {
        const { query } = params;

        const response = await db.select().from(listingTable).where(eq(listingTable.jobTitle, query)) satisfies JobListing[];

        return response;
    }, {
        params: z.object({
            query: z.string()
        }),
        response: z.array(JobSchema)
    })
    .use(employerChecker)
    .post("/", async ({ body }) => {
        const partialJob = body satisfies NewJobListing;

        const response = await db.insert(listingTable)
            .values(partialJob)
            .returning({ id: listingTable.id });

        return response[0].id;
    }, {
        body: z.object({
            jobTitle: z.string(),
            posterID: z.string(),
            summary: z.string(),
            salary: PriceSchema,
            status: z.enum(["hiring", "filled", "capacity"]),
            skills: z.array(z.string()).nullable(),
            minimum: z.array(z.string()).nullable(),
            workEnvironment: z.string().nullable(),
            company: z.string(),
            location: z.object({
                street: z.string(),
                city: z.string(),
                state: z.string(),
                zipCode: z.string()
            })
        }),
        response: z.string()
    })
    .use(listingOwnerGuard);

const app = new Elysia({ prefix: '/api' })
    .get("/status", () => {
        return {
            ok: true
        }
    }, {
        response: z.object({
            ok: z.boolean()
        })
    });

export const GET = app.fetch;
export const POST = app.fetch;
export type app = typeof app;