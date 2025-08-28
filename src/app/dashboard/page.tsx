'use client';

import { useRouter } from 'next/navigation';
import {Auth} from "@/core";
import {toast} from "sonner";
import React from "react";
import {TabNavigation} from "@/components";
import {useAppContext} from "@/Providers";

export default function DashboardPage() {



    return (

            <TabNavigation />


    );
}
