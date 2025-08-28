'use client';
import React from 'react';
import {Report} from '@/core';
import {Badge} from "@heroui/react";
import {CalendarIcon, Clock, EditIcon, MapPin, PlusIcon, TrashIcon} from "lucide-react";
import Link from "next/link";
import {toast} from "sonner";
import {DeleteModal, Progress, EmptyData, Title} from "@/components";
import {useRouter} from "next/navigation";
import {useAppContext} from "@/Providers";
import FlagComponent from "@/components/common/FlagComponent";

const ReportsList = () => {

    const [reports, setReports] = React.useState<any>(null);

    const router = useRouter();

    React.useEffect(() => {
        (async () => {
            await fetchReports()
        })();
    }, []);

    const fetchReports = async () => {
        try {
            const response = await Report.getAll();
            const data = response.data;
            setReports(data);
        } catch (e) {
            toast.error('Error fetching reports');
        }
    };

    const deleteConfirmation = (reportId: string) => {
        const props = {
            reportId,
            action: () => {
                Report.delete(props.reportId).then(async () => {
                    toast.dismiss();
                    toast.success('Report deleted');
                    await fetchReports();

                }).catch(() => {
                    toast.error('Error deleting report');
                })
            }
        }
        toast(<DeleteModal {...props} />);
    }

    if (!reports) {
        return <Progress/>
    };

    if (reports && reports?.length === 0) {
        const props = {
            title: 'No reports',
            buttonText: 'Add a report',
            action: () => {
                router.push('/dashboard/reports/create');
            }
        }
        return (
            <EmptyData {...props}/>
        )
    };

    const AppTitle = () =>{
        const props = {
            title:'Car Damage Reports',
            sub:'Manage and track vehicle damage incidents',
            buttonText: 'Create report',
            count:`${reports && reports?.length} reports`,
            action:() => router.push('/dashboard/reports/create')
        }
        return (
            <Title {...props}/>
        )
    };

    const flagProps = {
        featureFlag:'ADVANCE_FILTERS',
        message:'Filter options for reports is not available for this user',
        component:<AdvancedFilters/> ,
    }

    return (
        <section>
            {
                reports && <AppTitle/>
            }

           <FlagComponent {...flagProps}/>
            {
                reports && reports.map((report: any) => (
                    <div key={report.id} className="p-4 border-1 border-gray-700 rounded-2xl bg-black mb-4">
                        <div className="flex justify-between ">
                            <div>
                                <h3 className="font-bold mr-2 mb-2">{report.title}</h3>
                                <div className="flex">
                                    <Badge>
                                        <p className="mb-2 mr-3 text-black text-capitalize bg-yellow-100 py-1 rounded-2xl px-4 text-xs">
                                            {report.status}
                                        </p>
                                    </Badge>
                                    <Badge>
                                        <p className="mb-2 text-black text-capitalize bg-yellow-100 py-1 rounded-2xl px-4 text-xs">
                                            Damage : {report.damage_severity}
                                        </p>
                                    </Badge>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Link href={`reports/${report.id}`}>
                                    <EditIcon className="size-3 text-gray-400"/>
                                </Link>

                                <Link onClick={() => deleteConfirmation(report.id)} href="#">
                                    <TrashIcon className="size-3 text-red-400"/>
                                </Link>
                            </div>
                        </div>
                        <div className="flex mb-4">
                            <div className="text-gray-500 flex items-center mr-4">
                                <MapPin className="size-3 mr-2"/>{report.location}</div>

                            <div className="text-gray-500 flex items-center mr-4">
                                <CalendarIcon className="size-3 mr-2"/>
                                {report.date_of_incident}</div>

                            <div className="text-gray-500 flex items-center mr-4">
                                <Clock className="size-3 mr-2"/>
                                {report.time_of_incident}</div>

                            <div className="text-gray-500 felx items-center">
                                € {report.estimated_cost}
                            </div>
                        </div>
                        <p className="text-gray-500 text-xs mb-2">{report.description}</p>
                    </div>

                ))
            }
        </section>
    );
};
const AdvancedFilters = (props:any) =>{
    return(
        <div>
            <h2>
                Advanced Filters
            </h2>
            <select className="mr-4 outline-0 w-60 border-1 border-gray-600 rounded-lg px-2 py-2 text-sm my-4">
                <option>All Status</option>
                <option>Draft</option>
                <option>Submitted</option>
                <option>Reviewed</option>
                <option>Approved</option>
                <option>Rejected</option>
            </select>

            <select className="outline-0 w-60 border-1 border-gray-600 rounded-lg px-2 py-2 text-sm my-4">
                <option>All Severities</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
            </select>
        </div>
    )
}
export default ReportsList;
