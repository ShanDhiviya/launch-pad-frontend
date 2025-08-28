'use client';
import React from 'react';
import {DatabaseIcon} from "lucide-react";
import {Button} from "@heroui/react";
import {useRouter} from "next/navigation";

const EmptyData = (props:any) => {
    const router = useRouter();
    return (
        <div className="w-full p-6  border-1 rounded-lg mt-4 flex flex-col justify-between items-center">
            <h1 className="text-gray-500">
                {props.title}
            </h1>
            <DatabaseIcon className="size-5 text-gray-500"/>
            <Button className="bg-gray-700 rounded-lg text-sm mt-4"
                    onClick={props.action}>
                {props.buttonText}
            </Button>
        </div>
    );
};

export {EmptyData};
