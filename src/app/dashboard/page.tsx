'use client';

import { useRouter } from 'next/navigation';
import {Auth} from "@/core";
import {toast} from "sonner";
import React from "react";
import {TabNavigation} from "@/components";
import {useAppContext} from "@/Providers";

export default function DashboardPage() {

   const {user}:any = useAppContext();

    return (
        <section>
            <TabNavigation />
            <div className="min-h-screen bg-black">
                <nav className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex items-center">
                                <h1 className="text-xl font-semibold text-gray-900"><span className="text-capitalize">{user?.role?.name}</span> Dashboard</h1>
                            </div>
                        </div>
                    </div>
                </nav>

                <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
                        <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-white mb-4">
                                    Welcome to your Dashboard!
                                </h2>
                                <p className="text-gray-100">
                                    You have successfully logged in. This is a protected route.
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </section>

    );
}
