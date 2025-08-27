import Cookies from "js-cookie";

export const getToken = (): string | undefined => {
    return Cookies.get('token');
};

export const isAuthenticated = (): boolean => {
    return !!getToken();
};

export const getUserRole = () => {
    let role = "";
    const user = decodeURIComponent(Cookies.get('user') + "");

    let jsonUser = user ? JSON.parse(user+"") : {};
    if (jsonUser) {
        return  jsonUser?.role?.name;
    } else{
        return 'user';
    }
}

export const clearToken = (): void => {
    Cookies.remove('token');
}

export const clearUser = (): void => {
    Cookies.remove('user');
}
