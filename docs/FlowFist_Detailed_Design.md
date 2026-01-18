# FlowFist Detailed Design Document

## 1. 核心功能模块

### 1.1 沉浸式写作环境 (Immersive Environment)
*   **深色模式**: 默认采用极简深色背景 (`#121212`)，减少屏幕眩光，适合长时间专注于文本的创作。
*   **禅模式 (Zen Mode)**:
    *   **触发**: 点击顶部工具栏的"最大化/最小化"图标。
    *   **效果**: 隐藏顶部工具栏、底部罗盘和右侧边栏，编辑器全屏显示，仅保留浮动 AI 按钮。
*   **文字统计**: 实时显示当前正文字符数。

### 1.2 智能副驾驶 (Intelligent Co-pilot)
右侧边栏 (`w-80`) 提供多维度的创作辅助，分为三个标签页：

#### A. 结构 (Structure)
*   **可视化大纲**: 使用树状图展示故事结构：
    *   **Layer 1**: 卷 (Part)
    *   **Layer 2**: 序列 (Mini-arc/Sequence)
    *   **Layer 3**: 章节 (Chapter)
*   **状态追踪**: 每个节点显示状态（`completed`, `active`, `future`），进行中节点有呼吸灯动效。
*   **功能槽 (Function Slot)**: 显示当前章节对应的故事功能（如 "激励事件", "考验"），基于经典叙事理论。

#### B. 角色 (Cast)
*   **角色卡片**: 展示当前场景在场 (`inScene`) 及相关角色。
*   **核心属性**:
    *   **Role**: 主角/反派/配角。
    *   **Want (欲望)**: 角色当务之急的目标。
    *   **Obstacle (阻碍)**: 阻止目标实现的因素。
    *   **Value (核心价值)**: 驱动行为的深层价值观。

#### C. 设定 (Lore)
*   **知识库**: 存储世界观、物品、魔法设定。
*   **上下文感知**: 记录条目上次出现的章节位置。
*   **编写提醒**: 针对特定设定物品的调研或一致性提醒（如时代背景下的锁具结构）。

### 1.3 底部罗盘 (12-Step Compass)
*   **进度可视化**: 12 个节点的线性进度条，代表英雄之旅或故事圈的 12 个阶段。
*   **交互**: Hover 显示该阶段的理论名称（如"至暗时刻"）及说明。
*   **状态同步**: 当前阶段高亮显示。

### 1.4 AI 辅助功能 (AI Utilities)

#### 剧情预测 (Suggestions)
*   **触发**: 文本长度 > 30 且非生成状态时，点击浮动"闪电"按钮。
*   **理论依据**: Jerry Jenkins (Intensify Problems, Hopelessness) 及 Propp (Functions)。
*   **模式**:
    1.  **Smooth (顺滑推进)**: 符合逻辑的 Action -> Reaction。
    2.  **Conflict (激化矛盾)**: 增加阻碍，使局势恶化。
    3.  **Motif (母题注入)**: 引入民间传说母题或原型元素。

#### 深度诊断 (Diagnostics)
*   **触发**: 点击浮动"心跳"按钮。
*   **分析维度**:
    1.  **视角一致性 (POV Status)**: 检测是否存在视角跳跃。
    2.  **感官深度 (Sensory Score)**: 0-100 分，评估视觉、听觉等感官描写的使用密度。
    3.  **二元对立 (Binary Opposition)**: 分析文本中核心价值冲突的倾向性 (Scale A vs Scale B)。
    4.  **被动主角检测 (Passive Check)**: 警告主角是否缺乏主动选择。

## 2. 数据模型 (Data Models)

### Suggestion Interface
```typescript
interface Suggestion {
  type: 'smooth' | 'conflict' | 'despair' | 'motif';
  label: string;    // 显示标签，如"激化矛盾"
  content: string;  // 具体的剧情建议内容
  theory: string;   // 建议背后的叙事理论依据
}
```

### DiagnosticResult Interface
```typescript
interface DiagnosticResult {
  povStatus: string;
  sensoryScore: number;
  sensoryAdvice: string;
  binaryOpposition: { 
    valA: string; 
    valB: string; 
    lean: number; // 倾向度 0-100
  };
  isPassive: boolean;
  passiveAdvice: string;
}
```

### ArcNode Interface (Structure)
```typescript
interface ArcNode {
  id: string;
  title: string;
  type: 'part' | 'mini-arc' | 'chapter';
  status: 'completed' | 'active' | 'future';
  purpose?: string;      // 写作目的
  functionSlot?: string; // 对应故事功能槽位
  children?: ArcNode[];
  healthScore?: number;  // 结构完整度评分
}
```

## 3. 交互与动效
*   **过渡动画**: 所有主要布局切换（如进入 Zen Mode）均有 `duration-500` 的过渡效果，保证平滑体验。
*   **微交互**:
    *   按钮 Hover 时的展开效果 (`group-hover:max-w-xs`)。
    *   进行中章节的呼吸灯 (`animate-pulse`)。
    *   AI 生成时的加载转圈 (`animate-spin`)。
    *   新建议出现时的淡入效果 (`animate-in fade-in`).