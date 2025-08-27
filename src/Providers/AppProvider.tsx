'use client';
import React, {ReactNode, createContext, useContext} from 'react';
import Cookie from "js-cookie";

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
       const currentUser:any = decodeURIComponent(Cookie.get('user') as string);
       const token = Cookie.get('token') as string;

       setState((prevState: any) => ({
           ...prevState,
           isAuthenticated: !!token,
           token,
           user:currentUser && currentUser !== "undefined" ? JSON.parse(currentUser) : {}
       }));
   },[]);

   const contextValue:any = {
       ...state,
       setState
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
