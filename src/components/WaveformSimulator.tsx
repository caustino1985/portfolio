import React, { useState, useId } from 'react';
import { Activity, ShieldAlert, Sliders, CheckCircle2 } from 'lucide-react';

export const WaveformSimulator: React.FC = () => {
  const [amplitudeMA, setAmplitudeMA] = useState<number>(2.5); // 0.1 - 5.0 mA
  const [pulseWidthUS, setPulseWidthUS] = useState<number>(200); // 100 - 500 µs
  const [frequencyHZ, setFrequencyHZ] = useState<number>(100); // 1 - 200 Hz
  const [chargeBalanceOffset, setChargeBalanceOffset] = useState<number>(1.2); // imbalance %

  const amplitudeId = useId();
  const pulseWidthId = useId();
  const frequencyId = useId();
  const balanceOffsetId = useId();

  // Safe threshold calculation
  const isSafe = chargeBalanceOffset < 5.0 && amplitudeMA <= 5.0;
  const chargePerPhaseUC = Number(((amplitudeMA * pulseWidthUS) / 1000).toFixed(3)); // mA * µs = nC, /1000 = µC
  const electrodeAreaCM2 = 0.002; // 200 µm diameter
  const chargeDensityUCCM2 = Number((chargePerPhaseUC / electrodeAreaCM2).toFixed(1));
  const maxSafeDensityPtIr = 100; // µC/cm2
  const maxSafeDensityGraphene = 3100; // µC/cm2

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
              HSPA-9 Biphasic Waveform Simulator
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono">
                Charge-Balanced
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">Real-time cathodic/anodic compliance & safety interlock engine</p>
          </div>
        </div>

        <div className={`px-2.5 py-1 rounded-xl border text-[11px] font-semibold flex items-center gap-1.5 ${
          isSafe
            ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-300'
            : 'bg-rose-950/50 border-rose-500/40 text-rose-300'
        }`}>
          {isSafe ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />}
          <span>{isSafe ? 'Patient-Safe CE' : 'Imbalance Trigger'}</span>
        </div>
      </div>

      {/* SVG Waveform Rendering */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 relative overflow-hidden">
        <div className="text-[10px] font-mono text-slate-500 flex justify-between mb-1">
          <span>Voltage Compliance: ±12V (HVA Cascode NMOS)</span>
          <span>Charge Balance Error: &lt; 5.0%</span>
        </div>

        <div className="h-44 w-full flex items-center justify-center">
          <svg viewBox="0 0 500 160" className="w-full h-full">
            {/* Grid background */}
            <line x1="20" y1="80" x2="480" y2="80" stroke="#334155" strokeWidth="1" strokeDasharray="3,3" />
            <line x1="20" y1="30" x2="480" y2="30" stroke="#1e293b" strokeWidth="0.5" />
            <line x1="20" y1="130" x2="480" y2="130" stroke="#1e293b" strokeWidth="0.5" />

            {/* Labels */}
            <text x="30" y="25" fill="#10b981" fontSize="9" fontFamily="monospace">+Anodic ({amplitudeMA}mA)</text>
            <text x="30" y="85" fill="#64748b" fontSize="9" fontFamily="monospace">0mA Baseline</text>
            <text x="30" y="145" fill="#06b6d4" fontSize="9" fontFamily="monospace">-Cathodic ({amplitudeMA}mA)</text>

            {/* Active Waveform Path */}
            {/* Cycle 1 */}
            <path
              d={`
                M 80 80
                L 120 80
                L 120 130
                L ${120 + pulseWidthUS * 0.15} 130
                L ${120 + pulseWidthUS * 0.15} 80
                L ${150 + pulseWidthUS * 0.15} 80
                L ${150 + pulseWidthUS * 0.15} 30
                L ${150 + pulseWidthUS * 0.3} 30
                L ${150 + pulseWidthUS * 0.3} 80
                L 260 80
                L 260 130
                L ${260 + pulseWidthUS * 0.15} 130
                L ${260 + pulseWidthUS * 0.15} 80
                L ${290 + pulseWidthUS * 0.15} 80
                L ${290 + pulseWidthUS * 0.15} 30
                L ${290 + pulseWidthUS * 0.3} 30
                L ${290 + pulseWidthUS * 0.3} 80
                L 440 80
              `}
              fill="none"
              stroke="#2dd4bf"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />

            {/* Phase annotations */}
            <rect x="120" y="132" width={pulseWidthUS * 0.15} height="12" rx="2" fill="#083344" />
            <text x={120 + (pulseWidthUS * 0.15) / 2} y="141" fill="#38bdf8" fontSize="8" textAnchor="middle" fontFamily="monospace">
              {pulseWidthUS}µs
            </text>

            <rect x={150 + pulseWidthUS * 0.15} y="16" width={pulseWidthUS * 0.15} height="12" rx="2" fill="#022c22" />
            <text x={150 + pulseWidthUS * 0.15 + (pulseWidthUS * 0.15) / 2} y="25" fill="#34d399" fontSize="8" textAnchor="middle" fontFamily="monospace">
              Phase 2 (Bal)
            </text>
          </svg>
        </div>
      </div>

      {/* Interactive Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1.5">
          <div className="flex justify-between items-center text-slate-300">
            <label htmlFor={amplitudeId} className="flex items-center gap-1 font-medium">
              <Sliders className="w-3.5 h-3.5 text-cyan-400" />
              Pulse Amplitude (mA)
            </label>
            <span className="font-mono text-cyan-400 font-bold">{amplitudeMA.toFixed(1)} mA</span>
          </div>
          <input
            id={amplitudeId}
            type="range"
            min="0.1"
            max="5.0"
            step="0.1"
            value={amplitudeMA}
            onChange={(e) => setAmplitudeMA(parseFloat(e.target.value))}
            className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />
          <span className="text-[10px] text-slate-500">Range: 0.1 - 5.0 mA constant current</span>
        </div>

        <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1.5">
          <div className="flex justify-between items-center text-slate-300">
            <label htmlFor={pulseWidthId} className="flex items-center gap-1 font-medium">
              <Sliders className="w-3.5 h-3.5 text-teal-400" />
              Pulse Width (µs)
            </label>
            <span className="font-mono text-teal-400 font-bold">{pulseWidthUS} µs</span>
          </div>
          <input
            id={pulseWidthId}
            type="range"
            min="100"
            max="500"
            step="20"
            value={pulseWidthUS}
            onChange={(e) => setPulseWidthUS(parseInt(e.target.value))}
            className="w-full accent-teal-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />
          <span className="text-[10px] text-slate-500">Range: 100 - 500 µs per phase</span>
        </div>

        <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1.5">
          <div className="flex justify-between items-center text-slate-300">
            <label htmlFor={frequencyId} className="flex items-center gap-1 font-medium">
              <Sliders className="w-3.5 h-3.5 text-emerald-400" />
              Stimulation Frequency (Hz)
            </label>
            <span className="font-mono text-emerald-400 font-bold">{frequencyHZ} Hz</span>
          </div>
          <input
            id={frequencyId}
            type="range"
            min="10"
            max="200"
            step="5"
            value={frequencyHZ}
            onChange={(e) => setFrequencyHZ(parseInt(e.target.value))}
            className="w-full accent-emerald-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />
          <span className="text-[10px] text-slate-500">Frequency: 10 - 200 Hz continuous train</span>
        </div>

        <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1.5">
          <div className="flex justify-between items-center text-slate-300">
            <label htmlFor={balanceOffsetId} className="flex items-center gap-1 font-medium">
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              Charge Imbalance (%)
            </label>
            <span className={`font-mono font-bold ${chargeBalanceOffset >= 5 ? 'text-rose-400' : 'text-amber-400'}`}>
              {chargeBalanceOffset.toFixed(1)}%
            </span>
          </div>
          <input
            id={balanceOffsetId}
            type="range"
            min="0.1"
            max="8.0"
            step="0.1"
            value={chargeBalanceOffset}
            onChange={(e) => setChargeBalanceOffset(parseFloat(e.target.value))}
            className="w-full accent-amber-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />
          <span className="text-[10px] text-slate-500">Auto-shutdown if imbalance &gt; 5.0%</span>
        </div>
      </div>

      {/* Live Computed Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800/80 text-[11px]">
        <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
          <span className="text-slate-500 block text-[10px]">Charge/Phase</span>
          <span className="text-slate-100 font-mono font-bold">{chargePerPhaseUC} µC</span>
        </div>
        <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
          <span className="text-slate-500 block text-[10px]">Charge Density</span>
          <span className="text-slate-100 font-mono font-bold">{chargeDensityUCCM2} µC/cm²</span>
        </div>
        <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
          <span className="text-slate-500 block text-[10px]">Pt-Ir Limit</span>
          <span className={`font-mono font-bold ${chargeDensityUCCM2 > maxSafeDensityPtIr ? 'text-rose-400' : 'text-emerald-400'}`}>
            {maxSafeDensityPtIr} µC/cm²
          </span>
        </div>
        <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
          <span className="text-slate-500 block text-[10px]">Neurograi Graphene</span>
          <span className="text-cyan-400 font-mono font-bold">{maxSafeDensityGraphene} µC/cm² (10x Safe)</span>
        </div>
      </div>
    </div>
  );
};
