import { Search, Shield, Cpu, BarChart3, Binary } from 'lucide-react';

export const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Research', href: '#research' },
  { name: 'FAQ', href: '#faq' },
];

export const features = [
  {
    title: 'Statistical Arbitrage',
    description: 'Developing mean-reversion systems and pair-trading models using high-frequency data and cointegration analysis.',
    icon: Search,
    color: 'text-blue-400'
  },
  {
    title: 'Machine Learning',
    description: 'Implementing LSTM and Transformer architectures for non-linear time-series prediction and regime detection.',
    icon: Binary,
    color: 'text-green-400'
  },
  {
    title: 'Strategy Reproduction',
    description: 'Translating academic whitepapers into functional Python code to verify alpha and signal decay in live markets.',
    icon: Cpu,
    color: 'text-purple-400'
  },
  {
    title: 'Risk Management',
    description: 'Utilizing Monte Carlo simulations and Kelly Criterion variants to optimize position sizing and drawdowns.',
    icon: Shield,
    color: 'text-yellow-400'
  },
  {
    title: 'Market Microstructure',
    description: 'Analyzing LOB (Limit Order Book) dynamics to understand liquidity provisioning and execution slippage.',
    icon: BarChart3,
    color: 'text-red-400'
  }
];

export const testimonials = [
  {
    name: 'Academic Advisory',
    role: 'Quantitative Finance Review',
    handle: '@mat_research',
    text: "The Michigan Algorithmic Traders group maintains a high standard of systematic rigor. Their focus on reproduction over 'black-box' promises is a breath of fresh air in the student-run quant space."
  },
  {
    name: 'Alumni Network',
    role: 'Incoming Quant @ Millennium',
    handle: '@umich_alumni',
    text: "Joining MAT was the single most impactful decision of my undergrad. The project-based approach to implementation prepared me for the technical reality of buyside desks."
  }
];

export const productCategories = []; // Cleared for publishing

export const partners = [
  {
    name: 'QuantConnect',
    url: 'https://www.quantconnect.com',
    logo: 'https://cdn.quantconnect.com/web/i/about/our-purpose/cta-section/cta-logo.svg',
  },
];

export const faqs = [
  {
    question: 'How do I join Michigan Algorithmic Traders?',
    answer: 'We operate on a rolling admissions basis rather than fixed recruitment cycles. Interested students should fill out our application form (linked in the footer) to schedule an interview. We look for candidates who are passionate about quantitative research and demonstrate strong problem-solving skills.'
  },
  {
    question: 'What technical skills are required?',
    answer: 'Applicants should have proficiency in Python. Familiarity with machine learning pipelines and algorithmic logic is a significant advantage. While we don\'t require prior finance experience, a strong mathematical foundation is essential.'
  },
  {
    question: 'What does the club actually do?',
    answer: 'MAT is a competitive research and trading organization focusing on Statistical Arbitrage, Risk Management, and Machine Learning. We produce high-rigor research papers and algorithmic strategies—standardized to professional formats—which we release publicly or utilize for our own internal trading development.'
  },
  {
    question: 'Do you participate in trading competitions?',
    answer: 'Yes, we are active participants in ongoing rolling competitions on QuantConnect and Numerai. These platforms provide a continuous benchmark for our strategies against global quantitative talent. In addition to these competitions, we also publish our findings and research papers directly here on our website for public review.'
  },
  {
    question: 'Is the club restricted by major or university?',
    answer: 'No. While we are based at the University of Michigan, MAT is open to students from colleges all over the United States. We value diverse perspectives and technical talent regardless of your major or home institution, as long as you have the aptitude to contribute to our research.'
  },
  {
    question: 'What is the time commitment?',
    answer: 'The commitment is project-dependent. Because our members work on complex research initiatives and competitive strategies, the workload varies based on the project\'s scope and your individual level of contribution.'
  }
];
