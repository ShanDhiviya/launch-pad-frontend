'use client';
import {Button, Card, CardBody, Tab, Tabs} from '@heroui/react';
import React from 'react';
import Link from "next/link";

export const TabNavigation = () => {
    return (
        <section>
            <div className="flex w-full flex-row">

            <Link className="text-sm hover:text-gray-100 hover:bg-gray-800 px-4 py-2 bg-gray-700 rounded-lg mr-4" href={`/dashboard/reports`}>
                    All Reports
            </Link>

                <Link className="text-sm hover:text-gray-100 hover:bg-gray-800 px-4 py-2 bg-gray-700 rounded-lg mr-4" href={`/dashboard/features`}>
                    Feature Flags
                </Link>

                <Link className="text-sm hover:text-gray-100 hover:bg-gray-800 px-4 py-2 bg-gray-700 rounded-lg mr-4" href={`/dashboard/users`}>
                    User Management
                </Link>

                <Link className="text-sm hover:text-gray-100 hover:bg-gray-800 px-4 py-2 bg-gray-700 rounded-lg mr-4" href={`/dashboard/logs`}>
                    Analytics / Logs
                </Link>
            </div>
        </section>
    );
};


