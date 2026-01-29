import { env } from "@/env";
import { cookies } from "next/headers";

const AUTH_URL = env.AUTH_URL;

export const userService = {
    getSession: async function () {
        try {
            const cookieStore = await cookies();

            console.log(cookieStore.toString());

            const res = await fetch(`${AUTH_URL}/get-session`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store",
            })

            const session = await res.json();

            console.log(session);

            if (!session || !session.user) {
                return { data: null, error: "No active session" };
            }

            return { data: session, error: null };
        } catch (error) {
            console.log("Error fetching session:", error);
            return { data: null, error: "Failed to fetch session" };
        }
    },
};