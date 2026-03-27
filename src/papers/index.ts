import type { ResearchPaper } from '../data/papers';
import { bnnMetaLabeling } from './bnn-meta-labeling';
import { hrpOptimization } from './hrp-optimization';
import { maCrossover } from './ma-crossover';

export const RESEARCH_PAPERS: ResearchPaper[] = [
  maCrossover,
  bnnMetaLabeling,
  hrpOptimization,
];
