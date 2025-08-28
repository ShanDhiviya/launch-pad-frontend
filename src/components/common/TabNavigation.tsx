'use client';

import React from 'react';
import Link from "next/link";
import {usePathname} from "next/navigation";
import {FlagIcon, LogsIcon, NewspaperIcon, UsersIcon} from "lucide-react";
import {useAppContext} from "@/Providers";

export const TabNavigation = () => {

    const pathname = usePathname();
    const {user}: any = useAppContext();

    const isAdmin = user && user?.role.name === 'admin';

    const tabRoutes = [
        {
            name: 'All Reports',
            href: '/dashboard',
            icon: <NewspaperIcon className="size-3 mr-2"/>,
            permission: true
        },
        {
            name: 'Feature Flags',
            href: '/dashboard/features',
            icon: <FlagIcon className="size-3 mr-2"/>,
            permission: isAdmin
        },
        {
            name: 'User Management',
            href: '/dashboard/users',
            icon: <UsersIcon className="size-3 mr-2"/>,
            permission: isAdmin
        },
        // {
        //     name:'Analytics / Logs',
        //     href:'/dashboard/logs',
        //     icon:<LogsIcon className="size-3 mr-2"/>,
        //     permission:isAdmin
        // }
    ];


    return (
        <div className="py-4 flex w-full flex-row">
            {
                tabRoutes.map(route =>
                    (
                        route.permission && (
                            <Link
                                key={route.href}
                                href={route.href}
                                className={pathname === route.href ? 'tab-link-active' : 'tab-link'}
                            >
                                {route.icon} {route.name}
                            </Link>
                        )
                    )
                )
            }
        </div>
    );
};


