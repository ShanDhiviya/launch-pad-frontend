import {FeaturePayload, httpAuth, UserPayload} from "@/core";

export class Feature {

    public static getAll = async() =>{
        return await httpAuth.get('/features');
    }

    public static getOne = async (id: string | Array<string> | undefined) =>{
        return await httpAuth.get(`/features/${id}`);
    }

    public static create = async(payload:any) =>{
        return await httpAuth.post(`/features`, payload);
    }

    public static update = async (id: string | Array<string> | undefined, payload: FeaturePayload) =>{
        return await httpAuth.put(`/features/${id}`, payload);
    }

    public static delete = async(id: string) =>{
        return await httpAuth.delete(`/features/${id}`);
    }
}
