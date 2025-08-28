import React, {ReactNode} from 'react';

interface SimpleInputProps  {
    action?:()=>void;
    icon?:ReactNode;
    name:string;
    value?:any;
    placeholder?:string;
    type:string | 'text' | 'email';
    className?:string;
    label?:string;
}

const className = "py-2 px-2 text-lg w-full bg-gray-50 text-black border-1 border-gray-400 rounded-lg";

const SimpleInput = (props:SimpleInputProps) => {
    const {action, icon, label, value, name, type="text", validationMessage, className}:any = props;
    return (
        <div className="mb-6">
            {label && <label htmlFor={name}>{name}</label>}
            <input placeholder="Email address"
                   name={name}
                   type={type}
                   required
                   value={value}
                   className={className}
                   onChange={action} />
            <div className="bg-red-400 text-red-500">
                {validationMessage}
            </div>
        </div>
    );
};

export {SimpleInput};
