import React from 'react';

interface StoryCompassProps {
    currentStep: number;
}

const StoryCompass: React.FC<StoryCompassProps> = ({ currentStep }) => {
    return (
        <div className="h-16 border-t border-gray-800 bg-[#0a0a0a] px-6 flex items-center space-x-4">
            <div className="text-xs text-gray-500 font-mono w-24">12步罗盘</div>
            <div className="flex-1 flex items-center space-x-1">
                {[...Array(12)].map((_, i) => (
                    <div key={i} className="flex-1 flex flex-col gap-1 group relative">
                        <div
                            className={`h-2 rounded-full transition-all duration-500 relative ${i < currentStep ? 'bg-teal-600' : i === currentStep ? 'bg-amber-500 animate-pulse' : 'bg-gray-800'
                                }`}
                        >
                            {/* Logic Warning Dot - Simulate a broken logic at step 6 for demo */}
                            {i === 5 && (
                                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-[#0a0a0a]" title="逻辑断裂：伏笔未回收" />
                            )}
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 absolute bottom-4 left-0 bg-gray-800 text-xs p-2 rounded w-40 z-10 transition-opacity pointer-events-none border border-gray-700 shadow-xl">
                            <div className="font-bold text-teal-400">第 {i + 1} 步</div>
                            <div className="text-gray-400 text-[10px] mt-1">
                                {i === 2 ? "创造令人难忘的角色" : i === 9 ? "至暗时刻 (绝望感)" : "标准剧情点"}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-xs text-amber-500 font-bold">当前: 扩展情节 (第4步)</div>
        </div>
    );
};

export default StoryCompass;
