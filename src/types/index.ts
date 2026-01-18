export type SuggestionType = 'smooth' | 'conflict' | 'despair' | 'motif';
export type TabType = 'structure' | 'cast' | 'lore';

export interface Suggestion {
    type: SuggestionType;
    label: string;
    content: string;
    theory: string;
}

export interface ArcNode {
    id: string;
    title: string;
    type: 'part' | 'mini-arc' | 'chapter';
    status: 'completed' | 'active' | 'future';
    purpose?: string;
    functionSlot?: string;
    children?: ArcNode[];
    healthScore?: number;
}

export interface Character {
    id: string;
    name: string;
    role: '主角' | '反派' | '配角';
    want: string;
    obstacle: string;
    flaw: string;
    value: string;
    inScene: boolean;
}

export interface LoreItem {
    id: string;
    term: string;
    category: '世界观' | '物品' | '魔法';
    definition: string;
    lastUsed: string;
}

export interface DiagnosticResult {
    povStatus: string;
    sensoryScore: number;
    sensoryAdvice: string;
    binaryOpposition: { valA: string; valB: string; lean: number }; // lean 0-100
    isPassive: boolean;
    passiveAdvice: string;
}
