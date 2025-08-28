import React from "react";
import {TabNavigation} from "@/components";
import ReportsList from "@/app/dashboard/reports/ReportList";


export default function DashboardPage() {

    return (
        <section className="p-4">
            <TabNavigation/>
            <ReportsList/>
        </section>
    );
}
