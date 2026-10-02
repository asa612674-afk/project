import React, { useState } from 'react';
import { Activity, CheckCircle2, Circle, TrendingUp, Globe, Clock, ShieldCheck, Zap } from 'lucide-react';
import { TIMEFRAME_DATA, INITIAL_TASKS } from '../data';
import { TaskItem } from '../types';

interface RightSidebarWidgetsProps {
  onTaskClick?: (task: TaskItem) => void;
}

export const RightSidebarWidgets: React.FC<RightSidebarWidgetsProps> = ({ onTaskClick }) => {
  const [timeframe, setTimeframe] = useState<'18h' | '12h' | '6h' | 'Now'>('Now');
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);

  const activeData = TIMEFRAME_DATA[timeframe];

  const handleToggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(t => {
        if (t.id === id) {
          const newCompleted = !t.completed;
          return {
            ...t,
            completed: newCompleted,
            progress: newCompleted ? 100 : Math.max(20, t.progress - 10),
          };
        }
        return t;
      })
    );
  };

  return (
    <aside className="w-full max-w-[340px] sm:max-w-[360px] flex flex-col gap-4 z-20">
      {/* 1. LIVE PERFORMANCE CARD */}
      <div className="relative rounded-2xl bg-[#091124]/90 backdrop-blur-xl border border-cyan-500/30 p-4 shadow-[0_0_35px_rgba(6,182,212,0.15)] transition-all hover:border-cyan-400/50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white tracking-wide">Live Performance</h3>
          </div>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-[10px] font-mono text-emerald-400 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>Real-time</span>
          </div>
        </div>

        {/* 3 Metric Columns */}
        <div className="grid grid-cols-3 gap-2 text-center py-2 px-1 bg-[#060c1d]/70 rounded-xl border border-cyan-500/10 mb-3">
          {/* Accuracy */}
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-slate-400 font-medium">Accuracy</span>
            <span className="text-base font-bold text-white tracking-tight">{activeData.metrics.accuracy.value}</span>
            <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-0.5">
              <span>↑</span> {activeData.metrics.accuracy.change}
            </span>
          </div>

          {/* Processing Speed */}
          <div className="flex flex-col items-center border-x border-slate-800/80 px-1">
            <span className="text-[10px] text-slate-400 font-medium">Processing Speed</span>
            <span className="text-base font-bold text-white tracking-tight">{activeData.metrics.speed.value}</span>
            <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-0.5">
              <span>↑</span> {activeData.metrics.speed.change}
            </span>
          </div>

          {/* Risk Reduction */}
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-slate-400 font-medium">Risk Reduction</span>
            <span className="text-base font-bold text-white tracking-tight">{activeData.metrics.risk.value}</span>
            <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-0.5">
              <span>↑</span> {activeData.metrics.risk.change}
            </span>
          </div>
        </div>

        {/* Dynamic Chart Container */}
        <div className="relative w-full h-24 bg-[#050916]/80 rounded-xl border border-cyan-500/15 overflow-hidden p-2 flex flex-col justify-between">
          {/* Floating Growth Badge */}
          <div className="absolute top-2 right-2 z-10 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-blue-600/80 to-cyan-500/80 text-[10px] font-bold text-white shadow-[0_0_10px_rgba(6,182,212,0.5)]">
            <TrendingUp className="w-3 h-3 text-cyan-200" />
            <span>{activeData.growthBadge}</span>
          </div>

          {/* SVG Multi-Layer Gradient Wave */}
          <svg viewBox="0 0 300 80" className="w-full h-16 overflow-visible select-none">
            <defs>
              <linearGradient id="waveFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.5" />
                <stop offset="70%" stopColor="#2563eb" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="waveStroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>

            {/* Grid baseline */}
            <line x1="0" y1="75" x2="300" y2="75" stroke="#1e293b" strokeDasharray="3 3" />

            {/* Smooth SVG spline path */}
            <path
              d={`M 0,${80 - (activeData.chartPoints[0] * 0.7)}
                 C 30,${80 - (activeData.chartPoints[1] * 0.7)} 60,${80 - (activeData.chartPoints[2] * 0.7)} 90,${80 - (activeData.chartPoints[3] * 0.7)}
                 C 130,${80 - (activeData.chartPoints[4] * 0.7)} 160,${80 - (activeData.chartPoints[5] * 0.7)} 200,${80 - (activeData.chartPoints[6] * 0.7)}
                 C 230,${80 - (activeData.chartPoints[7] * 0.7)} 260,${80 - (activeData.chartPoints[8] * 0.7)} 300,${80 - (activeData.chartPoints[9] * 0.7)}
                 L 300,80 L 0,80 Z`}
              fill="url(#waveFill)"
            />
            <path
              d={`M 0,${80 - (activeData.chartPoints[0] * 0.7)}
                 C 30,${80 - (activeData.chartPoints[1] * 0.7)} 60,${80 - (activeData.chartPoints[2] * 0.7)} 90,${80 - (activeData.chartPoints[3] * 0.7)}
                 C 130,${80 - (activeData.chartPoints[4] * 0.7)} 160,${80 - (activeData.chartPoints[5] * 0.7)} 200,${80 - (activeData.chartPoints[6] * 0.7)}
                 C 230,${80 - (activeData.chartPoints[7] * 0.7)} 260,${80 - (activeData.chartPoints[8] * 0.7)} 300,${80 - (activeData.chartPoints[9] * 0.7)}`}
              fill="none"
              stroke="url(#waveStroke)"
              strokeWidth="2.5"
              className="drop-shadow-[0_0_8px_#06b6d4]"
            />

            {/* Active pulsing endpoint */}
            <circle
              cx="300"
              cy={80 - (activeData.chartPoints[9] * 0.7)}
              r="4"
              className="fill-cyan-300 drop-shadow-[0_0_8px_#22d3ee] animate-ping"
            />
            <circle
              cx="300"
              cy={80 - (activeData.chartPoints[9] * 0.7)}
              r="3.5"
              className="fill-white"
            />
          </svg>

          {/* Time axis buttons */}
          <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono px-1">
            {(['18h', '12h', '6h', 'Now'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-1.5 py-0.5 rounded transition-all ${
                  timeframe === t
                    ? 'text-cyan-300 font-bold bg-cyan-950/80 border border-cyan-500/40'
                    : 'hover:text-slate-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. PROJECT TASKS CARD */}
      <div className="relative rounded-2xl bg-[#091124]/90 backdrop-blur-xl border border-cyan-500/30 p-4 shadow-[0_0_35px_rgba(6,182,212,0.15)] transition-all hover:border-cyan-400/50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-lg bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current stroke-2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-white tracking-wide">Project Tasks</h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400">5 Active</span>
        </div>

        {/* Tasks List */}
        <div className="flex flex-col gap-2.5">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => {
                handleToggleTask(task.id);
                onTaskClick?.(task);
              }}
              className="group/task flex flex-col gap-1 cursor-pointer p-1.5 rounded-lg hover:bg-slate-800/40 transition-colors"
            >
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="focus:outline-none"
                    title={task.completed ? 'Mark incomplete' : 'Mark complete'}
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    ) : (
                      <Circle className="w-3.5 h-3.5 text-slate-500 group-hover/task:text-cyan-400 transition-colors" />
                    )}
                  </button>
                  <span
                    className={`font-medium transition-colors ${
                      task.completed ? 'line-through text-slate-500' : 'text-slate-200 group-hover/task:text-white'
                    }`}
                  >
                    {task.name}
                  </span>
                </div>
                <span className="text-[11px] font-mono font-bold text-cyan-300">
                  {task.progress}%
                </span>
              </div>

              {/* Progress bar track */}
              <div className="w-full h-1.5 bg-slate-900/90 rounded-full overflow-hidden border border-slate-800">
                <div
                  style={{
                    width: `${task.progress}%`,
                    backgroundColor: task.color,
                    boxShadow: `0 0 8px ${task.color}80`,
                  }}
                  className="h-full rounded-full transition-all duration-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. GLOBAL IMPACT CARD */}
      <div className="relative rounded-2xl bg-[#091124]/90 backdrop-blur-xl border border-cyan-500/30 p-4 shadow-[0_0_35px_rgba(6,182,212,0.15)] transition-all hover:border-cyan-400/50">
        <div className="flex items-center gap-2 mb-3">
          <Globe className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-bold text-white tracking-wide">Global Impact</h3>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2 rounded-xl bg-[#060c1d]/80 border border-cyan-500/10 flex flex-col items-center">
            <span className="text-base font-extrabold text-white tracking-tight">250+</span>
            <span className="text-[10px] text-slate-400 font-medium mt-0.5">Clients</span>
          </div>

          <div className="p-2 rounded-xl bg-[#060c1d]/80 border border-cyan-500/10 flex flex-col items-center">
            <span className="text-base font-extrabold text-cyan-300 tracking-tight">99.9%</span>
            <span className="text-[10px] text-slate-400 font-medium mt-0.5">Uptime</span>
          </div>

          <div className="p-2 rounded-xl bg-[#060c1d]/80 border border-cyan-500/10 flex flex-col items-center">
            <span className="text-base font-extrabold text-fuchsia-300 tracking-tight">1M+</span>
            <span className="text-[10px] text-slate-400 font-medium mt-0.5">Data Points</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
