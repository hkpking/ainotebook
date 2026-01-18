import { API_KEY, API_ENDPOINT } from '../constants/config';
import { Suggestion, DiagnosticResult } from '../types';

export const generateAIResponse = async (prompt: string, type: 'suggestions' | 'diagnostics'): Promise<Suggestion[] | DiagnosticResult> => {
    try {
        const response = await fetch(
            `${API_ENDPOINT}?key=${API_KEY}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
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
        console.error(err);
        throw err;
    }
};
