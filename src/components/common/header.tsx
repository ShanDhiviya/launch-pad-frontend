'use client';
import React from 'react';
import Link from "next/link";
import {toast} from "sonner";
import {Auth} from "@/core";
import {useRouter} from "next/navigation";
import {isAuthenticated} from "@/core/utils";

export const Header = () => {
    const router = useRouter();

    const handleLogout = async () =>{
       try{
           await Auth.logout();
           toast.success("User Logged out");
           router.push("/");
       }catch(e){
           toast.error('Unable to connect to the server');
       }
    }

    return (
      <header>
          <nav>
                <ul className="flex my-2 p-4">
                    <li className="block mr-4"><Link className="bg-gray-700 border-1 border-gray-700  p-2 px-4 text-white text-sm rounded-lg hover:bg-black" href="/login">Login</Link></li>
                    <li className="block mr-4"><Link className="bg-gray-700 border-1 border-gray-700 p-2 px-4 text-white text-sm rounded-lg hover:bg-black" href="/register">Register</Link></li>
                </ul>


          </nav>
      </header>
    );
};

