'use client';
import {User} from "@/core";
import React from "react";
import {TabNavigation} from "@/components";
import {useAppContext} from "@/Providers";
import {useRouter} from "next/navigation";

export default function DashboardPage() {


    const router = useRouter();
    router.push("/dashboard/reports");

    return (
        <TabNavigation/>
    );
}
