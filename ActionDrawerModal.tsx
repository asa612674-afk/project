import React, { useState } from 'react';
import { X, Copy, Check, Sparkles, FileText, GitCompare, AlertTriangle, ShieldCheck, Download } from 'lucide-react';
import { ActionTool, PipelineStage } from '../types';
import { STAGE_DETAILS } from '../data';

interface ActionDrawerModalProps {
  action: ActionTool | null;
  onClose: () => void;
  onSelectStage?: (stage: PipelineStage) => void;
}

export const ActionDrawerModal: React.FC<ActionDrawerModalProps> = ({
  action,
  onClose,
  onSelectStage,
}) => {
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!action) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const titles = {
    extract: {
      name: 'Extract Fields Engine',
      desc: 'Autonomous entity extraction and structured JSON synthesis across unstructured data feeds.',
      icon: FileText,
      color: 'text-cyan-400',
      badge: 'border-cyan-500/40 bg-cyan-950/60 text-cyan-300',
    },
    compare: {
      name: 'Information Comparison & Parity',
      desc: 'High-dimensional semantic reconciliation and cross-document verification engine.',
      icon: GitCompare,
      color: 'text-amber-400',
      badge: 'border-amber-500/40 bg-amber-950/60 text-amber-300',
    },
    detect: {
      name: 'Inconsistency & Anomaly Detector',
      desc: 'Zero-tolerance deterministic audit scanner flagging mathematical and regulatory deviations.',
      icon: AlertTriangle,
      color: 'text-fuchsia-400',
      badge: 'border-fuchsia-500/40 bg-fuchsia-950/60 text-fuchsia-300',
    },
  }[action];

  const Icon = titles.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#091124] border border-cyan-500/40 rounded-3xl p-6 shadow-[0_0_50px_rgba(6,182,212,0.3)] flex flex-col max-h-[90vh] overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl border ${titles.badge}`}>
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-wide">{titles.name}</h3>
              <p className="text-xs text-slate-400 max-w-md">{titles.desc}</p>
            </div>
          </div>
          <button
            id="close-action-drawer-btn"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area Based on Action */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {action === 'extract' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#060c1d] border border-cyan-500/20">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-cyan-400">SOURCE DOCUMENT: Master Service Agreement (v3.2)</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950 border border-emerald-500/30 text-emerald-400">
                    Confidence: 99.8%
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {STAGE_DETAILS.understand.sampleExtraction.keyFields.map((field, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                      <span className="text-[11px] text-slate-400 block">{field.key}</span>
                      <span className="text-xs font-bold text-white block mt-0.5">{field.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* JSON Payload preview */}
              <div className="relative p-3 rounded-2xl bg-[#030611] border border-slate-800 font-mono text-xs text-cyan-300">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80">
                  <span className="text-slate-400 text-[11px]">Synthesized Payload (JSON)</span>
                  <button
                    onClick={() => handleCopy(JSON.stringify(STAGE_DETAILS.understand.sampleExtraction, null, 2))}
                    className="flex items-center gap-1 text-[11px] text-slate-300 hover:text-cyan-300 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="overflow-x-auto text-[11px] text-slate-300 leading-relaxed">
                  {JSON.stringify(STAGE_DETAILS.understand.sampleExtraction, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {action === 'compare' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#060c1d] border border-amber-500/20">
                <div className="flex items-center justify-between mb-3 text-xs font-mono text-amber-400">
                  <span>CROSS-DOCUMENT DIFFERENTIAL AUDIT</span>
                  <span className="text-slate-400">2 Sources Loaded</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-cyan-400 font-semibold block mb-1">Contract Ledger A</span>
                    <p className="text-slate-300 text-[11px] leading-normal">
                      Q3 Projected Compute Cost: <strong className="text-white">$142,500.00</strong><br />
                      Reserve Quotas: <strong className="text-white">64 TPU Nodes</strong>
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-amber-400 font-semibold block mb-1">Cloud Billing B</span>
                    <p className="text-slate-300 text-[11px] leading-normal">
                      Q3 Billed Compute Cost: <strong className="text-emerald-400">$142,500.00 (Match)</strong><br />
                      Reserve Quotas: <strong className="text-emerald-400">64 TPU Nodes (Parity 100%)</strong>
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
                <div className="text-xs">
                  <span className="font-bold text-emerald-300 block">Deterministic Consensus Reached</span>
                  <p className="text-slate-300 text-[11px]">
                    No conflicting liability terms or numeric mismatches identified across 4,280 ledger nodes.
                  </p>
                </div>
              </div>
            </div>
          )}

          {action === 'detect' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#060c1d] border border-fuchsia-500/20">
                <div className="flex items-center justify-between mb-3 text-xs font-mono text-fuchsia-400">
                  <span>DISCREPANCY SCANNER ENGINE</span>
                  <span className="text-slate-400">Scan Complete (0.18s)</span>
                </div>

                <div className="space-y-2.5">
                  <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/40 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div className="text-xs flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-amber-300">Warning: Jurisdiction Ambiguity</span>
                        <span className="text-[10px] text-amber-400 font-mono">Paragraph 14.b</span>
                      </div>
                      <p className="text-slate-300 text-[11px] mt-0.5">
                        Clause cites Delaware Chancery Court while GDPR section references EU-West-1 Luxembourg enforcement.
                      </p>
                      <button className="mt-2 px-3 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[11px] font-semibold transition-colors">
                        Auto-Resolve Harmonization Clause
                      </button>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/40 flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <span className="font-bold text-emerald-300">Passed: SOC-2 Compliance Audit</span>
                      <p className="text-slate-300 text-[11px] mt-0.5">
                        Zero data leakage vectors found. End-to-end encryption hashes confirmed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="border-t border-slate-800 pt-4 mt-4 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-mono">FlowLens Heuristic v4.8</span>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              Dismiss
            </button>
            <button
              onClick={() => {
                setIsProcessing(true);
                setTimeout(() => {
                  setIsProcessing(false);
                  onClose();
                }, 1000);
              }}
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)] hover:shadow-[0_0_20px_rgba(6,182,212,0.8)] transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isProcessing ? 'Processing...' : 'Run New Scan'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
