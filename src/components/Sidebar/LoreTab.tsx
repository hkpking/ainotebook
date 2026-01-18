import React from 'react';
import { Database } from 'lucide-react';
import { LoreItem } from '../../types';

interface LoreTabProps {
    lore: LoreItem[];
}

const LoreTab: React.FC<LoreTabProps> = ({ lore }) => {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between text-gray-400 text-xs uppercase tracking-wider font-semibold">
                <span>研究与设定 (Lore)</span>
                <Database size={14} />
            </div>

            <div className="bg-gray-900/50 p-2 rounded border border-gray-800 mb-4">
                <input
                    type="text"
                    placeholder="搜索知识库..."
                    className="w-full bg-transparent text-sm text-gray-300 outline-none placeholder-gray-600"
                />
            </div>

            <div className="space-y-3">
                {lore.map(item => (
                    <div key={item.id} className="group cursor-pointer">
                        <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-teal-400 font-medium">{item.term}</span>
                            <span className="text-gray-600 bg-gray-800 px-1 rounded text-[10px]">{item.category}</span>
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed group-hover:text-gray-200 transition-colors">
                            {item.definition}
                        </p>
                        <div className="text-[10px] text-gray-600 mt-1 text-right">
                            上次出现: {item.lastUsed}
                        </div>
                        <div className="h-px bg-gray-800 w-full mt-2" />
                    </div>
                ))}
            </div>

            <div className="p-3 bg-blue-900/10 border border-blue-900/30 rounded">
                <div className="text-xs text-blue-400 font-bold mb-1">调研提醒 (Step 5)</div>
                <p className="text-[10px] text-blue-200/70">
                    检查：在这个时代背景下，这种锁具的机械结构是否合理？（不要依赖好莱坞式的开锁描写）。
                </p>
            </div>
        </div>
    );
};

export default LoreTab;
