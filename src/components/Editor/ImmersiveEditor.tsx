import React from 'react';
import FloatingAITools from './FloatingAITools';
import { Suggestion } from '../../types';

interface ImmersiveEditorProps {
    text: string;
    setText: (text: string) => void;
    zenMode: boolean;
    activeSuggestion: Suggestion | null;
    isGeneratingSuggestions: boolean;
    isRunningDiagnostics: boolean;
    handleGenerateSuggestions: () => void;
    handleRunDiagnostics: () => void;
}

const ImmersiveEditor: React.FC<ImmersiveEditorProps> = ({
    text,
    setText,
    zenMode,
    activeSuggestion,
    isGeneratingSuggestions,
    isRunningDiagnostics,
    handleGenerateSuggestions,
    handleRunDiagnostics
}) => {
    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    return (
        <div className="flex-1 overflow-y-auto p-8 md:p-16 flex justify-center">
            <div className="w-full max-w-3xl relative">
                <textarea
                    className="w-full h-full bg-transparent border-none outline-none resize-none text-lg leading-loose text-gray-300 placeholder-gray-700 font-serif"
                    placeholder="开始你的探索式写作..."
                    value={text}
                    onChange={handleTextChange}
                    spellCheck={false}
                    style={{ minHeight: '80vh' }}
                />

                <FloatingAITools
                    onGenerateSuggestions={handleGenerateSuggestions}
                    onRunDiagnostics={handleRunDiagnostics}
                    isGeneratingSuggestions={isGeneratingSuggestions}
                    isRunningDiagnostics={isRunningDiagnostics}
                    activeSuggestion={activeSuggestion}
                    textLength={text.length}
                    zenMode={zenMode}
                />
            </div>
        </div>
    );
};

export default ImmersiveEditor;
