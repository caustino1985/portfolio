import React from 'react';
import { Smartphone, Monitor, Globe, Sparkles } from 'lucide-react';
import { TopStatusBar } from './TopStatusBar.tsx';
import { BottomNavBar, NavTabId } from './BottomNavBar.tsx';

interface AndroidFrameProps {
  children: React.ReactNode;
  currentTab: NavTabId;
  onSelectTab: (tab: NavTabId) => void;
  isDeviceMode: boolean;
  onToggleDeviceMode: () => void;
  onOpenGroundedSearch: () => void;
}

export const AndroidFrame: React.FC<AndroidFrameProps> = ({
  children,
  currentTab,
  onSelectTab,
  isDeviceMode,
  onToggleDeviceMode,
  onOpenGroundedSearch,
}) => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-start text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Utility Bar (Desktop / Web View Switcher) */}
      <header className="w-full bg-slate-900/90 border-b border-slate-800/80 px-4 py-2.5 flex items-center justify-between text-xs z-50 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-cyan-600 to-teal-500 flex items-center justify-center text-white shadow-xs">
            <span className="font-bold text-[11px] font-mono">NX</span>
          </div>
          <div>
            <h1 className="font-bold text-slate-100 text-xs sm:text-sm tracking-tight">
              Nexus Android Master Portfolio
            </h1>
            <p className="text-[10px] text-slate-400 font-mono hidden sm:block">
              Caustin Lee McLaughlin • Systems Architecture, Law & Energy
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Live Search Grounding Trigger */}
          <button
            type="button"
            onClick={onOpenGroundedSearch}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 font-medium transition-all shadow-xs active:scale-95"
          >
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">Google Search Grounding</span>
            <span className="sm:hidden">Grounding</span>
          </button>

          {/* Device Frame Toggle */}
          <button
            type="button"
            onClick={onToggleDeviceMode}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors active:scale-95"
            title={isDeviceMode ? 'Switch to Full Width View' : 'Switch to Android Pixel Frame'}
          >
            {isDeviceMode ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">Full Width</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">Pixel 9 Frame</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Content Viewport Container */}
      <div className={`w-full flex-1 flex justify-center ${isDeviceMode ? 'p-2 sm:py-6 sm:px-4' : 'p-0'}`}>
        {isDeviceMode ? (
          /* Android Smartphone Shell */
          <div className="w-full max-w-[430px] h-[890px] max-h-[95vh] bg-slate-950 rounded-[48px] border-[10px] border-slate-900 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_0_1px_rgba(51,65,85,0.4)] flex flex-col overflow-hidden relative">
            {/* Top Speaker Ear-piece */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-1 bg-slate-800 rounded-full z-40" />

            {/* Android Status Bar */}
            <TopStatusBar />

            {/* Android App Content Area */}
            <main className="flex-1 overflow-y-auto overflow-x-hidden relative flex flex-col">
              {children}
            </main>

            {/* Android Bottom Navigation Bar */}
            <BottomNavBar currentTab={currentTab} onSelectTab={onSelectTab} />
          </div>
        ) : (
          /* Full Responsive Mode */
          <div className="w-full max-w-6xl flex flex-col min-h-[calc(100vh-50px)]">
            <TopStatusBar />
            <main className="flex-1 overflow-y-auto p-4 sm:p-8">
              {children}
            </main>
            <BottomNavBar currentTab={currentTab} onSelectTab={onSelectTab} />
          </div>
        )}
      </div>
    </div>
  );
};
