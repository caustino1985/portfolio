import React, { useState, useEffect } from 'react';
import { Wifi, BatteryMedium, Signal, Shield, Bell } from 'lucide-react';

export const TopStatusBar: React.FC = () => {
  const [time, setTime] = useState('16:51');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full px-6 py-2 flex items-center justify-between text-[11px] font-mono text-slate-300 select-none z-30 bg-slate-950/90 backdrop-blur-md border-b border-slate-900/60">
      {/* Left: Time & Notif icons */}
      <div className="flex items-center gap-2 font-semibold">
        <span>{time}</span>
        <div className="flex items-center gap-1 text-slate-500">
          <Shield className="w-3 h-3 text-cyan-400" />
          <Bell className="w-3 h-3 text-slate-400" />
        </div>
      </div>

      {/* Center: Camera punch hole */}
      <div className="w-3.5 h-3.5 rounded-full bg-black border border-slate-800 shadow-inner" />

      {/* Right: Signals & Battery */}
      <div className="flex items-center gap-2 text-slate-400">
        <span className="text-[10px] font-bold text-cyan-400 font-mono">5G</span>
        <Signal className="w-3.5 h-3.5 text-slate-300" />
        <Wifi className="w-3.5 h-3.5 text-slate-300" />
        <div className="flex items-center gap-0.5">
          <span className="text-[10px]">98%</span>
          <BatteryMedium className="w-4 h-4 text-emerald-400" />
        </div>
      </div>
    </div>
  );
};
