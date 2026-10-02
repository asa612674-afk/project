import React, { useState } from 'react';
import {
  X,
  Brain,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  Sparkles,
  ExternalLink,
  Layers,
  Activity,
  ArrowRight
} from 'lucide-react';
import { PipelineStage, ActionTool } from '../types';
import { STAGE_DETAILS } from '../data';

interface FeatureDetailsModalProps {
  stage: PipelineStage | null;
  onClose: () => void;
  onSelectStage: (stage: PipelineStage) => void;
  onTriggerAction?: (action: ActionTool) => void;
  onOpenCombinedWorkflow?: () => void;
}

export const FeatureDetailsModal: React.FC<FeatureDetailsModalProps> = ({
  stage,
  onClose,
  onSelectStage,
  onTriggerAction,
  onOpenCombinedWorkflow,
}) => {
  const [copied, setCopied] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);

  if (!stage) return null;

  const currentData = STAGE_DETAILS[stage];

  const stageThemes = {
    understand: {
      border: 'border-cyan-500/40',
      badge: 'bg-cyan-950/80 border-cyan-400/50 text-cyan-300',
      shadow: 'shadow-[0_0_50px_rgba(6,182,212,0.35)]',
      glowBg: 'bg-cyan-500/10',
      icon: Brain,
      color: 'text-cyan-400',
      btnGrad: 'from-blue-600 to-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.5)]',
      accentText: 'text-cyan-300',
      accentCheck: 'text-cyan-400',
    },
    predict: {
      border: 'border-amber-500/40',
      badge: 'bg-amber-950/80 border-amber-400/50 text-amber-300',
      shadow: 'shadow-[0_0_50px_rgba(245,158,11,0.35)]',
      glowBg: 'bg-amber-500/10',
      icon: TrendingUp,
      color: 'text-amber-400',
      btnGrad: 'from-amber-600 to-orange-500 shadow-[0_0_20px_rgba(245,158,11,0.5)]',
      accentText: 'text-amber-300',
      accentCheck: 'text-amber-400',
    },
    validate: {
      border: 'border-fuchsia-500/40',
      badge: 'bg-fuchsia-950/80 border-fuchsia-400/50 text-fuchsia-300',
      shadow: 'shadow-[0_0_50px_rgba(217,70,239,0.35)]',
      glowBg: 'bg-fuchsia-500/10',
      icon: ShieldCheck,
      color: 'text-fuchsia-400',
      btnGrad: 'from-purple-600 to-fuchsia-500 shadow-[0_0_20px_rgba(217,70,239,0.5)]',
      accentText: 'text-fuchsia-300',
      accentCheck: 'text-fuchsia-400',
    },
  }[stage];

  const StageIcon = stageThemes.icon;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200 select-none">
      <div
        className={`relative w-full max-w-2xl bg-[#091124] border ${stageThemes.border} rounded-3xl p-6 ${stageThemes.shadow} flex flex-col max-h-[90vh] overflow-hidden`}
      >
        {/* Ambient Top Rim Glow */}
        <div className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-2xl border ${stageThemes.badge}`}>
              <StageIcon className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-white tracking-wide">{currentData.title}</h3>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${stageThemes.badge}`}>
                  CORE FEATURE
                </span>
              </div>
              <p className={`text-xs ${stageThemes.accentText} font-medium`}>{currentData.subtitle}</p>
            </div>
          </div>

          <button
            id="close-feature-modal-btn"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Close Feature Dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {/* Feature Overview */}
          <div className="p-4 rounded-2xl bg-[#060c1d] border border-slate-800">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
              Autonomous Intelligence Capability
            </span>
            <p className="text-xs text-slate-200 leading-relaxed">{currentData.description}</p>
          </div>

          {/* Sub-Capabilities Checklist Grid */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
              Sub-Modules & Algorithmic Features
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {currentData.features.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200"
                >
                  <CheckCircle2 className={`w-4 h-4 ${stageThemes.accentCheck} shrink-0`} />
                  <span className="font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Source Document & Real-Time Extraction Results */}
          <div className="p-4 rounded-2xl bg-[#060c1d] border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-slate-300">
                ACTIVE PIPELINE SOURCE: <strong className="text-white">{currentData.sampleExtraction.documentType}</strong>
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-mono">
                Confidence: {currentData.sampleExtraction.confidence}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {currentData.sampleExtraction.keyFields.map((field, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 block font-mono">{field.key}</span>
                  <span className="text-xs font-bold text-white block mt-0.5">{field.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Synthesized Payload JSON Output */}
          <div className="relative p-3 rounded-2xl bg-[#030611] border border-slate-800 font-mono text-xs">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80 text-[11px]">
              <span className="text-slate-400">Synthesized Schema Payload (JSON)</span>
              <button
                onClick={() => handleCopy(JSON.stringify(currentData.sampleExtraction, null, 2))}
                className="flex items-center gap-1 text-slate-300 hover:text-cyan-300 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="overflow-x-auto text-[11px] text-cyan-300/90 leading-relaxed max-h-36">
              {JSON.stringify(currentData.sampleExtraction, null, 2)}
            </pre>
          </div>
        </div>

        {/* Modal Footer: Quick Switcher between the 3 Features + Actions */}
        <div className="border-t border-slate-800 pt-4 mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Quick Three Features Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 text-[11px]">
            <button
              onClick={() => onSelectStage('understand')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                stage === 'understand'
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Understand
            </button>
            <button
              onClick={() => onSelectStage('predict')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                stage === 'predict'
                  ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40 shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Predict
            </button>
            <button
              onClick={() => onSelectStage('validate')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                stage === 'validate'
                  ? 'bg-fuchsia-500/20 text-fuchsia-300 font-bold border border-fuchsia-500/40 shadow-[0_0_10px_rgba(217,70,239,0.3)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Validate
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {(stage === 'understand' || stage === 'validate') && (
              <button
                onClick={() => {
                  if (onOpenCombinedWorkflow) {
                    onOpenCombinedWorkflow();
                  } else {
                    onSelectStage('understand');
                  }
                }}
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-600 via-blue-600 to-fuchsia-600 hover:from-cyan-500 hover:to-fuchsia-500 border border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
                <span>Launch Combined Workflow</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleRunSimulation}
              disabled={isSimulating}
              className={`px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r ${stageThemes.btnGrad} transition-all flex items-center gap-1.5`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isSimulating ? 'Calibrating...' : `Execute ${currentData.title}`}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
