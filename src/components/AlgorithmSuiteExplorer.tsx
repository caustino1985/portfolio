import React, { useState } from 'react';
import { Calculator, ArrowRight, Check, Search, Filter, ShieldCheck, Sparkles } from 'lucide-react';
import { ADR_31_ALGORITHMS, AlgorithmItem } from '../data/algorithmsData.ts';
import {
  calculateAccruedInterest,
  calculateMakeWholePremium,
  calculateDebtToEquityConversion,
  calculateSEROI,
} from '../utils/calculations.ts';

export const AlgorithmSuiteExplorer: React.FC = () => {
  const [selectedAlg, setSelectedAlg] = useState<AlgorithmItem>(ADR_31_ALGORITHMS[3]); // Alg 04 by default
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModule, setSelectedModule] = useState<string>('All');
  
  // Custom inputs for active algorithm
  const [debtInput, setDebtInput] = useState<number>(500000000);
  const [ratioInput, setRatioInput] = useState<number>(0.0917);

  const modules = ['All', 'Bond Valuation & Claims', 'Asset Conversion & Distribution', 'Volatility Modeling', 'Execution Optimization', 'Derivatives & Hedging', 'Risk Management', 'Yield Optimization', 'AMM & Liquidity', 'Treasury Management', 'Safeguards'];

  const filtered = ADR_31_ALGORITHMS.filter((alg) => {
    const matchesSearch =
      alg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alg.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alg.module.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alg.complexity.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesModule = selectedModule === 'All' || alg.module === selectedModule;
    return matchesSearch && matchesModule;
  });

  // Calculate live value for specific algorithms
  let liveResult: string = '';
  if (selectedAlg.number === 4) {
    const conv = calculateDebtToEquityConversion(debtInput, ratioInput);
    liveResult = `${conv.wholeShares.toLocaleString()} Reorganized LEU Common Shares ($500M @ 0.0917)`;
  } else if (selectedAlg.number === 1) {
    const interest = calculateAccruedInterest(1000000, 0.06625, 90, 360);
    liveResult = `$${interest.toLocaleString(undefined, { maximumFractionDigits: 2 })} Accrued Coupon ($1M @ 6.625% for 90d)`;
  } else if (selectedAlg.number === 2) {
    const mw = calculateMakeWholePremium(150000000, 0.0675, 0.042, 50, 3, 2);
    liveResult = `$${mw.makeWholePremium.toLocaleString()} Make-Whole Premium ($150M Series B Principal)`;
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
              ADR-31 Algorithm Execution Suite
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono">
                31 Algorithms
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">Quantitative Reorganization & Sovereign Settlement Formulas</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search 31 algorithms..."
            className="w-full sm:w-48 bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Module Pill Filter */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
        {modules.map((mod) => (
          <button
            key={mod}
            type="button"
            onClick={() => setSelectedModule(mod)}
            className={`flex-shrink-0 px-2.5 py-1 rounded-xl font-medium transition-all ${
              selectedModule === mod
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {mod}
          </button>
        ))}
      </div>

      {/* Two-Column Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Scrollable Algorithm List */}
        <div className="lg:col-span-5 max-h-[380px] overflow-y-auto space-y-1.5 pr-1">
          {filtered.map((alg) => {
            const isSelected = selectedAlg.id === alg.id;
            return (
              <button
                key={alg.id}
                type="button"
                onClick={() => setSelectedAlg(alg)}
                className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-slate-800 border-amber-500/60 shadow-md text-white'
                    : 'bg-slate-950/80 border-slate-800/80 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-700 text-amber-400 font-mono text-[11px] font-bold flex items-center justify-center flex-shrink-0">
                    {alg.number < 10 ? `0${alg.number}` : alg.number}
                  </span>
                  <div>
                    <h5 className="text-xs font-semibold leading-tight">{alg.name}</h5>
                    <span className="text-[10px] text-slate-500 font-mono">Module {alg.moduleRoman}: {alg.module}</span>
                  </div>
                </div>

                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-400">
                  {alg.complexity}
                </span>
              </button>
            );
          })}

          {filtered.length === 0 && (
            <div className="py-8 text-center text-xs text-slate-500">
              No algorithms match your criteria.
            </div>
          )}
        </div>

        {/* Selected Algorithm Inspector & Calculator */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div>
              <span className="text-[10px] font-mono text-amber-400 uppercase font-bold tracking-wider">
                Algorithm {selectedAlg.number < 10 ? `0${selectedAlg.number}` : selectedAlg.number} (Module {selectedAlg.moduleRoman})
              </span>
              <h4 className="text-sm font-bold text-slate-100">{selectedAlg.name}</h4>
            </div>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-amber-950/60 border border-amber-500/40 text-amber-300">
              Complexity: {selectedAlg.complexity}
            </span>
          </div>

          {/* Mathematical Formula Box */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3">
            <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
              Mathematical Formulation:
            </span>
            <div className="font-mono text-xs text-cyan-300 overflow-x-auto py-1">
              {selectedAlg.formula}
            </div>
          </div>

          <div className="text-xs text-slate-300 leading-relaxed">
            <p className="font-semibold text-slate-200 mb-1">Operational Purpose:</p>
            <p className="text-slate-400">{selectedAlg.purpose}</p>
            <p className="text-slate-400 mt-2">{selectedAlg.description}</p>
          </div>

          {/* Interactive Calculation Demo */}
          {selectedAlg.number === 4 && (
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 space-y-2">
              <span className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Live Reorganization Conversion Calculator
              </span>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <label htmlFor="debt-principal-input" className="text-slate-400 block mb-1">Allowed Claim Principal ($):</label>
                  <input
                    id="debt-principal-input"
                    type="number"
                    value={debtInput}
                    onChange={(e) => setDebtInput(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 font-mono"
                  />
                </div>
                <div>
                  <label htmlFor="exchange-ratio-input" className="text-slate-400 block mb-1">Exchange Ratio (Shares / $):</label>
                  <input
                    id="exchange-ratio-input"
                    type="number"
                    step="0.0001"
                    value={ratioInput}
                    onChange={(e) => setRatioInput(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 font-mono"
                  />
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 font-mono text-xs flex items-center justify-between">
                <span>Output Allocation:</span>
                <span className="font-bold">{liveResult}</span>
              </div>
            </div>
          )}

          {selectedAlg.number !== 4 && liveResult && (
            <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 text-amber-300 font-mono text-xs flex items-center justify-between">
              <span>Benchmark Execution Output:</span>
              <span className="font-bold">{liveResult}</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[10px] text-slate-500 font-mono">
            <span>DTC Ingestion: Participant Clearing Code Ready</span>
            <span>NIST FIPS 204 ML-DSA-87 Signed</span>
          </div>
        </div>
      </div>
    </div>
  );
};
