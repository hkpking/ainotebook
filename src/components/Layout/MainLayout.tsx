import React from 'react';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="flex h-screen w-full bg-[#121212] text-gray-200 font-sans transition-all duration-500 overflow-hidden">
            {children}
        </div>
    );
};

export default MainLayout;
