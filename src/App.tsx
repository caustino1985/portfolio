import React, { useState } from 'react';
import {
  Brain,
  Scale,
  Landmark,
  Sparkles,
  Search,
  FileText,
  Ship,
  ExternalLink,
  ShieldCheck,
  Zap,
  Activity,
  Layers,
  CheckCircle2,
  ChevronRight,
  BookOpen,
  Volume2,
  Info,
  Award,
} from 'lucide-react';
import { PORTFOLIO_PROJECTS } from './data/projectsData.ts';
import { ProjectItem, ProjectCategory } from './types/portfolio.ts';
import { AndroidFrame } from './components/AndroidFrame.tsx';
import { NavTabId } from './components/BottomNavBar.tsx';
import { ProjectCard } from './components/ProjectCard.tsx';
import { ProjectDetailModal } from './components/ProjectDetailModal.tsx';
import { GroundedSearchModal } from './components/GroundedSearchModal.tsx';
import { CivicGalleryModal } from './components/CivicGalleryModal.tsx';
import { NeuralProbeVisualizer } from './components/NeuralProbeVisualizer.tsx';
import { WaveformSimulator } from './components/WaveformSimulator.tsx';
import { AlgorithmSuiteExplorer } from './components/AlgorithmSuiteExplorer.tsx';
import { AutoDiscoveryExplorer } from './components/AutoDiscoveryExplorer.tsx';
import { GovLLMChat } from './components/GovLLMChat.tsx';
import { TTSPlayer } from './components/TTSPlayer.tsx';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTabId>('home');
  const [isDeviceMode, setIsDeviceMode] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals state
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [searchModalQuery, setSearchModalQuery] = useState<string>('');
  const [searchModalTopic, setSearchModalTopic] = useState<string>('');
  const [isGalleryOpen, setIsGalleryOpen] = useState<boolean>(false);

  // Neural tab sub-view
  const [neuralSubView, setNeuralSubView] = useState<'probe' | 'waveform' | 'autodiscovery'>('probe');

  const openGroundedSearch = (query: string, topic: string) => {
    setSearchModalQuery(query);
    setSearchModalTopic(topic);
    setIsSearchModalOpen(true);
  };

  // Filtered projects
  const filteredProjects = PORTFOLIO_PROJECTS.filter((proj) => {
    const matchesCategory =
      selectedCategory === 'all' || proj.category === selectedCategory;
    const matchesSearch =
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <AndroidFrame
      currentTab={currentTab}
      onSelectTab={setCurrentTab}
      isDeviceMode={isDeviceMode}
      onToggleDeviceMode={() => setIsDeviceMode((prev) => !prev)}
      onOpenGroundedSearch={() =>
        openGroundedSearch(
          'SEC Form 13F CUSIP 917300AA1 USEC Senior Notes Centrus Energy LEU',
          'Securities & Legal Search'
        )
      }
    >
      {/* ------------------------------------------------------------------ */}
      {/* TAB 1: HOME / EXPLORE                                              */}
      {/* ------------------------------------------------------------------ */}
      {currentTab === 'home' && (
        <div className="p-4 sm:p-5 space-y-5 animate-in fade-in duration-300">
          {/* Executive Profile Card */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/40 border border-slate-800 rounded-3xl p-5 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-44 h-44 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-start justify-between gap-3 relative z-10">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-800/60 inline-block mb-1.5">
                  Debtor-in-Possession • Subchapter V Case 24-2383
                </span>
                <h2 className="text-xl font-extrabold text-white tracking-tight">
                  Caustin Lee McLaughlin
                </h2>
                <p className="text-xs text-cyan-300 font-medium mt-0.5">
                  Jurisprudential Technologist • Systems Architect • Settlor
                </p>
                <p className="text-[11px] text-slate-400 mt-2 leading-relaxed max-w-xl">
                  Deconstructing administrative barriers through high-fidelity neural engineering, post-quantum cryptography, sovereign algorithmic finance, and municipal clean infrastructure.
                </p>
              </div>

              <div className="hidden sm:flex flex-col items-end flex-shrink-0">
                <span className="text-[10px] font-mono text-slate-500">Jurisdictional Fora:</span>
                <span className="text-xs font-mono font-bold text-slate-200">SCOTUS • D.C. Cir • D.D.C.</span>
              </div>
            </div>

            {/* Quick Action Badges */}
            <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-slate-800/80 text-[11px]">
              <button
                type="button"
                onClick={() => setIsGalleryOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-950/60 hover:bg-blue-900/60 text-blue-300 border border-blue-500/30 transition-colors"
              >
                <Ship className="w-3.5 h-3.5 text-blue-400" />
                <span>Woodlawn Canal 2100 Gallery</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setCurrentTab('neural');
                  setNeuralSubView('probe');
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 border border-cyan-500/30 transition-colors"
              >
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>7-Layer INA Probe</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentTab('finance')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-950/60 hover:bg-amber-900/60 text-amber-300 border border-amber-500/30 transition-colors"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>ADR-31 Suite ($500M LEU)</span>
              </button>
            </div>
          </div>

          {/* Quick Voice Overview Card */}
          <TTSPlayer
            title="Executive Portfolio Audio Briefing"
            textToSpeak="Welcome to the master portfolio of Caustin Lee McLaughlin. This repository consolidates five interrelated pillars: the Opto-Splinter CINP-2024-X1 neural prosthetic, eight hundred ninety-seven automated neurogenetic experiments from AstaLabs, sovereign federal mandamus petitions before the Supreme Court of the United States, the thirty-one algorithm ADR quantitative financial engine, and the municipal Baltimore rowhomes clean energy microgrid."
          />

          {/* Search & Category Filter */}
          <div className="space-y-2.5">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects, genes (DRD4, COMT), CUSIPs, or court briefs..."
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors shadow-inner"
              />
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              {[
                { id: 'all', label: 'All Projects' },
                { id: 'neural', label: 'Neural Engineering' },
                { id: 'genomics', label: 'AI & Genomics' },
                { id: 'jurisprudence', label: 'Constitutional Law' },
                { id: 'finance', label: 'Algorithmic Finance' },
                { id: 'energy', label: 'Clean Energy & Cities' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id as ProjectCategory)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-cyan-500 text-slate-950 shadow-md scale-102'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpenDetails={setSelectedProject}
                onOpenGroundedSearch={openGroundedSearch}
              />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12 bg-slate-900/50 rounded-3xl border border-slate-800/80 p-6">
              <Search className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p className="text-xs text-slate-400 font-semibold">No projects match "{searchQuery}"</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-3 text-[11px] text-cyan-400 hover:underline"
              >
                Reset search filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* TAB 2: NEURAL & BIO SYSTEMS                                        */}
      {/* ------------------------------------------------------------------ */}
      {currentTab === 'neural' && (
        <div className="p-4 sm:p-5 space-y-5 animate-in fade-in duration-300">
          {/* Sub-view Navigation Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 text-xs">
            <button
              type="button"
              onClick={() => setNeuralSubView('probe')}
              className={`flex-1 py-1.5 px-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
                neuralSubView === 'probe'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              7-Layer Neural Array (INA)
            </button>
            <button
              type="button"
              onClick={() => setNeuralSubView('waveform')}
              className={`flex-1 py-1.5 px-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
                neuralSubView === 'waveform'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Biphasic Waveform Simulator
            </button>
            <button
              type="button"
              onClick={() => setNeuralSubView('autodiscovery')}
              className={`flex-1 py-1.5 px-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
                neuralSubView === 'autodiscovery'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              AutoDiscovery (897 Exp)
            </button>
          </div>

          {/* Render Active Sub-View */}
          {neuralSubView === 'probe' && <NeuralProbeVisualizer />}
          {neuralSubView === 'waveform' && <WaveformSimulator />}
          {neuralSubView === 'autodiscovery' && <AutoDiscoveryExplorer />}
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* TAB 3: CONSTITUTIONAL LAW & SCOTUS FILINGS                         */}
      {/* ------------------------------------------------------------------ */}
      {currentTab === 'law' && (
        <div className="p-4 sm:p-5 space-y-5 animate-in fade-in duration-300">
          {/* Header Banner */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
                <Scale className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-100">
                  Master Federal Appellate Mandamus & Constitutional Jurisprudence
                </h3>
                <p className="text-[11px] text-slate-400">
                  SCOTUS Rule 20 • 28 U.S.C. § 1651(a) • Tucker Act § 1491 • ADA Title II
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mt-2">
              Challenging unconstitutional § 1631 forum transfers, asserting Fifth Amendment property rights over withheld statutory entitlements, and establishing legal precedent for AI-driven cognitive accommodations (*Tennessee v. Lane*).
            </p>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px]">
              <span className="font-mono text-purple-400">Case No. 24-10492 / Subchapter V Case 24-2383</span>
              <button
                type="button"
                onClick={() =>
                  openGroundedSearch(
                    '28 USC 1631 transfer ultra vires Tucker Act 28 USC 1491 exclusive jurisdiction',
                    'Jurisdictional Transfer Doctrine'
                  )
                }
                className="text-xs font-medium text-cyan-400 hover:underline flex items-center gap-1"
              >
                <span>Ground § 1631 Legal Precedents</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* 5 Questions Presented Accordion Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3 text-xs">
            <h4 className="font-semibold text-slate-200 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-purple-400" />
              The Five Core Questions Presented (SCOTUS Petition)
            </h4>
            <div className="space-y-2 text-[11px] text-slate-300 divide-y divide-slate-800/60">
              <div className="pt-1.5">
                <span className="font-bold text-purple-400">1. Ultra Vires § 1631 Transfer:</span> Whether transferring a Tucker Act claim away from the Court of Federal Claims without jurisdictional defect violates Fifth Amendment Due Process.
              </div>
              <div className="pt-1.5">
                <span className="font-bold text-purple-400">2. SSR 16-4p Genomic Evidence:</span> Whether categorical agency refusal to evaluate objective genomic evidence (polygenic risk scores, candidate polymorphisms) violates the APA and ADA Title II.
              </div>
              <div className="pt-1.5">
                <span className="font-bold text-purple-400">3. Franks v. Delaware Warrant Challenge:</span> Whether prosecution initiated on false affidavits by a fugitive affiant warrants federal habeas corpus relief under 28 U.S.C. § 2241.
              </div>
              <div className="pt-1.5">
                <span className="font-bold text-purple-400">4. Monell Municipal Liability:</span> Whether municipal liability attaches to sheriff offices for policies of executing removals without constitutionally adequate process.
              </div>
              <div className="pt-1.5">
                <span className="font-bold text-purple-400">5. All Writs Act Supervisory Authority:</span> Whether severe claim fragmentation across six distinct fora justifies Supreme Court supervisory intervention to prevent a failure of justice.
              </div>
            </div>
          </div>

          {/* Document Repository & PDF Library */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
              Consolidated Legal Briefs & Presentment Filings
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                {
                  title: 'SCOTUS / D.C. Circuit Master Omnibus Mandamus',
                  docket: '24-10492 / 24-2383',
                  file: '/assets/aistudio/documentSCOTUS-DC_f4e187b3.pdf',
                  desc: '20-page master pleading detailing CUSIP re-identifiability proof, DYREO HJB equations, and BNY Mellon clearing directive.',
                },
                {
                  title: 'Baltimore City / SCOTUS Master Presentment',
                  docket: 'Case No. 24-C-26-003970',
                  file: '/assets/aistudio/PRESENTMENT-BALTCITY-DC-SCOTUS_3473873d.pdf',
                  desc: 'Omnibus petition for writ of mandamus, direct protocol clearing order, and IFP motion.',
                },
                {
                  title: 'Petition for Writ of Certiorari (25-4130)',
                  docket: 'Fourth Circuit / SCOTUS',
                  file: '/assets/aistudio/document2_48641955.pdf',
                  desc: 'Challenging procedural defaults caused by neurocognitive disability and denial of ADA accommodations.',
                },
                {
                  title: 'Downtown Baltimore Filing Itinerary & Desk Script',
                  docket: 'M&T Bank & Circuit Court',
                  file: '/assets/aistudio/MandTCORPTRUSTITINERARY_cbfb22ce.pdf',
                  desc: 'Verbatim court clerk dialogue, IFP fee waiver processing, and corporate trust onboarding.',
                },
                {
                  title: 'Pre-Filing Checklist & Execution Protocol',
                  docket: 'Notary & Chain-of-Custody',
                  file: '/assets/aistudio/prefright-checkwrist_859803b0.pdf',
                  desc: 'In-person physical verification steps to ensure unassailable evidentiary chain-of-custody.',
                },
                {
                  title: 'Downtown Baltimore Parking & Security Access Pass',
                  docket: 'Municipal Protocol',
                  file: '/assets/aistudio/BALTOPARKING-SEC-PASS_b9bace45.pdf',
                  desc: 'Magnetometer screening specifications, parking garage coordinates, and fast-track clearance.',
                },
              ].map((doc, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 flex flex-col justify-between hover:border-purple-500/40 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-purple-400 mb-1">
                      <span>{doc.docket}</span>
                      <span className="text-slate-500">PDF</span>
                    </div>
                    <h5 className="text-xs font-semibold text-slate-100">{doc.title}</h5>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{doc.desc}</p>
                  </div>
                  <a
                    href={doc.file}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-cyan-300 text-xs font-medium transition-colors"
                  >
                    <span>View Filing</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* TAB 4: ALGORITHMIC FINANCE & ENERGY GRID                           */}
      {/* ------------------------------------------------------------------ */}
      {currentTab === 'finance' && (
        <div className="p-4 sm:p-5 space-y-5 animate-in fade-in duration-300">
          {/* Financial Architecture Banner */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Landmark className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-100">
                  PSDLEF Sovereign Exchange Trust & ADR-31
                </h3>
                <p className="text-[11px] text-slate-400">
                  $500M USEC Senior Notes Conversion (0.0917) • 45,850,000 LEU Common Shares
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mt-2">
              The Public Securities Depository & Ledger Exchange Framework (PSDLEF) manages institutional debt-to-equity conversions, CUSIP normalization, and continuous-time Hamilton-Jacobi-Bellman yield sweeps funding municipal clean microgrids.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 pt-3 border-t border-slate-800/80 text-[11px] font-mono">
              <div className="bg-slate-950 p-2 rounded-xl">
                <span className="text-slate-500 block text-[10px]">Series A (6.625%)</span>
                <span className="text-amber-400 font-bold">$350,000,000</span>
              </div>
              <div className="bg-slate-950 p-2 rounded-xl">
                <span className="text-slate-500 block text-[10px]">Series B (6.750%)</span>
                <span className="text-amber-400 font-bold">$150,000,000</span>
              </div>
              <div className="bg-slate-950 p-2 rounded-xl">
                <span className="text-slate-500 block text-[10px]">Exchange Ratio</span>
                <span className="text-emerald-400 font-bold">0.0917 Shares/$</span>
              </div>
              <div className="bg-slate-950 p-2 rounded-xl">
                <span className="text-slate-500 block text-[10px]">Converted Equity</span>
                <span className="text-cyan-400 font-bold">45,850,000 LEU</span>
              </div>
            </div>
          </div>

          {/* Interactive Algorithm Suite Explorer */}
          <AlgorithmSuiteExplorer />

          {/* Baltimore Rowhomes & Canal Gallery Banner */}
          <div className="bg-gradient-to-r from-slate-900 to-blue-950/40 border border-slate-800 rounded-3xl p-5 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400 font-bold">
                Municipal Clean Grid & Hydro-Mobility
              </span>
              <h4 className="text-sm font-bold text-slate-100 mt-0.5">
                Woodlawn SSA Canal Terminal & Baltimore Solar Rowhomes
              </h4>
              <p className="text-xs text-slate-400 mt-1 max-w-lg">
                300 rowhome rooftop microgrids (150 kW PV / 300 kWh BESS) paired with navigable urban lock channels connecting federal facilities to Baltimore Harbor.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsGalleryOpen(true)}
              className="px-4 py-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md active:scale-95 transition-all flex-shrink-0"
            >
              <Ship className="w-3.5 h-3.5" />
              <span>Launch Gallery (8 Views)</span>
            </button>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* TAB 5: AI COPILOT & VOICE ASSISTANT                                */}
      {/* ------------------------------------------------------------------ */}
      {currentTab === 'copilot' && (
        <div className="p-4 sm:p-5 space-y-5 animate-in fade-in duration-300">
          <GovLLMChat />

          {/* Dedicated Text-to-Speech Studio */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <Volume2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-100">Live Voice Synthesis Studio</h4>
                <p className="text-[10px] text-slate-400">Gemini 3.8 Flash TTS with custom voice personas</p>
              </div>
            </div>

            <TTSPlayer
              title="Custom Text Narration Engine"
              textToSpeak="Under Title Two of the Americans with Disabilities Act, forty-two U.S.C. section twelve one thirty-one, and Tennessee versus Lane, five forty-one U.S. five zero nine, the provision of artificial intelligence cognitive accommodations is mandatory to ensure equal and meaningful access to judicial proceedings."
            />
          </div>
        </div>
      )}

      {/* Modals */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenGroundedSearch={openGroundedSearch}
      />

      <GroundedSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        initialQuery={searchModalQuery}
        topic={searchModalTopic}
      />

      <CivicGalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
      />
    </AndroidFrame>
  );
}
