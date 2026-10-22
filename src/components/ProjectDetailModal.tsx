import React, { useState } from 'react';
import { X, FileText, Download, ExternalLink, ShieldCheck, CheckCircle2, ChevronRight, Share2, Sparkles, BookOpen } from 'lucide-react';
import { ProjectItem } from '../types/portfolio.ts';
import { TTSPlayer } from './TTSPlayer.tsx';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onOpenGroundedSearch?: (query: string, topic: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onOpenGroundedSearch,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'exhibits' | 'specs'>('overview');
  const [copied, setCopied] = useState(false);

  if (!project) return null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${project.title} - ${project.subtitle}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Top App Bar */}
        <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-mono px-2.5 py-1 rounded-full border ${project.badgeColor}`}>
              {project.categoryLabel}
            </span>
            <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">•</span>
            <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">{project.status}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              aria-label="Share project"
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'Copied' : 'Share'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close project modal"
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Hero Banner Title */}
          <div>
            <h2 id="project-modal-title" className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="text-sm text-cyan-400 font-medium mt-0.5">{project.subtitle}</p>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">{project.summary}</p>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {project.keyMetrics.map((metric, i) => (
              <div key={i} className="bg-slate-950 p-3 rounded-2xl border border-slate-800/80">
                <span className="text-[10px] font-mono text-slate-500 block uppercase">{metric.label}</span>
                <span className="text-base sm:text-lg font-bold text-slate-100 font-mono block mt-0.5">
                  {metric.value}
                </span>
                {metric.detail && (
                  <span className="text-[10px] text-slate-400 block mt-0.5">{metric.detail}</span>
                )}
              </div>
            ))}
          </div>

          {/* Voice Narration Section using Gemini TTS */}
          <TTSPlayer
            title={`Listen: ${project.title} Audio Summary`}
            textToSpeak={project.ttsNarrationText}
          />

          {/* Tab Navigation */}
          <div className="flex border-b border-slate-800">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`pb-2.5 px-4 text-xs font-semibold border-b-2 transition-all ${
                activeTab === 'overview'
                  ? 'border-cyan-400 text-cyan-300'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Full Overview
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('exhibits')}
              className={`pb-2.5 px-4 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
                activeTab === 'exhibits'
                  ? 'border-cyan-400 text-cyan-300'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>Attached Documents & Exhibits</span>
              <span className="px-1.5 py-0.2 rounded-full bg-slate-800 text-[10px] font-mono">
                {project.exhibits.length}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('specs')}
              className={`pb-2.5 px-4 text-xs font-semibold border-b-2 transition-all ${
                activeTab === 'specs'
                  ? 'border-cyan-400 text-cyan-300'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Technical Specifications
            </button>
          </div>

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
              <div className="whitespace-pre-line bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 sm:p-5">
                {project.fullOverview}
              </div>

              {/* Highlights */}
              <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4">
                <h4 className="text-xs font-semibold text-slate-200 mb-2.5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Key Architectural Breakthroughs
                </h4>
                <ul className="space-y-2">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-300 text-xs">
                      <ChevronRight className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Grounded Search Prompt */}
              {onOpenGroundedSearch && (
                <div className="p-4 rounded-2xl bg-blue-950/20 border border-blue-800/40 flex items-center justify-between gap-3">
                  <div className="text-xs">
                    <p className="font-semibold text-blue-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Verify Online with Search Grounding
                    </p>
                    <p className="text-slate-400 text-[11px] mt-0.5">
                      Check live SEC Form 13F CUSIP holdings, FDA PMA/IDE registers, or judicial dockets.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      onOpenGroundedSearch(
                        `${project.title} ${project.tags.slice(0, 3).join(' ')}`,
                        project.categoryLabel
                      )
                    }
                    className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1 shadow-sm active:scale-95 transition-all flex-shrink-0"
                  >
                    <span>Run Grounding</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Exhibits */}
          {activeTab === 'exhibits' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-400">
                Official documents, court briefs, and SVG/PDF assets directly referenced in this project:
              </p>
              <div className="grid grid-cols-1 gap-2.5">
                {project.exhibits.map((ex) => (
                  <div
                    key={ex.id}
                    className="bg-slate-950 border border-slate-800 rounded-2xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 flex-shrink-0 mt-0.5">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="text-xs font-semibold text-slate-100">{ex.title}</h5>
                          {ex.badge && (
                            <span className="text-[9px] font-mono px-2 py-0.2 rounded-full bg-slate-900 border border-slate-700 text-cyan-300">
                              {ex.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">{ex.description}</p>
                        <span className="text-[10px] font-mono text-slate-500 block mt-1">
                          Source Path: {ex.filePath}
                        </span>
                      </div>
                    </div>

                    <a
                      href={ex.filePath}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 self-end sm:self-center transition-all flex-shrink-0"
                    >
                      <span>Open Document</span>
                      <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Specs */}
          {activeTab === 'specs' && (
            <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden divide-y divide-slate-800/80 text-xs">
              {project.specifications.map((spec, i) => (
                <div key={i} className="px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-slate-400 font-medium">{spec.key}</span>
                  <span className="text-slate-100 font-mono text-right">{spec.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            {project.tags.map((tag, i) => (
              <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 hidden sm:inline">
                #{tag}
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
