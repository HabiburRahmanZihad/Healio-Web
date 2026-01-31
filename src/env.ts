import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const env = createEnv({
    server: {
        BACKEND_URL: z.string().url(),
        FRONTEND_URL: z.string().url(),
        AUTH_URL: z.string().url(),
    },


    client: {
        NEXT_PUBLIC_TEST: z.string().optional(),
        NEXT_PUBLIC_AUTH_URL: z.string().url(),
        NEXT_PUBLIC_API_URL: z.string().url(),
    },

    runtimeEnv: {
        BACKEND_URL: process.env.BACKEND_URL,
        FRONTEND_URL: process.env.FRONTEND_URL,
        AUTH_URL: process.env.AUTH_URL,
        NEXT_PUBLIC_AUTH_URL: process.env.NEXT_PUBLIC_AUTH_URL,
        NEXT_PUBLIC_TEST: process.env.NEXT_PUBLIC_TEST,
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    },
    skipValidation: !!process.env.SKIP_ENV_VALIDATION,
    emptyStringAsUndefined: true,
});