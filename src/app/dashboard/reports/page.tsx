import {redirect} from "next/navigation";
import {ROUTES} from "@/core";


const Page = async () => {
    redirect(ROUTES.DASHBOARD)
};

export default Page;
