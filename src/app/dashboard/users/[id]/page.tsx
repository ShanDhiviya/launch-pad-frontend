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
    const {setState}: any = useAppContext();
    const featureId = params?.id;
    const [isCreate] = React.useState(featureId === 'create');
    const [loading, setLoading] = React.useState(false);
    const [payload, setPayload] = React.useState<any>({
        name: "",
        description: "",
        status: "",
        user_group: [1],
        schedule_from: "",
        schedule_to: ""
    });
    const updateContext = async () => {
        const response = await User.getProfile();
        setState((prev: any) => ({
            ...prev,
            user: response?.data?.user,
        }));
    }
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
                await Feature.create(payload);
                await updateContext();
                toast.success("Feature created successful");
                router.replace('/dashboard/features');
            } catch (err: any) {
                toast.error('Feature creation failed. Please try again.');
            } finally {
                setLoading(false);
            }

            return;
        }

        // Update feature flag
        try {
            await Feature.update(featureId, payload);
            await updateContext();
            toast.success("Feature updated successful");
            router.replace('/dashboard/features');
        } catch (err: any) {

            toast.error(err.response?.data?.message || 'Report update failed. Please try again.');

        } finally {
            setLoading(false);
        }
    };
    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPayload({
            ...payload,
            [e.target.name]: e.target.value,
        });
    };
    const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        const checked = e.target.checked;

        setPayload((prev: { user_group: any; }) => {
            let updated = [...prev.user_group];

            if (checked) {
                if (!updated.includes(value)) {
                    updated.push(value);
                }
            } else {
                updated = updated.filter((v) => v !== value);
            }

            return {...prev, user_group: updated};
        });
    }

    React.useEffect(() => {
        if (!isCreate) {
            (async () => {
                try {
                    const response = await Feature.getOne(featureId);
                    const data = response?.data;
                    setPayload(data);
                } catch (err) {
                    toast.error('Error fetching feature');
                }
            })()
        }

    }, [featureId]);

    return (
        <section className="p-4">
            <div className="w-full flex flex-col items-center justify-center">
                <div className="flex justify-between">
                    <h2 className="text-2xl font-bold text-white mb-4">
                        {
                            isCreate ? 'Create Feature' : 'Edit Feature'
                        }
                    </h2>
                </div>
                <form className="w-150" onSubmit={formSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-300 mb-2" htmlFor="title">Title</label>
                        <input onChange={handleChange}
                               type="text"
                               value={payload?.name || ''}
                               id="name"
                               name="name"
                               className="w-full p-2 border border-gray-600 rounded-lg bg-gray-800 text-white"
                               placeholder="Feature name eg Photo Upload"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-300 mb-2" htmlFor="description">Description</label>
                        <textarea onChange={handleTextAreaChange}
                                  value={payload?.description}
                                  id="description"
                                  name="description"
                                  className="w-full p-2 border border-gray-600 rounded-lg bg-gray-800 text-white"
                                  placeholder="Feature Description"
                                  rows={4}
                        ></textarea>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-300 mb-2" htmlFor="status">Status (Enable / Disable)</label>
                        <select
                            value={payload?.status}
                            onChange={handleChange}
                            id="status"
                            name="status"
                            className="w-full p-2 border border-gray-600 rounded-lg bg-gray-800 text-white"
                        >
                            <option value="">Select</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>


                        </select>
                    </div>

                    <div className="font-bold mb-2">
                        Advance Rollout
                    </div>

                    <div className="flex gap-4 w-full">
                        <div className="mb-4">
                            <label className="block text-gray-300 mb-2" htmlFor="title">Schedule Rollout From</label>
                            <input
                                onChange={handleChange}
                                type="date"
                                value={payload?.schedule_from}
                                id="schedule_from"
                                name="schedule_from"
                                className="w-50 p-2 border border-gray-600 rounded-lg bg-gray-800 text-white"
                                placeholder="date"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-300 mb-2" htmlFor="title">To</label>
                            <input
                                onChange={handleChange}
                                type="date"
                                value={payload?.schedule_to}
                                id="schedule_to"
                                name="schedule_to"
                                className="w-50 p-2 border border-gray-600 rounded-lg bg-gray-800 text-white"
                                placeholder="date"
                            />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="mb-4">
                            <label className="block text-gray-300 mb-2" htmlFor="damage_severity">
                                User Groups Rollout
                            </label>

                            <div className="flex items-center">
                                <div className="flex items-start bg-gray-900 rounded-2xl py-1 px-4 ml-4">
                                    <Checkbox className="flex gap-1 m-0 p-0 mr-2 " name="user_group" id="admin"
                                              value="1" onChange={handleCheckBoxChange}
                                              defaultSelected={payload?.user_group.includes(1)}>
                                        Admin
                                    </Checkbox>

                                </div>

                                <div className="flex items-start bg-gray-900 rounded-2xl py-1 px-4 ml-4">
                                    <Checkbox defaultSelected={payload?.user_group.includes(2)}
                                              className="flex gap-1 m-0 p-0  mr-2 " name="user_group" id="user"
                                              value="2" onChange={handleCheckBoxChange}>
                                        User
                                    </Checkbox>

                                </div>

                                <div className="flex items-start bg-gray-900 rounded-2xl py-1 px-4 ml-4">
                                    <Checkbox defaultSelected={payload?.user_group.includes(3)}
                                              className="flex gap-1 m-0 p-0 mr-2" name="manager" id="manager" value="3"
                                              onChange={handleCheckBoxChange}>Manager </Checkbox>

                                </div>
                            </div>


                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <Link
                            href={'/dashboard/features'}
                            className="flex items-center p-2 py-0 h-4  text-white text-xs rounded-lg"
                        >
                            <CircleArrowLeft className="mr-2"/> Back to Features
                        </Link>

                        {
                            isCreate && <button
                                type="submit"
                                className="bg-gray-700 hover:bg-gray-900 text-white text-sm px-4 py-2 rounded-lg"
                            >
                                {
                                    loading ? 'Creating...' : 'Create Feature'
                                }
                            </button>
                        }
                        {
                            !isCreate && <button
                                type="submit"
                                className="bg-gray-700 hover:bg-gray-900 text-white text-sm px-4 py-2 rounded-lg"
                            >
                                {
                                    loading ? 'Updating...' : 'Update Feature'
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
