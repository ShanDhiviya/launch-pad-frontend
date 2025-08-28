import { TabNavigation } from "@/components";
import UsersList from "@/app/dashboard/users/UsersList";

const Page = async () => {
    return (
        <section className="p-4">
            <TabNavigation />
            <UsersList />
        </section>
    );
};

export default Page;
