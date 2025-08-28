'use client';
import React, {useState} from 'react';
import Link from "next/link";
import {CircleArrowLeft} from "lucide-react";
import {Report} from "@/core";
import {useParams, useRouter} from "next/navigation";
import {toast} from "sonner";

const Page = () => {

    const params = useParams();
    const router = useRouter();
    const reportId = params?.id;

    const [isCreate] = React.useState(reportId === 'create');
    const [payload, setPayload] = useState<
        any>({
        title: '',
        description: '',
        location: '',
        date_of_incident: '',
        time_of_incident: '',
        damage_severity: '',
        estimated_cost: '',
        status: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setPayload({
            ...payload,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        // create report
        if (isCreate) {
            try {
                await Report.create({
                    ...payload,
                    photos: []
                });
                toast.success("Report created successful");
                router.replace('/dashboard/reports');
            } catch (err: any) {
                toast.error(err.response?.data?.message || 'Report creation failed. Please try again.');
            } finally {
                setLoading(false);
            }

            return;
        }


        // udate report
        try {
            await Report.update(reportId, {
                ...payload,
                photos: []
            });
            toast.success("Report updated successful");
            router.replace('/dashboard/reports');
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

    React.useEffect(() => {
        if (!isCreate) {
            (async () => {
                try {
                    const response = await Report.getOne(reportId);
                    const data = response.data;
                    setPayload(data);
                } catch (e) {
                    toast.error('Error fetching report');
                }
            })()
        }

    }, [reportId])

    return (
        <section className="p-4">
            <div className="w-full flex flex-col items-center justify-center">
                <div className="flex justify-between">
                    <h2 className="text-2xl font-bold text-white mb-4">
                        {
                            isCreate ? 'Create Report' : 'Edit Report'
                        }
                    </h2>

                </div>
                <form className="w-150" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-300 mb-2" htmlFor="title">Title</label>
                        <input onChange={handleChange}
                               type="text"
                               value={payload.title}
                               id="title"
                               name="title"
                               className="w-full p-2 border border-gray-600 rounded-lg bg-gray-800 text-white"
                               placeholder="Report Title"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-300 mb-2" htmlFor="description">Description</label>
                        <textarea onChange={handleTextAreaChange}
                                  value={payload.description}
                                  id="description"
                                  name="description"
                                  className="w-full p-2 border border-gray-600 rounded-lg bg-gray-800 text-white"
                                  placeholder="Report Description"
                                  rows={4}
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-300 mb-2" htmlFor="title">Location</label>
                        <input
                            onChange={handleChange}
                            type="text"
                            value={payload.location}
                            id="title"
                            name="location"
                            className="w-full p-2 border border-gray-600 rounded-lg bg-gray-800 text-white"
                            placeholder="Location"
                        />
                    </div>
                    <div className="flex gap-4 w-full">
                        <div className="mb-4">
                            <label className="block text-gray-300 mb-2" htmlFor="title">Date</label>
                            <input
                                onChange={handleChange}
                                type="date"
                                value={payload.date_of_incident}
                                id="date_of_incident"
                                name="date_of_incident"
                                className="w-50 p-2 border border-gray-600 rounded-lg bg-gray-800 text-white"
                                placeholder="date"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-300 mb-2" htmlFor="title">Time</label>
                            <input
                                onChange={handleChange}
                                type="time"
                                value={payload.time_of_incident}
                                id="time_of_incident"
                                name="time_of_incident"
                                className="w-50 p-2 border border-gray-600 rounded-lg bg-gray-800 text-white"
                                placeholder="time"
                            />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="mb-4">
                            <label className="block text-gray-300 mb-2" htmlFor="status">Status</label>
                            <select
                                value={payload.status}
                                onChange={handleChange}
                                id="status"
                                name="status"
                                className="w-50 p-2 border border-gray-600 rounded-lg bg-gray-800 text-white"
                            >
                                <option value="">Select</option>
                                <option value="draft">Draft</option>
                                <option value="submitted">Submitted</option>
                                <option value="reviewed">Reviewed</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>

                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-300 mb-2" htmlFor="damage_severity">Damage
                                Severity</label>
                            <select onChange={handleChange}
                                    value={payload.damage_severity}
                                    id="damage_severity"
                                    name="damage_severity"
                                    className="w-50 p-2 border border-gray-600 rounded-lg bg-gray-800 text-white"
                            >
                                <option value="">Select</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-300 mb-2" htmlFor="title">Estimated Cost</label>
                        <input
                            onChange={handleChange}
                            value={payload.estimated_cost}
                            type="number"
                            id="estimated_cost"
                            name="estimated_cost"
                            className="w-full p-2 border border-gray-600 rounded-lg bg-gray-800 text-white"
                            placeholder="Estimated Cost"
                        />
                    </div>

                    <div className="flex justify-between items-center">
                        <Link
                            href={'/dashboard/reports'}
                            className="flex items-center p-2 py-0 h-4  text-white text-xs rounded-lg"
                        >
                            <CircleArrowLeft className="mr-2"/> Back to Reports
                        </Link>

                        {
                            isCreate && <button
                                type="submit"
                                className="bg-gray-700 hover:bg-gray-900 text-white text-sm px-4 py-2 rounded-lg"
                            >
                                {
                                    loading ? 'Creating...' : 'Create Report'
                                }
                            </button>
                        }
                        {
                            !isCreate && <button
                                type="submit"
                                className="bg-gray-700 hover:bg-gray-900 text-white text-sm px-4 py-2 rounded-lg"
                            >
                                {
                                    loading ? 'Updating...' : 'Update Report'
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
