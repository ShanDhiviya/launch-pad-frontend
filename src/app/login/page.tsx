'use client';
import {Input, Button} from "@heroui/react";
import {useRouter} from "next/navigation";
import React, {useState} from "react";
import {LoginCredentials} from "@/app/login/types";
import {Auth, ROUTES} from "@/core";
import Link from "next/link";
import {toast} from "sonner";

export default function LoginPage() {
    const [credentials, setCredentials] = useState<LoginCredentials>({
        email: 'admin@launchpad.com',
        password: 'password',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await Auth.login(credentials);
            toast.success("Login successful");

            router.push(ROUTES.DASHBOARD);
        } catch (err: any) {

            toast.error(err.response?.data?.message || 'Login failed. Please try again.');

        } finally {
            setLoading(false);
        }
    };


    return (
       <section className="flex justify-center min-w-full">
           <div className="w-100">
               <h2 className="text-3xl font-bold text-gray-100 text-center mb-4">
                   Sig In
               </h2>
               <form onSubmit={handleSubmit}>
                   <div className="flex flex-col w-full">
                       <div className="mb-6">
                           <Input placeholder="Email address" isRequired name="email" type="email" required value={credentials.email}
                                  className="w-full bg-gray-50 text-black border-1 border-gray-400 rounded-lg"
                                  onChange={handleChange} />
                       </div>
                       <div className="mb-6">
                           <Input placeholder="Password"  name="password" type="password" required
                                  className="w-full text-black bg-gray-50 border-1 border-gray-400 rounded-lg" value={credentials.password} onChange={handleChange} />
                       </div>
                   </div>

                   <div>
                       <div>
                           <Button disabled={loading} type="submit" className="w-full bg-gray-700 text-white rounded-lg hover:bg-black border-1 border-gray-700 text-sm ">
                               {loading ? 'Signing in...' : 'Sign in'}
                           </Button>
                       </div>

                       {error && (
                           <div className="text-red-600 text-sm text-center">{error}</div>
                       )}

                   </div>

                   <div className="text-center mt-4">
                       <Link
                           href="/register"
                           className="text-sm text-gray-300 hover:text-gray-100"
                       >
                           Don't have an account? Sign up
                       </Link>
                   </div>
               </form>
           </div>
       </section>
    );
}
