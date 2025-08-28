'use client';
import React, {ReactNode, createContext, useContext} from 'react';
import Cookie from "js-cookie";
import {User} from "@/core";

export const AppStateContext = createContext(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {

    const initialState = {
        user: null,
        isAuthenticated: false,
        token: null,
        theme: 'light',
    };
    const [state, setState] = React.useState<any>(initialState);

   React.useEffect(()=>{

       const token = Cookie.get('token') as string;

       (async () => {
           await fetchProfile();
       })();

       setState((prevState: any) => ({
           ...prevState,
           isAuthenticated: !!token,
           token,
           user: null
       }));
   },[]);

   const contextValue:any = {
       ...state,
       setState
   }

    const fetchProfile = async () => {
        const response = await User.getProfile();
        const {user} = response?.data;
        setState((prevState: any) => ({
            ...prevState,
            user: user ?? null
        }));
    }
    return (
        <AppStateContext.Provider value={contextValue}>
            {children}
        </AppStateContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppStateContext);

    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }

    return context;
};
