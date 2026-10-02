import React from 'react';
import { X, ZoomIn, Sparkles, Layers, CheckCircle2, ArrowRight, Eye, Download } from 'lucide-react';
import conceptImg from '../assets/images/flowlens_concept_mockup.jpg';

interface ConceptMockupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunchWorkflow?: () => void;
}

export const ConceptMockupModal: React.FC<ConceptMockupModalProps> = ({
  isOpen,
  onClose,
  onLaunchWorkflow,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-fadeIn">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-6xl max-h-[92vh] flex flex-col bg-[#070c1d] border border-cyan-500/50 rounded-3xl shadow-[0_0_60px_rgba(6,182,212,0.35)] overflow-hidden">
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-500/30 bg-[#091228]/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-950/80 border border-cyan-400/60 flex items-center justify-center text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-white tracking-wide">
                  FlowLens AI — Holographic Command Architecture
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 text-[10px] font-mono font-bold border border-cyan-400/40">
                  ORIGINAL BLUEPRINT
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Official reference vision for the 3D Holographic Core, Understand + Auto-Validate Engine & Live Intelligence
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onLaunchWorkflow && (
              <button
                onClick={() => {
                  onClose();
                  onLaunchWorkflow();
                }}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-600 via-blue-600 to-fuchsia-600 hover:from-cyan-500 hover:to-fuchsia-500 border border-cyan-400/40 shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Launch Auto-Validate Engine</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Close Blueprint"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Main Display Image */}
          <div className="relative rounded-2xl overflow-hidden border border-cyan-500/40 bg-black/60 shadow-[0_0_40px_rgba(6,182,212,0.2)] group">
            <img
              src={conceptImg}
              alt="FlowLens AI Holographic Command Architecture Mockup"
              className="w-full h-auto object-contain max-h-[65vh] select-none"
            />

            {/* Subtle Overlay badge */}
            <div className="absolute bottom-3 left-3 bg-[#060c1d]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-cyan-500/30 text-[11px] font-mono text-cyan-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Full-Spectrum System UI Concept & Interactive Core</span>
            </div>
          </div>

          {/* Architecture Mapping Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Component 1: Central 3D A */}
            <div className="p-4 rounded-2xl bg-[#091124]/80 border border-cyan-500/30">
              <div className="flex items-center gap-2 mb-2 text-cyan-300 text-xs font-bold font-mono">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>1. HOLOGRAPHIC CORE 'A'</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Central crystal sphere containing the luminous 'A' glyph. Features rotating orbital rings that visually stream data tokens through <strong className="text-cyan-200">Listening → Understanding → Extracting → Cross-Checking → Validating → Documenting → Verified</strong>.
              </p>
            </div>

            {/* Component 2: Understand + Auto-Validate */}
            <div className="p-4 rounded-2xl bg-[#091124]/80 border border-fuchsia-500/30">
              <div className="flex items-center gap-2 mb-2 text-fuchsia-300 text-xs font-bold font-mono">
                <span className="w-2 h-2 rounded-full bg-fuchsia-400" />
                <span>2. UNDERSTAND + VALIDATE</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Top floating neon card pairing customer insights, behavior analysis, and NLP with real-time automatic validation and instant document generation.
              </p>
            </div>

            {/* Component 3: Multi-Source Intake & Checks */}
            <div className="p-4 rounded-2xl bg-[#091124]/80 border border-amber-500/30">
              <div className="flex items-center gap-2 mb-2 text-amber-300 text-xs font-bold font-mono">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>3. CROSS-DOCUMENT & PEDESTAL</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Streamlined holographic pedestal with unified reactive intelligence in motion across client inputs, business rules, and auto-generated documentation.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Bottom Footer */}
        <div className="px-6 py-3 border-t border-cyan-500/30 bg-[#091228]/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <span>FlowLens AI Platform Specification</span>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              Close
            </button>
            {onLaunchWorkflow && (
              <button
                onClick={() => {
                  onClose();
                  onLaunchWorkflow();
                }}
                className="px-4 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold transition-all shadow-[0_0_12px_rgba(6,182,212,0.5)]"
              >
                Open Live Workflow
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
