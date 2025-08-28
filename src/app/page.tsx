'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/core/utils';
import {ROUTES} from "@/core";

export default function Home() {

    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated()) {
            router.push(ROUTES.DASHBOARD);
        } else {
           router.push(ROUTES.LOGIN);
        }
    }, [router]);

    return (
      <></>
    );
}
