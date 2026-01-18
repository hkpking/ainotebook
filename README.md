# FlowFist (流拳)

基于 React 的沉浸式 AI 辅助小说创作工具。

## 📁 目录结构 (Project Structure)

本项目经过重构，目录结构分类如下：

*   **`src/`**: 源代码核心目录
    *   `components/`: UI 组件 (Layout, Editor, Sidebar 等)
    *   `services/`: 外部服务集成 (AI API)
    *   `types/`: TypeScript 类型定义
    *   `data/`: 初始状态和模拟数据
*   **`docs/`**: 项目文档
    *   [FlowFist_Architecture.md](./docs/FlowFist_Architecture.md): 系统架构说明
    *   [FlowFist_Detailed_Design.md](./docs/FlowFist_Detailed_Design.md): 详细功能设计
*   **`legacy/`**: 遗留代码
    *   `3.html`: 重构前的单文件原型 (仅供参考)
*   **`.agent/`**: AI Agent 配置
    *   `skills/`: 自定义技能定义

## 🚀 快速开始 (Quick Start)

1.  **安装依赖**:
    ```bash
    npm install
    ```

2.  **启动开发服务器**:
    ```bash
    npm run dev
    ```

3.  **构建**:
    ```bash
    npm run build
    ```

## 🛠️ 配置说明
*   `vite.config.ts`: Vite 构建配置
*   `tailwind.config.js`: 样式配置
