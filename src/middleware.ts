import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {ROUTES} from "@/core/routes/routes";

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const isAuthPage = request.nextUrl.pathname.startsWith(ROUTES.LOGIN) ||
        request.nextUrl.pathname.startsWith(ROUTES.REGISTER);
    const isDashboard = request.nextUrl.pathname.startsWith('/dashboard');

    if (token && isAuthPage) {
        return NextResponse.redirect(new URL(ROUTES.DASHBOARD, request.url));
    }

    if (!token && isDashboard) {
        return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/login', '/register']
};
