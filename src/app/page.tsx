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
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center justify-center min-h-screen">
              <div className="animate-spin rounded-full h-16 w-16 border-b-1 border-gray-500"></div>
              <h1 className="text-2xl font-bold text-gray-400 my-4">
                  Feature Flag Demo System
              </h1>
              <h5>
                  Car Damage Reports with Advanced Feature Management
              </h5>
          </div>
        </div>
    );
}
