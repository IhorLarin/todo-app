import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/todos"];
const authRoutes = ["/login", "/register"];

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const { pathname } = request.nextUrl;

    if (protectedRoutes.includes(pathname) && !token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (authRoutes.includes(pathname) && token) {
        return NextResponse.redirect(new URL("/todos", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/todos", "/login", "/register"],
};
