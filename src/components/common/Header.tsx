'use client';
import React from 'react';
import Link from "next/link";
import {useAppContext} from "@/Providers";
import {Auth} from "@/core";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

export const Header = () => {

    const {isAuthenticated, setState}:any = useAppContext();
    const router = useRouter();

    const handleLogout = async () =>{
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
        } catch (error) {
            router.push('/login');
        }
    }

    return (
      <header>
          <nav>
              {
                  !isAuthenticated &&
                  <ul className="flex my-2 p-4">
                      <li className="block mr-4"><Link className="bg-gray-700 border-1 border-gray-700  p-2 px-4 text-white text-sm rounded-lg hover:bg-black" href="/login">Login</Link></li>
                      <li className="block mr-4"><Link className="bg-gray-700 border-1 border-gray-700 p-2 px-4 text-white text-sm rounded-lg hover:bg-black" href="/register">Register</Link></li>
                  </ul>
              }

              {
                  isAuthenticated &&
                  <ul className="flex my-2 p-4">
                      <li className="block mr-4"><Link className="bg-red-700   p-2 px-4 text-white text-sm rounded-lg hover:bg-red-900" href="#" onClick={handleLogout}>Logout</Link></li>
                  </ul>
              }
          </nav>
      </header>
    );
};

