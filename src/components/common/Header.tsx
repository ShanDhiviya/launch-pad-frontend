'use client';
import React from 'react';
import Link from "next/link";
import {useAppContext} from "@/Providers";
import {Auth} from "@/core";
import {toast} from "sonner";
import {usePathname, useRouter} from "next/navigation";

export const Header = () => {

    const {isAuthenticated, user, setState}: any = useAppContext();
    const pathname = usePathname();
    const router = useRouter();

    const isLogin = pathname === "/login";

    const handleLogout = async () => {
        try {
            await Auth.logout();

            setState((prevState: any) => ({
                ...prevState,
                user: null,
                isAuthenticated: false,
                token: null
            }));

            router.push('/login');
            toast.success('User logged out successfully!');
        } catch (error:any) {
            toast.error(error?.response.data.message);
            router.push('/login');
        }
    }

    return (
        <header>
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 bg-gray-900">
                <div className="flex justify-between h-17">
                    <div className="flex items-center">
                        {
                            isAuthenticated && (
                                <h1 className="text-xl font-semibold text-gray-100"><span
                                    className="text-capitalize">{user?.role?.name}</span> Dashboard</h1>
                            )
                        }
                        {
                            !isAuthenticated && (
                                <h1 className="text-xl font-semibold text-gray-100"><span
                                    className="text-capitalize"></span> Feature Flag Demo System
                                    <small className="text-gray-400 font-normal block text-sm">
                                        Car Damage Reports with Advanced Feature Management
                                    </small>
                                </h1>

                            )
                        }
                    </div>
                    <nav>
                        <ul className="flex mt-5 p-0">
                            {
                                !isAuthenticated &&
                                <>
                                    {
                                        !isLogin &&
                                        <li className="block mr-4"><Link
                                            className="bg-gray-700 border-1 border-gray-700 p-2 px-4 text-white text-sm rounded-lg hover:bg-black"
                                            href="/login">Login</Link>
                                        </li>
                                    }
                                    <li className="block mr-4"><Link
                                        className="bg-gray-700 border-1 border-gray-700 p-2 px-4 text-white text-sm rounded-lg hover:bg-black"
                                        href="/register">Register</Link></li>
                                </>
                            }

                            {
                                isAuthenticated &&
                                <li className="block mr-4"><Link
                                    className="bg-red-700   p-2 px-4 text-white text-sm rounded-lg hover:bg-red-900"
                                    href="#"
                                    onClick={handleLogout}>Logout</Link></li>
                            }
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};

