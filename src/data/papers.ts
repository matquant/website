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
    title: "Comparative Analysis of Moving Average Crossover Strategies",
    author: "MAT Quant Division",
    description: "A deep dive into signal latency and false-positive frequencies in SMA vs EMA systems.",
    abstract: "This report investigates the efficacy of simple (SMA) versus exponential (EMA) moving average crossover systems. By reproducing historical performance metrics on high-beta equities, we examine the trade-offs between signal latency and false-positive frequencies in trending versus mean-reverting regimes.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Lissage_sinus_bruite_moyenne_glissante.svg/250px-Lissage_sinus_bruite_moyenne_glissante.svg.png",
    content: [
      {
        sectionTitle: "1. Introduction",
        paragraphs: [
          "Moving averages serve as the foundational building blocks for trend-following systems.",
          "This report focuses on the 50-day and 200-day 'Golden Cross' and 'Death Cross' signals."
        ]
      },
      {
        sectionTitle: "2. Visual Analysis",
        paragraphs: [
          "To understand the practical application, we observe the crossover behavior in real-time."
        ],
        chartSymbol: "NASDAQ:NVDA"
      }
    ]
  },
  {
    id: "template-v1",
    title: "[TEMPLATE] Academic Research Format",
    author: "MAT System",
    description: "The standard HTML template for all MAT research publications.",
    abstract: "This is a placeholder abstract. Researchers should copy this template to ensure consistent academic formatting across all publications.",
    imageUrl: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=800",
    content: [],
    rawHtml: `
      <h2 class="text-xl font-bold mb-4 font-sans border-b border-white/10 pb-2">1. Introduction</h2>
      <p class="mb-4 leading-relaxed text-gray-400">Insert introduction here. Use standard p tags for paragraphs.</p>
      
      <h2 class="text-xl font-bold mb-4 font-sans border-b border-white/10 pb-2">2. Methodology</h2>
      <p class="mb-4 leading-relaxed text-gray-400">Describe the quantitative approach.</p>
      
      <div class="bg-white/5 p-6 border-l-4 border-primary my-8 italic text-gray-300">
        "Quotes or key takeaways can be highlighted like this."
      </div>

      <h2 class="text-xl font-bold mb-4 font-sans border-b border-white/10 pb-2">3. Conclusion</h2>
      <p class="mb-4 leading-relaxed text-gray-400">Summarize findings and potential strategy applications.</p>
    `
  },
  {
    id: "bnn-meta-labeling-2026",
    title: "[IN PROGRESS] Bayesian Neural Network Meta-Labeling",
    author: "MAT Quant Division",
    description: "Probabilistic filtering of SMA crossovers using BNNs for uncertainty quantification.",
    abstract: "This strategy utilizes a secondary Bayesian Neural Network (BNN) acting as a binary filter to determine trade execution based on probabilistic certainty, grounding the Meta-Labeling framework established by Marcos López de Prado.",
    imageUrl: "/researcher_toolkit/Paper.html", // Using the HTML visual path as reference
    content: [
      {
        sectionTitle: "BNN Uncertainty Analysis",
        paragraphs: [
          "The primary model generates directional signals, while a secondary Bayesian Neural Network (BNN) acts as a sophisticated binary filter to determine trade execution based on probabilistic certainty.",
          "The BNN's predictive variance directly dictates capital allocation, effectively 'leaning in' to high-confidence trends while minimizing exposure during high-uncertainty periods."
        ],
        chartSymbol: "BNN_VISUAL"
      }
    ],
    rawHtml: `
<h2 class="text-xl font-bold mb-4 font-sans border-b border-white/10 pb-2">1. Introduction</h2>
<p class="mb-4 leading-relaxed text-gray-400">This strategy utilizes a 50-period and 200-period Simple Moving Average (SMA) crossover as the primary signal generator within the S&P 500 universe. The methodology is grounded in the <strong>Meta-Labeling</strong> framework, a concept formalized by <strong>Marcos López de Prado</strong> in his seminal text <em>Advances in Financial Machine Learning</em> (2018) and earlier explored in his paper <em>Quantitative Meta-Strategies</em> (2015). While the primary model generates binary directional signals (−1 or 1), the strategy employs a secondary machine learning model to filter these signals, acting as a "gatekeeper" that permits or rejects execution based on the probability of success.</p>

<p class="mb-4 leading-relaxed text-gray-400">Crucially, this strategy departs from standard deterministic classifiers by utilizing a <strong>Bayesian Neural Network (BNN)</strong>. This approach draws directly from the foundational work of <strong>David MacKay</strong> (<em>A Practical Bayesian Framework for Backpropagation Networks</em>, 1992) and <strong>Radford Neal</strong> (<em>Bayesian Learning for Neural Networks</em>, 1996). By treating network weights as probability distributions rather than fixed values, the BNN provides inherent uncertainty quantification, allowing the strategy to gauge the confidence of a trade signal without the need for extensive external calibration.</p>

<h2 class="text-xl font-bold mb-4 font-sans border-b border-white/10 pb-2">2. Methodology</h2>
<p class="mb-4 leading-relaxed text-gray-400">The strategy operates primarily on Daily bars, with ongoing experimentation on lower timeframes to refine entry precision. The execution logic is divided into two distinct stages:</p>

<ul class="list-disc pl-5 mb-4 text-gray-400 space-y-2">
<li><strong>Primary Signal (Trend):</strong> A standard SMA crossover (50/200) identifies the potential trend direction.</li>
<li><strong>Secondary Signal (Meta-Labeling):</strong> The BNN evaluates the state of the market to generate a binary decision (0 or 1) and an uncertainty metric.</li>
</ul>

<p class="mb-4 leading-relaxed text-gray-400"><strong>Feature Engineering:</strong> To facilitate this decision, the BNN ingests a robust feature set designed to capture market regime. This includes Volatility, Relative Strength Index (RSI), Volume profiles, and historical price action. Furthermore, the model incorporates <strong>S&P 500 Market Beta</strong> as a key feature, allowing the algorithm to distinguish between idiosyncratic stock strength and broad market uplifts.</p>

<p class="mb-4 leading-relaxed text-gray-400"><strong>Labeling & Regime Detection:</strong> The meta-labeling target is defined using a dynamic Triple Barrier Method. A trade is labeled as successful (1) if it achieves a profit target defined by a multiple of the local standard deviation (n⋅σ). This dynamic threshold is critical for the strategy's performance in "sideways" markets. In regimes of low volatility, the standard deviation decreases, tightening the profit targets. This allows the model to "scale in" and detect breakouts earlier than a fixed-target model would, effectively adapting its expectations to the subdued volatility environment.</p>

<div class="bg-white/5 p-6 border-l-4 border-primary my-8 italic text-gray-300">
"The BNN's primary utility in this framework is to assign low confidence (high uncertainty) to signals occurring in choppy, sideways market regimes, thereby filtering out the 'whipsaw' trades that typically degrade SMA performance."
</div>

<h2 class="text-xl font-bold mb-4 font-sans border-b border-white/10 pb-2">3. Conclusion</h2>
<p class="mb-4 leading-relaxed text-gray-400">Current backtesting is conducted with 100% position sizing to establish a performance baseline against the raw SMA strategy. The immediate goal is to validate that the BNN meta-labeler improves the risk-adjusted return by reducing the false positive rate of trend entries. Future development will leverage the unique probabilistic output of the BNN—specifically the predictive variance—to implement dynamic position sizing. In this proposed framework, capital allocation will be directly proportional to the model's confidence, increasing exposure in clear trends and reducing it in uncertain conditions.</p>
`
  }
];