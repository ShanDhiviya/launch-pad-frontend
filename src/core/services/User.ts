import {httpAuth, UserPayload} from "@/core";


export class User {

    public static getAll = async() =>{
        return await httpAuth.get('users');
    }

    public static getOne = async(id: string) =>{
        return await httpAuth.get(`users/${id}`);
    }

    public static create = async(id: string, payload:UserPayload) =>{
        return await httpAuth.post(`users`, payload);
    }

    public static update = async(id: string, payload:UserPayload) =>{
        return await httpAuth.put(`users/${id}`, payload);
    }

    public static delete = async(id: string) =>{
        return await httpAuth.delete(`users/${id}`);
    }

    public static getProfile = async() =>{
        return await httpAuth.get('profile');
    }
}
