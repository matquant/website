export interface ResearchPaper {
  id: string;
  title: string;
  author: string;
  description: string;
  abstract: string;
  imageUrl?: string;
  rawHtml?: string;
  content: {
    sectionTitle: string;
    paragraphs: string[];
    code?: string;
    chartSymbol?: string;
  }[];
}

export const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    id: "ma-crossover-2026",
    title: "[IN PROGRESS] Comparative Analysis of Moving Average Crossover Strategies",
    author: "MAT Quant Division",
    description: "A deep dive into signal latency and false-positive frequencies in SMA vs EMA systems.",
    abstract: "This report investigates the efficacy of simple (SMA) versus exponential (EMA) moving average crossover systems. By reproducing historical performance metrics on high-beta equities, we examine the trade-offs between signal latency and false-positive frequencies in trending versus mean-reverting regimes.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Lissage_sinus_bruite_moyenne_glissante.svg/250px-Lissage_sinus_bruite_moyenne_glissante.svg.png",
    content: [
      {
        sectionTitle: "Visual Analysis",
        paragraphs: [
          "To understand the practical application, we observe the crossover behavior in real-time."
        ],
        chartSymbol: "NASDAQ:NVDA"
      }
    ]
  },
  {
    id: "bnn-meta-labeling-2026",
    title: "[IN PROGRESS] Bayesian Neural Network Meta-Labeling",
    author: "MAT Quant Division",
    description: "Probabilistic filtering of SMA crossovers using BNNs for uncertainty quantification.",
    abstract: "This strategy utilizes a secondary Bayesian Neural Network (BNN) acting as a binary filter to determine trade execution based on probabilistic certainty.",
    content: [
      {
        sectionTitle: "BNN Uncertainty Analysis",
        paragraphs: [],
        chartSymbol: "BNN_VISUAL"
      }
    ]
  },
  {
    id: "hrp-optimization-2026",
    title: "[IN PROGRESS] Hierarchical Risk Parity Portfolio Optimization",
    author: "MAT Quant Division",
    description: "Recursive bisection and quasi-diagonalization of asset covariance matrices.",
    abstract: "This paper explores the Hierarchical Risk Parity (HRP) approach to portfolio construction. Unlike traditional Markowitz optimization, HRP does not require the inversion of the covariance matrix, making it robust to instability and providing superior risk-adjusted returns in highly correlated asset clusters.",
    rawHtml: `
<h2 class="text-xl font-bold mb-4 font-sans border-b border-white/10 pb-2">1. Introduction</h2>
<p class="mb-4 leading-relaxed text-gray-400"><strong>Status: Work In Progress</strong></p>
<p class="mb-4 leading-relaxed text-gray-400">This strategy employs a two-stage quantitative pipeline designed to decouple alpha generation from portfolio construction. The primary alpha engine is a <strong>Neural Network</strong> that predicts forward returns relative to the S&P 500 (SPY). Through our internal testing, we observed that Neural Networks significantly outperform traditional tree-based models. Specifically, we noted that while <strong>XGBoost</strong> and <strong>Random Forest</strong> models failed to generate statistically significant positive Information Coefficients (IC) due to a lack of complexity for this specific regime, Neural Networks successfully captured the non-linear dependencies required for cross-sectional alpha. This superiority stems from the ability of neural architectures to cross-sectionally compare data across an entire universe and different features simultaneously with much higher efficiency.</p>

<h2 class="text-xl font-bold mb-4 font-sans border-b border-white/10 pb-2">2. Methodology</h2>
<p class="mb-4 leading-relaxed text-gray-400"><strong>Data Pipeline & Feature Engineering:</strong>


The strategy selects a universe of liquid US equities (Price > $12, Dollar Volume > $10M, Market Cap > $10B). The Neural Network ingests a diverse feature set including:</p>
<ul class="list-disc pl-5 mb-4 text-gray-400 space-y-2">
<li><strong>Momentum & Mean Reversion:</strong> 5, 10, 20, 60, and 252-day momentum; distance from 50/200-day moving averages.</li>
<li><strong>Market Regime:</strong> SPY 20-day volatility and trend distance (Market Beta proxy).</li>
<li><strong>Sector Embeddings:</strong> One-hot encoded Morningstar sector codes to capture industry-specific variance.</li>
</ul>
<p class="mb-4 leading-relaxed text-gray-400"><strong>Dimensionality Reduction:</strong>


Before entering the Neural Network, features undergo Principal Component Analysis (PCA) (retaining 95% variance) to reduce noise and multicollinearity, although sector dummies are re-attached post-PCA to preserve categorical integrity.</p>
<p class="mb-4 leading-relaxed text-gray-400"><strong>Allocation (Hierarchical Risk Parity):</strong>


Post-ranking, the strategy allocates capital using HRP. This involves:</p>
<ol class="list-decimal pl-5 mb-4 text-gray-400 space-y-2">
<li><strong>Tree Clustering:</strong> Grouping stocks via Ward’s linkage method on the distance matrix.</li>
<li><strong>Quasi-Diagonalization:</strong> Reordering the covariance matrix so that similar assets are placed together.</li>
<li><strong>Recursive Bisection:</strong> Allocating weights inversely proportional to the variance of each cluster, moving down the tree from the top.</li>
</ol>

<div class="bg-white/5 p-6 border-l-4 border-primary my-8 italic text-gray-300">
"The HRP component specifically targets the 'cluster risk' inherent in ML predictions, ensuring that the algorithm does not accidentally leverage up on a single correlated factor (e.g., 'Long Tech') simply because the Neural Network ranked that sector high."
</div>

<h2 class="text-xl font-bold mb-4 font-sans border-b border-white/10 pb-2">3. Conclusion</h2>
<p class="mb-4 leading-relaxed text-gray-400">Initial walk-forward validation focuses on the stability of the Neural Network's Information Coefficient (IC) and the HRP's ability to reduce portfolio volatility compared to an Equal-Weight or Mean-Variance benchmark. Further testing is required to refine the link between the model's top rankings and the HRP universe selection.</p>
`,
    content: [
      {
        sectionTitle: "Hierarchical Correlation Structure",
        paragraphs: [],
        chartSymbol: "HRP_VISUAL"
      }
    ]
  }
];
