import { TabNavigation } from "@/components";
import FeaturesList from "@/app/dashboard/features/FeaturesList";

const Page = async () => {
    return (
        <section className="p-4">
            <TabNavigation />
            <FeaturesList />
        </section>
    );
};

export default Page;
