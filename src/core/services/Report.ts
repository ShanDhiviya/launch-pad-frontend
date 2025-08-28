import {httpAuth} from "@/core";


export class Report {

    public static getAll = async() =>{
        return await httpAuth.get('/reports');
    }

    public static getOne = async(id: any) =>{
        return await httpAuth.get(`/reports/${id}`);
    }

    public static create = async( payload:any) =>{
        return await httpAuth.post(`/reports`, payload);
    }

    public static update = async(id: any, payload:any) =>{
        return await httpAuth.put(`/reports/${id}`, payload);
    }

    public static delete = async(id: any) =>{
        return await httpAuth.delete(`/reports/${id}`);
    }
}
