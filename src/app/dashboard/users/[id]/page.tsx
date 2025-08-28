'use client';

import React from 'react';
import {useParams, useRouter} from "next/navigation";
import Link from "next/link";
import {CircleArrowLeft} from "lucide-react";
import {Feature, Report, User} from "@/core";
import {toast} from "sonner";
import {Checkbox} from "@heroui/react";
import {useAppContext} from "@/Providers";

const Page = () => {

    const router = useRouter();
    const params = useParams();
    const userId = params?.id;
    const [isCreate] = React.useState(userId === 'create');
    const [loading, setLoading] = React.useState(false);
    const [payload, setPayload] = React.useState<any>({
        name: "",
        password: "",
        email: "",
        role: {
            id: 2
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPayload({
            ...payload,
            [e.target.name]: e.target.value,
        });
    };

    const formSubmit = async (e: any) => {
        e.preventDefault();

        setLoading(true);

        // Create feature flag
        if (isCreate) {
            try {
                await User.create({
                    name: payload.name as string,
                    email: payload.email as string,
                    password: payload.password as string,
                    password_confirmation: payload.password as string,
                    role_id: parseInt(payload.role.id as string),
                });
                toast.success("User added");
                router.replace('/dashboard/users');
            } catch (err: any) {
                toast.error('User creation failed. Please try again.');
            } finally {
                setLoading(false);
            }

            return;
        }

        // Update feature flag
        try {
            await User.update(userId, {
                name: payload.name as string,
                email: payload.email as string,
                password: payload.password as string,
                password_confirmation: payload.password as string,
                role_id: parseInt(payload.role.id as string),
            });
            toast.success("User updated successful");
            router.replace('/dashboard/users');
        } catch (err: any) {

            toast.error(err.response?.data?.message || 'Report update failed. Please try again.');

        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        if (!isCreate) {
            (async () => {
                try {
                    const response = await User.getOne(userId);
                    const data = response?.data?.data;
                    console.log(data);
                    setPayload(data);
                } catch (err) {
                    toast.error('Error fetching feature');
                }
            })()
        }

    }, [userId]);

    return (
        <section className="p-4">
            <div className="w-full flex flex-col items-center justify-center">
                <div className="flex justify-between">
                    <h2 className="text-2xl font-bold text-white mb-4">
                        {
                            isCreate ? 'Add User' : 'Edit User'
                        }
                    </h2>
                    {
                        JSON.stringify(payload)
                    }
                </div>
                <form className="w-150" onSubmit={formSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-300 mb-2" htmlFor="title">Username</label>
                        <input onChange={handleChange}
                               type="text"
                               value={payload?.name || ''}
                               id="name"
                               name="name"
                               className="w-full p-2 border border-gray-600 rounded-lg bg-gray-800 text-white"
                               placeholder="Username eg Shan"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-300 mb-2" htmlFor="title">Email Address</label>
                        <input onChange={handleChange}
                               required
                               type="email"
                               value={payload?.email || ''}
                               id="email"
                               name="email"
                               className="w-full p-2 border border-gray-600 rounded-lg bg-gray-800 text-white"
                               placeholder="Email address"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-300 mb-2" htmlFor="title">Password</label>
                        <input onChange={handleChange}
                               required
                               type="password"
                               value={payload?.password || ''}
                               id="password"
                               name="password"
                               className="w-full p-2 border border-gray-600 rounded-lg bg-gray-800 text-white"
                               placeholder="Password"
                        />
                    </div>


                    <div className="mb-4">
                        <label className="block text-gray-300 mb-2" htmlFor="status">User Group</label>
                        <select
                            value={payload?.role?.id}
                            onChange={handleChange}
                            id="status"
                            name="status"
                            className="w-full p-2 border border-gray-600 rounded-lg bg-gray-800 text-white"
                        >
                            <option value="2">User</option>
                            <option value="1">Admin</option>
                            <option value="3">Manager</option>

                        </select>
                    </div>


                    <div className="flex justify-between items-center">
                        <Link
                            href={'/dashboard/users'}
                            className="flex items-center p-2 py-0 h-4  text-white text-xs rounded-lg"
                        >
                            <CircleArrowLeft className="mr-2"/> Back to Users
                        </Link>

                        {
                            isCreate && <button
                                type="submit"
                                className="bg-gray-700 hover:bg-gray-900 text-white text-sm px-4 py-2 rounded-lg"
                            >
                                {
                                    loading ? 'Creating...' : 'Create user'
                                }
                            </button>
                        }
                        {
                            !isCreate && <button
                                type="submit"
                                className="bg-gray-700 hover:bg-gray-900 text-white text-sm px-4 py-2 rounded-lg"
                            >
                                {
                                    loading ? 'Updating...' : 'Update user'
                                }
                            </button>
                        }
                    </div>

                </form>
            </div>
        </section>
    );
};

export default Page;
