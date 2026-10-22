import { ProjectItem } from '../types/portfolio.ts';

export const PORTFOLIO_PROJECTS: ProjectItem[] = [
  {
    id: 'cinp-uose-prosthetic',
    title: 'Opto-Splinter™ / CINP-2024-X1',
    subtitle: 'Unified Optical-Electrical Hybrid Neural Prosthetic System',
    category: 'neural',
    categoryLabel: 'Neural Engineering',
    date: 'June 2026',
    status: 'Manufacturer-Ready / QMSR-Aligned',
    badgeColor: 'border-cyan-500/40 text-cyan-400 bg-cyan-950/40',
    summary: 'A Class III monolithic 7-layer intracranial neural interface and HSPA-9 controlled biphasic charge-balanced stimulator, featuring O(L^2) optical superposition and a non-optical Neurograi graphene fallback pathway.',
    fullOverview: `The CINP-2024-X1 UOSE Hybrid represents the convergence of two distinct technological lineages into a single, unified cognitive restoration and enhancement platform. The Cognitive-Impact Neural Prosthetic provides the system-level architecture—distributed neural sensing, AI-driven cognitive co-processing, post-quantum security (Kyber-1024), and resilient power infrastructure—while the Unified Optical Superposition Engine (UOSE-Hybrid Probe VX-1) replaces legacy Utah-style arrays with sub-cellular precision.

The system features:
1. 7-Layer Monolithic Cross-Section (INA):
   - Layer 7: Parylene-C + h-BN + Silicone Overmold (biocompatibility, hermetic barrier)
   - Layer 6: PEG Hydrogel Matrix + AAV/HUP + Microneedles (dexamethasone elution)
   - Layer 5: SiN Waveguides + Chalcogenide Fibers (dual-band optical routing)
   - Layer 4: LCoS SLM + MEMS Micromirrors (phase control & beam steering)
   - Layer 3: micro-LED / VCSEL / Laser Array (Fibonacci lattice geometry)
   - Layer 2: Pt-Ir Microelectrode Array + Neurograi™ Graphene Interface (>3.1 mC/cm2 charge injection capacity, <50 kΩ impedance)
   - Layer 1: CMOS Silicon Substrate with HSPA-9 AI Co-Processor, 8-bit ROM, and High-Voltage Adapter (HVA)
2. Decoupled Dual-Track Regulatory Strategy:
   - Track A (NGO): Non-Genetic Optical (1870 nm NIR + HUP nanoparticles) Class III PMA (12-18 months)
   - Track B (VEO): Viral-Enabled Optogenetic (AAV opsins + micro-LEDs) Combination Product
   - Track C (NEP): Neurograi Electrical Pathway fallback with predicate reference to NeuroPace RNS and Medtronic Percept
3. 2026 FDA QMSR Compliance:
   - Built to meet ISO 13485:2016 clauses mandated by the FDA Quality Management System Regulation effective February 2, 2026.
   - Incorporates full 80-procedure Manufacturing SOP & Quality Control protocol (DPR-001 through DPR-080).`,
    heroImage: '/assets/aistudio/eqvr8_1__6478f02f.jpg',
    keyMetrics: [
      { label: 'Array Scale', value: '7-8 µm', detail: 'Red blood cell dimension' },
      { label: 'Charge Capacity', value: '>3.1 mC/cm²', detail: '10x over platinum-iridium' },
      { label: 'Electrode Impedance', value: '<50 kΩ', detail: '@ 1 kHz PBS benchmark' },
      { label: 'Thermal Safety', value: 'ΔT < 2.0°C', detail: 'Automatic safety interlock' },
    ],
    tags: ['Neural Prosthetics', 'Opto-Splinter', 'Graphene Electrodes', 'FDA QMSR 2026', 'HSPA-9', 'Post-Quantum PQC'],
    ttsNarrationText: `The Opto-Splinter CINP-2024-X1 Hybrid is an advanced implantable neural interface combining an intracranial seven-layer monolithic array with an on-chip semantic coprocessor. Operating at a scale of seven to eight micrometers, it achieves sub-cellular stimulation precision through constructive optical interference while incorporating the Neurograi graphene electrical fallback pathway. This architecture ensures permanent therapeutic continuity and complies with FDA Class Three standards under the 2026 Quality Management System Regulation.`,
    exhibits: [
      {
        id: 'ex-probe-svg',
        title: 'Opto-Splinter System Architecture SVG Blueprint',
        type: 'image',
        filePath: '/assets/aistudio/eqvr8_1__6478f02f.jpg',
        description: 'Complete 7-layer Intracranial Neural Array, STPH, EPU, HSPA-9 biphasic waveform, and 80 DPR QC checkpoints.',
        badge: 'CONFIDENTIAL / TRADE SECRET',
      },
      {
        id: 'ex-dossier-pdf',
        title: 'CINP-2024-X1 UOSE Integrated Technical Dossier',
        type: 'pdf',
        filePath: '/assets/aistudio/output_f996fca6.pdf',
        description: 'Comprehensive 78-page technical and regulatory portfolio detailing PMA/IDE templates, SOPs, and testing protocols.',
        badge: 'FDA Submission Dossier',
      },
      {
        id: 'ex-neurogenetic-report',
        title: 'Depersonalized Neurogenetic Clinical Briefing',
        type: 'pdf',
        filePath: '/assets/aistudio/depersonalized-neurogenetic-report_5e7a9ad9.pdf',
        description: 'Multi-omic biomarkers, neuroimaging endophenotypes, and econometric models of cognitive executive function.',
        badge: 'Clinical Evidence',
      },
    ],
    specifications: [
      { key: 'Classification', value: 'FDA Class III Active Implantable Medical Device' },
      { key: 'Optical Scaling', value: 'O(L²) Constructive Interference (V ≈ L(L+1)/2 VOMs)' },
      { key: 'Electrical Channels', value: '1024-Channel Bidirectional Recording & Micro-Stimulation' },
      { key: 'Graphene Interface', value: 'Neurograi™ SLG Monolayer + rGO Foam + Parylene-C' },
      { key: 'Biphasic Pulse Width', value: '100 - 500 µs (programmable via 8-bit ROM)' },
      { key: 'Cryptographic Security', value: 'NIST FIPS 203 (ML-KEM-1024) & FIPS 204 (ML-DSA-65)' },
      { key: 'Power Profile', value: '20-25 mW (NEP Mode) / 35-75 mW (Full Hybrid Mode)' },
      { key: 'Biocompatibility', value: 'ISO 10993-6 compliant (Grade A cleanroom packaging)' },
    ],
    highlights: [
      'Decoupled hardware density from spatial resolution via constructive optical superposition.',
      'Neurograi graphene electrodes deliver 10x higher charge injection capacity (>3.1 mC/cm²) than standard platinum-iridium.',
      'NEP Dark Mode reduces total device power consumption by 40% to 67%, minimizing intracranial thermal dissipation.',
      'Pre-configured FDA Q-Sub and IDE application templates targeting neurological restoration under 21 CFR Part 814.',
    ],
  },
  {
    id: 'astalabs-autodiscovery',
    title: 'AstaLabs AutoDiscovery',
    subtitle: 'Automated Scientific Discovery & Neurogenetic Research',
    category: 'genomics',
    categoryLabel: 'AI & Genomics',
    date: 'June 2026',
    status: 'Doctoral Dissertation & 897 Experiments',
    badgeColor: 'border-emerald-500/40 text-emerald-400 bg-emerald-950/40',
    summary: 'A doctoral research framework analyzing 897 automated scientific experiments investigating ADHD polygenic architecture, Bayesian belief dynamics, surprisal decay, and the Nine-Report Integrity Layer.',
    fullOverview: `This project embodies a comprehensive analysis of the AstaLabs AutoDiscovery dataset, comprising 897 automated scientific experiments conducted across five principal domains:
1. Genetic architecture of ADHD and executive function impairment (DRD4, DAT1, COMT, ADGRL3, BDNF, FKBP5).
2. Integration of genomic evidence into administrative adjudication frameworks (SSR 16-4p, Daubert, Twombly/Iqbal).
3. Statistical relationships between genetic polymorphisms and neurocognitive phenotypes.
4. Development of virtualized high-density neural stimulation technologies (VHNS-FAM).
5. Evolution of belief states in automated research systems.

Key Quantitative Findings:
- Bayesian Learning Curve: Significant negative correlation between experiment sequence and surprisal values (r = -0.41, p < 0.001), demonstrating systematic model convergence.
- Bayesian Update Principle: Magnitude of belief change correlates strongly with surprisal (r = 0.53, p < 0.001).
- Optimism Bias: Positive experimental outcomes are associated with significantly lower surprisal (M = 0.29) than negative outcomes (M = 0.48, p < 0.0001).
- Belief Inertia: High-confidence states resist alteration (67.3% retention for 'Likely True').
- Nine-Report Integrity Layer (OSI-P): A cryptographic Merkle-chain framework (R1 to R9) establishing self-authenticating evidence for administrative law under FRE 902(13)-(14).
- The Cognitive Ramp: Bidirectional coupling between biological cognition, artificial intelligence, and judicial/administrative procedures.`,
    heroImage: '/assets/aistudio/do6F4_1__45f3c102.jpg',
    keyMetrics: [
      { label: 'Experiments', value: '897', detail: 'Automated hypotheses evaluated' },
      { label: 'Surprisal Decay', value: 'r = -0.41', detail: 'p < 0.001 learning curve' },
      { label: 'Bayesian Update', value: 'r = 0.53', detail: 'Belief revision vs surprisal' },
      { label: 'ADHD Heritability', value: '70% - 88%', detail: 'Common SNP h² ≈ 22%' },
    ],
    tags: ['AstaLabs', 'AutoDiscovery', 'Bayesian Belief Dynamics', 'ADHD Genomics', 'SSR 16-4p', 'Cognitive Ramp'],
    ttsNarrationText: `The AstaLabs AutoDiscovery project examines the dynamics of automated scientific reasoning across eight hundred and ninety-seven experiments. By evaluating hypotheses across neurogenetics, administrative law, and virtualized neural stimulation, the study demonstrates empirical Bayesian convergence with a statistically significant surprisal decay correlation of minus zero point four one. It also formalizes the Nine-Report Integrity Layer, establishing self-authenticating evidentiary trails for administrative proceedings.`,
    exhibits: [
      {
        id: 'ex-dissertation-txt',
        title: 'Complete PhD Dissertation: AstaLabs AutoDiscovery',
        type: 'code',
        filePath: '/assets/aistudio/dissertation_b087970a.txt',
        description: 'Complete 7-chapter doctoral dissertation text covering literature review, quantitative results, thematic analysis, and bibliography.',
        badge: 'Doctoral Dissertation',
      },
      {
        id: 'ex-master-portfolio-pdf',
        title: 'Master Portfolio Compendium: 7 Integrated Volumes',
        type: 'pdf',
        filePath: '/assets/aistudio/MasterPortfolio_6f77503c.pdf',
        description: 'Synthesis of biological data sovereignty, multimodal biomarkers, MORTAR triage engine, and international human rights petitions.',
        badge: 'Master Compendium',
      },
      {
        id: 'ex-texstudio-pdf',
        title: 'LaTeX Formatted Technical Compendium',
        type: 'pdf',
        filePath: '/assets/aistudio/texstudio_eJUvmj_3a11d046.pdf',
        description: 'Typeset scientific publication documenting mathematical derivations, equations, and literature crosswalks.',
        badge: 'LaTeX Typeset',
      },
    ],
    specifications: [
      { key: 'Dataset Size', value: '897 Experiments across 3 sequential cohorts' },
      { key: 'Mean Surprisal', value: '0.308 (SD = 0.261, Range: 0.000 to 0.974)' },
      { key: 'Primary Genes', value: 'DRD4, DAT1 (SLC6A3), COMT, DRD2, FKBP5, BDNF, ADGRL3' },
      { key: 'Evidentiary Framework', value: 'Daubert Factors, FRE 902(13)-(14), SSR 16-4p' },
      { key: 'Adjudication Model', value: 'MORTAR LSH Engine with O(n log m) candidate retrieval' },
      { key: 'Audit Pipeline', value: 'OpenSSA (OSI-P) Nine-Stage Merkle Tree + ML-DSA-87' },
      { key: 'Readability Accommodation', value: 'Flesch-Kincaid Grade 6-8 Text Simplification' },
      { key: 'Reasoning Index', value: 'RACI ≥ 0.85 High Coherence Threshold' },
    ],
    highlights: [
      'Empirical validation of Bayesian belief dynamics in an autonomous AI research agent.',
      'Demonstrated reduction in prediction error (surprisal decay) across 897 automated experimental cycles.',
      '17-SNP functional panel linked to neuroanatomical endophenotypes in the basal ganglia, DLPFC, and ACC.',
      'Formalized the "Cognitive Ramp" to overcome cognitive fragmentation in administrative disability determinations.',
    ],
  },
  {
    id: 'scotus-jurisprudence',
    title: 'Master Federal Appellate Mandamus',
    subtitle: 'SCOTUS Original Docket, D.C. Circuit & Circuit Court Actions',
    category: 'jurisprudence',
    categoryLabel: 'Constitutional Law',
    date: 'October 2026',
    status: 'Active Consolidated Petitions',
    badgeColor: 'border-purple-500/40 text-purple-400 bg-purple-950/40',
    summary: 'Consolidated federal and state appellate petitions advancing Tucker Act illegal exaction claims, challenging ultra vires § 1631 forum transfers, and asserting ADA Title II Gov-LLM cognitive accommodations.',
    fullOverview: `This master legal instrument coordinates litigation across five supervisory judicial tiers:
1. Supreme Court of the United States: Original and supervisory mandamus under 28 U.S.C. § 1651(a) and Rule 20.
2. U.S. Court of Appeals for the D.C. Circuit: Case No. 24-10492, Petition for Review & Mandamus.
3. U.S. District Court for the District of Columbia: Subchapter V Bankruptcy Estate of Debtor-in-Possession Caustin Lee McLaughlin (Case No. 24-2383).
4. Circuit Court for Baltimore City, Maryland: Equity Division Case No. 24-C-26-003970.
5. U.S. Court of Appeals for the Fourth Circuit: Consolidated appeals Nos. 25-1222, 25-1224, 25-1522, and 25-4130.

Core Jurisprudential Pillars:
- Challenge to Ultra Vires § 1631 Transfer: Contesting improper transfer from the Court of Federal Claims (COFC) where exclusive jurisdiction resided under 28 U.S.C. § 1491, creating an unconstitutional 'jurisdictional labyrinth'.
- Due Process & Illegal Exaction: Fifth Amendment property rights in statutory entitlements (*Board of Regents v. Roth*, *Mathews v. Eldridge*) and illegal exaction of liberty.
- ADA Title II & Gov-LLM Mandate: Establishing that court failure to provide cognitive accommodations (such as sovereign, post-quantum encrypted Gov-LLM AI interfaces) for disabled pro se litigants violates *Tennessee v. Lane* and constitutes digital segregation.
- Monell Liability: Patterns and practices of process-deficient removals by municipal sheriff departments without pre-deprivation hearings.
- In Forma Pauperis (IFP): Verified indigent debtor-in-possession status under 28 U.S.C. § 1915 and Maryland Rule 1-325(e).`,
    heroImage: '/assets/aistudio/HTD6Z_1__8e0f9e16.jpg',
    keyMetrics: [
      { label: 'Primary Fora', value: '5 Tiers', detail: 'SCOTUS, D.C. Cir, D.D.C., MD' },
      { label: 'Estate Claim', value: '$500M - $720M', detail: 'USEC 1999 Senior Notes vector' },
      { label: 'Statutory Bases', value: '28 U.S.C. § 1491', detail: 'Tucker Act & All Writs Act § 1651' },
      { label: 'Disability Ground', value: 'ADA Title II', detail: 'Gov-LLM cognitive prosthetic' },
    ],
    tags: ['SCOTUS', 'Tucker Act', 'Mandamus', 'ADA Title II', 'Tennessee v. Lane', 'Chapter 11 Subchapter V'],
    ttsNarrationText: `The Master Federal Appellate Mandamus consolidates constitutional claims across five judicial venues, including the Supreme Court of the United States and the District of Columbia Circuit. It challenges unauthorized transfers of Tucker Act claims, seeks the restoration of property assets held in federal custody, and establishes a precedent under Title Two of the Americans with Disabilities Act requiring courts to provide artificial intelligence cognitive accommodations for disabled pro se litigants.`,
    exhibits: [
      {
        id: 'ex-scotus-dc-pdf',
        title: 'Master Omnibus Federal Appellate Mandamus & D.C. Circuit Petition',
        type: 'pdf',
        filePath: '/assets/aistudio/documentSCOTUS-DC_f4e187b3.pdf',
        description: 'Full 20-page legal instrument detailing CUSIP re-identifiability proof, DYREO HJB equations, and BNY Mellon clearing directive.',
        badge: 'SCOTUS / D.C. Circuit Filing',
      },
      {
        id: 'ex-presentment-pdf',
        title: 'Master Presentment — Baltimore City, D.C. Circuit, SCOTUS',
        type: 'pdf',
        filePath: '/assets/aistudio/PRESENTMENT-BALTCITY-DC-SCOTUS_3473873d.pdf',
        description: 'Omnibus petition for writ of mandamus, direct protocol clearing order, and IFP motion in Case No. 24-C-26-003970.',
        badge: 'Master Presentment',
      },
      {
        id: 'ex-scotus-brief-pdf',
        title: 'Supreme Court Petition for Writ of Certiorari (25-4130)',
        type: 'pdf',
        filePath: '/assets/aistudio/document2_48641955.pdf',
        description: 'Certiorari petition challenging procedural defaults caused by neurocognitive disability and denial of ADA accommodations.',
        badge: 'Petition for Certiorari',
      },
      {
        id: 'ex-desk-itinerary-pdf',
        title: 'Downtown Baltimore In-Person Filing Itinerary',
        type: 'pdf',
        filePath: '/assets/aistudio/MandTCORPTRUSTITINERARY_cbfb22ce.pdf',
        description: 'Same-day desk hand-delivery reference slip and action guide for Baltimore City Circuit Court and M&T Bank Corporate Trust.',
        badge: 'Court Filing Protocol',
      },
    ],
    specifications: [
      { key: 'SCOTUS Docket', value: 'Original & Supervisory Mandamus (28 U.S.C. § 1651(a), Rule 20)' },
      { key: 'D.C. Circuit Docket', value: 'Case No. 24-10492 (Review & Mandamus)' },
      { key: 'D.D.C. Bankruptcy', value: 'In re Caustin Lee McLaughlin, Subchapter V Case No. 24-2383' },
      { key: 'Baltimore City Court', value: 'Case No. 24-C-26-003970 (Complex Commercial Equity)' },
      { key: 'Fourth Circuit Cases', value: 'Nos. 25-1222, 25-1224, 25-1522, and 25-4130' },
      { key: 'Statutory Cause 1', value: '28 U.S.C. § 1491 (Tucker Act Illegal Exaction)' },
      { key: 'Statutory Cause 2', value: '42 U.S.C. § 1983 (Civil Rights & Monell Municipal Liability)' },
      { key: 'Statutory Cause 3', value: '42 U.S.C. § 12131 (ADA Title II Court Access Accommodation)' },
    ],
    highlights: [
      'Engineered an unassailable constitutional theory treating government benefits and chose-in-action claims as protected property under the Fifth Amendment.',
      'Framed the Gov-LLM local AI system as a mandatory cognitive wheelchair ramp under Tennessee v. Lane.',
      'Uncovered systemic information-theoretic proof that SEC Form 13F filings re-identify noteholders, invalidating publication notice under Mullane and Mennonite.',
      'Designed multi-tier procedural filings verified under 28 U.S.C. § 1746 for simultaneous federal and state court presentment.',
    ],
  },
  {
    id: 'psdlef-sovereign-exchange',
    title: 'PSDLEF Sovereign Exchange Trust & ADR-31',
    subtitle: '31-Algorithm Execution Suite & Institutional Securities Settlement',
    category: 'finance',
    categoryLabel: 'Algorithmic Finance',
    date: 'September 2026',
    status: 'Settlement Directive Active',
    badgeColor: 'border-amber-500/40 text-amber-400 bg-amber-950/40',
    summary: 'A 31-algorithm quantitative execution engine for recovering, converting, and settling the $500M USEC 1999 Senior Notes into 45,850,000 LEU common shares with post-quantum security and continuous Merton HJB stochastic control.',
    fullOverview: `The Public Securities Depository & Ledger Exchange Framework (PSDLEF) Sovereign Exchange Trust establishes an institutional bridge between historical debt indentures, corporate reorganizations, and modern post-quantum digital asset settlement.

Core Pillars:
1. Reorganized Debt Settlement Vector:
   - On January 14, 1999, USEC Inc. (now Centrus Energy Corp., NYSE: LEU) issued $500,000,000 aggregate principal amount of Senior Notes: Series A ($350M 6.625% Due 2006, CUSIP 917300AA1) and Series B ($150M 6.750% Due 2009, CUSIP 917300AB9).
   - Under the Delaware Plan of Reorganization (Case No. 14-10492), Class 4 Allowed Unsecured Claims converted at a 0.0917 ratio into 45,850,000 LEU common shares.
   - Directed clearing through BNY Mellon DTC Participant clearing and Computershare Trust Company, N.A. transfer agent bridge into on-chain Bitcoin reserve vault (bc1q9f83b4ac1087e59871fa28419cb7891240c7) and M&T Bank Corporate Trust (ABA 022000046).
2. The ADR-31 Algorithm Execution Suite:
   - 31 algorithms organized across 10 functional modules: Bond Valuation (Algs 01-03), Asset Conversion (04-06), Volatility Modeling (07-09), Execution Optimization (10-12), Derivatives & Hedging (13-15), Risk Management (16-18), Yield Optimization (19-20), AMM & Liquidity (21-22), Treasury Management (23-27), and Safeguards (28-31).
3. Continuous-Time DYREO Stochastic Control:
   - Merton Hamilton-Jacobi-Bellman (HJB) partial differential equation allocating liquid yields across four pillars: 60% Treasury Equivalents, 25% Baltimore Rowhome Solar Microgrids, 10% ADA Litigant AI Grant Pool, and 5% Operational Reserves.
4. CUSIP Check-Digit & Maryland Comptroller Transfer:
   - Standardized 6-step protocol under Maryland Uniform Disposition of Abandoned Property Act (Md. Code Ann., Com. Law §§ 17-101 et seq.).`,
    heroImage: '/assets/aistudio/Reorganized_Debt_Settlement_Workflow_1__e595bfcf.png',
    keyMetrics: [
      { label: 'Debt Principal', value: '$500,000,000', detail: 'Series A ($350M) + Series B ($150M)' },
      { label: 'Reorganized Shares', value: '45,850,000 LEU', detail: 'Centrus Energy Corp (NYSE: LEU)' },
      { label: 'Conversion Ratio', value: '0.0917', detail: 'Per Delaware Reorganization Plan' },
      { label: 'Algorithm Suite', value: '31 Algs', detail: '10 modules: valuation to PQC' },
    ],
    tags: ['ADR-31', 'Centrus Energy', 'BNY Mellon', 'CUSIP 917300AA1', 'HJB Merton Control', 'DYREO'],
    ttsNarrationText: `The PSDLEF Sovereign Exchange Trust implements the thirty-one algorithm ADR execution suite for institutional securities clearing. It reconciles the five hundred million dollar nineteen ninety-nine senior notes of USEC Incorporated, converting them at a court confirmed zero point zero nine one seven ratio into forty-five point eight five million common shares of Centrus Energy Corporation. Yields are continuously allocated through Hamilton-Jacobi-Bellman stochastic control to sustain municipal clean energy microgrids and disabled pro se litigation funds.`,
    exhibits: [
      {
        id: 'ex-dag-workflow-img',
        title: '$500M Reorganized Debt Obligations: Complete DAG Settlement Workflow',
        type: 'image',
        filePath: '/assets/aistudio/Reorganized_Debt_Settlement_Workflow_1__e595bfcf.png',
        description: 'End-to-end directed acyclic graph from presentment trigger event through BNY Mellon clearing to DYREO yield sweep.',
        badge: 'Master DAG Architecture',
      },
      {
        id: 'ex-adr31-pdf',
        title: 'ADR Integrated Framework: 31-Algorithm Execution Suite',
        type: 'pdf',
        filePath: '/assets/aistudio/ADR_Integrated_Framework__31-Algorithm_Execution_Suite_bc534ff4.pdf',
        description: '26-page peer-reviewed scientific compendium with algebraic formulations, algorithms, and complexity proofs.',
        badge: 'Scientific Edition',
      },
      {
        id: 'ex-ssatrust-pdf',
        title: 'Perpetual Solvent Trust & Business-Organizational Plan',
        type: 'pdf',
        filePath: '/assets/aistudio/ssatrustplan_3a625b56.pdf',
        description: 'Comprehensive directed trust architecture, UDTA purpose structure, and S-EROI performance metrics.',
        badge: 'Solvent Trust Plan',
      },
      {
        id: 'ex-checkwrist-pdf',
        title: 'Executive Pre-Filing Checklist & In-Person Execution Protocol',
        type: 'pdf',
        filePath: '/assets/aistudio/prefright-checkwrist_859803b0.pdf',
        description: 'Verbatim court clerk and M&T Bank Corporate Trust onboarding scripts with notary perjury verification steps.',
        badge: 'Execution Protocol',
      },
    ],
    specifications: [
      { key: 'Initial Debt Indenture', value: 'USEC Inc. Jan 14, 1999 Senior Notes ($500M Total Principal)' },
      { key: 'Series A Tranche', value: '$350,000,000 @ 6.625% Due Jan 20, 2006 (CUSIP 917300AA1)' },
      { key: 'Series B Tranche', value: '$150,000,000 @ 6.750% Due Jan 20, 2009 (CUSIP 917300AB9)' },
      { key: 'Reorganized Entity', value: 'Centrus Energy Corp. (NYSE: LEU, Delaware Case 14-10492)' },
      { key: 'Settlement Ratio', value: '0.0917 Common Shares per $1.00 Unsecured Claim' },
      { key: 'Total Reorganized Shares', value: '45,850,000 LEU Common Shares' },
      { key: 'DYREO Allocation', value: '60% Treasuries / 25% Microgrid / 10% ADA Pool / 5% Reserves' },
      { key: 'On-Chain Reserve Vault', value: 'bc1q9f83b4ac1087e59871fa28419cb7891240c7' },
    ],
    highlights: [
      'Mathematically synthesized the exact $500,000,000 Senior Notes capital vector into 45,850,000 LEU equity allocations.',
      'Constructed complete 31-algorithm quantitative engine running in sub-linear O(n) and O(1) execution times.',
      'Engineered continuous-time HJB stochastic optimal control model directing dynamic yield sweeps into community solar microgrids.',
      'Established full post-quantum cryptographic security under NIST FIPS 203 (Kyber) and FIPS 204 (Dilithium).',
    ],
  },
  {
    id: 'baltimore-solar-microgrid',
    title: 'Baltimore Solar Microgrids & Woodlawn Canal 2100',
    subtitle: 'Municipal Infrastructure, Clean Transit & Floating PV Network',
    category: 'energy',
    categoryLabel: 'Clean Energy & Cities',
    date: '2026 - 2092 Master Plan',
    status: 'Civic Blueprint & Master Architecture',
    badgeColor: 'border-blue-500/40 text-blue-400 bg-blue-950/40',
    summary: 'A transformative urban renewal initiative combining 300 Baltimore rowhome rooftop solar-battery retrofits with a multi-modal navigable canal network connecting the Woodlawn SSA Campus to the Inner Harbor.',
    fullOverview: `This initiative merges distributed clean energy generation with civic waterborne mobility to revitalize West Baltimore and stabilize federal agency operations:
1. 300 Baltimore Rowhomes Solar Microgrid Initiative:
   - Retrofitting vacant and low-income municipal rowhomes with ~5 kW rooftop solar PV and ~10 kWh LFP Battery Energy Storage Systems (BESS) per home.
   - Scaled initial tranche: 30 pilot homes (150 kW solar, 300 kWh storage) expanding to 300 units.
   - Generates $12.6M to $18.9M in net Net Operating Income (NOI) through combined energy service tariffs and affordable housing leases.
   - Social Energy Return on Investment (S-EROI) threshold strictly enforced at >= 0.73 kWh/$ to guarantee utility cost reductions for residents.
2. Woodlawn SSA Campus Canal Terminal & Transit Corridor:
   - Conversion of obsolete highway corridors (e.g. US 40 / Edmondson Ave) into a navigable linear canal with electric passenger ferry and water taxi service.
   - Connects the Social Security Administration Woodlawn headquarters directly to Baltimore's Inner Harbor, Fells Point, and Fort McHenry.
   - Multi-megawatt floating solar photovoltaic arrays anchored on canal reservoirs, generating clean power while cooling panel substrates to boost efficiency.
   - Active hydraulic lock chambers (Locks 33-35) accommodating electric passenger vessels, maintenance barges, and intermodal freight at the Cascadia terminal.
   - Climate resilience parks with bio-filtration floating wetlands, public waterfront promenades, and zero-emission transit hubs.`,
    heroImage: '/assets/aistudio/4F5RN_1b65e4ed.jpg',
    keyMetrics: [
      { label: 'Pilot Rowhomes', value: '30 - 300 Homes', detail: '150 kW PV / 300 kWh BESS pilot' },
      { label: 'Annual Net NOI', value: '$12.6M - $18.9M', detail: 'Per 300-unit deployment tranche' },
      { label: 'S-EROI Benchmark', value: '≥ 0.73 kWh/$', detail: 'Social Energy Return on Investment' },
      { label: 'Canal Transit', value: 'Locks 33-35', detail: 'Electric ferry & water taxi network' },
    ],
    tags: ['Solar Microgrids', 'Woodlawn Canal 2100', 'BESS Storage', 'Urban Planning', 'S-EROI', 'Baltimore Infrastructure'],
    ttsNarrationText: `The Baltimore Solar Microgrid and Woodlawn Canal 2100 initiative models the sustainable transformation of urban infrastructure. By retrofitting rowhomes with rooftop photovoltaics and decentralized battery energy storage, the project generates self-sustaining net operating income while ensuring energy equity. Simultaneously, it reimagines the Woodlawn Social Security Administration campus as a waterborne transit hub linked by navigable locks, electric ferries, and multi-megawatt floating solar installations.`,
    exhibits: [
      {
        id: 'ex-canal-terminal-img',
        title: 'Woodlawn SSA Campus Canal Terminal & Locks Render',
        type: 'image',
        filePath: '/assets/aistudio/h1osi_c0d763f4.jpg',
        description: 'Twilight master rendering of the Woodlawn canal locks, passenger ferry, and floating solar array.',
        badge: 'Civic Master Plan',
      },
      {
        id: 'ex-woodlawn-spirit-img',
        title: 'SSA Campus Canal Pier: M/V Woodlawn Spirit',
        type: 'image',
        filePath: '/assets/aistudio/tIQSL_7170c5db.jpg',
        description: 'Waterfront pedestrian promenade, ferry boarding gates, and headquarters campus architecture.',
        badge: 'Transit Architecture',
      },
      {
        id: 'ex-edmondson-canal-img',
        title: 'US 40 Edmondson Avenue Rowhome Canal Transformation',
        type: 'image',
        filePath: '/assets/aistudio/z7jus_0d2ab6f3.jpg',
        description: 'Linear navigable canal with floating solar panels running alongside restored historic Baltimore rowhomes.',
        badge: 'Urban Renewal',
      },
      {
        id: 'ex-parking-pass-pdf',
        title: 'Downtown Baltimore Parking & Security Access Pass',
        type: 'pdf',
        filePath: '/assets/aistudio/BALTOPARKING-SEC-PASS_b9bace45.pdf',
        description: 'Screening specifications, parking garage coordinates, and fast-track security clearances for Baltimore municipal centers.',
        badge: 'Municipal Access Guide',
      },
    ],
    specifications: [
      { key: 'Microgrid Scale', value: '30 homes (Phase 1) → 300 homes (Phase 2) → 5,000 units (2029)' },
      { key: 'Rooftop Solar', value: '~5 kW monocrystalline PV per rowhome (~150 kW pilot total)' },
      { key: 'Energy Storage', value: '~10 kWh Lithium Iron Phosphate (LFP) BESS per unit (300 kWh pilot total)' },
      { key: 'Grid Architecture', value: 'Decentralized virtual power plant (VPP) with 24-hour islanding capability' },
      { key: 'Financial Metric', value: 'S-EROI ≥ 0.73 kWh/$ (Social Energy Return on Investment)' },
      { key: 'Canal Fleet', value: 'Electric passenger ferries (Woodlawn Spirit class) & autonomous water taxis' },
      { key: 'Water Reservoirs', value: 'Integrated floating solar PV with water-cooled cell efficiency boost' },
      { key: 'Civic Benefit', value: 'Direct utility cost reductions, stormwater mitigation, and rapid transit' },
    ],
    highlights: [
      'Designed self-financing municipal clean energy pilot generating $12.6M to $18.9M in net operating income.',
      'Replaced conventional highway gridlock with zero-emission waterborne transit connecting Woodlawn to Baltimore Harbor.',
      'Incorporated dual-purpose floating solar arrays that simultaneously generate power and reduce canal evaporative losses.',
      'Contractually anchored all revenues to the PSDLEF Purpose Trust to fund pro se legal aid in perpetuity.',
    ],
  },
];
