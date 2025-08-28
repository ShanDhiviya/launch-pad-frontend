import React from 'react';
import {useAppContext} from "@/Providers";
import {Flag} from "@/components";

const FlagComponent = (props:any) => {

    const {featureFlag, component, message} = props
    const STATUS = 'active';
    const {user}:any = useAppContext();

    const features = user?.features ?? null;

   const isFlag = features && features.some((feature: any) => {
        return feature.flag === featureFlag && feature.status === STATUS;
    });

   if(isFlag){
       return component;
   }

   if(!isFlag){
       return <Flag flag={message}/>
   }
};

export {FlagComponent};
