import React from 'react';

const Progress = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-b-1 border-gray-500"></div>
                <h5 className="text-sm text-gray-400 my-4">
                  Please wait...
                </h5>
            </div>
        </div>
    );
};

export {Progress}
