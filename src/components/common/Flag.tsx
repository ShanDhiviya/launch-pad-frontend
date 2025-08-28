import React from 'react';
import {FlagOff} from "lucide-react";

const Flag = (props: { flag: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }) => {
    return (
        <div className="cursor-not-allowed w-80 border-1 border-gray-600 rounded-lg px-4 py-1">
            <p className="text-sm text-gray-500 flex items-start m-0">
                <FlagOff className="size-6 mt-1 mr-2 text-red-400"/>
                {
                    props.flag
                }
            </p>
        </div>
    );
};

export {Flag};
