import {Progress, TabNavigation} from "@/components";
import FeaturesList from "@/app/dashboard/features/FeaturesList";
import {Suspense} from "react";

const Page = async () => {
    return (
        <section className="p-4">
            <TabNavigation/>
            <Suspense fallback={<Progress/>}>
                <FeaturesList/>
            </Suspense>
        </section>
    );
};

export default Page;
