import React from 'react';
import { Feather, Zap, Minimize2, Maximize2 } from 'lucide-react';

interface ToolbarProps {
    textLength: number;
    zenMode: boolean;
    setZenMode: (mode: boolean) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ textLength, zenMode, setZenMode }) => {
    return (
        <div className="h-14 border-b border-gray-800 flex items-center justify-between px-6 bg-[#121212]">
            <div className="flex items-center space-x-2 text-teal-500 font-bold text-lg">
                <Feather size={20} />
                <span>FlowFist (流拳)</span>
                <span className="text-xs text-amber-500 font-normal ml-2 border border-amber-900/50 bg-amber-900/10 rounded px-1 flex items-center gap-1">
                    <Zap size={10} fill="currentColor" /> AI 实装版
                </span>
            </div>
            <div className="flex space-x-4 text-sm text-gray-500">
                <span>字数: {textLength}</span>
                <button
                    onClick={() => setZenMode(!zenMode)}
                    className="hover:text-teal-400 transition-colors"
                    title="禅模式"
                >
                    {zenMode ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                </button>
            </div>
        </div>
    );
};

export default Toolbar;
