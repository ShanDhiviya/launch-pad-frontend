'use client';

import React from 'react';
import Link from "next/link";
import {usePathname} from "next/navigation";

export const TabNavigation = () => {

    const pathname = usePathname();
    console.log({pathname});

    const tabRoutes = [
        {
            name:'All Reports',
            href:'/dashboard/reports'
        },
        {
            name:'Feature Flags',
            href:'/dashboard/features'
        },
        {
            name:'User Management',
            href:'/dashboard/users'
        },
        {
            name:'Analytics / Logs',
            href:'/dashboard/logs'
        }
    ]


    return (
        <section>
            <div className="flex w-full flex-row">

                {
                    tabRoutes.map(route => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={pathname === route.href ? 'tab-link-active' : 'tab-link'}
                        >
                            {route.name}
                        </Link>
                    ))
                }
            </div>
        </section>
    );
};


