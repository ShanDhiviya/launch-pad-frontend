'use client';
import React from 'react';
import {Feature, Report} from '@/core';
import {Badge, Button} from "@heroui/react";
import {CalendarIcon, Clock, DatabaseIcon, EditIcon, MapPin, PlusIcon, TrashIcon} from "lucide-react";
import Link from "next/link";
import {toast} from "sonner";

import {useRouter} from "next/navigation";
import {DeleteModal} from "@/components";

const FeaturesList = () => {

    const [features, setFeatures] = React.useState<any>(null);
    const router = useRouter();

    const featureProps = {
        router,
        features
    }

    const fetchFeatures = async () => {
        try {
            const response = await Feature.getAll();
            const data = response.data;
            setFeatures(data);
        } catch (e) {
            toast.error('Error fetching features');
        }
    }

    React.useEffect(() => {
        (async () => {
            await fetchFeatures()
        })();
    }, [])

    if (!features) {
        return <div>
            Please wait...
        </div>;
    }

    if (features && features?.length === 0) {
        return <div className="w-full p-6  border-1 rounded-lg mt-4 flex flex-col justify-between items-center">
            <h1 className="text-gray-500">
                No features found.
            </h1>
            <DatabaseIcon className="size-5 text-gray-500"/>
            <Button className="bg-gray-700 rounded-lg text-sm mt-4"
                    onClick={() => router.push('/dashboard/features/create')}>
                Create Feature Flags
            </Button>
        </div>;
    }

    const deleteFeature = (featureId: string) => {
        const props = {
            featureId,
            fetchFeatures,
        }
        toast(<DeleteModal {...props} />);
    }

    return (
        <section className="p-4">
            {
                features && <Title {...featureProps} />
            }
            {
                features && features.map((feature: any) => (
                    <div key={feature.id} className="p-4 border-1 border-gray-700 rounded-2xl bg-black mb-4">
                        <div className="flex justify-between ">
                            <div>
                                <h3 className="font-bold mr-2 mb-2">{feature.title}</h3>
                                <Badge>
                                    <p className="mb-2 mr-3 text-black text-capitalize bg-yellow-100 py-1 rounded-2xl px-4 text-xs">
                                        {feature.status}
                                    </p>
                                </Badge>

                                <Badge>
                                    <p className="mb-2 text-black text-capitalize bg-yellow-100 py-1 rounded-2xl px-4 text-xs">
                                        Damage : {feature.damage_severity}
                                    </p>
                                </Badge>
                            </div>
                            <div className="flex gap-4">
                                <Link href={`features/${feature.id}`}>
                                    <EditIcon className="size-3 text-gray-400"/>
                                </Link>

                                <Link onClick={() => deleteFeature(feature.id)} href="#">
                                    <TrashIcon className="size-3 text-red-400"/>
                                </Link>
                            </div>
                        </div>
                        <div className="flex mb-4">
                            <div className="text-gray-500 flex items-center mr-4">
                                <MapPin className="size-3 mr-2"/>{feature.location}</div>

                            <div className="text-gray-500 flex items-center mr-4">
                                <CalendarIcon className="size-3 mr-2"/>
                                {feature.date_of_incident}</div>

                            <div className="text-gray-500 flex items-center mr-4">
                                <Clock className="size-3 mr-2"/>
                                {feature.time_of_incident}</div>

                            <div className="text-gray-500 felx items-center">
                                € {feature.estimated_cost}
                            </div>
                        </div>
                        <p className="text-gray-500 text-xs mb-2">{feature.description}</p>
                    </div>

                ))
            }
        </section>
    );
};


const Title = (props: any) => (
    <section className="mb-4 flex justify-between">
        <div>
            <h2 className="text-2xl font-bold mb-1">
                Damage Reports
            </h2>
            <h4 className="text-sm text-gray-300 mb-1">
                {props.reports?.length} reports
            </h4>
        </div>
        <div>
            <button className="hover:bg-gray-900 flex items-center bg-gray-700 text-white rounded-lg text-sm mt-4 px-2 py-2" onClick={() => props.router.push('/dashboard/reports/create')}>
                <PlusIcon className="size-3 mr-2"/>  Create Report
            </button>
        </div>
    </section>
)

export default FeaturesList;
