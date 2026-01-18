import React from 'react';
import { Loader, Zap, Activity } from 'lucide-react';
import { Suggestion } from '../../types';

interface FloatingAIToolsProps {
    onGenerateSuggestions: () => void;
    onRunDiagnostics: () => void;
    isGeneratingSuggestions: boolean;
    isRunningDiagnostics: boolean;
    activeSuggestion: Suggestion | null;
    textLength: number;
    zenMode: boolean;
}

const FloatingAITools: React.FC<FloatingAIToolsProps> = ({
    onGenerateSuggestions,
    onRunDiagnostics,
    isGeneratingSuggestions,
    isRunningDiagnostics,
    activeSuggestion,
    textLength,
    zenMode
}) => {
    if (activeSuggestion || zenMode || textLength <= 30) return null;

    return (
        <div className="absolute bottom-20 -right-16 flex flex-col gap-2">
            <button
                onClick={onGenerateSuggestions}
                disabled={isGeneratingSuggestions}
                className="bg-teal-900/80 text-teal-300 p-2 rounded-full hover:bg-teal-700 transition-all shadow-lg border border-teal-700/50 flex items-center justify-center group w-10 h-10 overflow-hidden hover:w-32"
                title="生成剧情建议"
            >
                {isGeneratingSuggestions ? <Loader size={16} className="animate-spin" /> : <Zap size={16} />}
                <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap text-xs ml-0 group-hover:ml-2">
                    预测剧情
                </span>
            </button>
            <button
                onClick={onRunDiagnostics}
                disabled={isRunningDiagnostics}
                className="bg-indigo-900/80 text-indigo-300 p-2 rounded-full hover:bg-indigo-700 transition-all shadow-lg border border-indigo-700/50 flex items-center justify-center group w-10 h-10 overflow-hidden hover:w-32"
                title="运行深度诊断"
            >
                {isRunningDiagnostics ? <Loader size={16} className="animate-spin" /> : <Activity size={16} />}
                <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap text-xs ml-0 group-hover:ml-2">
                    深度诊断
                </span>
            </button>
        </div>
    );
};

export default FloatingAITools;
