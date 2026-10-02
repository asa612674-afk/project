import React from 'react';
import {
  ArrowLeft,
  Brain,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Zap,
  Globe2,
  Lock,
  FileCode,
  Layers,
  Sparkles
} from 'lucide-react';
import { NavTab, PipelineStage } from '../types';
import { STAGE_DETAILS } from '../data';

interface SecondaryViewsProps {
  activeTab: NavTab;
  onBackToHome: () => void;
  onSelectStage: (stage: PipelineStage) => void;
  onOpenFeature?: (stage: PipelineStage) => void;
}

export const SecondaryViews: React.FC<SecondaryViewsProps> = ({
  activeTab,
  onBackToHome,
  onSelectStage,
  onOpenFeature,
}) => {
  return (
    <div className="relative z-30 max-w-6xl mx-auto px-4 py-8 animate-in fade-in duration-300">
      {/* Back button */}
      <button
        onClick={onBackToHome}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-cyan-300 bg-slate-900/80 border border-cyan-500/30 hover:bg-slate-800 transition-colors mb-6 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Command Deck</span>
      </button>

      {/* 1. FEATURES VIEW */}
      {activeTab === 'features' && (
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              The Three Pillars of <span className="text-cyan-400">FlowLens AI</span>
            </h2>
            <p className="text-sm text-slate-300 mt-2">
              Transforming unstructured chaos into deterministic, auditable decisions across the entire enterprise lifecycle.
            </p>
          </div>

          {/* Combined Understand + Validate Spotlight Banner */}
          <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-cyan-950/80 via-slate-900/90 to-fuchsia-950/80 border border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.25)] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/30 to-fuchsia-500/30 border border-cyan-400/60 flex items-center justify-center text-white shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                <Brain className="w-6 h-6 text-cyan-300" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-black text-white">Combined Understand + Validate Engine</h3>
                  <span className="px-2 py-0.5 rounded-full bg-cyan-400/20 border border-cyan-400/40 text-[10px] font-mono text-cyan-300 font-bold">
                    6-STAGE WORKFLOW
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5 max-w-xl">
                  Seamlessly unifies client intake (voice, text, docs) with semantic understanding, missing-rule validation, and smart review confirmation into formal specifications.
                </p>
              </div>
            </div>

            <button
              id="open-secondary-combined-workflow-btn"
              onClick={() => {
                onSelectStage('understand');
                if (onOpenFeature) {
                  onOpenFeature('understand');
                } else {
                  onBackToHome();
                }
              }}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-600 via-blue-600 to-fuchsia-600 hover:from-cyan-500 hover:to-fuchsia-500 border border-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(217,70,239,0.6)] transition-all flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <span>Launch Combined Pipeline</span>
              <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Understand */}
            <div className="rounded-3xl bg-[#091124]/90 border border-cyan-500/40 p-6 flex flex-col justify-between shadow-[0_0_30px_rgba(6,182,212,0.2)]">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-cyan-950 border border-cyan-400/60 flex items-center justify-center text-cyan-300 mb-4">
                  <Brain className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">UNDERSTAND</h3>
                <span className="text-xs text-cyan-400 font-semibold block mb-3">Requirements Intelligence</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Autonomous semantic comprehension deconstructing multi-party contracts, regulations, and user requirements with 99.8% precision.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-slate-300">
                  {STAGE_DETAILS.understand.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                id="open-secondary-feature-understand-btn"
                onClick={() => {
                  onSelectStage('understand');
                  if (onOpenFeature) {
                    onOpenFeature('understand');
                  } else {
                    onBackToHome();
                  }
                }}
                className="mt-6 w-full py-2.5 rounded-xl text-xs font-bold text-white bg-cyan-600/30 hover:bg-cyan-600/50 border border-cyan-500/50 transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] cursor-pointer"
              >
                <span>Open Feature</span>
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Predict */}
            <div className="rounded-3xl bg-[#091124]/90 border border-amber-500/40 p-6 flex flex-col justify-between shadow-[0_0_30px_rgba(245,158,11,0.2)]">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-950 border border-amber-400/60 flex items-center justify-center text-amber-300 mb-4">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">PREDICT</h3>
                <span className="text-xs text-amber-400 font-semibold block mb-3">Resource & Risk Intelligence</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Deep probabilistic forecasting predicting market volatility, supply chain disruptions, and GPU cluster requirements before bottlenecks arise.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-slate-300">
                  {STAGE_DETAILS.predict.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                id="open-secondary-feature-predict-btn"
                onClick={() => {
                  onSelectStage('predict');
                  if (onOpenFeature) {
                    onOpenFeature('predict');
                  } else {
                    onBackToHome();
                  }
                }}
                className="mt-6 w-full py-2.5 rounded-xl text-xs font-bold text-white bg-amber-600/30 hover:bg-amber-600/50 border border-amber-500/50 transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:shadow-[0_0_20px_rgba(245,158,11,0.6)] cursor-pointer"
              >
                <span>Open Feature</span>
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Validate */}
            <div className="rounded-3xl bg-[#091124]/90 border border-fuchsia-500/40 p-6 flex flex-col justify-between shadow-[0_0_30px_rgba(217,70,239,0.2)]">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-fuchsia-950 border border-fuchsia-400/60 flex items-center justify-center text-fuchsia-300 mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">VALIDATE</h3>
                <span className="text-xs text-fuchsia-400 font-semibold block mb-3">FlowLens AI Parity</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Cryptographic reconciliation and multi-source consensus engines guaranteeing zero hallucination in safety-critical business environments.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-slate-300">
                  {STAGE_DETAILS.validate.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-fuchsia-400 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                id="open-secondary-feature-validate-btn"
                onClick={() => {
                  onSelectStage('validate');
                  if (onOpenFeature) {
                    onOpenFeature('validate');
                  } else {
                    onBackToHome();
                  }
                }}
                className="mt-6 w-full py-2.5 rounded-xl text-xs font-bold text-white bg-fuchsia-600/30 hover:bg-fuchsia-600/50 border border-fuchsia-500/50 transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(217,70,239,0.3)] hover:shadow-[0_0_20px_rgba(217,70,239,0.6)] cursor-pointer"
              >
                <span>Open Feature</span>
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. SOLUTIONS VIEW */}
      {activeTab === 'solutions' && (
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black text-white">Enterprise Solutions</h2>
            <p className="text-sm text-slate-300 mt-2">Tailored neural intelligence workflows for global leaders.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 rounded-3xl bg-[#091124] border border-cyan-500/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 rounded-xl bg-cyan-950 border border-cyan-400/40 text-cyan-300">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Global FinTech & Risk</h3>
                  <span className="text-xs text-cyan-400">Automated Ledger Parity & Fraud Audits</span>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Stream real-time transactions through FlowLens validator kernels to intercept liquidity mismatches and anomalous hedge positions instantly.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#091124] border border-cyan-500/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 rounded-xl bg-cyan-950 border border-cyan-400/40 text-cyan-300">
                  <Globe2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Supply Chain & Logistics</h3>
                  <span className="text-xs text-cyan-400">Predictive Route & Port Congestion Modeling</span>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Dynamically adjust freight routing 14 days ahead of port delays using weather simulations and customs document extraction.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#091124] border border-cyan-500/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 rounded-xl bg-cyan-950 border border-cyan-400/40 text-cyan-300">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Healthcare & Clinical Audits</h3>
                  <span className="text-xs text-cyan-400">Zero-Leakage Patient Data Extraction</span>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Anonymize medical imaging records and clinical trial paperwork with strict HIPAA and GDPR hardware-enforced boundaries.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#091124] border border-cyan-500/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 rounded-xl bg-cyan-950 border border-cyan-400/40 text-cyan-300">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">SaaS & Autonomous Cloud</h3>
                  <span className="text-xs text-cyan-400">Autoscaling Telemetry & Compute Allocation</span>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Forecast multi-tenant GPU workloads with 12.8s processing latency, cutting server over-provisioning expenses by 38%.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 3. DASHBOARD VIEW */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-white">Live Analytical Telemetry Cockpit</h2>
              <p className="text-xs text-slate-400">Synchronized across 7 distributed geographic regions.</p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/30 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Cluster Status: Nominal (100%)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-[#091124] border border-cyan-500/30">
              <span className="text-[11px] text-slate-400">Total Analyzed Nodes</span>
              <div className="text-2xl font-black text-white mt-1">1,482,900</div>
              <span className="text-[11px] text-emerald-400 font-semibold">↑ +14.2% this hour</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#091124] border border-cyan-500/30">
              <span className="text-[11px] text-slate-400">Mean Heuristic Latency</span>
              <div className="text-2xl font-black text-cyan-300 mt-1">12.8 ms</div>
              <span className="text-[11px] text-emerald-400 font-semibold">↓ -3.4ms optimized</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#091124] border border-cyan-500/30">
              <span className="text-[11px] text-slate-400">Accuracy Verification</span>
              <div className="text-2xl font-black text-fuchsia-300 mt-1">98.7%</div>
              <span className="text-[11px] text-emerald-400 font-semibold">↑ Verified Deterministic</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#091124] border border-cyan-500/30">
              <span className="text-[11px] text-slate-400">Active Pipeline Workers</span>
              <div className="text-2xl font-black text-amber-300 mt-1">256 Nodes</div>
              <span className="text-[11px] text-slate-400 font-semibold">Distributed Worldwide</span>
            </div>
          </div>
        </div>
      )}

      {/* 4. RESOURCES & ABOUT VIEW */}
      {(activeTab === 'resources' || activeTab === 'about') && (
        <div className="max-w-3xl mx-auto rounded-3xl bg-[#091124] border border-cyan-500/30 p-8 space-y-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-cyan-950 border border-cyan-400/50 flex items-center justify-center text-cyan-300 mx-auto shadow-[0_0_25px_rgba(6,182,212,0.4)]">
            <Sparkles className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-white">
            {activeTab === 'resources' ? 'FlowLens AI Resource Center' : 'About FlowLens AI'}
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            {activeTab === 'resources'
              ? 'Comprehensive API specifications, deterministic reasoning papers, and real-time SDK documentation are available for enterprise engineering teams.'
              : 'FlowLens AI was architected from the ground up to replace error-prone manual document audits and speculative decision-making with high-dimensional intelligence and real-time mathematical validation.'}
          </p>
          <div className="pt-4 flex justify-center gap-3">
            <button
              onClick={onBackToHome}
              className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg"
            >
              Open Interactive Platform
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
