import React from 'react';
import StructureTab from './StructureTab';
import CastTab from './CastTab';
import LoreTab from './LoreTab';
import { TabType, ArcNode, Suggestion, Character, LoreItem, DiagnosticResult, StoryRule } from '../../types';

interface CopilotSidebarProps {
    zenMode: boolean;
    activeTab: TabType;
    setActiveTab: (tab: TabType) => void;
    structure: ArcNode[];
    activeSuggestion: Suggestion | null;
    setActiveSuggestion: (suggestion: Suggestion | null) => void;
    suggestions: Suggestion[];
    isGeneratingSuggestions: boolean;
    handleGenerateSuggestions: () => void;
    insertSuggestion: (content: string) => void;
    aiError: string | null;
    diagnostics: DiagnosticResult;
    isRunningDiagnostics: boolean;
    handleRunDiagnostics: () => void;
    characters: Character[];
    lore: LoreItem[];
    // Rule Props
    rules: StoryRule[];
    onAddRule: (rule: StoryRule) => void;
    onDeleteRule: (id: string) => void;
    // Audit Props
    onAuditCharacters?: () => void;
    isAuditing?: boolean;
}

const CopilotSidebar: React.FC<CopilotSidebarProps> = (props) => {
    const { zenMode, activeTab, setActiveTab } = props;

    if (zenMode) return null;

    return (
        <div className="w-80 border-l border-gray-800 bg-[#0f0f0f] flex flex-col shadow-2xl z-10">
            {/* Tab 切换 */}
            <div className="flex border-b border-gray-800">
                <button
                    onClick={() => setActiveTab('structure')}
                    className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === 'structure'
                        ? 'text-teal-400 border-b-2 border-teal-500 bg-gray-800/30'
                        : 'text-gray-500 hover:text-gray-300'
                        }`}
                >
                    结构
                </button>
                <button
                    onClick={() => setActiveTab('cast')}
                    className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === 'cast'
                        ? 'text-teal-400 border-b-2 border-teal-500 bg-gray-800/30'
                        : 'text-gray-500 hover:text-gray-300'
                        }`}
                >
                    角色
                </button>
                <button
                    onClick={() => setActiveTab('lore')}
                    className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === 'lore'
                        ? 'text-teal-400 border-b-2 border-teal-500 bg-gray-800/30'
                        : 'text-gray-500 hover:text-gray-300'
                        }`}
                >
                    设定
                </button>
            </div>

            {/* 内容区 */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {activeTab === 'structure' && (
                    <StructureTab
                        structure={props.structure}
                        activeSuggestion={props.activeSuggestion}
                        setActiveSuggestion={props.setActiveSuggestion}
                        suggestions={props.suggestions}
                        isGeneratingSuggestions={props.isGeneratingSuggestions}
                        handleGenerateSuggestions={props.handleGenerateSuggestions}
                        insertSuggestion={props.insertSuggestion}
                        aiError={props.aiError}
                        diagnostics={props.diagnostics}
                        isRunningDiagnostics={props.isRunningDiagnostics}
                        handleRunDiagnostics={props.handleRunDiagnostics}
                        rules={props.rules}
                        onAddRule={props.onAddRule}
                        onDeleteRule={props.onDeleteRule}
                    />
                )}
                {activeTab === 'cast' && (
                    <CastTab characters={props.characters} />
                )}
                {activeTab === 'lore' && (
                    <LoreTab lore={props.lore} />
                )}
            </div>
        </div>
    );
};

export default CopilotSidebar;
