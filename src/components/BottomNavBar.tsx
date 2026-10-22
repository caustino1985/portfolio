import React from 'react';
import { Home, Brain, Scale, Landmark, Sparkles } from 'lucide-react';

export type NavTabId = 'home' | 'neural' | 'law' | 'finance' | 'copilot';

interface BottomNavBarProps {
  currentTab: NavTabId;
  onSelectTab: (tab: NavTabId) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ currentTab, onSelectTab }) => {
  const navItems: { id: NavTabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'home', label: 'Explore', icon: Home },
    { id: 'neural', label: 'Neural & Bio', icon: Brain },
    { id: 'law', label: 'Law & SCOTUS', icon: Scale },
    { id: 'finance', label: 'Finance & Grid', icon: Landmark },
    { id: 'copilot', label: 'AI Copilot', icon: Sparkles },
  ];

  return (
    <div className="w-full bg-slate-950/95 border-t border-slate-800/80 backdrop-blur-xl px-2 py-1.5 z-40 select-none">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectTab(item.id)}
              className="group flex flex-col items-center justify-center flex-1 py-1 relative transition-all active:scale-95"
            >
              {/* Material You Pill indicator */}
              <div
                className={`w-12 h-7 rounded-full flex items-center justify-center transition-all ${
                  isActive
                    ? 'bg-cyan-500/25 text-cyan-300 shadow-sm'
                    : 'text-slate-400 group-hover:text-slate-200 group-hover:bg-slate-900/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.2]' : 'stroke-[1.8]'}`} />
              </div>
              <span
                className={`text-[10px] mt-0.5 tracking-tight font-medium transition-colors ${
                  isActive ? 'text-cyan-300 font-semibold' : 'text-slate-400'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
      {/* Android Bottom Home Gesture Pill */}
      <div className="w-32 h-1 bg-slate-600/60 rounded-full mx-auto mt-1 mb-0.5" />
    </div>
  );
};
