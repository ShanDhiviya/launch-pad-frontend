import { TabNavigation } from "@/components";
import ReportsList from "@/app/dashboard/reports/ReportList"; // assuming this is a server-safe fetch wrapper


const Page = async () => {
    return (
        <section className="p-4">
            <TabNavigation />
           <ReportsList />
        </section>
    );
};

export default Page;
