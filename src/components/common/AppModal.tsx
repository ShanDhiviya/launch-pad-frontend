'use client';
import {Report} from "@/core";
import {toast} from "sonner";
import React from "react";

export const DeleteModal = (props: any) => (
    <section>
        <div className="text-red-400 text-lg mb-2">Are you sure to delete this report?</div>
        <button className="bg-red-500 p-2 px-4 mr-2 rounded-lg" onClick={() => {
            Report.delete(props.featureId).then(async () => {
                toast.dismiss();
                toast.success('Feature deleted');
                await props.fetchFeatures();

            }).catch(() => {
                toast.error('Error deleting feature');
            })
        }}>Yes
        </button>
        <button className="bg-gray-700 p-2 px-4 mr-2 rounded-lg" onClick={() => toast.dismiss()}>No</button>
    </section>
)
