import React, { useState } from 'react';
import { Search, Menu, X, Sparkles, Volume2, VolumeX, Eye } from 'lucide-react';
import { NavTab } from '../types';

interface NavbarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenSearch: () => void;
  onOpenAuth: (mode: 'signin' | 'getstarted') => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenConceptMockup?: () => void;
  onOpenFacebookModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onOpenSearch,
  onOpenAuth,
  soundEnabled,
  onToggleSound,
  onOpenConceptMockup,
  onOpenFacebookModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'features', label: 'Features' },
    { id: 'solutions', label: 'Solutions' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'resources', label: 'Resources' },
    { id: 'about', label: 'About' },
  ];

  return (
    <header className="relative z-50 w-full px-4 lg:px-10 pt-4 pb-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          id="flowlens-logo"
          onClick={() => onSelectTab('home')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          {/* Glowing Hexagonal Emblem */}
          <div className="relative w-10 h-10 flex items-center justify-center">
            {/* Outer Glow */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-cyan-500/40 via-blue-600/40 to-cyan-400/40 blur-md group-hover:blur-lg transition-all duration-300" />
            
            {/* Hexagonal / Diamond Badge */}
            <div className="relative w-10 h-10 rounded-xl bg-[#091124] border border-cyan-400/60 flex items-center justify-center shadow-[inset_0_0_12px_rgba(6,182,212,0.5)]">
              {/* Stylized A / Optical Lens vector */}
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-cyan-400 fill-none stroke-current stroke-[2.2] stroke-linecap-round stroke-linejoin-round">
                <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" className="stroke-cyan-400/80" />
                <path d="M12 6L17 17H7L12 6Z" fill="rgba(6, 182, 212, 0.25)" className="stroke-cyan-300" />
                <circle cx="12" cy="13" r="1.5" className="fill-cyan-200 stroke-none" />
              </svg>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-cyan-200 transition-colors">
                FlowLens <span className="text-cyan-400">AI</span>
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping opacity-75" />
            </div>
            <span className="text-[11px] text-slate-400 tracking-wide font-medium">
              From Data to Definitive Intelligence
            </span>
          </div>
        </div>

        {/* Desktop Navigation Pills */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 backdrop-blur-xl px-2 py-1.5 rounded-full border border-slate-700/50 shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => onSelectTab(item.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 relative ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_0_16px_rgba(6,182,212,0.6)] font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Sound Ambience Toggle with Dynamic Visual Icon Indicator */}
          <button
            id="sound-toggle-btn"
            onClick={onToggleSound}
            aria-pressed={soundEnabled}
            aria-label={soundEnabled ? 'Mute Interface Audio Effects' : 'Enable Interface Audio Effects'}
            title={soundEnabled ? 'Interface Audio: ACTIVE (Click to Mute)' : 'Interface Audio: MUTED (Click to Enable)'}
            className={`group relative flex items-center gap-2 px-2.5 py-1.5 rounded-full border transition-all duration-300 select-none ${
              soundEnabled
                ? 'bg-cyan-950/50 border-cyan-500/50 text-cyan-300 shadow-[0_0_16px_rgba(6,182,212,0.3)] hover:bg-cyan-900/60 hover:border-cyan-400'
                : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 hover:border-slate-700'
            }`}
          >
            {/* Visual Speaker Icon with status glow and indicator dot */}
            <div className="relative flex items-center justify-center">
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-cyan-400 transition-transform duration-200 group-hover:scale-110" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-400 transition-transform duration-200 group-hover:scale-110" />
              )}
              
              {/* Pulsing beacon dot when sound is active */}
              {soundEnabled && (
                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.9)]" />
                </span>
              )}
            </div>

            {/* Dynamic Equalizer / Audio Wave Level Bars */}
            <div className="flex items-end gap-0.5 h-3.5 px-0.5" aria-hidden="true">
              <span
                className={`w-0.5 rounded-full transition-all duration-300 ${
                  soundEnabled
                    ? 'h-3.5 bg-cyan-400 animate-pulse'
                    : 'h-1.5 bg-slate-600'
                }`}
              />
              <span
                className={`w-0.5 rounded-full transition-all duration-300 ${
                  soundEnabled
                    ? 'h-2 bg-cyan-300 animate-pulse [animation-delay:150ms]'
                    : 'h-1 bg-slate-600'
                }`}
              />
              <span
                className={`w-0.5 rounded-full transition-all duration-300 ${
                  soundEnabled
                    ? 'h-3 bg-cyan-400 animate-pulse [animation-delay:300ms]'
                    : 'h-1.5 bg-slate-600'
                }`}
              />
            </div>

            {/* Text badge indicator */}
            <span
              className={`text-[10px] font-mono font-semibold tracking-wider uppercase transition-colors hidden xl:inline ${
                soundEnabled ? 'text-cyan-300' : 'text-slate-500'
              }`}
            >
              {soundEnabled ? 'AUDIO ON' : 'MUTED'}
            </span>
          </button>

          {/* Blueprint Concept Mockup Button */}
          {onOpenConceptMockup && (
            <button
              id="nav-blueprint-btn"
              onClick={onOpenConceptMockup}
              className="px-3 py-1.5 rounded-full text-xs font-bold text-fuchsia-300 hover:text-white bg-fuchsia-950/50 hover:bg-fuchsia-900/70 border border-fuchsia-500/40 shadow-[0_0_15px_rgba(217,70,239,0.25)] transition-all flex items-center gap-1.5 cursor-pointer"
              title="View Holographic Architecture Mockup"
            >
              <Eye className="w-3.5 h-3.5 text-fuchsia-400" />
              <span className="hidden xl:inline">Blueprint</span>
            </button>
          )}

          {/* Facebook Share / Preview Button */}
          {onOpenFacebookModal && (
            <button
              id="nav-facebook-btn"
              onClick={onOpenFacebookModal}
              className="px-3 py-1.5 rounded-full text-xs font-bold text-white bg-[#1877F2]/80 hover:bg-[#1877F2] border border-blue-400/40 shadow-[0_0_15px_rgba(24,119,242,0.4)] transition-all flex items-center gap-1.5 cursor-pointer"
              title="Display Front-End on Facebook"
            >
              <span className="w-3.5 h-3.5 rounded-full bg-white text-[#1877F2] flex items-center justify-center text-[9px] font-black">f</span>
              <span className="hidden xl:inline">Facebook</span>
            </button>
          )}

          {/* Search Button */}
          <button
            id="nav-search-btn"
            onClick={onOpenSearch}
            className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-slate-800/80 border border-slate-700/60 transition-all flex items-center gap-1.5 text-xs px-3"
          >
            <Search className="w-4 h-4 text-slate-300" />
            <span className="hidden lg:inline text-slate-400 text-[11px] font-mono">⌘K</span>
          </button>

          {/* Sign In */}
          <button
            id="nav-signin-btn"
            onClick={() => onOpenAuth('signin')}
            className="px-4 py-1.5 rounded-full text-xs font-medium text-slate-200 hover:text-white hover:bg-slate-800/70 border border-slate-700/60 transition-colors"
          >
            Sign In
          </button>

          {/* Get Started Button */}
          <button
            id="nav-getstarted-btn"
            onClick={() => onOpenAuth('getstarted')}
            className="relative group px-5 py-1.5 rounded-full text-xs font-semibold text-white overflow-hidden transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:shadow-[0_0_25px_rgba(6,182,212,0.8)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-[length:200%_auto] group-hover:bg-right transition-all duration-500" />
            <span className="relative flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
              Get Started
            </span>
          </button>
        </div>

        {/* Mobile Menu & Sound Controls */}
        <div className="flex sm:hidden items-center gap-2">
          {/* Mobile Visual Sound Toggle */}
          <button
            id="mobile-sound-toggle-btn"
            onClick={onToggleSound}
            aria-pressed={soundEnabled}
            aria-label={soundEnabled ? 'Mute Interface Audio' : 'Enable Interface Audio'}
            title={soundEnabled ? 'Audio: ON (Tap to Mute)' : 'Audio: OFF (Tap to Enable)'}
            className={`p-2 rounded-full border transition-all ${
              soundEnabled
                ? 'bg-cyan-950/50 border-cyan-500/60 text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.35)]'
                : 'bg-slate-900/70 border-slate-800 text-slate-400'
            }`}
          >
            <div className="relative flex items-center justify-center">
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-cyan-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-400" />
              )}
              {soundEnabled && (
                <span className="absolute -top-1 -right-1 flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400" />
                </span>
              )}
            </div>
          </button>

          <button
            id="mobile-search-btn"
            onClick={onOpenSearch}
            className="p-2 text-slate-300 hover:text-white"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            id="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden mt-3 p-4 bg-slate-900/95 backdrop-blur-2xl rounded-2xl border border-slate-800 shadow-2xl flex flex-col gap-2 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`py-2 px-3 rounded-lg text-xs font-semibold text-left transition-all ${
                  activeTab === item.id
                    ? 'bg-blue-600 text-white font-bold'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          
          {/* Mobile Drawer Audio Toggle Row */}
          <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700/50 text-xs mt-1">
            <span className="flex items-center gap-2 text-slate-200 font-medium">
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-cyan-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-400" />
              )}
              Interface Audio
            </span>
            <button
              id="mobile-drawer-sound-btn"
              onClick={onToggleSound}
              className={`px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide transition-all ${
                soundEnabled
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                  : 'bg-slate-700/60 text-slate-400 border border-slate-600'
              }`}
            >
              {soundEnabled ? 'Enabled' : 'Muted'}
            </button>
          </div>

          {/* Mobile Facebook Display Button */}
          {onOpenFacebookModal && (
            <button
              onClick={() => {
                onOpenFacebookModal();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 px-3 rounded-xl bg-[#1877F2]/90 hover:bg-[#1877F2] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(24,119,242,0.4)]"
            >
              <span className="w-4 h-4 rounded-full bg-white text-[#1877F2] flex items-center justify-center text-[10px] font-black">f</span>
              <span>Display Front-End on Facebook</span>
            </button>
          )}

          <div className="h-px bg-slate-800 my-1" />
          <div className="flex gap-2 pt-1">
            <button
              onClick={() => {
                onOpenAuth('signin');
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 rounded-xl text-xs font-medium bg-slate-800 text-slate-200 text-center"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                onOpenAuth('getstarted');
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-center shadow-lg"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
