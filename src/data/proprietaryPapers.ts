import type { ResearchPaper } from './papers';

export const PROPRIETARY_PAPERS: ResearchPaper[] = [
  {
    id: 'alpha-miner',
    title: 'Alpha Miner',
    author: 'Quantitative Systems',
    description: 'Formulaic Alpha List featuring 3,626 quantitative alphas with live quality gates, fitness metrics, turnover checks, and in-book tracking.',
    abstract: 'An interactive quantitative alpha database tracking over 3,600 formulaic alphas across Public, Analyst, Mixed, and Proprietary data sources with live PnL and Sharpe tracking.',
    date: 'August 19, 2026',
    pdfUrl: '/alpha_list.html',
    content: [
      {
        sectionTitle: "Overview & Mining Methodology",
        paragraphs: [
          "Alpha Miner is MAT's proprietary quantitative alpha repository, tracking over 3,600 formulaic alpha signals generated across global equity universes.",
          "Signals are categorized by data source dependence into Public, Analyst consensus, Mixed multi-source, and internal Proprietary factor models. Each candidate alpha undergoes continuous backtest validation against automated quality gates."
        ]
      },
      {
        sectionTitle: "In-Book Quality Gates & Selection Criteria",
        paragraphs: [
          "To enter the production book, an alpha signal must satisfy all key performance constraints: Sharpe Ratio > 1.25, Fitness > 1.00, Daily Turnover between 1% and 70%, and Maximum Drawdown < 10%.",
          "Selected alphas are subjected to self-correlation and pairwise PnL orthogonality checks to ensure zero redundancy with existing portfolio factors."
        ]
      }
    ]
  }
];
