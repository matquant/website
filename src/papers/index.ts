import type { ResearchPaper } from '../data/papers';
import { hrpOptimization } from './hrp-optimization';
import { maCrossover } from './ma-crossover';
import { denoising } from './denoising';

export const RESEARCH_PAPERS: ResearchPaper[] = [
  maCrossover,
  hrpOptimization,
  denoising,
];
