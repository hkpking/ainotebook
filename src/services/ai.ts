import { API_KEY, API_ENDPOINT } from '../constants/config';
import { Suggestion, DiagnosticResult, StoryRule } from '../types';

const ARCHITECT_SYSTEM_PROMPT = `
Role: FlowFist Narrative Architect & Structural Narratology Expert.
Theory: Follow "The Laws of Story" (Morphology) & "12-Step Novel Guide".
Protocol:
1. CHECK: Before generating, validate against active StoryRules (e.g. magic costs, taboos).
2. LOGIC: Ensure "Closed System" - every setup need a payoff.
3. FUNCTION: Characters must have a morphology function (e.g. Donor, Villain, Helper).
`;

type GenerationType = 'suggestions' | 'diagnostics' | 'rule-check' | 'audit-characters';

export const generateAIResponse = async (
    prompt: string,
    type: GenerationType,
    context?: { rules?: StoryRule[] }
): Promise<Suggestion[] | DiagnosticResult | any> => {
    try {
        const fullPrompt = `
${ARCHITECT_SYSTEM_PROMPT}

Context Rules: ${JSON.stringify(context?.rules || [])}

User Request: ${prompt}
        `;

        const response = await fetch(
            `${API_ENDPOINT}?key=${API_KEY}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: fullPrompt }] }],
                    generationConfig: { responseMimeType: "application/json" } // Force JSON
                })
            }
        );

        if (!response.ok) throw new Error(`API Error: ${response.status}`);
        const data = await response.json();
        const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!resultText) throw new Error("No result from AI");

        const parsedData = JSON.parse(resultText);

        if (type === 'suggestions') {
            return parsedData.suggestions || parsedData;
        } else {
            return parsedData;
        }

    } catch (err: any) {
        console.error("AI Generation Error:", err);
        // Fallback checks for dev environment if API fails
        if (type === 'audit-characters') {
            return {
                suggestions: [
                    { type: 'audit', label: '角色审计', content: '无法连接 AI 架构师，请检查 API Key。但建议检查：是否有无功能的“过路人”角色？', theory: '封闭性公理' }
                ]
            };
        }
        throw err;
    }
};
