/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { cookies } from "next/headers";

export async function getToken() {
    const appCookies = await cookies();
    const token = appCookies.get("token" as any)?.value;
    return token || null;
}

export async function getUser() {
    const appCookies = await cookies();
    const user = appCookies.get("user" as any)?.value;
    return user || null;
}
