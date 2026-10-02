import React, { useState } from 'react';
import {
  Brain,
  TrendingUp,
  ShieldCheck,
  Check,
  Sparkles,
  BarChart3,
  Layers,
  ArrowRight,
  ArrowUpRight,
  FileText,
} from 'lucide-react';
import { PipelineStage, ActionTool } from '../types';
import { STAGE_DETAILS } from '../data';
import hologramCoreImg from '../assets/images/flowlens_home_neon_core_1790139258338.jpg';

interface HolographicCoreProps {
  activeStage: PipelineStage;
  onSelectStage: (stage: PipelineStage) => void;
  onTriggerAction: (action: ActionTool) => void;
  onOpenFeature?: (stage: PipelineStage) => void;
}

export const HolographicCore: React.FC<HolographicCoreProps> = ({
  activeStage,
  onSelectStage,
  onTriggerAction,
  onOpenFeature,
}) => {
  const [hoveredNode, setHoveredNode] = useState<PipelineStage | null>(null);

  const stageColors = {
    understand: {
      border: 'border-cyan-400/80',
      shadow: 'shadow-[0_0_35px_rgba(6,182,212,0.45)]',
      glow: 'from-cyan-500/30 to-blue-600/10',
      badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50',
      check: 'text-cyan-400',
    },
    predict: {
      border: 'border-amber-400/80',
      shadow: 'shadow-[0_0_35px_rgba(245,158,11,0.45)]',
      glow: 'from-amber-500/30 to-orange-600/10',
      badge: 'bg-amber-500/20 text-amber-300 border-amber-400/50',
      check: 'text-amber-400',
    },
    validate: {
      border: 'border-fuchsia-400/80',
      shadow: 'shadow-[0_0_35px_rgba(217,70,239,0.45)]',
      glow: 'from-fuchsia-500/30 to-purple-600/10',
      badge: 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-400/50',
      check: 'text-fuchsia-400',
    },
  };

  const currentTheme = stageColors[activeStage];

  return (
    <div className="relative w-full max-w-[840px] flex flex-col items-center justify-center select-none py-6">
      {/* Background Volumetric Glow centered behind the hologram */}
      <div
        className={`absolute w-[460px] h-[460px] rounded-full filter blur-[90px] opacity-40 transition-all duration-700 pointer-events-none ${
          activeStage === 'understand'
            ? 'bg-cyan-500'
            : activeStage === 'predict'
            ? 'bg-amber-500'
            : 'bg-fuchsia-500'
        }`}
      />

      {/* ========================================================================= */}
      {/* 1. TOP CARD: UNDERSTAND (Requirements Intelligence)                       */}
      {/* ========================================================================= */}
      <div className="relative z-30 mb-2 transition-transform duration-300 hover:scale-[1.02]">
        <div
          id="node-understand"
          onClick={() => onSelectStage('understand')}
          onMouseEnter={() => setHoveredNode('understand')}
          onMouseLeave={() => setHoveredNode(null)}
          className={`cursor-pointer rounded-2xl bg-[#091124]/90 backdrop-blur-2xl border p-4 w-[310px] sm:w-[340px] transition-all duration-300 ${
            activeStage === 'understand'
              ? 'border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.5)] ring-1 ring-cyan-400/50'
              : 'border-cyan-500/40 hover:border-cyan-400/80 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-400/60 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)] shrink-0">
                <Brain className="w-5 h-5 text-cyan-300 animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black tracking-wider text-white">UNDERSTAND + VALIDATE</span>
                <span className="text-[11px] text-cyan-300/90 font-medium">Requirements Intelligence</span>
              </div>
            </div>

            {/* OPEN BUTTON for UNDERSTAND */}
            <button
              id="open-feature-understand-btn"
              onClick={(e) => {
                e.stopPropagation();
                if (onOpenFeature) {
                  onOpenFeature('understand');
                } else {
                  onSelectStage('understand');
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-cyan-300 bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-400/60 shadow-[0_0_12px_rgba(6,182,212,0.4)] hover:shadow-[0_0_18px_rgba(6,182,212,0.7)] hover:border-cyan-300 transition-all cursor-pointer group/btn shrink-0"
              title="Open Understand & Auto-Validate Feature"
            >
              <span>Launch</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Checklist */}
          <div className="flex flex-col gap-1.5 text-xs text-slate-200">
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-cyan-400 stroke-[3]" />
              <span>Customer Insights</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-cyan-400 stroke-[3]" />
              <span>Behavior Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-cyan-400 stroke-[3]" />
              <span>Natural Language Processing</span>
            </div>
          </div>

          {/* Mockup subcard: Auto Generate Documentation */}
          <div 
            onClick={(e) => {
              e.stopPropagation();
              if (onOpenFeature) onOpenFeature('understand');
            }}
            className="mt-2.5 p-2 rounded-xl bg-cyan-950/50 hover:bg-cyan-900/60 border border-cyan-500/30 flex items-center justify-between transition-all cursor-pointer group/doc"
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-300">
                <FileText className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold text-slate-200 group-hover/doc:text-cyan-300 transition-colors">
                Auto Generate Documentation
              </span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover/doc:translate-x-1 transition-transform" />
          </div>

          {/* Mini Wave Graph in top-right of card */}
          <div className="mt-2 pt-2 border-t border-cyan-500/20 flex items-center justify-between text-[10px] text-slate-400">
            <span className="font-mono text-cyan-400">Continuous Auto-Validation</span>
            <div className="w-20 h-4 flex items-end gap-[2px]">
              {[30, 50, 75, 45, 90, 60, 85, 95].map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}%` }}
                  className="flex-1 bg-cyan-400/80 rounded-t-sm"
                />
              ))}
            </div>
          </div>

          {/* Combined Pipeline Link */}
          <button
            id="understand-combine-with-validate-btn"
            onClick={(e) => {
              e.stopPropagation();
              if (onOpenFeature) {
                onOpenFeature('understand');
              } else {
                onSelectStage('understand');
              }
            }}
            className="mt-2.5 w-full py-1.5 px-2.5 rounded-xl bg-gradient-to-r from-cyan-950/90 to-fuchsia-950/70 border border-cyan-500/40 hover:border-cyan-300 text-[10px] font-bold text-cyan-200 hover:text-white transition-all flex items-center justify-between group/comb shadow-[0_0_10px_rgba(6,182,212,0.15)]"
          >
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>Multi-Source Intake + Auto-Validate Engine</span>
            </span>
            <ArrowRight className="w-3 h-3 text-cyan-400 group-hover/comb:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MIDDLE ROW: PREDICT (Left) + CORE SPHERE (Center)                       */}
      {/* (Matches ChatGPT Image Sep 23, 2026 mockup)                                */}
      {/* ========================================================================= */}
      <div className="relative w-full flex flex-col md:flex-row items-center justify-center gap-6 lg:gap-10 my-2 z-20">
        {/* PREDICT CARD (Left) */}
        <div
          id="node-predict"
          onClick={() => onSelectStage('predict')}
          onMouseEnter={() => setHoveredNode('predict')}
          onMouseLeave={() => setHoveredNode(null)}
          className={`cursor-pointer rounded-2xl bg-[#091124]/90 backdrop-blur-2xl border p-4 w-[300px] sm:w-[320px] transition-all duration-300 md:-mt-8 ${
            activeStage === 'predict'
              ? 'border-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.5)] ring-1 ring-amber-400/50'
              : 'border-amber-500/40 hover:border-amber-400/80 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)]'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-400/60 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.5)] shrink-0">
                <TrendingUp className="w-5 h-5 text-amber-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black tracking-wider text-white">PREDICT</span>
                <span className="text-[11px] text-amber-300/90 font-medium">Resource & Risk Intelligence</span>
              </div>
            </div>

            {/* OPEN BUTTON for PREDICT */}
            <button
              id="open-feature-predict-btn"
              onClick={(e) => {
                e.stopPropagation();
                if (onOpenFeature) {
                  onOpenFeature('predict');
                } else {
                  onSelectStage('predict');
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-amber-300 bg-amber-950/80 hover:bg-amber-900 border border-amber-400/60 shadow-[0_0_12px_rgba(245,158,11,0.4)] hover:shadow-[0_0_18px_rgba(245,158,11,0.7)] hover:border-amber-300 transition-all cursor-pointer group/btn shrink-0"
              title="Open Predict Feature Details"
            >
              <span>Open</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Checklist */}
          <div className="flex flex-col gap-1.5 text-xs text-slate-200">
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-amber-400 stroke-[3]" />
              <span>Demand Forecasting</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-amber-400 stroke-[3]" />
              <span>Risk Detection</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-amber-400 stroke-[3]" />
              <span>Scenario Modeling</span>
            </div>
          </div>

          {/* 3D Glowing Bar Columns Graphic */}
          <div className="mt-3 flex items-end justify-between gap-2 h-10 px-2 py-1 bg-amber-950/30 rounded-lg border border-amber-500/20">
            <span className="text-[10px] font-mono text-amber-300 self-center">FORECAST</span>
            <div className="flex items-end gap-1.5 h-full">
              <div className="w-2.5 h-[40%] rounded-t bg-amber-500/60 shadow-[0_0_6px_#f59e0b]" />
              <div className="w-2.5 h-[65%] rounded-t bg-amber-400/80 shadow-[0_0_8px_#f59e0b]" />
              <div className="w-2.5 h-[85%] rounded-t bg-amber-300 shadow-[0_0_10px_#fcd34d]" />
              <div className="w-2.5 h-[100%] rounded-t bg-white shadow-[0_0_12px_#ffffff]" />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CENTER HOLOGRAPHIC SPHERE & FLOATING "A" CORE                             */}
        {/* ========================================================================= */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 flex items-center justify-center shrink-0">
          {/* Concentric Rotating Orbital Rings */}
          <div className="absolute inset-0 rounded-full border border-cyan-400/30 animate-orbit-slow pointer-events-none" />
          <div className="absolute inset-4 rounded-full border border-dashed border-amber-400/35 animate-orbit-reverse pointer-events-none" />
          <div className="absolute inset-8 rounded-full border border-fuchsia-400/25 pointer-events-none" />

          {/* Outer glowing ring with radial markers */}
          <div className="absolute inset-2 rounded-full border-2 border-cyan-500/20 shadow-[0_0_40px_rgba(6,182,212,0.3)] pointer-events-none" />

          {/* Centerpiece Image of 3D Holographic Core Sphere */}
          <div className="relative w-52 h-52 sm:w-60 sm:h-60 rounded-full overflow-hidden border-2 border-cyan-400/60 shadow-[0_0_50px_rgba(6,182,212,0.7)] group/core cursor-pointer transition-transform duration-500 hover:scale-105">
            <img
              src={hologramCoreImg}
              alt="FlowLens Holographic Intelligence Core"
              className="w-full h-full object-cover select-none scale-105"
            />
            {/* Dynamic Glass Refraction Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-amber-400/10 mix-blend-overlay pointer-events-none" />
            <div className="absolute inset-0 rounded-full shadow-[inset_0_0_30px_rgba(6,182,212,0.6)] pointer-events-none" />
          </div>

          {/* Floating Neon Diamond Cubes matching image */}
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-tr from-fuchsia-600 to-pink-400 border border-fuchsia-300 shadow-[0_0_12px_#d946ef] rotate-45 transform animate-bounce pointer-events-none opacity-80" />
          <div className="absolute top-1/3 -left-3 w-4 h-4 bg-gradient-to-tr from-cyan-500 to-blue-400 border border-cyan-200 shadow-[0_0_10px_#22d3ee] rotate-12 pointer-events-none opacity-75" />
          <div className="absolute -bottom-2 right-1/4 w-4 h-4 bg-gradient-to-tr from-fuchsia-500 to-purple-400 border border-fuchsia-300 shadow-[0_0_10px_#a855f7] rotate-45 pointer-events-none opacity-70" />

          {/* Orbital Satellite Dots */}
          <div className="absolute w-full h-full animate-orbit-slow pointer-events-none">
            <span className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-300 shadow-[0_0_12px_#67e8f9]" />
            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_10px_#f59e0b]" />
            <span className="absolute left-2 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-fuchsia-400 shadow-[0_0_10px_#d946ef]" />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. PEDESTAL BASE & PIPELINE NAVIGATION                                   */}
      {/* ========================================================================= */}
      <div className="relative z-20 w-full max-w-[560px] mt-3 flex flex-col items-center">
        {/* Glowing Tiered Pedestal Top Rim */}
        <div className="w-full h-2 rounded-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_#22d3ee] opacity-80" />

        {/* Subtitle Indicator: INTELLIGENCE IN MOTION */}
        <div className="mt-3 flex flex-col items-center">
          <div className="flex items-center gap-3 text-cyan-400/80 text-[11px] font-mono tracking-[0.25em] uppercase font-bold">
            <span className="w-6 h-px bg-cyan-400/50" />
            <span>INTELLIGENCE IN MOTION</span>
            <span className="w-6 h-px bg-cyan-400/50" />
          </div>

          {/* Pipeline breadcrumbs */}
          <div className="flex items-center gap-2 mt-1.5 text-xs font-medium">
            <button
              onClick={() => onSelectStage('understand')}
              className={`hover:underline transition-colors ${
                activeStage === 'understand' ? 'text-cyan-300 font-bold' : 'text-slate-400'
              }`}
            >
              Understand
            </button>
            <span className="text-slate-600">→</span>
            <button
              onClick={() => onSelectStage('predict')}
              className={`hover:underline transition-colors ${
                activeStage === 'predict' ? 'text-amber-300 font-bold' : 'text-slate-400'
              }`}
            >
              Predict
            </button>
            <span className="text-slate-600">→</span>
            <button
              onClick={() => {
                if (onOpenFeature) {
                  onOpenFeature('validate');
                } else {
                  onSelectStage('validate');
                }
              }}
              className={`hover:underline transition-colors ${
                activeStage === 'validate' ? 'text-fuchsia-300 font-bold' : 'text-slate-400'
              }`}
            >
              Validate
            </button>
          </div>

          {/* Combined Understand + Validate Launcher */}
          <button
            id="pedestal-combined-understand-validate-btn"
            onClick={() => {
              if (onOpenFeature) {
                onOpenFeature('understand');
              } else {
                onSelectStage('understand');
              }
            }}
            className="mt-3.5 inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r from-cyan-600 via-blue-600 to-fuchsia-600 hover:from-cyan-500 hover:to-fuchsia-500 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(217,70,239,0.6)] transition-all cursor-pointer group border border-cyan-400/40"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-300 group-hover:rotate-12 transition-transform" />
            <span>Launch Front-End Core (Understand & Validate)</span>
            <ArrowRight className="w-3.5 h-3.5 text-fuchsia-300 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
