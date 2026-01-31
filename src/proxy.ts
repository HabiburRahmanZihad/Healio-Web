import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Get session cookie from request
    const sessionCookie = request.cookies.get("better-auth.session_token") ||
        request.cookies.get("__secure-better-auth.session_token");

    if (!sessionCookie) {
        // Not authenticated, redirect to login
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("callbackURL", pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Since we can't easily call our own API with full cookie support in proxy 
    // without potentially hitting double-proxy issues on some platforms,
    // we let the layout/page handle role-specific data fetching,
    // but we protect the routes here as a first layer.

    // In a more robust setup, we'd verify the JWT/session here.
    // For now, we allow the request to proceed if the cookie exists.
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/admin-dashboard/:path*",
        "/seller-dashboard/:path*"
    ],
}
