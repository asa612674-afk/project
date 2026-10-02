import React, { useState, useEffect } from 'react';
import { Search, X, Zap, ArrowRight, Brain, TrendingUp, ShieldCheck, Globe } from 'lucide-react';
import { PipelineStage, ActionTool, NavTab } from '../types';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: NavTab) => void;
  onSelectStage: (stage: PipelineStage) => void;
  onTriggerAction: (action: ActionTool) => void;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  isOpen,
  onClose,
  onSelectTab,
  onSelectStage,
  onTriggerAction,
}) => {
  const [query, setQuery] = useState('');

  // Keyboard shortcut listener (Escape to close, ⌘K to open)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickActions = [
    {
      label: 'Understand: Requirements Intelligence',
      desc: 'Customer insights, behavioral graphs, NLP semantic matching',
      icon: Brain,
      action: () => {
        onSelectStage('understand');
        onClose();
      },
    },
    {
      label: 'Predict: Resource & Risk Intelligence',
      desc: 'Demand forecasting, latency modeling, risk mitigation',
      icon: TrendingUp,
      action: () => {
        onSelectStage('predict');
        onClose();
      },
    },
    {
      label: 'Validate: FlowLens Accuracy & Consensus',
      desc: 'Cross-check data, audit trails, eliminate hallucination',
      icon: ShieldCheck,
      action: () => {
        onSelectStage('validate');
        onClose();
      },
    },
    {
      label: 'Live Telemetry Dashboard',
      desc: 'Inspect worldwide network latency and throughput',
      icon: Globe,
      action: () => {
        onSelectTab('dashboard');
        onClose();
      },
    },
  ];

  const filtered = quickActions.filter(
    (item) =>
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      item.desc.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl bg-[#091124] border border-cyan-500/50 rounded-2xl p-4 shadow-[0_0_50px_rgba(6,182,212,0.3)]">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-[#050916] border border-slate-700/80">
          <Search className="w-5 h-5 text-cyan-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search FlowLens AI intelligence commands, models, or views..."
            className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
            autoFocus
          />
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Results */}
        <div className="mt-3 divide-y divide-slate-800/80 max-h-80 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              No matching intelligence workflows found for "{query}".
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={item.action}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/60 transition-colors text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 group-hover:border-cyan-500/40 text-cyan-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {item.label}
                      </div>
                      <div className="text-[11px] text-slate-400">{item.desc}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                </button>
              );
            })
          )}
        </div>

        {/* Footer tips */}
        <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500 font-mono">
          <span>FlowLens Autonomous Kernel</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};
