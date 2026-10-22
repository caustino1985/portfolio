export type ProjectCategory = 
  | 'all'
  | 'neural'
  | 'genomics'
  | 'jurisprudence'
  | 'finance'
  | 'energy';

export interface ProjectExhibit {
  id: string;
  title: string;
  type: 'pdf' | 'image' | 'code' | 'docket';
  filePath: string;
  description: string;
  badge?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'neural' | 'genomics' | 'jurisprudence' | 'finance' | 'energy';
  categoryLabel: string;
  date: string;
  status: string;
  badgeColor: string;
  summary: string;
  fullOverview: string;
  heroImage?: string;
  keyMetrics: { label: string; value: string; detail?: string }[];
  tags: string[];
  ttsNarrationText: string;
  exhibits: ProjectExhibit[];
  specifications: { key: string; value: string }[];
  highlights: string[];
}
