import type { ResearchPaper } from '../data/papers';

import { maCrossover } from './ma-crossover';
import { hrpOptimization } from './hrp-optimization';
import { denoising } from './denoising';

export const RESEARCH_PAPERS: ResearchPaper[] = [
  maCrossover,
  hrpOptimization,

  denoising,
];
