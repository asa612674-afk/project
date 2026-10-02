export type NavTab = 'home' | 'features' | 'solutions' | 'dashboard' | 'resources' | 'about';

export type PipelineStage = 'understand' | 'predict' | 'validate';

export type ActionTool = 'extract' | 'compare' | 'detect';

export interface TaskItem {
  id: string;
  name: string;
  progress: number;
  color: string;
  completed: boolean;
  category: string;
}

export interface MetricStat {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
}

export interface DataPoint {
  time: string;
  value: number;
  baseline: number;
}

export interface HubLocation {
  id: string;
  name: string;
  x: number; // percentage on map
  y: number; // percentage on map
  ping: number;
  packets: number;
  status: 'active' | 'optimal' | 'syncing';
}

export interface DataFlowMetricPoint {
  time: string;
  ingress: number; // Inbound data flow GB/s
  egress: number;  // Outbound / processed flow GB/s
  anomalies: number; // Filtered anomaly noise rate
}

export interface FlowRadarMetric {
  metric: string;
  value: number; // Live metric score 0-100
  benchmark: number; // SLA standard 0-100
  fullMark: number;
}
