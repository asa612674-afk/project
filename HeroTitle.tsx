import React from 'react';
import { ArrowRight, Sparkles, Activity, Eye } from 'lucide-react';

interface HeroTitleProps {
  onStartNow: () => void;
  onExploreFeatures: () => void;
  onOpenConceptMockup?: () => void;
}

export const HeroTitle: React.FC<HeroTitleProps> = ({
  onStartNow,
  onExploreFeatures,
  onOpenConceptMockup,
}) => {
  return (
    <div className="relative z-20 flex flex-col items-start max-w-lg lg:max-w-md xl:max-w-lg pt-4 lg:pt-8 text-left">
      {/* Category Eyebrow */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-[11px] font-bold tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
        <Sparkles className="w-3 h-3 text-cyan-400" />
        <span>THE NEXT GENERATION AI PLATFORM</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.08] text-white">
        Smarter Data. <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 drop-shadow-[0_0_25px_rgba(6,182,212,0.4)]">
          Clearer Decisions.
        </span>
      </h1>

      {/* Description Paragraph */}
      <p className="mt-4 text-sm sm:text-base text-slate-300/90 leading-relaxed font-normal">
        FlowLens AI combines advanced AI with real-time analytics to help you{' '}
        <span className="text-cyan-300 font-medium">understand</span>,{' '}
        <span className="text-amber-300 font-medium">predict</span> and{' '}
        <span className="text-fuchsia-300 font-medium">validate</span> your business — faster, smarter, better.
      </p>

      {/* CTA Button Row */}
      <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3">
        <button
          id="hero-start-now-btn"
          onClick={onStartNow}
          className="relative group inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-[0_0_25px_rgba(37,99,235,0.6)] hover:shadow-[0_0_35px_rgba(6,182,212,0.8)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
        >
          <span>Start Now</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          id="hero-explore-btn"
          onClick={onExploreFeatures}
          className="inline-flex items-center gap-2 px-4 py-3 rounded-full text-xs font-semibold text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-slate-700/60 transition-all hover:border-slate-500 backdrop-blur-md cursor-pointer"
        >
          <Activity className="w-3.5 h-3.5 text-cyan-400" />
          <span>Interactive Demo</span>
        </button>

        {onOpenConceptMockup && (
          <button
            id="hero-blueprint-btn"
            onClick={onOpenConceptMockup}
            className="inline-flex items-center gap-2 px-3.5 py-3 rounded-full text-xs font-semibold text-fuchsia-300 hover:text-white bg-fuchsia-950/40 hover:bg-fuchsia-900/60 border border-fuchsia-500/40 transition-all hover:border-fuchsia-400 backdrop-blur-md cursor-pointer shadow-[0_0_15px_rgba(217,70,239,0.2)]"
            title="Inspect Original Holographic Command Architecture Mockup"
          >
            <Eye className="w-3.5 h-3.5 text-fuchsia-400" />
            <span>Blueprint Mockup</span>
          </button>
        )}
      </div>
    </div>
  );
};
