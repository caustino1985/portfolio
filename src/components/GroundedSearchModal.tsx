import React, { useState } from 'react';
import { Search, Globe, ExternalLink, Loader2, X, Sparkles, BookOpen } from 'lucide-react';

interface GroundedSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
  topic?: string;
}

export const GroundedSearchModal: React.FC<GroundedSearchModalProps> = ({
  isOpen,
  onClose,
  initialQuery = 'SEC Form 13F CUSIP 917300AA1 USEC Senior Notes Centrus Energy LEU',
  topic = 'SEC Securities & Legal Research',
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [isLoading, setIsLoading] = useState(false);
  const [resultText, setResultText] = useState<string | null>(null);
  const [groundingChunks, setGroundingChunks] = useState<any[]>([]);
  const [searchQueries, setSearchQueries] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    setResultText(null);
    setGroundingChunks([]);

    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          topic,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Search grounding request failed.');
      }

      setResultText(data.text);
      setGroundingChunks(data.groundingChunks || []);
      setSearchQueries(data.webSearchQueries || []);
    } catch (err: any) {
      console.error('Search grounding error:', err);
      setError(err.message || 'Unable to connect to Google Search grounding.');
    } finally {
      setIsLoading(false);
    }
  };

  const sampleQueries = [
    'FDA QMSR 21 CFR Part 820 ISO 13485:2016 effective Feb 2 2026',
    'SEC 13F PNC Financial Services Group CUSIP 917300AA1',
    'Tennessee v. Lane 541 U.S. 509 ADA Title II court accommodations',
    'Demontis et al. 2019 ADHD GWAS risk loci 22q11.21 COMT',
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="grounded-search-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h3 id="grounded-search-title" className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
                Google Search Grounding Engine
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/30 font-mono">
                  Live Web
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Grounding verifiable facts with Gemini 3.8 Flash & Google Search tool
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search modal"
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-slate-800/80 bg-slate-900/50">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search real-time case law, SEC CUSIPs, or clinical research..."
                className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-2xl text-xs font-semibold flex items-center gap-1.5 shadow-md active:scale-95 transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Sparkles className="w-3.5 h-3.5" />
              )}
              <span>Verify</span>
            </button>
          </form>

          {/* Quick suggestions */}
          <div className="flex items-center gap-1.5 mt-2.5 overflow-x-auto pb-1 text-[11px] text-slate-400">
            <span className="flex-shrink-0 text-slate-500 text-[10px] uppercase font-semibold">Suggested:</span>
            {sampleQueries.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setQuery(q);
                }}
                className="flex-shrink-0 px-2 py-0.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 transition-colors text-[10px] truncate max-w-[200px]"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {isLoading && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
              <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
              <p className="text-xs text-slate-300 font-medium">
                Querying Google Search & Synthesizing Grounded Citations...
              </p>
              <p className="text-[11px] text-slate-500 max-w-sm">
                Searching SEC registries, court dockets, and PubMed genomic literature.
              </p>
            </div>
          )}

          {error && (
            <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-800/60 text-rose-300 text-xs">
              <p className="font-semibold mb-1">Search Grounding Notice:</p>
              <p className="text-[11px] opacity-90">{error}</p>
            </div>
          )}

          {resultText && (
            <div className="space-y-4">
              <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-800/80 text-xs font-semibold text-cyan-400">
                  <BookOpen className="w-3.5 h-3.5" />
                  Grounded Synthesis
                </div>
                <div className="text-xs text-slate-200 leading-relaxed whitespace-pre-line font-sans">
                  {resultText}
                </div>
              </div>

              {/* Citations & Sources */}
              {groundingChunks.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                    <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                    Web Grounding Sources & References
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {groundingChunks.map((chunk, i) => {
                      const web = chunk.web;
                      if (!web) return null;
                      return (
                        <a
                          key={i}
                          href={web.uri}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-950 transition-all flex flex-col group"
                        >
                          <span className="text-[11px] font-medium text-blue-400 group-hover:text-blue-300 line-clamp-1">
                            {web.title || web.uri}
                          </span>
                          <span className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                            {web.uri}
                          </span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {!isLoading && !resultText && !error && (
            <div className="py-10 text-center space-y-2">
              <Search className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-xs text-slate-400">
                Enter any query above and click <span className="text-cyan-400 font-semibold">Verify</span> to perform real-time grounded search.
              </p>
              <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
                Validates SEC Form 13F CUSIP holdings, federal court dockets, FDA regulatory shifts, and neurogenetic publications.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-[11px] text-slate-500">
          <span>Engine: gemini-3.8-flash (googleSearch)</span>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 text-xs font-medium"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
