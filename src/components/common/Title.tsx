import React from 'react';
import {DownloadIcon, PlusIcon} from "lucide-react";
import {FLAGS} from "@/core";
import FlagComponent from "@/components/common/FlagComponent";

const Title = (props: any) => {


    const ExportButton = () =>{
        return (
            <button
                className="hover:bg-gray-900 flex items-center bg-gray-700 text-white rounded-lg text-sm px-2 py-2"
                onClick={()=>{}}>
                <DownloadIcon className="size-3 mr-2"/>
                Export Reports
            </button>
        )
    }

    const flagProps = {
        featureFlag:FLAGS.EXPORT_REPORTS,
        component:<ExportButton/>,
        message:"Export report feature not available for this user"
    }



    return (
        <section className="mb-4 flex justify-between items-center">
            <div className="flex flex-col">
                <h2 className="text-2xl font-bold mb-1">
                    {props.title}
                </h2>
                <p className="text-sm text-gray-400 mb-1">
                    {props.sub} | <span className="text-sm text-gray-400 mb-1 font-bold">
               {props.count}
            </span>
                </p>

            </div>
            <div className="flex gap-4">

                <FlagComponent {...flagProps}/>
                <button
                    className="hover:bg-gray-900 flex items-center bg-gray-700 text-white rounded-lg text-sm px-2 py-2"
                    onClick={props.action}>
                    <PlusIcon className="size-3 mr-2"/>
                    {props.buttonText}
                </button>
            </div>
        </section>
    )
}

export {Title};
