import React from 'react';
import { Layout, ChevronDown, Scroll, Zap, Loader, Sparkles, Activity, Eye, Scale, Ear, ShieldAlert } from 'lucide-react';
import { ArcNode, Suggestion, DiagnosticResult } from '../../types';

interface StructureTabProps {
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
}

const StructureTab: React.FC<StructureTabProps> = ({
    structure,
    activeSuggestion,
    setActiveSuggestion,
    suggestions,
    isGeneratingSuggestions,
    handleGenerateSuggestions,
    insertSuggestion,
    aiError,
    diagnostics,
    isRunningDiagnostics,
    handleRunDiagnostics
}) => {
    return (
        <>
            {/* 嵌套弧线 */}
            <div className="space-y-3">
                <div className="flex items-center justify-between text-gray-400 text-xs uppercase tracking-wider font-semibold">
                    <span>嵌套弧线 (Nested Arcs)</span>
                    <Layout size={14} />
                </div>
                <div className="pl-2 space-y-4 border-l border-gray-800">
                    {structure.map(part => (
                        <div key={part.id}>
                            <div className="flex items-center text-gray-200 font-medium text-sm mb-2">
                                <ChevronDown size={14} className="mr-1 text-gray-500" />
                                {part.title}
                            </div>
                            <div className="pl-4 space-y-3 border-l border-gray-800 ml-1.5">
                                {part.children?.map(miniArc => (
                                    <div key={miniArc.id}>
                                        <div className="flex items-center justify-between text-gray-300 text-xs mb-1">
                                            <span className="flex items-center text-teal-200">
                                                {miniArc.title}
                                            </span>
                                        </div>
                                        <div className="pl-4 space-y-1 ml-1">
                                            {miniArc.children?.map(chapter => (
                                                <div key={chapter.id} className="group">
                                                    <div className={`text-xs py-1 px-2 rounded flex items-center justify-between ${chapter.status === 'active'
                                                            ? 'bg-teal-900/20 text-teal-400 border border-teal-900/50'
                                                            : 'text-gray-600'
                                                        }`}>
                                                        <span>{chapter.title}</span>
                                                        {chapter.status === 'active' &&
                                                            <div className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                                                        }
                                                    </div>
                                                    <div className="flex items-center gap-2 mt-1 pl-2">
                                                        <span className="text-[10px] text-purple-400 bg-purple-900/20 px-1 rounded flex items-center" title="故事功能槽">
                                                            <Scroll size={8} className="mr-1" />
                                                            {chapter.functionSlot}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 预测器 (Real AI) */}
            <div className="pt-4 border-t border-gray-800 space-y-3">
                <div className="flex items-center justify-between text-gray-400 text-xs uppercase tracking-wider font-semibold">
                    <span>下一步预测 (Next Move)</span>
                    <button
                        onClick={handleGenerateSuggestions}
                        disabled={isGeneratingSuggestions}
                        className="text-amber-500 hover:text-amber-400 disabled:opacity-50"
                    >
                        {isGeneratingSuggestions ? <Loader size={14} className="animate-spin" /> : <Zap size={14} />}
                    </button>
                </div>

                {activeSuggestion ? (
                    <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-2">
                            <span className={`text-xs font-bold px-2 py-0.5 rounded ${activeSuggestion.type === 'motif' ? 'bg-purple-900 text-purple-300' : 'bg-amber-900 text-amber-300'
                                }`}>
                                {activeSuggestion.label}
                            </span>
                            <button onClick={() => setActiveSuggestion(null)} className="text-gray-500 hover:text-white">×</button>
                        </div>
                        <p className="text-sm text-gray-300 mb-3">{activeSuggestion.content}</p>
                        <div className="text-[10px] text-gray-500 italic mb-2">依据: {activeSuggestion.theory}</div>
                        <button
                            onClick={() => insertSuggestion(activeSuggestion.content)}
                            className="w-full py-1.5 bg-teal-700 hover:bg-teal-600 text-white text-xs rounded"
                        >
                            采纳 (Tab)
                        </button>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {aiError && <div className="text-xs text-red-500 bg-red-900/20 p-2 rounded">{aiError}</div>}
                        {suggestions.map((s, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveSuggestion(s)}
                                className="w-full text-left p-2 rounded border border-gray-800 hover:bg-gray-800 text-xs text-gray-500 hover:text-gray-300 transition-all flex justify-between items-center group"
                            >
                                <span>{s.label}</span>
                                {s.type === 'motif' && <Sparkles size={10} className="text-purple-500 opacity-0 group-hover:opacity-100" />}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* 诊断 - 增强版 (Real AI) */}
            <div className="pt-4 border-t border-gray-800 space-y-3">
                <div className="flex items-center justify-between text-gray-400 text-xs uppercase tracking-wider font-semibold">
                    <span>场景诊断 (Diagnostics)</span>
                    <button
                        onClick={handleRunDiagnostics}
                        disabled={isRunningDiagnostics}
                        className="text-indigo-500 hover:text-indigo-400 disabled:opacity-50"
                    >
                        {isRunningDiagnostics ? <Loader size={14} className="animate-spin" /> : <Activity size={14} />}
                    </button>
                </div>

                <div className="bg-gray-900 rounded p-3 space-y-4 border border-gray-800 relative">
                    {isRunningDiagnostics && (
                        <div className="absolute inset-0 bg-gray-900/80 z-10 flex items-center justify-center">
                            <Loader className="animate-spin text-indigo-500" />
                        </div>
                    )}

                    {/* POV Check */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center text-xs text-gray-400">
                            <Eye size={12} className="mr-2 text-blue-400" /> 视角一致性
                        </div>
                        <span className="text-xs text-teal-500 font-mono">{diagnostics.povStatus}</span>
                    </div>

                    {/* 二元对立图谱 */}
                    <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs text-gray-400">
                            <div className="flex items-center">
                                <Scale size={12} className="mr-2 text-red-400" />
                                二元对立 (Binary)
                            </div>
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-gray-500 px-1">
                            <span>{diagnostics.binaryOpposition.valA}</span>
                            <span>{diagnostics.binaryOpposition.valB}</span>
                        </div>
                        <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden flex relative">
                            <div className="h-full bg-gradient-to-r from-blue-600 to-red-600 transition-all duration-1000" style={{ width: '100%' }}>
                                {/* Marker */}
                                <div
                                    className="absolute top-0 bottom-0 w-1 bg-white shadow"
                                    style={{ left: `${diagnostics.binaryOpposition.lean}%`, transition: 'left 1s' }}
                                ></div>
                            </div>
                        </div>
                        <p className="text-[10px] text-gray-600 italic text-center mt-1">倾向值: {diagnostics.binaryOpposition.lean}</p>
                    </div>

                    {/* Sensory */}
                    <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs text-gray-400">
                            <div className="flex items-center">
                                <Ear size={12} className="mr-2 text-purple-400" />
                                感官深度
                            </div>
                            <span className={`text-xs ${diagnostics.sensoryScore > 70 ? 'text-green-500' : 'text-amber-500'}`}>
                                {diagnostics.sensoryScore}
                            </span>
                        </div>
                        <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden">
                            <div
                                className="bg-purple-600 h-full transition-all duration-1000"
                                style={{ width: `${diagnostics.sensoryScore}%` }}
                            ></div>
                        </div>
                        <p className="text-[10px] text-gray-600 italic">{diagnostics.sensoryAdvice}</p>
                    </div>

                    {/* Passive Protagonist Warning */}
                    {diagnostics.isPassive && (
                        <div className="flex items-start gap-2 text-[10px] text-amber-500 bg-amber-900/10 p-2 rounded border border-amber-900/30">
                            <ShieldAlert size={12} className="mt-0.5 flex-shrink-0" />
                            <span>{diagnostics.passiveAdvice}</span>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default StructureTab;
