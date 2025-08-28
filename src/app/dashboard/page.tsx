'use client';
import {User} from "@/core";
import React from "react";
import {TabNavigation} from "@/components";
import {useAppContext} from "@/Providers";
import {useRouter} from "next/navigation";

export default function DashboardPage() {

    const {setState}: any = useAppContext();
    const router = useRouter();

    const fetchProfile = async () => {
        const response = await User.getProfile();
        const {user} = response?.data;
        setState((prevState: any) => ({
            ...prevState,
            user: user ?? null
        }));
    }

    React.useEffect(() => {
        (async () => {
            await fetchProfile();
            router.push('/dashboard/reports');
        })();
    }, []);

    return (
        <TabNavigation/>
    );
}
