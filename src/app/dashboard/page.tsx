import {Progress, TabNavigation} from "@/components";
import ReportsList from "@/app/dashboard/reports/ReportList";
import {Suspense} from "react";

export default function DashboardPage() {

    return (
        <section className="p-4">
            <TabNavigation/>
           <Suspense fallback={<Progress/>}>
               <ReportsList/>
           </Suspense>
        </section>
    );
}
