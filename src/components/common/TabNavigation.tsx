'use client';

import React from 'react';
import Link from "next/link";
import {usePathname} from "next/navigation";
import {FlagIcon, LogsIcon, NewspaperIcon, UsersIcon} from "lucide-react";

export const TabNavigation = () => {

    const pathname = usePathname();
    const tabRoutes = [
        {
            name:'All Reports',
            href:'/dashboard/reports',
            icon:<NewspaperIcon className="size-3 mr-2"/>
        },
        {
            name:'Feature Flags',
            href:'/dashboard/features',
            icon:<FlagIcon className="size-3 mr-2"/>
        },
        {
            name:'User Management',
            href:'/dashboard/users',
            icon:<UsersIcon className="size-3 mr-2"/>
        },
        {
            name:'Analytics / Logs',
            href:'/dashboard/logs',
            icon:<LogsIcon className="size-3 mr-2"/>
        }
    ];


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
                            {route.icon}   {route.name}
                        </Link>
                    ))
                }
            </div>
        </section>
    );
};


