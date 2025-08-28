'use client';
import React, {useState} from 'react';
import {Input, Button} from "@heroui/react";
import {useRouter} from "next/navigation";
import {Auth, RegisterPayload, ROUTES} from "@/core";
import {toast} from "sonner";

const Register = () => {

    const [payload, setPayload] = useState<
    RegisterPayload>({
        name:'',
        email: '',
        password: '',
        password_confirmation: '',
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPayload({
            ...payload,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await Auth.register(payload);
            toast.success("Register successful");
            router.push(ROUTES.LOGIN);
        } catch (err: any) {

            toast.error(err.response?.data?.message || 'Registration failed. Please try again.');

        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="h-screen flex justify-center flex-col items-center min-w-full">
     <div className="w-100">
    <form onSubmit={handleSubmit}>
        <div className="mb-6 ">
            <h2 className="text-3xl font-bold text-gray-100 text-center">
                Register
            </h2>
        </div>
        <div className="mb-4">
            <Input name="name" onChange={handleChange} placeholder="Username" className="w-full py-2 px-4 border-1 bg-gray-50 text-black border-1 border-gray-400 rounded-lg"/>
        </div>
        <div className="mb-4">
            <Input name="email" onChange={handleChange} type="email" placeholder="Email address" className="w-full py-2 px-4 border-1 bg-gray-50 text-black border-1 border-gray-400 rounded-lg"/>
        </div>
        <div className="mb-4">
            <Input name="password" onChange={handleChange} type="password" placeholder="Password" className="w-full py-2 px-4 border-1 bg-gray-50 text-black border-1 border-gray-400 rounded-lg"/>
        </div>
        <div className="mb-4">
            <Input name="password_confirmation" onChange={handleChange} type="password" placeholder="Confirm Password" className="w-full py-2 px-4 border-1 bg-gray-50 text-black border-1 border-gray-400 rounded-lg"/>
        </div>
        <div>
            <Button type="submit" className="px-4 py-2 w-full cursor-pointer bg-gray-700 text-white rounded-lg hover:bg-black border-1 border-gray-700 text-sm">
                {loading ? 'Registering...' : 'Register'}
            </Button>
        </div>
    </form>
     </div>
 </section>
    );
};

export default Register;

