import { ArcNode, Character, LoreItem, Suggestion, DiagnosticResult } from '../types';

export const initialStructure: ArcNode[] = [
    {
        id: 'part-1',
        title: '第一卷：边境的尘埃',
        type: 'part',
        status: 'active',
        children: [
            {
                id: 'mini-arc-1',
                title: '序列 A：酒馆的意外',
                type: 'mini-arc',
                status: 'completed',
                healthScore: 95,
                children: [
                    { id: 'ch-1', title: '第一章：陌生人', type: 'chapter', status: 'completed', purpose: '建立常态', functionSlot: '初始情境 (Alpha)' },
                    { id: 'ch-2', title: '第二章：染血的铜币', type: 'chapter', status: 'completed', purpose: '激励事件', functionSlot: '缺失/灾难 (A)' }
                ]
            },
            {
                id: 'mini-arc-2',
                title: '序列 B：逃离守备队',
                type: 'mini-arc',
                status: 'active',
                healthScore: 78,
                children: [
                    { id: 'ch-3', title: '第三章：下水道的低语', type: 'chapter', status: 'completed', purpose: '对威胁的反应', functionSlot: '离家/出发 (↑)' },
                    { id: 'ch-4', title: '第四章：抉择时刻', type: 'chapter', status: 'active', purpose: '被迫抉择', functionSlot: '第一功能：考验 (D)' }
                ]
            }
        ]
    }
];

export const mockCharacters: Character[] = [
    {
        id: 'c1', name: '艾伦', role: '主角',
        want: '活着逃离下城区',
        obstacle: '封锁的城门与守备队',
        flaw: '优柔寡断，总是试图取悦所有人',
        value: '生存/自由',
        inScene: true
    },
    {
        id: 'c2', name: '凯尔', role: '反派',
        want: '抓住艾伦以换取晋升',
        obstacle: '下水道复杂的迷宫地形',
        flaw: '过度自信，轻视下层人',
        value: '秩序/控制',
        inScene: false
    }
];

export const mockLore: LoreItem[] = [
    { id: 'l1', term: '黑铁锁', category: '物品', definition: '帝国制式锁具，内部有双重倒钩，普通开锁器极易折断。', lastUsed: '第三章' },
    { id: 'l2', term: '下城区', category: '世界观', definition: '位于主城排污系统周边，终年不见阳光，充满瘴气。', lastUsed: '第一章' }
];

export const initialSuggestions: Suggestion[] = [
    {
        type: 'smooth',
        label: '顺滑推进 (示例)',
        content: '点击上方闪电按钮，让 AI 基于你的正文生成真正的情节预测。',
        theory: 'Action -> Consequence'
    },
];

export const initialDiagnostics: DiagnosticResult = {
    povStatus: '未检测',
    sensoryScore: 0,
    sensoryAdvice: '点击运行诊断以分析',
    binaryOpposition: { valA: 'A', valB: 'B', lean: 50 },
    isPassive: false,
    passiveAdvice: ''
};

export const initialText = "艾伦屏住呼吸，手指微微颤抖地伸向那扇生锈的铁门。下水道的恶臭让他几乎窒息，但他知道，这是唯一通往上城区的路。他的指尖触碰到了冰冷的锁孔...";
