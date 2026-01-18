import React, { useState } from 'react';
import MainLayout from './components/Layout/MainLayout';
import Toolbar from './components/UI/Toolbar';
import ImmersiveEditor from './components/Editor/ImmersiveEditor';
import StoryCompass from './components/Compass/StoryCompass';
import CopilotSidebar from './components/Sidebar/CopilotSidebar';
import { initialStructure, initialSuggestions, initialDiagnostics, mockCharacters, mockLore, initialText } from './data/initialState';
import { Suggestion, TabType, ArcNode, DiagnosticResult } from './types';
import { generateAIResponse } from './services/ai';

const App = () => {
    const [text, setText] = useState<string>(initialText);
    const [zenMode, setZenMode] = useState(false);
    const [activeTab, setActiveTab] = useState<TabType>('structure');
    const [structure] = useState<ArcNode[]>(initialStructure);
    const [activeSuggestion, setActiveSuggestion] = useState<Suggestion | null>(null);
    const [suggestions, setSuggestions] = useState<Suggestion[]>(initialSuggestions);
    const [diagnostics, setDiagnostics] = useState<DiagnosticResult>(initialDiagnostics);
    const [currentStep] = useState(3);

    // Loading States
    const [isGeneratingSuggestions, setIsGeneratingSuggestions] = useState(false);
    const [isRunningDiagnostics, setIsRunningDiagnostics] = useState(false);
    const [aiError, setAiError] = useState<string | null>(null);

    const insertSuggestion = (content: string) => {
        setText(prev => prev + "\n" + content);
        setActiveSuggestion(null);
    };

    const handleGenerateSuggestions = async () => {
        const prompt = `
      Context: The user is writing a novel. Current text segment: "${text.slice(-1000)}".
      Task: Based on Jerry Jenkins' 'Intensify Problems', 'Hopelessness' and Propp's 'Functions',
      generate 3 distinct plot continuations suitable for discovery writing.
      1. Type 'smooth': Logical consequence (Action -> Reaction).
      2. Type 'conflict': Intensify the problem (Make it worse).
      3. Type 'motif': Inject a folklore motif or archetype (Propp/Shi Aidong).

      Output JSON format:
      {
        "suggestions": [
          { "type": "smooth", "label": "顺滑推进", "content": "...", "theory": "..." },
          { "type": "conflict", "label": "激化矛盾", "content": "...", "theory": "..." },
          { "type": "motif", "label": "母题注入", "content": "...", "theory": "..." }
        ]
      }
      Ensure content is in Chinese. Keep suggestions concise (2-3 sentences).
    `;

        setIsGeneratingSuggestions(true);
        setAiError(null);
        try {
            const data = await generateAIResponse(prompt, 'suggestions');
            setSuggestions(data as Suggestion[]);
        } catch (err: any) {
            setAiError(err.message || "AI 生成失败，请重试");
        } finally {
            setIsGeneratingSuggestions(false);
        }
    };

    const handleRunDiagnostics = async () => {
        const prompt = `
      Context: The user is writing a novel chapter. Text: "${text.slice(-2000)}".
      Task: Analyze the text for writing quality and structure.

      Output JSON format:
      {
        "povStatus": "String (e.g., '稳定 (第三人称限知)' or '警告：视角跳跃')",
        "sensoryScore": Number (0-100, based on usage of 5 senses),
        "sensoryAdvice": "String (Brief advice on improving imagery)",
        "binaryOpposition": {
          "valA": "String (Value A, e.g. '生存')",
          "valB": "String (Value B, e.g. '死亡')",
          "lean": Number (0-100, <50 means leaning to A, >50 leaning to B)
        },
        "isPassive": Boolean (True if protagonist mostly reacts/observes without making choices),
        "passiveAdvice": "String (Advice if passive)"
      }
      Ensure analysis values are in Chinese.
    `;

        setIsRunningDiagnostics(true);
        setAiError(null);
        try {
            const data = await generateAIResponse(prompt, 'diagnostics');
            setDiagnostics(data as DiagnosticResult);
        } catch (err: any) {
            setAiError(err.message || "AI 诊断失败，请重试");
        } finally {
            setIsRunningDiagnostics(false);
        }
    };

    return (
        <MainLayout>
            {/* 左侧：沉浸式编辑器 */}
            <div className={`flex-1 flex flex-col relative transition-all duration-500 ${zenMode ? 'w-full' : 'w-4/5'}`}>
                {!zenMode && (
                    <Toolbar
                        textLength={text.length}
                        zenMode={zenMode}
                        setZenMode={setZenMode}
                    />
                )}

                <ImmersiveEditor
                    text={text}
                    setText={setText}
                    zenMode={zenMode}
                    activeSuggestion={activeSuggestion}
                    isGeneratingSuggestions={isGeneratingSuggestions}
                    isRunningDiagnostics={isRunningDiagnostics}
                    handleGenerateSuggestions={handleGenerateSuggestions}
                    handleRunDiagnostics={handleRunDiagnostics}
                />

                {!zenMode && (
                    <StoryCompass currentStep={currentStep} />
                )}
            </div>

            {/* 右侧：智能副驾驶 (Co-pilot) */}
            <CopilotSidebar
                zenMode={zenMode}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                structure={structure}
                activeSuggestion={activeSuggestion}
                setActiveSuggestion={setActiveSuggestion}
                suggestions={suggestions}
                isGeneratingSuggestions={isGeneratingSuggestions}
                handleGenerateSuggestions={handleGenerateSuggestions}
                insertSuggestion={insertSuggestion}
                aiError={aiError}
                diagnostics={diagnostics}
                isRunningDiagnostics={isRunningDiagnostics}
                handleRunDiagnostics={handleRunDiagnostics}
                characters={mockCharacters}
                lore={mockLore}
            />
        </MainLayout>
    );
};

export default App;
