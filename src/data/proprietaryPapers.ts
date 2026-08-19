import type { ResearchPaper } from './papers';

export const PROPRIETARY_PAPERS: ResearchPaper[] = [
  {
    id: "mat-alpha-01-vpin-microstructure",
    title: "Order Flow Toxicity & VPIN Imbalance Execution Model",
    author: "MAT High-Frequency & Microstructure Desk",
    description: "Volume-Synchronized Probability of Toxicity (VPIN) combined with tick-level limit order book depth imbalance across CME Index Futures.",
    abstract: "This confidential whitepaper outlines the formulation, calibration, and live execution infrastructure of the MAT-ALPHA-01 signal. By estimating informed trader order flow toxicity in volume buckets rather than chronological clock time, the strategy anticipates adverse price moves 250ms-2.5s prior to traditional order book quote exhaustion. Backtested on 3 years of CME tick data with an annualized Sharpe ratio of 3.42.",
    imageUrl: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=800&q=80",
    pdfUrl: "/papers/placeholder.pdf",
    content: [
      {
        sectionTitle: "Microstructure Framework & Mathematical Formulation",
        paragraphs: [
          "Standard volume metrics fail during high volatility regimes due to clock-time clustering. We partition continuous trading days into constant volume slices V = Total_Volume / N_buckets, and compute the signed order imbalance using the Lee-Ready trade classification algorithm augmented with quote queue priority.",
          "The toxicity metric VPIN_t is calculated over a rolling window of n=50 volume buckets as VPIN = (Σ |V_tau^B - V_tau^S|) / (n * V). Extreme values (>95th percentile) trigger immediate execution spread widening and directional liquidity-taking sweeps on correlated ETF pairs."
        ],
        chartSymbol: "CME_MINI:ES1!"
      },
      {
        sectionTitle: "Execution Architecture & Latency Profile",
        paragraphs: [
          "Signals are evaluated on our dedicated low-latency FPGA pipeline with sub-microsecond tick processing. Orders are dispatched via FIX protocol directly to colocation cross-connects with dynamic maker-taker rebate routing.",
          "Live execution slippage is constrained within 0.4 ticks average across ES, NQ, and RTY futures contracts with strict max drawdown abort limits (-1.5% intraday stop)."
        ],
        code: `# MAT-ALPHA-01 VPIN Imbalance Estimator
import numpy as np
import pandas as pd

def compute_vpin(ticks_df, bucket_size=50000, window=50):
    """
    Computes Volume-Synchronized Probability of Toxicity (VPIN).
    """
    ticks_df['vol_cum'] = ticks_df['volume'].cumsum()
    ticks_df['bucket'] = (ticks_df['vol_cum'] // bucket_size).astype(int)
    
    # Calculate signed volume per bucket using tick rule
    bucket_summary = ticks_df.groupby('bucket').agg(
        buy_vol=('buy_volume', 'sum'),
        sell_vol=('sell_volume', 'sum'),
        total_vol=('volume', 'sum')
    )
    
    bucket_summary['order_imbalance'] = np.abs(bucket_summary['buy_vol'] - bucket_summary['sell_vol'])
    vpin_series = bucket_summary['order_imbalance'].rolling(window=window).sum() / (window * bucket_size)
    return vpin_series.dropna()`
      },
      {
        sectionTitle: "Production Performance & Risk Limits",
        paragraphs: [
          "Expected Sharpe: 3.42 | Maximum Historical Drawdown: -2.1% | Daily Turnover: 14.2x capital base.",
          "Capital Allocation: Up to $2.5M gross notional per sub-account with mandatory square-off at 15:55 EST."
        ]
      }
    ]
  },
  {
    id: "mat-alpha-02-transformer-volatility",
    title: "Multi-Regime Transformer-GARCH Volatility Surface Engine",
    author: "MAT Machine Learning & Derivatives Desk",
    description: "Deep temporal Transformer architecture with causal attention mechanisms for real-time implied volatility surface forecasting and delta-neutral options mispricing.",
    abstract: "A proprietary neural architecture combining multi-head causal attention with continuous-time GARCH jump-diffusion priors. The model ingests SPX and NDX options chain tick streams to reconstruct implied volatility smiles across 30 delta slices, executing high-Sharpe variance dispersion arbitrage against institutional liquidity providers.",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
    pdfUrl: "/papers/placeholder.pdf",
    content: [
      {
        sectionTitle: "Neural Architecture & Latent Space Dynamics",
        paragraphs: [
          "Traditional parametric volatility models (SABR, SVI) fail during rapid market regime shifts and liquidity shocks. Our hybrid model embeds the full continuous strike-maturity surface into a 128-dimensional latent manifold.",
          "Causal self-attention layers capture multi-horizon dependencies while an auxiliary physics-informed loss term penalizes static and dynamic arbitrage violations (calendar and butterfly spread conditions)."
        ],
        chartSymbol: "INDEX:SPX"
      },
      {
        sectionTitle: "Options Dispersion Trading & Delta Neutralization",
        paragraphs: [
          "The engine continuously identifies overvalued individual stock volatility relative to the index surface, structuring delta-hedged, gamma-controlled straddle baskets.",
          "Automated hedging rebalances delta exposures via underlying equity shares when absolute delta exceeds 0.05 per strategy lot."
        ],
        code: `# MAT-ALPHA-02 Surface Prediction Model Forward Pass
import torch
import torch.nn as nn

class VolatilitySurfaceTransformer(nn.Module):
    def __init__(self, d_model=128, nhead=8, num_layers=4):
        super().__init__()
        self.encoder_layer = nn.TransformerEncoderLayer(
            d_model=d_model, nhead=nhead, dim_feedforward=512, batch_first=True
        )
        self.transformer = nn.TransformerEncoder(self.encoder_layer, num_layers=num_layers)
        self.surface_head = nn.Linear(d_model, 30) # 30 delta/maturity surface points
        
    def forward(self, x, mask=None):
        features = self.transformer(x, mask=mask)
        surface_pred = self.surface_head(features[:, -1, :])
        return surface_pred`
      },
      {
        sectionTitle: "Performance & Stress Testing",
        paragraphs: [
          "Calmar Ratio: 3.15 | Annualized Return: 28.4% (net of slippage and execution costs) | Market Beta: 0.02.",
          "Stress tested against 2020 March COVID liquidity squeeze and August 2024 VIX spike with zero margin violations."
        ]
      }
    ]
  },
  {
    id: "mat-alpha-03-stat-arb-kalman",
    title: "Cointegration-Based Cross-Asset Statistical Arbitrage",
    author: "MAT Statistical Arbitrage Division",
    description: "Dynamic hedge ratio estimation with state-space Kalman filtering and Ornstein-Uhlenbeck mean-reversion boundary optimization across liquid US equities and sector ETFs.",
    abstract: "This strategy deploys automated Johansen cointegration tests across clustered asset graphs, dynamically updating cointegrating vectors in real-time using recursive Kalman Filters. Position entry and liquidation thresholds are analytically derived from the first passage time distribution of an estimated Ornstein-Uhlenbeck process.",
    imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80",
    pdfUrl: "/papers/placeholder.pdf",
    content: [
      {
        sectionTitle: "State-Space Kalman Filter & Dynamic Beta",
        paragraphs: [
          "Standard OLS rolling regressions suffer from lookback window bias and lag during market structural breaks. We model the cointegrating hedge ratio as a hidden state variable in a state-space system, updated via Kalman measurement and transition equations at every 1-minute bar.",
          "Residual spreads z_t = y_t - β_t * x_t are transformed into standardized z-scores with variance adjusted for instantaneous volatility."
        ],
        chartSymbol: "AMEX:SPY"
      },
      {
        sectionTitle: "Ornstein-Uhlenbeck Optimal Stopping",
        paragraphs: [
          "The mean-reverting spread dynamics are modeled as dX_t = θ(μ - X_t)dt + σ dW_t. Optimal exit and stop-loss boundaries are solved using Hamilton-Jacobi-Bellman (HJB) equations incorporating non-zero execution fees and borrow rates."
        ],
        code: `# MAT-ALPHA-03 Kalman Filter State-Space Tracking
import numpy as np

class KalmanHedgeRatio:
    def __init__(self, delta=1e-4, R_var=1e-3):
        self.delta = delta
        self.R = R_var
        self.state = np.zeros(2) # [intercept, beta]
        self.P = np.eye(2) * 1.0
        self.Q = self.delta / (1 - self.delta) * np.eye(2)
        
    def update(self, y, x):
        # State transition
        self.P = self.P + self.Q
        H = np.array([1.0, x])
        
        # Measurement update
        error = y - np.dot(H, self.state)
        S = np.dot(H, np.dot(self.P, H.T)) + self.R
        K = np.dot(self.P, H.T) / S
        
        self.state = self.state + K * error
        self.P = self.P - np.outer(K, np.dot(H, self.P))
        return self.state[1], error # Returns dynamic beta and spread`
      }
    ]
  },
  {
    id: "mat-alpha-04-smart-order-routing",
    title: "Limit Order Book Queue Position Estimation & Smart Order Routing (SOR)",
    author: "MAT Infrastructure & Quantitative Execution Group",
    description: "Hawkes point process modeling of order book cancellation cascades for queue priority preservation and adverse selection mitigation.",
    abstract: "Internal execution algorithm whitepaper detailing queue position estimation algorithms and multi-exchange smart order routing logic. Designed to minimize market impact and adverse selection across NASDAQ, NYSE, ARCA, and IEX venues for MAT's systematic trading strategies.",
    imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
    pdfUrl: "/papers/placeholder.pdf",
    content: [
      {
        sectionTitle: "Queue Position Probability Engine",
        paragraphs: [
          "When submitting passive limit orders at the National Best Bid/Offer (NBBO), the execution probability heavily depends on the order's relative queue position. We model order arrival and cancellation dynamics using multi-variate self-exciting Hawkes processes to track our estimated position behind existing queue depth.",
          "When cancellation cascades indicate high toxicity, orders are instantaneously cancelled or shifted to non-displayed IEX D-Limit orders."
        ],
        chartSymbol: "NASDAQ:QQQ"
      },
      {
        sectionTitle: "Slippage Benchmark & Venue Economics",
        paragraphs: [
          "Empirical deployment across 18 months resulted in a 3.8 bps reduction in aggregate execution slippage and a 94.2% passive fill rate, capturing maker rebates across inverted fee venues."
        ]
      }
    ]
  }
];
