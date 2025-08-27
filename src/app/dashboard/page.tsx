'use client';

import { useRouter } from 'next/navigation';
import {Auth} from "@/core";
import {toast} from "sonner";
import {getUserRole} from "@/core/utils";
import React from "react";
import {TabNavigation} from "@/components";

export default function DashboardPage() {
    const router = useRouter();

    // const role = getUserRole();
    //
    // const [userRole, setUserRole] = React.useState<string | null>(null);
    //
    // React.useEffect(() => {
    //     setUserRole(role);
    // }, [role]);

    const handleLogout = async () => {
        try {
            await Auth.logout();
            router.push('/login');
            toast.success('User logged out successfully!');
        } catch (error) {
            router.push('/login');
        }
    };

    return (
        <section>
            <TabNavigation />
            <div className="min-h-screen bg-black">
                <nav className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex items-center">
                                <h1 className="text-xl font-semibold text-gray-900"><span className="text-capitalize"></span> Dashboard</h1>
                            </div>
                            <div className="flex items-center">
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    Logout
                                </button>
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
