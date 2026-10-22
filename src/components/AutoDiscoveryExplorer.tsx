import React, { useState } from 'react';
import { Dna, TrendingDown, Bookmark, ArrowUpRight, CheckCircle2, AlertTriangle, Layers, Brain } from 'lucide-react';
import { SAMPLE_EXPERIMENTS, AUTO_DISCOVERY_SUMMARY } from '../data/experimentsData.ts';
import { SNPS_DATABASE, SNPRecord } from '../data/snpsData.ts';
import { calculateGPRSScore } from '../utils/calculations.ts';

export const AutoDiscoveryExplorer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'experiments' | 'snps' | 'bayesian'>('experiments');
  const [directionFilter, setDirectionFilter] = useState<'All' | 'Positive' | 'Negative' | 'Neutral'>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Custom SNP dosage state
  const [snpDosages, setSnpDosages] = useState<Record<string, number>>(
    SNPS_DATABASE.reduce((acc, snp) => ({ ...acc, [snp.rsId]: snp.defaultDosage }), {})
  );

  const filteredExperiments = SAMPLE_EXPERIMENTS.filter((exp) => {
    const matchesDir = directionFilter === 'All' || exp.direction === directionFilter;
    const matchesCat = selectedCategory === 'All' || exp.category === selectedCategory;
    return matchesDir && matchesCat;
  });

  const categories = ['All', 'Dopaminergic', 'Emerging Loci', 'Neural Interfaces', 'Administrative Adjudication', 'Cryptographic Integrity'];

  // Calculate live GPRS score based on current dosages
  const currentSnpItems = SNPS_DATABASE.map((snp) => ({
    rsId: snp.rsId,
    gene: snp.gene,
    effectAllele: snp.effectAllele,
    dosage: snpDosages[snp.rsId] ?? snp.defaultDosage,
    beta: snp.beta,
    qualityWeight: 1.0,
  }));
  const gprsResult = calculateGPRSScore(currentSnpItems);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Brain className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
              AstaLabs AutoDiscovery Suite
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono">
                897 Experiments
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Bayesian Convergence, Surprisal Dynamics (r = -0.41), & 17-SNP Risk Panel
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-[11px]">
          <button
            type="button"
            onClick={() => setActiveTab('experiments')}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              activeTab === 'experiments'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Experiments
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('snps')}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              activeTab === 'snps'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            17-SNP GPRS Panel
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('bayesian')}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              activeTab === 'bayesian'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Bayesian Metrics
          </button>
        </div>
      </div>

      {/* Tab 1: Experiments */}
      {activeTab === 'experiments' && (
        <div className="space-y-3">
          {/* Filters */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1 text-[11px]">
              <span className="text-slate-500 font-mono text-[10px]">DIRECTION:</span>
              {(['All', 'Positive', 'Negative', 'Neutral'] as const).map((dir) => (
                <button
                  key={dir}
                  type="button"
                  onClick={() => setDirectionFilter(dir)}
                  className={`px-2.5 py-0.5 rounded-lg font-medium transition-colors ${
                    directionFilter === dir
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-slate-950 text-slate-400 border border-slate-800'
                  }`}
                >
                  {dir}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1 overflow-x-auto text-[11px]">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2 py-0.5 rounded-lg text-[10px] whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-slate-800 text-white font-semibold'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Experiments Cards */}
          <div className="max-h-[380px] overflow-y-auto space-y-2 pr-1">
            {filteredExperiments.map((exp) => (
              <div
                key={exp.id}
                className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5 space-y-2 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 font-mono text-emerald-400 font-bold">
                      Exp #{exp.id}
                    </span>
                    <span className="text-slate-400 text-[10px]">{exp.category}</span>
                    {exp.isBookmarked && (
                      <span className="flex items-center gap-0.5 text-[10px] px-1.5 py-0.2 rounded bg-amber-950/50 border border-amber-500/40 text-amber-300">
                        <Bookmark className="w-3 h-3 fill-current" />
                        Bookmarked Salience
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-slate-400 text-[10px]">
                      Surprisal: <strong className="text-cyan-300">{exp.surprisal.toFixed(3)}</strong>
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        exp.direction === 'Positive'
                          ? 'bg-emerald-950/50 border border-emerald-500/40 text-emerald-300'
                          : exp.direction === 'Negative'
                          ? 'bg-rose-950/50 border border-rose-500/40 text-rose-300'
                          : 'bg-slate-900 border border-slate-700 text-slate-300'
                      }`}
                    >
                      {exp.direction}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-200 leading-relaxed">{exp.hypothesis}</p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-900 text-[10px] font-mono text-slate-500">
                  <span>Prior Belief: <strong className="text-slate-300">{exp.beliefBefore}</strong></span>
                  <span className="flex items-center gap-1">
                    Updated State: <strong className="text-emerald-400">{exp.beliefAfter}</strong>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: 17-SNP GPRS Panel */}
      {activeTab === 'snps' && (
        <div className="space-y-4">
          {/* Live GPRS Assessment Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-wider">
                Multi-Locus GPRS-Secure++ Assessment
              </span>
              <h4 className="text-base font-bold text-slate-100">
                Genetic-Phenotypic Risk Score: {gprsResult.rawScore} (z = {gprsResult.normalizedZScore})
              </h4>
              <p className="text-xs text-slate-400">
                Pop. Percentile: <strong className="text-cyan-300 font-mono">{gprsResult.percentile}th percentile</strong> | Risk Tier: <strong className="text-emerald-300">{gprsResult.riskTier}</strong>
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-right">
              <span className="text-[10px] text-slate-500 block font-mono">Daubert Reliability</span>
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1 justify-end">
                <CheckCircle2 className="w-3.5 h-3.5" />
                SSR 16-4p Admissible
              </span>
            </div>
          </div>

          {/* Interactive SNP Loci List */}
          <div className="max-h-[320px] overflow-y-auto space-y-2 pr-1">
            {SNPS_DATABASE.map((snp) => (
              <div
                key={snp.rsId}
                className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-cyan-400">{snp.rsId}</span>
                    <span className="font-semibold text-slate-100">{snp.gene}</span>
                    <span className="text-[10px] text-slate-500 font-mono">({snp.locus})</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-900 border border-slate-800 text-slate-400">
                      {snp.variant}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 max-w-lg">{snp.neurobiologicalImpact}</p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <span className="text-[10px] text-slate-500 font-mono">Dosage:</span>
                  {[0, 1, 2].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setSnpDosages((prev) => ({ ...prev, [snp.rsId]: d }))}
                      className={`w-6 h-6 rounded font-mono text-[11px] font-bold transition-all ${
                        snpDosages[snp.rsId] === d
                          ? 'bg-emerald-500 text-slate-950 shadow-sm'
                          : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Bayesian Metrics */}
      {activeTab === 'bayesian' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
              <span className="text-[10px] font-mono text-slate-500 block">Surprisal Decay (Learning)</span>
              <span className="text-base font-bold text-emerald-400 font-mono">r = -0.41</span>
              <span className="text-[10px] text-slate-400 block">p &lt; 0.001 (Significant)</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
              <span className="text-[10px] font-mono text-slate-500 block">Bayesian Update Weight</span>
              <span className="text-base font-bold text-cyan-400 font-mono">r = +0.53</span>
              <span className="text-[10px] text-slate-400 block">ΔBelief ∝ Surprisal</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
              <span className="text-[10px] font-mono text-slate-500 block">Positive Surprisal Mean</span>
              <span className="text-base font-bold text-slate-200 font-mono">0.286</span>
              <span className="text-[10px] text-slate-400 block">Low Surprisal (Expected)</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
              <span className="text-[10px] font-mono text-slate-500 block">Negative Surprisal Mean</span>
              <span className="text-base font-bold text-rose-400 font-mono">0.484</span>
              <span className="text-[10px] text-slate-400 block">Optimism Bias (t=7.82)</span>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
            <h5 className="font-semibold text-slate-200 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-cyan-400" />
              The Nine-Report Integrity Layer (OSI-P)
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px]">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-emerald-400 font-bold block">R1 - R3: Ingress</span>
                <span className="text-slate-400 text-[10px]">Evidence chain SHA3-256 ledger, OCR integrity logs, and model embedding provenance.</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-cyan-400 font-bold block">R4 - R6: Inference</span>
                <span className="text-slate-400 text-[10px]">Retrieval similarity traces, prompt logs, and unedited raw draft answer token probabilities.</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-purple-400 font-bold block">R7 - R9: Attestation</span>
                <span className="text-slate-400 text-[10px]">Cross-modal image alignment, ADA caption transformations, and final Merkle root signed via NIST ML-DSA-87.</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
