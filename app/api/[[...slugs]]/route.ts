import { db } from '@/lib/db';
import { type InferInsertModel } from "drizzle-orm";
import { listings as listingTable, resumes as resumeTable } from '@/lib/schema';
import { employerChecker } from '@/middleware/role';
import { JobListing, Resume, Status } from '@/types';
import { eq } from 'drizzle-orm';
import { Elysia } from 'elysia';
import z from "zod";
import { listingOwnerGuard } from '@/middleware/listingOwner';
import { getListing } from '@/actions/getListing';
import { upload } from '@/actions/upload';
import { authMiddleware } from '@/middleware/auth';
import { getResume } from '@/actions/getResume';

type NewJobListing = InferInsertModel<typeof listingTable>;

const PriceSchema = z.object({
    min: z.number(),
    max: z.number()
});

const JobSchema = z.object({
    id: z.string(),
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
})

const ResumeSchema = z.object({
    id: z.string(),
    userId: z.string(),
    jobId: z.string(),
    resumeKey: z.string(),
    createdAt: z.date()
})

const StatusSchema = z.enum(["hiring", "filled", "capacity"]);

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
    .get("/:id", async ({ params }) => {
        const id = params.id;

        const listing = await getListing(id);

        return listing;
    }, {
        params: z.object({
            id: z.string()
        })
    })
    .use(employerChecker)
    .post("/", async ({ body }) => {
        const partialJob = body satisfies NewJobListing;

        const response = await db.insert(listingTable)
            .values(partialJob)
            .returning({ id: listingTable.id });

        return { id: response[0].id };
    }, {
        body: z.object({
            jobTitle: z.string(),
            posterID: z.string(),
            summary: z.string(),
            salary: PriceSchema,
            status: StatusSchema,
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
        response: z.object({
            id: z.string()
        })
    })
    .use(listingOwnerGuard)
    .put("/:id/status", async ({ params, body }) => {
        const newStatus = body.newStatus satisfies Status;
        const id = params.id;

        const response = await db.update(listingTable).set({ status: newStatus }).where(eq(listingTable.id, id)).returning();
        return response[0];
    }, {
        params: z.object({
            id: z.string(),
        }),
        body: z.object({
            newStatus: StatusSchema
        }),
        response: JobSchema
    });

const resumes = new Elysia({ prefix: "/resumes" })
    .use(authMiddleware)
    .post("/resumes", async ({ body }) => {
        const { userId, jobId, resume } = body;
        const id = crypto.randomUUID();
        const newResume = {
            id,
            userId,
            jobId,
            resumeKey: `/resumes/${id}`,
            createdAt: new Date(Date.now())
        } satisfies Resume;

        // upload buffer to S3 here
        await upload(newResume.resumeKey, resume, "pdf");

        // store key in DB
        const response = await db.insert(resumeTable).values(newResume).returning();
        return response[0];
    }, {
        body: z.object({
            resume: z.instanceof(File),
            userId: z.string(),
            jobId: z.string(),
        }),
        response: ResumeSchema
    })
    .use(listingOwnerGuard)
    .get("/", async ({ }) => {
        const response: Resume[] = await db.select().from(resumeTable);

        return response;
    }, {
        response: z.array(ResumeSchema)
    })
    .get("/:id", async ({ params }) => {
        const id = params.id;

        const resume = await getResume(id);
        return resume;
    }, {
        params: z.object({
            id: z.string()
        })
    })


const app = new Elysia({ prefix: '/api' })
    .get("/status", () => {
        return {
            ok: true
        }
    }, {
        response: z.object({
            ok: z.boolean()
        })
    })
    .use(listings);

export const GET = app.fetch;
export const POST = app.fetch;
export type app = typeof app;