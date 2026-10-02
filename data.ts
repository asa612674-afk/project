import { TaskItem, MetricStat, HubLocation, DataFlowMetricPoint, FlowRadarMetric } from './types';

export const INITIAL_TASKS: TaskItem[] = [
  { id: 't1', name: 'Authentication', progress: 92, color: '#38bdf8', completed: false, category: 'Security' },
  { id: 't2', name: 'Payment Integration', progress: 76, color: '#0284c7', completed: false, category: 'FinTech' },
  { id: 't3', name: 'Dashboard', progress: 63, color: '#2563eb', completed: false, category: 'Analytics' },
  { id: 't4', name: 'API Development', progress: 49, color: '#6366f1', completed: false, category: 'Backend' },
  { id: 't5', name: 'Testing', progress: 32, color: '#a855f7', completed: false, category: 'QA' },
];

export const GLOBAL_HUBS: HubLocation[] = [
  { id: 'nyc', name: 'New York (US-East)', x: 28, y: 34, ping: 14, packets: 8420, status: 'optimal' },
  { id: 'lon', name: 'London (EU-West)', x: 48, y: 26, ping: 22, packets: 12100, status: 'optimal' },
  { id: 'fra', name: 'Frankfurt (EU-Central)', x: 52, y: 28, ping: 19, packets: 9800, status: 'active' },
  { id: 'tyo', name: 'Tokyo (AP-Northeast)', x: 84, y: 38, ping: 38, packets: 15400, status: 'optimal' },
  { id: 'sin', name: 'Singapore (AP-South)', x: 76, y: 56, ping: 31, packets: 6950, status: 'optimal' },
  { id: 'syd', name: 'Sydney (AU-East)', x: 88, y: 78, ping: 46, packets: 4200, status: 'active' },
  { id: 'sao', name: 'São Paulo (SA-East)', x: 34, y: 72, ping: 54, packets: 3800, status: 'syncing' },
];

export const TIMEFRAME_DATA: Record<'18h' | '12h' | '6h' | 'Now', {
  metrics: { accuracy: MetricStat; speed: MetricStat; risk: MetricStat };
  chartPoints: number[];
  growthBadge: string;
}> = {
  '18h': {
    metrics: {
      accuracy: { label: 'Accuracy', value: '96.4%', change: '+1.1%', isPositive: true },
      speed: { label: 'Processing Speed', value: '14.2s', change: '+24%', isPositive: true },
      risk: { label: 'Risk Reduction', value: '91.8%', change: '+12%', isPositive: true },
    },
    chartPoints: [35, 42, 38, 55, 60, 52, 68, 74, 70, 82],
    growthBadge: '+21% Growth',
  },
  '12h': {
    metrics: {
      accuracy: { label: 'Accuracy', value: '97.2%', change: '+1.8%', isPositive: true },
      speed: { label: 'Processing Speed', value: '13.5s', change: '+30%', isPositive: true },
      risk: { label: 'Risk Reduction', value: '93.0%', change: '+15%', isPositive: true },
    },
    chartPoints: [45, 52, 48, 62, 70, 65, 78, 85, 80, 90],
    growthBadge: '+25% Growth',
  },
  '6h': {
    metrics: {
      accuracy: { label: 'Accuracy', value: '98.1%', change: '+2.1%', isPositive: true },
      speed: { label: 'Processing Speed', value: '13.1s', change: '+33%', isPositive: true },
      risk: { label: 'Risk Reduction', value: '93.8%', change: '+17%', isPositive: true },
    },
    chartPoints: [55, 62, 58, 70, 78, 72, 84, 91, 88, 96],
    growthBadge: '+27% Growth',
  },
  'Now': {
    metrics: {
      accuracy: { label: 'Accuracy', value: '98.7%', change: '+2.4%', isPositive: true },
      speed: { label: 'Processing Speed', value: '12.8s', change: '+36%', isPositive: true },
      risk: { label: 'Risk Reduction', value: '94.2%', change: '+18%', isPositive: true },
    },
    chartPoints: [48, 65, 54, 72, 82, 76, 88, 96, 92, 98],
    growthBadge: '+28% Growth',
  },
};

export const STAGE_DETAILS = {
  understand: {
    id: 'understand',
    title: 'UNDERSTAND',
    subtitle: 'Requirements Intelligence',
    color: '#06b6d4',
    accentClass: 'text-cyan-400 border-cyan-400/40 bg-cyan-950/40',
    description: 'Deconstruct complex multi-format document streams, user utterances, and operational mandates with autonomous semantic comprehension.',
    features: [
      'Customer Insights',
      'Behavior Analysis',
      'Natural Language Processing',
      'Cross-Domain Knowledge Graphs',
      'Intent Disambiguation',
    ],
    sampleExtraction: {
      documentType: 'Master Service Agreement (MSA)',
      entitiesFound: 48,
      confidence: '99.4%',
      keyFields: [
        { key: 'Contract Term', value: '36 Months auto-renew' },
        { key: 'Liability Cap', value: '$5,000,000 USD' },
        { key: 'SLA Guarantee', value: '99.95% Availability' },
        { key: 'Data Residency', value: 'EU/EEA & US-East Isolation' },
      ],
    },
  },
  predict: {
    id: 'predict',
    title: 'PREDICT',
    subtitle: 'Resource & Risk Intelligence',
    color: '#f59e0b',
    accentClass: 'text-amber-400 border-amber-400/40 bg-amber-950/40',
    description: 'Anticipate supply chain bottlenecks, credit fluctuations, and computational demand spikes before they materialize.',
    features: [
      'Demand Forecasting',
      'Risk Detection',
      'Scenario Modeling',
      'Dynamic Resource Allocation',
      'Monte Carlo Risk Simulation',
    ],
    sampleExtraction: {
      documentType: 'Q4 Capital & Compute Projection',
      entitiesFound: 34,
      confidence: '98.8%',
      keyFields: [
        { key: 'Peak Concurrency', value: '142,000 req/sec' },
        { key: 'Forecasted Latency', value: '< 18ms p99' },
        { key: 'Risk Level', value: 'Low (0.04 probability of SLA breach)' },
        { key: 'Recommended Reserve', value: '+14 GPU Nodes' },
      ],
    },
  },
  validate: {
    id: 'validate',
    title: 'VALIDATE',
    subtitle: 'FlowLens AI',
    color: '#d946ef',
    accentClass: 'text-fuchsia-400 border-fuchsia-400/40 bg-fuchsia-950/40',
    description: 'Verify mathematical integrity, compliance constraints, and regulatory audits with zero hallucination guarantee.',
    features: [
      'Cross-Check Data',
      'Ensure Accuracy',
      'Deterministic Consensus Check',
      'Continuous Audit Checks',
      'Audit Trail Logging',
    ],
    sampleExtraction: {
      documentType: 'Audited Financial Ledger & SOC2 Proofs',
      entitiesFound: 82,
      confidence: '100%',
      keyFields: [
        { key: 'Discrepancies Flagged', value: '0 Critical, 1 Warning' },
        { key: 'Audit Pass Rate', value: '99.98%' },
        { key: 'Mathematical Parity', value: 'Balanced to 0.0001' },
        { key: 'Verification Signature', value: 'SHA-256 Validated' },
      ],
    },
  },
};

// Incoming Data Flow Time-Series Stream for Recharts Area Chart
export const INITIAL_DATA_FLOW_STREAM: DataFlowMetricPoint[] = [
  { time: '11:00', ingress: 7.4, egress: 5.2, anomalies: 0.4 },
  { time: '11:01', ingress: 8.1, egress: 5.9, anomalies: 0.6 },
  { time: '11:02', ingress: 7.8, egress: 5.4, anomalies: 0.3 },
  { time: '11:03', ingress: 9.3, egress: 6.8, anomalies: 0.7 },
  { time: '11:04', ingress: 8.6, egress: 6.2, anomalies: 0.4 },
  { time: '11:05', ingress: 10.2, egress: 7.5, anomalies: 0.8 },
  { time: '11:06', ingress: 9.7, egress: 7.1, anomalies: 0.5 },
  { time: '11:07', ingress: 11.4, egress: 8.4, anomalies: 0.3 },
  { time: '11:08', ingress: 10.9, egress: 8.0, anomalies: 0.2 },
];

// Multi-Vector Data Flow Radar Metrics for Recharts Radar Chart
export const FLOW_RADAR_METRICS: FlowRadarMetric[] = [
  { metric: 'Ingress Rate', value: 94, benchmark: 75, fullMark: 100 },
  { metric: 'Packet Integrity', value: 99, benchmark: 88, fullMark: 100 },
  { metric: 'Low Latency', value: 89, benchmark: 72, fullMark: 100 },
  { metric: 'Anomaly Filter', value: 96, benchmark: 80, fullMark: 100 },
  { metric: 'Vector Density', value: 86, benchmark: 68, fullMark: 100 },
  { metric: 'Throughput', value: 92, benchmark: 76, fullMark: 100 },
];
