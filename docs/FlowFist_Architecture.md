# FlowFist Architecture Document

## 1. 项目概述
**FlowFist (流拳)** 是一个基于 React 的沉浸式 AI 辅助小说创作工具。它旨在帮助作家在"探索式写作"（Discovery Writing）过程中，通过 AI 提供实时的剧情建议、深度诊断以及结构化管理，从而突破创作瓶颈。

## 2. 技术栈
*   **前端框架**: React 18+
*   **语言**: TypeScript
*   **样式库**: Tailwind CSS (用于原子化 CSS 样式及深色模式设计)
*   **图标库**: Lucide React (提供一致的 UI 图标)
*   **AI 集成**: Google Gemini API (`gemini-2.5-flash-preview-09-2025`)

## 3. 系统架构
FlowFist 采用单页应用 (SPA) 架构，所有逻辑主要在前端运行。

### 3.1 组件层级 (Component Hierarchy)
主要由 `FlowFistApp` 作为根容器，包含以下核心区域：
1.  **沉浸式编辑器 (Immersive Editor)**: 占据主要屏幕空间，支持"禅模式" (Zen Mode)。
2.  **顶部工具栏 (Top Toolbar)**: 显示应用状态、字数统计及模式切换。
3.  **底部罗盘 (Bottom Compass)**: "12步罗盘"进度条，用于把控故事节奏。
4.  **智能副驾驶 (Intelligent Co-pilot Sidebar)**: 右侧边栏，提供结构、角色和设定管理。
5.  **AI 浮动工具 (Floating AI Tools)**: 随上下文显示的悬浮按钮，提供预测和诊断功能。

### 3.2 状态管理 (State Management)
应用使用 React 的 `useState` 进行本地状态管理：
*   **UI 状态**: `zenMode` (禅模式), `activeTab` (右侧栏选项卡), `isGenerating...` (加载状态)。
*   **数据状态**: `text` (当前正文), `structure` (大纲树), `suggestions` (AI 建议), `diagnostics` (诊断结果), `currentStep` (创作进度)。

### 3.3 数据流向 (Data Flow)
1.  **用户输入**: 用户在 `textarea` 输入文本 -> 更新 `text` 状态。
2.  **AI 交互**: 用户点击"预测"或"诊断" -> 调用 `generateAIResponse` -> 请求 Google Gemini API -> 解析 JSON 响应 -> 更新 `suggestions` 或 `diagnostics` 状态 -> 渲染结果。
3.  **辅助数据**: 角色 (`mockCharacters`) 和设定 (`mockLore`) 目前为静态模拟数据（Mock Data），未来可扩展为动态数据库存储。

## 4. 核心模块分析

### 4.1 编辑器核心 (Editor Core)
*   提供无干扰的写作环境。
*   样式定制：深色背景 (`#121212`)，衬线字体 (`font-serif`)，大行高 (`leading-loose`) 优化阅读体验。

### 4.2 AI 服务集成 (AI Service Integration)
*   **Endpoint**: `https://generativelanguage.googleapis.com/v1beta/models/...:generateContent`
*   **通信格式**: JSON。
*   **Prompt Engineering**: 内置了特定的 Prompt 模板，涵盖 Context (上下文), Task (任务), Theory Reference (理论依据，如 Propp, Jerry Jenkins) 及 Output Format (JSON Schema)。

### 4.3 结构化导航 (Structure Navigation)
*   实现了树状结构 (`ArcNode`) 的渲染，支持多层嵌套 (Part -> Mini-arc -> Chapter)。
*   展示章节的功能槽 (`functionSlot`) 和健康度 (`healthScore`)。

## 5. 扩展性设计
*   **API Key 注入**: 设计为运行时注入，避免硬编码。
*   **类型定义**: 使用 TypeScript 接口 (`Suggestion`, `ArcNode`, `Character` 等) 规范数据结构，便于未来对接后端 API。
