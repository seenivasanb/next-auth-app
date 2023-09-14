import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
    try {
        const secret = process.env.NEXTAUTH_SECRET;
        const token = await getToken({ req: request, secret });
        const { pathname } = request.nextUrl;

        if (token) {
            if (pathname === "/login" || pathname === "/signup") {
                console.log("Dashboard redirect");
                return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
            }
        }

        if (!token && (pathname === "/dashboard" || pathname === "/login")) {
            return NextResponse.redirect(new URL("/", request.nextUrl));
        }

    } catch (error) {
        console.log(error);
    }
}

export const config = { matcher: ["/", "/dashboard", "/login", "/signup"] }