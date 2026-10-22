export interface AutoDiscoveryExperiment {
  id: number;
  datasetId: number;
  hypothesis: string;
  surprisal: number;
  beliefBefore: 'True' | 'Likely True' | 'Maybe True' | 'Uncertain' | 'Maybe False' | 'Likely False' | 'False' | 'N/A';
  beliefAfter: 'True' | 'Likely True' | 'Maybe True' | 'Uncertain' | 'Maybe False' | 'Likely False' | 'False' | 'N/A';
  direction: 'Positive' | 'Negative' | 'Neutral';
  isBookmarked: boolean;
  category: 'Dopaminergic' | 'Serotonergic' | 'Emerging Loci' | 'Pharmacogenetics' | 'Administrative Adjudication' | 'Neural Interfaces' | 'Cryptographic Integrity';
}

export const AUTO_DISCOVERY_SUMMARY = {
  totalExperiments: 897,
  meanSurprisal: 0.308,
  medianSurprisal: 0.285,
  stdDevSurprisal: 0.261,
  surprisalDecayCorrelation: -0.41,
  surprisalDecayPValue: '< 0.001',
  bayesianUpdateCorrelation: 0.53,
  positiveMeanSurprisal: 0.286,
  negativeMeanSurprisal: 0.484,
  neutralMeanSurprisal: 0.375,
  directionDistribution: {
    Positive: 240, // 26.8%
    Negative: 340, // 37.9%
    Neutral: 317,  // 35.3%
  },
  bookmarkedCount: 2,
};

export const SAMPLE_EXPERIMENTS: AutoDiscoveryExperiment[] = [
  {
    id: 42,
    datasetId: 1,
    hypothesis: 'The dopamine D4 receptor gene (DRD4) 7-repeat allele blunts intracellular cyclic AMP accumulation, manifesting as an impulsive response style on continuous performance tests.',
    surprisal: 0.180,
    beliefBefore: 'Likely True',
    beliefAfter: 'Likely True',
    direction: 'Negative',
    isBookmarked: true,
    category: 'Dopaminergic',
  },
  {
    id: 215,
    datasetId: 1,
    hypothesis: 'Constructive publication notice in commercial reorganization cases satisfies Fifth Amendment due process when beneficial debtholder CUSIP positions are publicly re-identifiable via SEC Form 13F filings.',
    surprisal: 0.698,
    beliefBefore: 'Uncertain',
    beliefAfter: 'Likely False',
    direction: 'Negative',
    isBookmarked: true,
    category: 'Administrative Adjudication',
  },
  {
    id: 1,
    datasetId: 1,
    hypothesis: 'Dopamine Transporter (DAT1 / SLC6A3) 3\' UTR 10-repeat VNTR increases cell-surface transporter density, causing rapid striatal synaptic clearance.',
    surprisal: 0.125,
    beliefBefore: 'Likely True',
    beliefAfter: 'Likely True',
    direction: 'Positive',
    isBookmarked: false,
    category: 'Dopaminergic',
  },
  {
    id: 14,
    datasetId: 1,
    hypothesis: 'Catechol-O-methyltransferase (COMT) Val158Met polymorphism modulates prefrontal working memory efficiency with Met homozygotes showing superior executive stability.',
    surprisal: 0.142,
    beliefBefore: 'Likely True',
    beliefAfter: 'Likely True',
    direction: 'Positive',
    isBookmarked: false,
    category: 'Dopaminergic',
  },
  {
    id: 56,
    datasetId: 1,
    hypothesis: 'Non-genetic optical neural stimulation at 1870 nm induces localized transient thermal gradients altering cell-membrane capacitance without viral vector transfection.',
    surprisal: 0.231,
    beliefBefore: 'Maybe True',
    beliefAfter: 'Likely True',
    direction: 'Positive',
    isBookmarked: false,
    category: 'Neural Interfaces',
  },
  {
    id: 79,
    datasetId: 1,
    hypothesis: 'ADGRL3 / LPHN3 intronic variants (rs2122642) correlate with clinical severity of ADHD across pediatric and adult cohorts with genome-wide significance.',
    surprisal: 0.194,
    beliefBefore: 'Uncertain',
    beliefAfter: 'Likely True',
    direction: 'Positive',
    isBookmarked: false,
    category: 'Emerging Loci',
  },
  {
    id: 104,
    datasetId: 1,
    hypothesis: 'Objective genomic biomarker panels (17-SNP risk locus) satisfy the five Daubert reliability criteria for establishing a medically determinable impairment under SSR 16-4p.',
    surprisal: 0.288,
    beliefBefore: 'Uncertain',
    beliefAfter: 'Maybe True',
    direction: 'Positive',
    isBookmarked: false,
    category: 'Administrative Adjudication',
  },
  {
    id: 152,
    datasetId: 2,
    hypothesis: 'First-In-First-Out (FIFO) disability queueing can be replaced by Locality-Sensitive Hashing (LSH) without violating statutory claimant fairness or generating demographic bias.',
    surprisal: 0.340,
    beliefBefore: 'Maybe True',
    beliefAfter: 'Likely True',
    direction: 'Positive',
    isBookmarked: false,
    category: 'Administrative Adjudication',
  },
  {
    id: 188,
    datasetId: 2,
    hypothesis: 'Graphene electrode substrates achieve electrochemical charge injection capacities exceeding 3.1 mC/cm2 while preserving biocompatibility equivalent to medical-grade silicone.',
    surprisal: 0.210,
    beliefBefore: 'Maybe True',
    beliefAfter: 'Likely True',
    direction: 'Positive',
    isBookmarked: false,
    category: 'Neural Interfaces',
  },
  {
    id: 231,
    datasetId: 2,
    hypothesis: 'Federal transfer orders under 28 U.S.C. § 1631 made in the absence of a jurisdictional defect in the original forum operate as ultra vires acts reviewable under the All Writs Act.',
    surprisal: 0.440,
    beliefBefore: 'Uncertain',
    beliefAfter: 'Likely True',
    direction: 'Positive',
    isBookmarked: false,
    category: 'Administrative Adjudication',
  },
  {
    id: 260,
    datasetId: 3,
    hypothesis: 'Continuous-time Hamilton-Jacobi-Bellman (HJB) stochastic control of municipal solar microgrid revenues yields a perpetual Social Energy Return on Investment (S-EROI) >= 0.73 kWh/$.',
    surprisal: 0.295,
    beliefBefore: 'Maybe True',
    beliefAfter: 'Likely True',
    direction: 'Positive',
    isBookmarked: false,
    category: 'Neural Interfaces',
  },
  {
    id: 295,
    datasetId: 3,
    hypothesis: 'The Nine-Report Integrity Layer (OSI-P) with NIST FIPS 204 ML-DSA-87 signatures provides cryptographically self-authenticating evidence bundles under Federal Rules of Evidence 902(13) and 902(14).',
    surprisal: 0.165,
    beliefBefore: 'Likely True',
    beliefAfter: 'Likely True',
    direction: 'Positive',
    isBookmarked: false,
    category: 'Cryptographic Integrity',
  },
];
