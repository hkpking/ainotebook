import React from 'react';
import { Users } from 'lucide-react';
import { Character } from '../../types';

interface CastTabProps {
    characters: Character[];
}

const CastTab: React.FC<CastTabProps> = ({ characters }) => {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between text-gray-400 text-xs uppercase tracking-wider font-semibold">
                <span>在场角色 (Active Characters)</span>
                <Users size={14} />
            </div>
            {characters.map(char => (
                <div
                    key={char.id}
                    className={`p-3 rounded border ${char.inScene
                            ? 'bg-gray-800 border-teal-900'
                            : 'bg-transparent border-gray-800 opacity-50'
                        }`}
                >
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-bold text-gray-200">{char.name}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded ${char.role.includes('主角') ? 'bg-blue-900 text-blue-200' : 'bg-red-900 text-red-200'
                            }`}>
                            {char.role}
                        </span>
                    </div>

                    <div className="space-y-2">
                        <div className="text-xs">
                            <span className="text-gray-500 block mb-0.5">欲望 (Want):</span>
                            <span className="text-gray-300">{char.want}</span>
                        </div>
                        <div className="text-xs">
                            <span className="text-gray-500 block mb-0.5">阻碍 (Obstacle):</span>
                            <span className="text-gray-300">{char.obstacle}</span>
                        </div>
                        {/* 核心价值观 (Story Laws) */}
                        <div className="text-xs pt-1 border-t border-gray-700 mt-1 flex justify-between">
                            <span className="text-gray-500">核心价值:</span>
                            <span className="text-teal-400">{char.value}</span>
                        </div>
                    </div>
                </div>
            ))}
            <button className="w-full py-2 border border-dashed border-gray-700 text-gray-500 text-xs rounded hover:border-gray-500 hover:text-gray-300">
                + 添加角色 (Step 3)
            </button>
        </div>
    );
};

export default CastTab;
