import React from 'react';
import { Sparkles, Shield, Cpu } from 'lucide-react';

interface BottomFootersProps {
  onLearnMore?: () => void;
}

export const BottomFooters: React.FC<BottomFootersProps> = ({ onLearnMore }) => {
  return (
    <div className="relative z-30 w-full px-6 lg:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs pointer-events-auto">
      {/* Bottom Left Badge: AI Powered */}
      <div 
        onClick={onLearnMore}
        className="group flex items-center gap-3 px-3.5 py-2 rounded-2xl bg-[#091124]/80 backdrop-blur-xl border border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.15)] cursor-pointer hover:border-cyan-400/50 transition-all duration-300"
      >
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white shadow-[0_0_12px_rgba(6,182,212,0.6)]">
          <Cpu className="w-4 h-4" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-white tracking-wide flex items-center gap-1.5">
            AI Powered
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          </span>
          <span className="text-[11px] text-slate-400">
            Built for a smarter tomorrow
          </span>
        </div>
      </div>

      {/* Bottom Right Slogan */}
      <div className="text-center sm:text-right">
        <p className="text-xs sm:text-sm font-medium text-slate-400/90 tracking-wide">
          Transforming Complex Data <span className="text-cyan-400 font-semibold">into Clear Action</span>
        </p>
      </div>
    </div>
  );
};
