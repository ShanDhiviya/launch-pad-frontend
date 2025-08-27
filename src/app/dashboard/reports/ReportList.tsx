'use client';
import React from 'react';
import {Report} from '@/core';
import {Badge, Button, Card, CircularProgress} from "@heroui/react";
import {BeakerIcon} from '@heroicons/react/24/solid'
import {CalendarIcon, Clock, DatabaseIcon, EditIcon, LocateIcon, MapPin, PlusIcon, TrashIcon} from "lucide-react";
import Link from "next/link";
import {toast} from "sonner";
import {AppModal} from "@/components";
import {useRouter} from "next/navigation";

const ReportsList = () => {

    const [reports, setReports] = React.useState<any>(null);

    const router = useRouter();

    const fetchReports = async () => {
        try {
            const response = await Report.getAll();
            const data = response.data;
            setReports(data);
        } catch (e) {
            toast.error('Error fetching reports');
        }
    }

    React.useEffect(() => {
        (async () => {
            await fetchReports()
        })();
    }, [])

    if (!reports) {
        return <div>
            Please wait...
        </div>;
    }


    if (reports && reports?.length === 0) {
        return <div className="w-full p-6  border-1 rounded-lg mt-4 flex flex-col justify-between items-center">
            <h1 className="text-gray-500">
                No reports found.
            </h1>
            <DatabaseIcon className="size-5 text-gray-500"/>
            <Button className="bg-gray-700 rounded-lg text-sm mt-4"
            onClick={() => router.push('/dashboard/reports/create')}>
                Create Report
            </Button>
        </div>;
    }

    const deleteConfirmation = (reportId: string) => {

        toast(<DeleteModal reportId={reportId} fetchReports={fetchReports}/>);

    }

    return (
        <section className="p-4">
            {
                reports && <ReportListTitle router={router} reports={reports}/>
            }
            {
                reports && reports.map((report: any) => (
                    <div key={report.id} className="p-4 border-1 border-gray-700 rounded-2xl bg-black mb-4">
                        <div className="flex justify-between ">
                            <div>
                                <h3 className="font-bold mr-2 mb-2">{report.title}</h3>
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

const DeleteModal = (props: any) => (
    <section>
        <div className="text-red-400 text-lg mb-2">Are you sure to delete this report?</div>
        <button className="bg-red-500 p-2 px-4 mr-2 rounded-lg" onClick={() => {
            Report.delete(props.reportId).then(async () => {
                toast.dismiss();
                toast.success('Report deleted');
                await props.fetchReports();

            }).catch(() => {
                toast.error('Error deleting report');
            })
        }}>Yes
        </button>
        <button className="bg-gray-700 p-2 px-4 mr-2 rounded-lg" onClick={() => toast.dismiss()}>No</button>
    </section>
)
const ReportListTitle = (props: any) => (
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

export default ReportsList;
