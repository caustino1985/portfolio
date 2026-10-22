import React from 'react';
import { ProjectItem } from '../types/portfolio.ts';
import { ArrowUpRight, Volume2, FileText, ChevronRight, Sparkles } from 'lucide-react';
import { TTSPlayer } from './TTSPlayer.tsx';

interface ProjectCardProps {
  project: ProjectItem;
  onOpenDetails: (project: ProjectItem) => void;
  onOpenGroundedSearch: (query: string, topic: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onOpenDetails,
  onOpenGroundedSearch,
}) => {
  return (
    <div className="group bg-slate-900/90 border border-slate-800 hover:border-slate-700/80 rounded-3xl p-5 shadow-lg hover:shadow-cyan-500/5 transition-all flex flex-col justify-between overflow-hidden relative">
      {/* Background Subtle Gradient */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-all pointer-events-none" />

      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className={`text-[10px] font-mono px-2.5 py-1 rounded-full border ${project.badgeColor}`}>
            {project.categoryLabel}
          </span>
          <span className="text-[10px] text-slate-400 font-mono">{project.date}</span>
        </div>

        {/* Thumbnail Preview if available */}
        {project.heroImage && (
          <div className="relative w-full h-36 rounded-2xl overflow-hidden mb-3.5 border border-slate-800/80 bg-slate-950">
            <img
              src={project.heroImage}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between">
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-900/90 border border-slate-700/80 text-cyan-300">
                {project.status}
              </span>
              <span className="text-[9px] font-mono text-slate-300 bg-slate-900/80 px-1.5 py-0.5 rounded">
                {project.exhibits.length} Exhibits
              </span>
            </div>
          </div>
        )}

        {/* Title & Description */}
        <h3 className="text-base font-bold text-slate-100 group-hover:text-cyan-300 transition-colors line-clamp-1">
          {project.title}
        </h3>
        <p className="text-xs text-cyan-400/90 font-medium line-clamp-1 mt-0.5">
          {project.subtitle}
        </p>
        <p className="text-xs text-slate-400 line-clamp-2 mt-2 leading-relaxed">
          {project.summary}
        </p>

        {/* Key Metrics Pill Row */}
        <div className="grid grid-cols-2 gap-2 mt-3.5">
          {project.keyMetrics.slice(0, 2).map((m, idx) => (
            <div key={idx} className="bg-slate-950/70 border border-slate-800/80 rounded-xl px-2.5 py-1.5">
              <span className="text-[9px] font-mono text-slate-500 uppercase block">{m.label}</span>
              <span className="text-xs font-bold text-slate-200 font-mono block truncate">{m.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Card Footer: Quick Audio button + View Details */}
      <div className="pt-4 mt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
        <TTSPlayer
          compact={true}
          textToSpeak={project.ttsNarrationText}
          title={project.title}
        />

        <button
          type="button"
          onClick={() => onOpenDetails(project)}
          className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors active:scale-95"
        >
          <span>Examine</span>
          <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
        </button>
      </div>
    </div>
  );
};
