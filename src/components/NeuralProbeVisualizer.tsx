import React, { useState } from 'react';
import { Layers, ShieldCheck, Cpu, Zap, Activity, Info, CheckCircle2 } from 'lucide-react';

interface ProbeLayer {
  layerNum: number;
  name: string;
  materials: string;
  functionality: string;
  color: string;
  gradient: string;
  thickness: string;
  mode: 'All' | 'Optical' | 'Non-Optical (NEP)' | 'Hermetic';
}

export const NeuralProbeVisualizer: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<number>(2);
  const [modeFilter, setModeFilter] = useState<'All' | 'NEP' | 'UOSE'>('All');

  const layers: ProbeLayer[] = [
    {
      layerNum: 7,
      name: 'Layer 7: Encapsulation & Thermal Spreader',
      materials: 'Parylene-C (2µm) + hexagonal Boron-Nitride (h-BN) + Silicone Overmold',
      functionality: 'Hermetic moisture barrier, dielectric isolation, and passive brain thermal heat spreader enforcing ΔT < 2.0°C safety ceiling.',
      color: 'text-purple-400',
      gradient: 'from-purple-600 to-indigo-600',
      thickness: '2 - 5 µm',
      mode: 'Hermetic',
    },
    {
      layerNum: 6,
      name: 'Layer 6: Bioactive Hydrogel Matrix',
      materials: 'PEG Hydrogel + Dexamethasone + AAV/HUP Suspension + Silicon Microneedles',
      functionality: 'Anti-inflammatory drug elution, bio-stabilization, and localized reservoir for photon upconversion or optogenetic vectors.',
      color: 'text-blue-400',
      gradient: 'from-blue-600 to-cyan-600',
      thickness: '10 - 20 µm',
      mode: 'Optical',
    },
    {
      layerNum: 5,
      name: 'Layer 5: Dual-Band Optical Waveguide Array',
      materials: 'Silicon Nitride (SiN) + Chalcogenide Glass Waveguides',
      functionality: 'Lossless sub-cellular optical routing of 1870 nm Infrared Neural Stimulation (INS) and 980 nm upconversion beams.',
      color: 'text-amber-400',
      gradient: 'from-amber-600 to-yellow-600',
      thickness: '1.5 µm',
      mode: 'Optical',
    },
    {
      layerNum: 4,
      name: 'Layer 4: Phase-Steering & Beam Modulator',
      materials: 'LCoS Spatial Light Modulator (SLM) + MEMS Micromirror Array',
      functionality: 'Dynamic wavefront shaping creating constructive optical interference and positioning Virtual Optical Microdomains (VOMs) in 3D cortical space.',
      color: 'text-orange-400',
      gradient: 'from-orange-600 to-red-600',
      thickness: '8 µm',
      mode: 'Optical',
    },
    {
      layerNum: 3,
      name: 'Layer 3: Micro-Emitter Plane',
      materials: 'micro-LED / VCSEL / Laser Diode Array in Fibonacci Lattice Geometry',
      functionality: 'Primary photon generation plane configured in a golden-ratio lattice to maximize spatial resolution and prevent optical crosstalk.',
      color: 'text-cyan-400',
      gradient: 'from-cyan-600 to-blue-500',
      thickness: '5 µm',
      mode: 'Optical',
    },
    {
      layerNum: 2,
      name: 'Layer 2: Neurograi™ Graphene & Pt-Ir Microelectrodes',
      materials: 'Single-Layer Graphene (SLG) + rGO Foam + Platinum-Iridium Array',
      functionality: 'Primary bidirectional electrical recording (LFPs & single-unit spikes) and high-density biphasic charge injection (>3.1 mC/cm², impedance <50 kΩ). Acts as autonomous NEP fallback.',
      color: 'text-emerald-400',
      gradient: 'from-emerald-600 to-teal-500',
      thickness: '3 µm',
      mode: 'Non-Optical (NEP)',
    },
    {
      layerNum: 1,
      name: 'Layer 1: CMOS Silicon Substrate & HSPA-9 Core',
      materials: '65nm TSMC Mixed-Signal CMOS + Through-Silicon Vias (TSV) + FPGA Enclave',
      functionality: 'Integrated Semantic Execution Graph (SEG), 8-bit ROM device ID, High-Voltage Adapter (HVA) cascode H-bridge, and Kyber-1024 PQC hardware security enclave.',
      color: 'text-rose-400',
      gradient: 'from-rose-600 to-pink-600',
      thickness: '25 µm',
      mode: 'Non-Optical (NEP)',
    },
  ];

  const current = layers.find((l) => l.layerNum === activeLayer) || layers[0];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
              7-Layer Monolithic INA Architecture
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono">
                7-8 µm Scale
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">Intracranial Neural Array Layer Stack & Neurograi Substrate</p>
          </div>
        </div>

        {/* Mode Filter */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-[11px]">
          {(['All', 'NEP', 'UOSE'] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setModeFilter(mode)}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                modeFilter === mode
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {mode === 'NEP' ? 'Dark Mode (NEP)' : mode === 'UOSE' ? 'Optical (UOSE)' : 'Full Stack'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Cross-Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Layer Stack Graphic */}
        <div className="md:col-span-6 space-y-2 select-none">
          {layers.map((layer) => {
            const isSelected = activeLayer === layer.layerNum;
            const isDimmed =
              (modeFilter === 'NEP' && layer.mode === 'Optical') ||
              (modeFilter === 'UOSE' && layer.mode === 'Non-Optical (NEP)');

            return (
              <button
                key={layer.layerNum}
                type="button"
                onClick={() => setActiveLayer(layer.layerNum)}
                className={`w-full group text-left px-3.5 py-2.5 rounded-xl border transition-all flex items-center justify-between relative overflow-hidden ${
                  isSelected
                    ? 'border-cyan-400 bg-slate-800 shadow-lg scale-[1.02]'
                    : isDimmed
                    ? 'border-slate-800/40 bg-slate-950/40 opacity-40 hover:opacity-70'
                    : 'border-slate-800 bg-slate-950/80 hover:border-slate-700'
                }`}
              >
                {/* Visual colored left accent bar */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${layer.gradient}`}
                />

                <div className="pl-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-slate-400">L{layer.layerNum}</span>
                    <span className={`text-xs font-semibold ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                      {layer.name.split(':')[1]?.trim() || layer.name}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono block truncate max-w-[260px]">
                    {layer.materials}
                  </span>
                </div>

                <div className="text-right flex-shrink-0">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300 font-mono">
                    {layer.thickness}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Layer Detail Box */}
        <div className="md:col-span-6 bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between h-full min-h-[280px]">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                L{current.layerNum} Specifications
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300">
                Mode: {current.mode}
              </span>
            </div>

            <h4 className="text-sm font-bold text-slate-100 mb-1">{current.name}</h4>
            <p className="text-xs text-slate-400 mb-3">{current.functionality}</p>

            <div className="space-y-2 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80 text-[11px]">
              <div>
                <span className="text-slate-400 font-semibold">Material Synthesis:</span>
                <p className="text-slate-300 font-mono text-[10px] mt-0.5">{current.materials}</p>
              </div>
              <div>
                <span className="text-slate-400 font-semibold">Micro-Scale Thickness:</span>
                <p className="text-cyan-400 font-mono text-[10px] mt-0.5">{current.thickness}</p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800/80 mt-3 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              ISO 13485 / QMSR 2026 Verified
            </span>
            <span className="text-[10px] font-mono text-cyan-400">DPR Checkpoint Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};
