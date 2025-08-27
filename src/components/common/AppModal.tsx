'use client';
import {toast} from "sonner";
import React from "react";

export const DeleteModal = (props: any) => (
    <section>
        <div className="text-red-400 text-lg mb-2">
            {props.title}</div>
        <button className="bg-red-500 p-2 px-4 mr-2 rounded-lg" onClick={
            props.action
        }>Yes
        </button>
        <button className="bg-gray-700 p-2 px-4 mr-2 rounded-lg" onClick={() => toast.dismiss()}>No</button>
    </section>
)
