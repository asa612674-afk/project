import React, { useState, useEffect } from 'react';
import { Globe2, Radio, Activity, ShieldCheck, Zap, Layers, ArrowUpRight } from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import { GLOBAL_HUBS, INITIAL_DATA_FLOW_STREAM, FLOW_RADAR_METRICS } from '../data';
import { HubLocation, DataFlowMetricPoint, FlowRadarMetric } from '../types';

interface RealTimeAnalyticsCardProps {
  onSelectHub?: (hub: HubLocation) => void;
}

type ViewMode = 'area' | 'radar' | 'map';

interface CustomAreaTooltipProps {
  active?: boolean;
  payload?: Array<{
    value?: number;
    dataKey?: string;
    name?: string;
    color?: string;
  }>;
  label?: string;
}

const CustomAreaTooltip: React.FC<CustomAreaTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#060c1d]/95 backdrop-blur-md px-3 py-2 rounded-lg border border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.3)] text-[11px] font-mono">
        <div className="text-slate-400 font-semibold mb-1 flex items-center justify-between gap-4">
          <span>TIME: {label}</span>
          <span className="text-[9px] px-1 py-0.2 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30">REAL-TIME</span>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5 text-cyan-300">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
              Ingress Flow:
            </span>
            <strong className="text-white font-bold">{payload[0]?.value?.toFixed(1)} GB/s</strong>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5 text-blue-400">
              <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_6px_#3b82f6]" />
              Verified Egress:
            </span>
            <strong className="text-white font-bold">{payload[1]?.value?.toFixed(1)} GB/s</strong>
          </div>
          {payload[2]?.value !== undefined && (
            <div className="flex items-center justify-between gap-4 text-[10px] text-amber-400 border-t border-slate-800 pt-0.5 mt-0.5">
              <span>Filtered Anomaly:</span>
              <span>{payload[2]?.value?.toFixed(2)} GB/s</span>
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
};

interface CustomRadarTooltipProps {
  active?: boolean;
  payload?: Array<{
    value?: number;
    name?: string;
  }>;
}

const CustomRadarTooltip: React.FC<CustomRadarTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#060c1d]/95 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.3)] text-[10px] font-mono">
        <div className="text-cyan-300 font-semibold mb-0.5">
          Live Stream: <strong className="text-white">{payload[0]?.value}%</strong>
        </div>
        {payload[1] && (
          <div className="text-indigo-300">
            SLA Baseline: <strong className="text-slate-300">{payload[1]?.value}%</strong>
          </div>
        )}
      </div>
    );
  }
  return null;
};

export const RealTimeAnalyticsCard: React.FC<RealTimeAnalyticsCardProps> = ({ onSelectHub }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('area');
  const [selectedHub, setSelectedHub] = useState<HubLocation>(GLOBAL_HUBS[0]);
  const [flowData, setFlowData] = useState<DataFlowMetricPoint[]>(INITIAL_DATA_FLOW_STREAM);
  const [radarData, setRadarData] = useState<FlowRadarMetric[]>(FLOW_RADAR_METRICS);
  const [frequencies, setFrequencies] = useState<number[]>([40, 65, 30, 85, 45, 95, 70, 55, 80, 60, 90, 75, 50, 85, 65, 92, 48, 70]);

  // Live incoming data stream simulation
  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Advance data flow stream
      setFlowData(prev => {
        const last = prev[prev.length - 1];
        const [hour, minute] = last.time.split(':').map(Number);
        const nextMin = (minute + 1) % 60;
        const nextHour = nextMin === 0 ? (hour + 1) % 24 : hour;
        const timeStr = `${String(nextHour).padStart(2, '0')}:${String(nextMin).padStart(2, '0')}`;
        
        // Random fluctuation around ~10 GB/s ingress and ~7.5 GB/s egress
        const ingress = Math.max(6.5, Math.min(13.8, Number((last.ingress + (Math.random() - 0.48) * 1.8).toFixed(1))));
        const egress = Math.max(4.5, Math.min(ingress * 0.85, Number((last.egress + (Math.random() - 0.48) * 1.4).toFixed(1))));
        const anomalies = Number((Math.random() * 0.6 + 0.1).toFixed(2));

        const nextPoint: DataFlowMetricPoint = {
          time: timeStr,
          ingress,
          egress,
          anomalies,
        };

        return [...prev.slice(1), nextPoint];
      });

      // 2. Micro-fluctuate radar metrics
      setRadarData(prev =>
        prev.map(item => ({
          ...item,
          value: Math.min(100, Math.max(78, Math.round(item.value + (Math.random() - 0.5) * 4))),
        }))
      );

      // 3. Fluctuate bottom frequency sparkline
      setFrequencies(prev =>
        prev.map(v => {
          const delta = (Math.random() - 0.48) * 16;
          return Math.min(100, Math.max(20, Math.round(v + delta)));
        })
      );
    }, 2400);

    return () => clearInterval(interval);
  }, []);

  const latestPoint = flowData[flowData.length - 1] || { ingress: 10.9, egress: 8.0, anomalies: 0.2 };

  return (
    <div className="relative group w-full max-w-[340px] sm:max-w-[360px] rounded-2xl bg-[#091124]/90 backdrop-blur-xl border border-cyan-500/30 p-4 shadow-[0_0_35px_rgba(6,182,212,0.15)] transition-all duration-300 hover:border-cyan-400/60 hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] select-none">
      {/* Subtle outer neon accent */}
      <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

      {/* Header */}
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <h3 className="text-sm font-bold text-white tracking-wide">Real-Time Analytics</h3>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-[10px] font-mono text-cyan-300">
          <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
          <span>LIVE STREAM</span>
        </div>
      </div>

      {/* View Mode Toggle Controls */}
      <div className="flex items-center justify-between gap-1 p-1 bg-[#060c1d]/90 rounded-xl border border-cyan-500/20 mb-3 text-[11px] font-medium">
        <button
          id="toggle-area-chart-btn"
          onClick={() => setViewMode('area')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1 px-2 rounded-lg transition-all ${
            viewMode === 'area'
              ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-400/40 shadow-[0_0_12px_rgba(6,182,212,0.3)] font-semibold'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
          title="Visualize Incoming Data Flow as Recharts Area Chart"
        >
          <Activity className="w-3.5 h-3.5 text-cyan-400" />
          <span>Flow Area</span>
        </button>

        <button
          id="toggle-radar-chart-btn"
          onClick={() => setViewMode('radar')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1 px-2 rounded-lg transition-all ${
            viewMode === 'radar'
              ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-400/40 shadow-[0_0_12px_rgba(6,182,212,0.3)] font-semibold'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
          title="Visualize Flow Metrics as Recharts Multi-Axis Radar Chart"
        >
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          <span>Radar Matrix</span>
        </button>

        <button
          id="toggle-map-view-btn"
          onClick={() => setViewMode('map')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1 px-2 rounded-lg transition-all ${
            viewMode === 'map'
              ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-400/40 shadow-[0_0_12px_rgba(6,182,212,0.3)] font-semibold'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
          title="Global Server Node Ping Map"
        >
          <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
          <span>Global Hubs</span>
        </button>
      </div>

      {/* Main Visualization Canvas Container */}
      <div className="relative w-full h-44 bg-[#060c1d]/90 rounded-xl border border-cyan-500/20 overflow-hidden flex flex-col justify-center">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0ea5e90d_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e90d_1px,transparent_1px)] bg-[size:14px_14px] pointer-events-none" />

        {/* 1. RECHARTS AREA CHART VIEW */}
        {viewMode === 'area' && (
          <div className="w-full h-full p-2 flex flex-col justify-between">
            {/* Chart Legend / Floating Metric Bar */}
            <div className="flex items-center justify-between text-[10px] font-mono px-1 z-10">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-cyan-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  Inbound: <strong className="text-white">{latestPoint.ingress.toFixed(1)} GB/s</strong>
                </span>
                <span className="flex items-center gap-1 text-blue-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Verified: <strong className="text-slate-200">{latestPoint.egress.toFixed(1)} GB/s</strong>
                </span>
              </div>
              <span className="text-emerald-400 font-semibold flex items-center gap-0.5">
                <ArrowUpRight className="w-3 h-3" /> +4.2%
              </span>
            </div>

            {/* Recharts Area Component */}
            <div className="w-full h-[120px] min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={flowData}
                  margin={{ top: 8, right: 6, left: -26, bottom: -4 }}
                >
                  <defs>
                    <linearGradient id="ingressFlowGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.65} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.02} />
                    </linearGradient>
                    <linearGradient id="egressFlowGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="time"
                    stroke="#475569"
                    tick={{ fill: '#64748b', fontSize: 9 }}
                    axisLine={{ stroke: '#1e293b' }}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="#475569"
                    tick={{ fill: '#64748b', fontSize: 8 }}
                    axisLine={false}
                    tickLine={false}
                    domain={[0, 15]}
                  />
                  <RechartsTooltip content={<CustomAreaTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="ingress"
                    name="Inbound Flow"
                    stroke="#06b6d4"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#ingressFlowGrad)"
                    activeDot={{ r: 4, fill: '#ffffff', stroke: '#06b6d4', strokeWidth: 2 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="egress"
                    name="Verified Flow"
                    stroke="#3b82f6"
                    strokeWidth={1.5}
                    fillOpacity={1}
                    fill="url(#egressFlowGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* 2. RECHARTS RADAR CHART VIEW */}
        {viewMode === 'radar' && (
          <div className="w-full h-full p-1 flex flex-col items-center justify-center">
            <div className="w-full flex items-center justify-between px-2 text-[10px] font-mono z-10">
              <span className="text-cyan-300 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                Live Metric Profile
              </span>
              <span className="text-indigo-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                SLA Standard
              </span>
            </div>

            <div className="w-full h-[140px] min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                  data={radarData}
                  cx="50%"
                  cy="50%"
                  outerRadius="72%"
                >
                  <PolarGrid stroke="#0ea5e925" />
                  <PolarAngleAxis
                    dataKey="metric"
                    tick={{ fill: '#94a3b8', fontSize: 8 }}
                  />
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 100]}
                    stroke="#334155"
                    tick={{ fill: '#64748b', fontSize: 7 }}
                  />
                  <RechartsTooltip content={<CustomRadarTooltip />} />
                  <Radar
                    name="Live Stream"
                    dataKey="value"
                    stroke="#06b6d4"
                    strokeWidth={2}
                    fill="#06b6d4"
                    fillOpacity={0.35}
                  />
                  <Radar
                    name="SLA Standard"
                    dataKey="benchmark"
                    stroke="#6366f1"
                    strokeWidth={1.5}
                    strokeDasharray="2 2"
                    fill="#6366f1"
                    fillOpacity={0.12}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* 3. GLOBAL NODE PING MAP VIEW */}
        {viewMode === 'map' && (
          <div className="relative w-full h-full">
            {/* World Map Vector Path */}
            <svg viewBox="0 0 1000 500" className="absolute inset-0 w-full h-full opacity-65 p-2 select-none">
              <defs>
                <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.6" />
                </linearGradient>
              </defs>

              {/* Continents */}
              <path d="M150 90 L220 70 L280 90 L310 130 L270 170 L240 220 L210 240 L180 200 L140 180 L120 130 Z" fill="url(#mapGradient)" stroke="#0ea5e9" strokeWidth="1.5" strokeOpacity="0.5" />
              <path d="M260 250 L320 270 L340 330 L300 410 L270 420 L250 350 L240 290 Z" fill="url(#mapGradient)" stroke="#0ea5e9" strokeWidth="1.5" strokeOpacity="0.5" />
              <path d="M460 100 L530 90 L560 130 L520 170 L480 180 L450 140 Z" fill="url(#mapGradient)" stroke="#0ea5e9" strokeWidth="1.5" strokeOpacity="0.5" />
              <path d="M470 190 L540 190 L580 260 L540 360 L490 340 L450 250 Z" fill="url(#mapGradient)" stroke="#0ea5e9" strokeWidth="1.5" strokeOpacity="0.5" />
              <path d="M570 90 L750 80 L840 140 L810 230 L720 240 L640 200 L560 140 Z" fill="url(#mapGradient)" stroke="#0ea5e9" strokeWidth="1.5" strokeOpacity="0.5" />
              <path d="M780 300 L860 300 L870 370 L800 380 L760 340 Z" fill="url(#mapGradient)" stroke="#0ea5e9" strokeWidth="1.5" strokeOpacity="0.5" />

              {/* Connections */}
              <path d="M280 130 Q 380 90 490 120" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 4" className="animate-pulse" />
              <path d="M490 120 Q 640 90 790 140" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 4" />
            </svg>

            {/* Clickable Hub Nodes */}
            {GLOBAL_HUBS.map((hub) => {
              const isSelected = selectedHub.id === hub.id;
              return (
                <button
                  key={hub.id}
                  onClick={() => {
                    setSelectedHub(hub);
                    onSelectHub?.(hub);
                  }}
                  style={{ left: `${hub.x}%`, top: `${hub.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group/node focus:outline-none"
                  title={`${hub.name} - Ping: ${hub.ping}ms`}
                >
                  <div className="relative flex items-center justify-center">
                    <span
                      className={`absolute w-4 h-4 rounded-full ${
                        isSelected ? 'bg-cyan-400 animate-ping opacity-80' : 'bg-blue-400/40'
                      }`}
                    />
                    <span
                      className={`relative w-2 h-2 rounded-full border ${
                        isSelected
                          ? 'bg-white border-cyan-400 shadow-[0_0_10px_#22d3ee]'
                          : 'bg-cyan-400 border-cyan-200'
                      }`}
                    />
                  </div>
                </button>
              );
            })}

            {/* Floating Tooltip */}
            <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded-lg border border-cyan-500/30 text-[10px]">
              <span className="text-cyan-300 font-semibold truncate">{selectedHub.name}</span>
              <div className="flex items-center gap-2 font-mono">
                <span className="text-slate-400">RTT: <strong className="text-emerald-400">{selectedHub.ping}ms</strong></span>
                <span className="text-slate-400">Flow: <strong className="text-white">{selectedHub.packets.toLocaleString()} p/s</strong></span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Metric Telemetry Row */}
      <div className="grid grid-cols-3 gap-2 mt-3 text-center py-2 px-1 bg-[#060c1d]/70 rounded-xl border border-cyan-500/15">
        <div className="flex flex-col items-center">
          <span className="text-[9px] text-slate-400 font-mono uppercase">Inbound Rate</span>
          <span className="text-xs font-bold text-cyan-300 font-mono tracking-tight">{latestPoint.ingress.toFixed(1)} GB/s</span>
          <span className="text-[9px] text-emerald-400 font-medium font-mono">Active</span>
        </div>

        <div className="flex flex-col items-center border-x border-slate-800 px-1">
          <span className="text-[9px] text-slate-400 font-mono uppercase">Avg Latency</span>
          <span className="text-xs font-bold text-white font-mono tracking-tight">{selectedHub.ping}ms</span>
          <span className="text-[9px] text-cyan-400 font-medium font-mono">Optimal</span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-[9px] text-slate-400 font-mono uppercase">Integrity</span>
          <span className="text-xs font-bold text-emerald-300 font-mono tracking-tight">99.98%</span>
          <span className="text-[9px] text-emerald-400 font-medium font-mono">SHA-256</span>
        </div>
      </div>

      {/* Bottom Throughput Equalizer Sparkline */}
      <div className="mt-2.5">
        <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1 font-mono">
          <span className="flex items-center gap-1 text-slate-400">
            <Layers className="w-3 h-3 text-cyan-400" />
            PACKET THROUGHPUT
          </span>
          <span className="text-cyan-400 font-semibold">{latestPoint.ingress.toFixed(2)} GB/s</span>
        </div>
        <div className="h-6 flex items-end justify-between gap-[2px] px-1 bg-[#060c1d]/60 rounded-lg p-1 border border-cyan-500/10">
          {frequencies.map((val, idx) => (
            <div
              key={idx}
              style={{ height: `${val}%` }}
              className="flex-1 rounded-sm bg-gradient-to-t from-blue-700 via-cyan-500 to-cyan-300 transition-all duration-500 shadow-[0_0_4px_rgba(6,182,212,0.4)]"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
