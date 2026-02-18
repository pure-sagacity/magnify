import { Elysia } from 'elysia';
import z from "zod";

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

export const GET = app.fetch;
export const POST = app.fetch;
export type app = typeof app;