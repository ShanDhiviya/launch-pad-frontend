import {httpClient, httpAuth, RegisterPayload} from "@/core";
import Cookies from "js-cookie";
import {clearToken, clearUser} from "@/core/utils";

export class Auth {
    public static login = async (payload: { email: string | undefined; password: string | undefined }) => {
       const response =  await httpClient.post('login', payload);

       Cookies.set('token', response.data.token.plainTextToken);

       return response;
    }

    public static logout = async () => {
        const response =  await httpAuth.post('logout');
        if(response.status === 200){
          clearUser();
          clearToken();
        }
    }

    public static register = async (payload: RegisterPayload) => {
        return await httpClient.post('register', payload);
    }
}
