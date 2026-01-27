import { Search, Shield, Cpu, Bell, Calendar } from 'lucide-react';

export const navLinks = [
  { name: 'Research', href: '#products' },
  { name: 'Features', href: '#features' },
  { name: 'Reviews', href: '#reviews' },
  { name: 'FAQ', href: '#faq' },
];

export const features = [
  {
    title: 'Asset Screener',
    description: 'Optimize your watchlist and monitor the performance of hundreds of assets within a single window',
    icon: Search,
    color: 'text-blue-400'
  },
  {
    title: 'Wallet Tracking',
    description: 'Track on-chain asset flows from over 500+ of the top funds and traders',
    value: 'Valued by top quant firms',
    icon: Shield,
    color: 'text-green-400'
  },
  {
    title: 'Github Tracking',
    description: 'Front run announcements by tracking the public development of all major crypto protocols',
    icon: Cpu,
    color: 'text-purple-400'
  },
  {
    title: 'Global Alerts',
    description: 'Save time with our custom alert system covering hundreds of assets and custom watchlists',
    icon: Bell,
    color: 'text-yellow-400'
  },
  {
    title: 'Macroeconomic Alerts',
    description: 'Never miss another high impact economic release with real-time calendar data and alerts',
    icon: Calendar,
    color: 'text-red-400'
  }
];

export const productCategories = [
  {
    name: 'Asset selection',
    description: 'Aggregate and display only the most important market data with this multi-timeframe real-time asset screener',
    items: [
      { name: "MAT Asset Screener", description: "Aggregate and display only the most important market data with this multi-timeframe real-time asset screener" },
      { name: "MAT Ecosystem Spaghetti", description: "Monitor the returns of hundreds of assets in real-time against any comparison asset, from any anchor point or rolling time window" },
      { name: "MAT Range Positioning", description: "Track and identify outlying assets by their historical range positioning, enabling the recognition of trending sectors and ecosystems" },
      { name: "Asteroid Belt Screener", description: "Observe the market in relation to the dynamic trend strength Asteroids Belt indicator, reference for trend trading opportunities." }
    ]
  },
  {
    name: 'Mean reversion',
    description: 'Identify ideal mean reversion opportunities with the long-awaited revision of MAT’s most widely used public indicator',
    items: [
      { name: "MAT Reversion Bands v2", description: "Identify ideal mean reversion opportunities with the long-awaited revision of MAT’s most widely used public indicator" },
      { name: "MAT Pair Trading Index", description: "Visually simplify the relationship between two assets when searching for pair trades and higher beta opportunities" }
    ]
  },
  {
    name: 'Trend momentum',
    description: 'Effortlessly identify potential mean reversion opportunities and momentum changes across multiple time preferences',
    items: [
      { name: "MAT Quick Action Channel", description: "Effortlessly identify potential mean reversion opportunities and momentum changes across multiple time preferences" },
      { name: "Comet Coloring", description: "Trend coloring tool to provide clear signs of bullish, bearish, and exhausting momentum strength" },
      { name: "Asteroids Belt", description: "Providing a trend strength based dynamic support and resistance to give maximal opportunities in any conditions, trending or range based" }
    ]
  },
  {
    name: 'Order Flow',
    description: 'TPO profiling tool used by professional order flow traders, the most robust profile tool on Tradingview',
    items: [
      { name: "SpaceTime Remastered", description: "TPO profiling tool used by professional order flow traders, the most robust profile tool on Tradingview" },
      { name: "SpaceTime TPO", description: "Providing the additional TPO lettering breakdown in both the profile and highlighting a progressive value area" },
      { name: "SpaceTime Levels", description: "Highlighting the important TPO levels, a successor to the most popular key levels indicator on Tradingview with profile calculations" },
      { name: "SpaceTime Composites", description: "An interactive indicator allowing users to select their range for custom TPO profile composites" },
      { name: "DeltaPrint Candles", description: "The first and most effective intrabar delta data view, showing buy/sell pressure and highlighting imbalances" },
      { name: "Delta Bar Stats", description: "Delta values as a separate panel for important values including total/delta volume, delta POC and buy/sell volume aggregates" },
      { name: "DeltaPrint Singularity", description: "An easy to use delta ladder tool baked into the chart so users can see intrabar data for high probability trap locations" },
      { name: "OI Profile Pro", description: "The first fully fledged Open Interest profile, see the areas of interest by traders real time respective to price, including likely liquidation levels" },
      { name: "Net Positions +", description: "The most accurate view at global net longs/shorts positioning, identifying areas for squeezing opposition" }
    ]
  },
  {
    name: 'Price action',
    description: 'Display previous levels of interest that may signal range deviations, and reduce false midline trend changes by 40-60% across most assets',
    items: [
      { name: "MAT Donchain Suite", description: "Display previous levels of interest that may signal range deviations, and reduce false midline trend changes by 40-60% across most assets" }
    ]
  }
];

export const testimonials = [
  {
    name: 'Alex C.',
    role: 'Quant Researcher @ Citadel',
    handle: '@ac_quant',
    text: "MAT’s research suite is robust enough to be used as an entire trading system or as a modular add-on to your existing trading framework. Each indicator distills years of academic research and trading experience."
  },
  {
    name: 'Sarah L.',
    role: 'Portfolio Manager',
    handle: '@sarahtrades',
    text: "Truly a game changer. MAT’s suite has assisted me in adapting to new market conditions and opened up an array of new trading opportunities. Highly recommended for anyone in search of additional edge over the competition."
  }
];

export const pricingPlans = []; // Removed

export const faqs = [
  {
    question: 'Who is MAT?',
    answer: 'Michigan Algorithmic Trader (MAT) is a student-run organization at the University of Michigan dedicated to quantitative finance, algorithmic trading, and market research. We build tools, conduct research, and compete in trading competitions.'
  },
  {
    question: 'What do I need to use MAT tools?',
    answer: 'Our tools are primarily built for TradingView and Python. Members get exclusive access to our repository of indicators and research papers.'
  },
  {
    question: 'How do I join the club?',
    answer: 'Recruitment happens at the beginning of each semester. Check our website or Discord for application details. We look for students with strong backgrounds in mathematics, computer science, or finance.'
  },
  {
    question: 'Will MAT tools work with any market?',
    answer: 'Although our research often focuses on cryptocurrency and equities, most of our tools are asset-agnostic and work seamlessly with futures, forex, and other derivatives.'
  },
  {
    question: 'Will there be future updates?',
    answer: 'We are continually refining and adding to our product offering, including bringing on new partners with diverse indicator offerings. Our research team publishes new findings every semester.'
  },
  {
    question: 'Do I need a paid TradingView subscription?',
    answer: 'Our indicators are designed to be compatible with all TradingView plans, though some advanced features may benefit from higher-tier data feeds.'
  }
];
