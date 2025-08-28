import {Progress, TabNavigation} from "@/components";
import UsersList from "@/app/dashboard/users/UsersList";
import {Suspense} from "react";

const Page = async () => {
    return (
        <section className="p-4">
            <TabNavigation/>
            <Suspense fallback={<Progress/>}>
                <UsersList/>
            </Suspense>
        </section>
    );
};

export default Page;
