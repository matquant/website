import type { ResearchPaper } from '../data/papers';

export const hrpOptimization: ResearchPaper = {
  id: "hrp-optimization-2026-08-19",
  title: "A Cross Sectional Ranking System Using Neural Networks and Hierarchical Risk Parity",
  description: "A novel Machine Learning-based trading pipeline using a Neural Network for rank regression and Hierarchical Risk Parity for robust portfolio allocation.",
  author: "Daniel Paxton",
  date: "August 19, 2026",
  pdfUrl: "/papers/hrp_nn_2026_08_19.pdf",
  abstract: "This paper aims to showcase a novel Machine Learning-based trading pipeline using a Neural Network for rank regression and Hierarchical Risk Parity for robust portfolio allocation. We attempted to use a mean-based target framework with the log-relative returns of the S&P 500 for engineering our main features. This approach aims to isolate idiosyncratic information to utilize as features in our Neural Network.",
  content: [
    {
      sectionTitle: "Introduction",
      paragraphs: [
        "AI (specifically Gemini 3.1 Pro) was used to assist in the creation of the code for this project (first draft). However, the codebase has been thoroughly reviewed and reflects the thinking and design choices of the author.",
        "A common challenge in quantitative asset management is the separation of idiosyncratic risk and systemic risk. By utilizing features to model regimes and trend, we pursued a robust, risk-managed framework that extracts alpha from large-cap US equities.",
        "In highly efficient markets, like large-cap US equities, consistently outperforming the benchmark is difficult, especially when it comes to traditional machine learning methods. The objective of this research does not claim the discovery of a significant alpha source, however, the pipeline used can be repurposed in other asset classes or with different models.",
        "Our strategy employs a Neural Network regressor in order to learn the cross sectional relationships in stocks regarding their returns compared against the SPY. We then rank the model outputs. This is done by sorting the output of our neural network regressor and creating a basket of stocks of a designated length. Our rationale behind the use of Neural Networks is their ability to model complex nonlinear functions. In our use case, it may be important to have the information of the whole tradable universe in order to make predictions. Finally, we then feed the outputs of the Neural Network model into Hierarchical Risk Parity."
      ]
    },
    {
      sectionTitle: "Why the MLP-HRP Hybrid Structure?",
      paragraphs: [
        "If we were to equally weight the stocks ranked from our Neural Network, we would run into a major problem. If we were to equally rank these stocks, we cannot effectively diversify our portfolio. The job of the model is to see which stocks will outperform the SPY, relative to other stocks, and this can be skewed by many factors. This can create clusters in our model predictions that an equal weighting scheme will not diversify. For example our model may predict that the technology sector will outperform every other sector, thus predicting that technology stocks will outperform thus putting it in our portfolio. In addition, another problem arises, we assume that our regressor model will output higher numbers if it is more confident in a specific stock outperforming, and we should not treat this equally compared to the other stocks.",
        "Due to the complex nature of our Neural Network we expect a very small IC (Information Coefficient) when testing out of sample. That is expected and that makes our portfolio allocation model much more important. We can still extract a meaningful equity curve and take advantage of a small IC with an allocation model. It is very difficult to solve both problems efficiently at the same time. We chose to focus mainly on the first problem, that we may expose ourselves to high factor risk in an equal weighting model. We fix this by introducing a robust price aware machine learning model that trains on the correlation matrix of our portfolio basket, this is Hierarchical Risk Parity. This allocation model should be efficient enough to 'utilize' the information extracted from our Neural Network."
      ],
      chartSymbol: "HRP_VISUAL"
    },
    {
      sectionTitle: "Feature Engineering",
      paragraphs: [
        "In order to feed our neural network with quality features, we created a custom feature matrix with various volatility adjusted momentum indicators (brainstormed with the assistance of AI). When it comes to our cross sectional price ranking model, it makes sense to mostly use indicators that are based on individual momentum over trend indicators. However, we still utilize trend indicators in our feature matrix.",
        "One of the most common features in US equities for machine learning models is stock market returns. Due to the noisiness of such features, we define a set of standard deviation adjusted returns over the lookback periods n = {5, 20, 252} where we use a 20-day lookback for calculating the standard deviation for 5 and 20 day indicators. The 252 day lookback for returns utilizes a 60 day standard deviation. These serve as the short term and long term volatility adjusted returns indicators.",
        "When it comes to returns of assets, volatility regimes are crucial in determining anomalies. Volatility regimes are defined as a stable volatility over a given period. This can be calculated at the market level and at the individual series in our tradable universe. In order to estimate a break in the current regime we created the Volatility Ratio.",
        "As this ratio increases, we expect the underlying true regime to follow. Because of the nature of rolling features, it is expected that it will lag behind the true regime. We chose lookback periods of 20 and 60 in order to reduce noise and lag while still capturing the underlying regime shifts.",
        "In addition to our volatility features, we added additional features that calculate the normalized distance from our market benchmark, the SPY. This allows us to analyze the asset's behavior with respect to the overall market. Similarly we added a feature to capture over extensions and exhaustion of price movement.",
        "To capture industry based group behaviors, we utilize a one-hot encoded Morningstar Sector Code for each stock provided by Quantconnect. By one hot encoding the variables we are able to feed it into our neural network."
      ]
    },
    {
      sectionTitle: "Target Variable: Idiosyncratic Excess Returns",
      paragraphs: [
        "To ensure that the neural network is extracting cross sectional relationships rather than systematic relationships, we employ a cross sectional percentile ranking target that measures idiosyncratic excess returns. This approach attempts to solve the novel problem of using neural networks for raw price prediction.",
        "We must compute this for every timestep, and in our case we computed this for each day. To address the varying scales for different regimes, we assign percentiles to everything in our tradable universe depending on how much they outperformed the SPY. Higher percentile stocks indicate stocks that outperformed the SPY relative to the other stocks. This makes our target variable stationary without any preprocessing.",
        "This method ensures that the Neural Network does not have to worry about the magnitude of an asset's performance against our benchmark, but rather the relative cross sectional ranking in our tradable universe."
      ]
    },
    {
      sectionTitle: "Model Architecture",
      paragraphs: [
        "Our main predictive engine is a standard Neural Network. Given a dense selection of features, we must be meticulous with our preprocessing due to the low signal-to-noise ratio. We created this architecture with simplicity in mind.",
        "The model consists of two hidden layers with the following configurations:",
        "• Preprocessing: Principal Component Analysis with preserving 95% variance",
        "• Hidden Layer 1: 64 Neurons",
        "• Hidden Layer 2: 16 Neurons",
        "• Activation Function: Rectified Linear Unit (ReLU)",
        "• Optimization Algorithm: Adam (Adaptive Moment Estimation)",
        "• Maximum allowed iterations: 500 (This is to prevent overfitting)",
        "• Regularization (L2): 0.1. This term is the magnitude of the squared weights that are added to the loss function to prevent overfitting"
      ]
    },
    {
      sectionTitle: "Portfolio Allocation",
      paragraphs: [
        "The final stage of our model utilizes López de Prado’s Hierarchical Risk Parity (HRP) framework to perform capital allocation. After our Neural Network returns a top N rank of securities, we utilize HRP in order to safely determine weights. We chose HRP because it avoids the pitfalls of Mean-Variance Optimization by relying less on the covariance matrix of our assets.",
        "The algorithm computes a distance matrix based on the correlation matrix of the top N ranked assets from our Neural Network. With our distance matrix we use Ward Variance linkage in order to create a hierarchy. The Ward method is the most effective when it comes to creating more variance-uniform clusters.",
        "We iterate through each of our clusters to see which pairs we can merge in order to create the lowest variance cluster. The rationale behind this is that among the set of possible pairwise within-variance sums, we merge the cluster that will create the least variance, thus reducing the amount of variance in our portfolio when we allocate. Since this creates a hierarchy, we can assume that clusters share similar price behavior, potentially leading to groups that are influenced by the same factors.",
        "With our hierarchy structure, the final stage of this allocation algorithm is to assign weights to each asset. We assume that the sum of asset proportions adds to 1, indicating that we fully exhaust the budget. Rather than bisecting each branch, we ignore the splits in the dendrogram. We use the linkage algorithm to simply get a one-dimensional organized array of stock tickers.",
        "By recursively splitting the array in half and forming clusters, we allocate more capital to assets that are somewhat 'independent' from the other assets. López de Prado introduces an inverse variance weighting scheme, to further allocate to 'unique' stocks. This algorithm can now allocate stocks based off of their empirical variance and their relation to other stocks in the universe. The main benefit of HRP is the lack of an inverse covariance matrix, which tends to be extremely noisy.",
        "As the variance of one cluster rises, we allocate less of our capital to that cluster. This is performed over every asset from our Neural Network. After allocating our budget, we have created a risk parity across our asset clusters."
      ]
    },
    {
      sectionTitle: "Live Trading Rules & Results",
      paragraphs: [
        "Now that we have laid out the pipeline of our model, we must arrange a backtest to simulate trades on historical data. We aid this by creating a rolling window in which the model trains. We hope that instead of attempting to model the chaotic, individual nature of each asset in our universe, we can capture the cross sectional relationships of stocks, specifically being the most confident in our top N stocks.",
        "Utilizing the Quantconnect platform, we performed a backtest starting from 2010-01-01 to 2026-01-01. Our top N stocks was set to 30.",
        "Results: Sharpe Ratio of 0.518, Drawdown 26.5%, Loss Rate 44%, Win Rate 56%, Beta 0.84. With a starting equity of 100,000, the end equity was 5,584,894.84 over 10,213 orders.",
        "The Information Coefficient (IC) was used to measure the predictive power of our Neural Network. The IC gives us a score between -1 and 1, which specifically indicates the correlation between our predictions and the target variables."
      ]
    },
    {
      sectionTitle: "Conclusion",
      paragraphs: [
        "In this paper, we aimed to evaluate a Neural Network-HRP pipeline aimed at capturing a sort of synergy effect potentially producing alpha. While the results successfully generated an ample return when compared to a simple buy and hold strategy, the metrics are very similar. This gives us more insight into the pitfalls of rank based prediction in financial time series.",
        "With a beta of 0.84, our model failed to truly capture idiosyncratic risk; rather, our Neural Network was likely choosing non powerful signals, acting more like a random sampler of a specific industry. Since our beta is not far from 1, we can conclude that using a Neural Network in this type of pipeline can actually be detrimental to risk adjusted returns.",
        "Due to the nature of how our model selected which stocks to trade, no risk model will be able to diversify a concentrated tradable asset list. We can prove this by increasing our top N. If the results are similar, that must indicate that our asset selection model is choosing highly clustered stocks, making our risk model obsolete. Increasing our top N to 100 yielded a Sharpe of 0.457 and a Beta of 0.832, which is almost identical.",
        "Ultimately, we found that, although deep learning architectures possess the ability to map complex financial data, their predictions are unable to effectively model cross sectional idiosyncratic risk. When it comes to future models, it may be best to start with low parameter models in order to test for feature efficacy, then scale up from the baseline."
      ]
    }
  ]
};
