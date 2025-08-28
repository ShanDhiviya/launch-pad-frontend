'use client';
import React from 'react';
import {Feature, Report, User} from '@/core';
import {Badge, Button} from "@heroui/react";
import {CalendarIcon, Clock, DatabaseIcon, EditIcon, MapPin, PlusIcon, TrashIcon} from "lucide-react";
import Link from "next/link";
import {toast} from "sonner";

import {useRouter} from "next/navigation";
import {DeleteModal, EmptyData, Progress, Title} from "@/components";

const UsersList = () => {

    const [users, setUsers] = React.useState<any>(null);
    const router = useRouter();

    const userProps = {
        title: 'User Management',
        sub: 'Switch between different user roles to test feature flags',
        count: `${users && users.length} users`,
        buttonText: 'Add new user',
        action: () => {
            router.push("/dashboard/users/create");
        }
    }

    const fetchUsers = async () => {
        try {
            const response = await User.getAll();
            const data = response.data.data;
            setUsers(data);
        } catch (e: any) {
            toast.error(e?.response?.data.message + ' Error fetching users');
            router.push("/dashboard/users");
        }
    }

    React.useEffect(() => {
        (async () => {
            await fetchUsers()
        })();
    }, [])

    if (!users || (users && users?.length === 0)) {
        const props = {
            title: 'No users found.',
            buttonText: 'Add new users',
            action: () => router.push('/dashboard/users/create')
        }
        return (
            <EmptyData {...props}/>
        )
    }

    const deleteFeature = (userId: string) => {
        const props = {
            userId,
            fetchUsers,
            title: 'Are you sure to delete this user?',
            action: async () => {
                try {
                    await User.delete(userId);
                    await fetchUsers();
                    toast.dismiss();
                    toast.success('User deleted successfully.');
                } catch (e) {
                    toast.error('Error deleting user');
                }
            }
        }
        toast(<DeleteModal {...props} />);
    }

    return (
        <section>
            {
                users && <Title {...userProps} />
            }
            {
                users && users?.map((user: any) => (
                    <div key={user.id} className="p-4 border-1 border-gray-700 rounded-2xl bg-black mb-4">
                        <div className="flex justify-between ">
                            <div>
                               <div className="flex">
                                   <h3 className="font-bold mr-2">{user.name}</h3>
                                   <Badge>
                                       <p className="mb-2  text-gray-200 text-capitalize bg-gray-700 py-1 rounded-2xl px-4 text-xs">
                                           {user.role.name}
                                       </p>
                                   </Badge>
                               </div>
                                <p className="text-gray-500 text-sm mb-4">{user.email}</p>
                                <div className="flex gap-2">

                                    {
                                        user.features.map((flag:any)=>(
                                            <Badge key={flag.id} className="mr-2">
                                                <p className="mb-2 text-black text-capitalize bg-blue-200 py-1 rounded-2xl px-4 text-xs">
                                                     {flag.name}
                                                </p>
                                            </Badge>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Link href={`users/${user.id}`}>
                                    <EditIcon className="size-3 text-gray-400"/>
                                </Link>

                                <Link onClick={() => deleteFeature(user.id)} href="#">
                                    <TrashIcon className="size-3 text-red-400"/>
                                </Link>
                            </div>
                        </div>
                        <div className="flex mb-4">

                            <div>
                                <p className="mr-2 text-sm">
                                    Created
                                </p>
                            </div>
                            <div className="text-gray-500 flex items-center mr-4">
                                <CalendarIcon className="size-3 mr-2"/>
                                {user.schedule_from} - {user.schedule_to}</div>

                        </div>
                    </div>

                ))
            }
        </section>
    );
};

export default UsersList;
