export interface LoginCredentials {
    email: string;
    password: string;
}


export interface RegisterPayload {
    name:string;
    email: string;
    password: string;
    password_confirmation: string;
}


export interface ReportPayload {
    title: string;
    description: string;
}

export interface UserPayload {
    name: string;
    email: string;
    password: string;
    password_confirmation:string;
    role_id: number;
}

export interface FeaturePayload {
    name: string;
    description: string;
    status:'active'|'inactive';
    user_group: number[];
    schedule_from:string;
    schedule_to:string;
}
