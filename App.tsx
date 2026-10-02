/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroTitle } from './components/HeroTitle';
import { RealTimeAnalyticsCard } from './components/RealTimeAnalyticsCard';
import { HolographicCore } from './components/HolographicCore';
import { RightSidebarWidgets } from './components/RightSidebarWidgets';
import { BottomFooters } from './components/BottomFooters';
import { ActionDrawerModal } from './components/ActionDrawerModal';
import { CommandPaletteModal } from './components/CommandPaletteModal';
import { AuthModal } from './components/AuthModal';
import { SecondaryViews } from './components/SecondaryViews';
import { FeatureDetailsModal } from './components/FeatureDetailsModal';
import { UnderstandFeatureView } from './components/UnderstandFeatureView';
import { ConceptMockupModal } from './components/ConceptMockupModal';
import { FacebookFrontEndModal } from './components/FacebookFrontEndModal';
import { NavTab, PipelineStage, ActionTool, HubLocation, TaskItem } from './types';
import heroBackdropImg from './assets/images/flowlens_hero_backdrop_1789926927628.jpg';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [activeStage, setActiveStage] = useState<PipelineStage>('understand');
  const [openedFeature, setOpenedFeature] = useState<PipelineStage | null>(null);
  const [understandViewOpen, setUnderstandViewOpen] = useState(false);
  const [understandInitialMode, setUnderstandInitialMode] = useState<'frontend_core' | 'intake' | 'validation'>('frontend_core');
  const [activeAction, setActiveAction] = useState<ActionTool | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'getstarted' | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isMockupModalOpen, setIsMockupModalOpen] = useState(false);
  const [isFacebookModalOpen, setIsFacebookModalOpen] = useState(false);

  // Play subtle sci-fi Web Audio chime if sound is enabled
  const playChime = (freq = 660, type: OscillatorType = 'sine', force = false) => {
    if (!soundEnabled && !force) return;
    try {
      const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch {
      // Audio context might be restricted before user gesture
    }
  };

  // Stage change handler
  const handleSelectStage = (stage: PipelineStage) => {
    setActiveStage(stage);
    playChime(stage === 'understand' ? 520 : stage === 'predict' ? 660 : 880);
  };

  // Open Feature handler (for the three features: understand, predict, validate)
  const handleOpenFeature = (stage: PipelineStage, initialMode?: 'frontend_core' | 'intake' | 'validation') => {
    setActiveStage(stage);
    if (stage === 'understand' || stage === 'validate') {
      setUnderstandInitialMode(initialMode || (stage === 'validate' ? 'validation' : 'frontend_core'));
      setUnderstandViewOpen(true);
      setActiveTab('features');
      setOpenedFeature(null);
    } else {
      setUnderstandViewOpen(false);
      setOpenedFeature(stage);
    }
    playChime(stage === 'understand' ? 620 : stage === 'predict' ? 760 : 920);
  };

  // Dock action handler
  const handleTriggerAction = (action: ActionTool) => {
    setActiveAction(action);
    playChime(740);
  };

  // Keyboard shortcut listener for ⌘K search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#040714] text-slate-100 flex flex-col justify-between overflow-x-hidden">
      {/* ========================================================================= */}
      {/* 1. CINEMATIC BACKGROUND LAYERS                                            */}
      {/* ========================================================================= */}
      {/* High-res photorealistic sci-fi command deck backdrop */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-30 mix-blend-screen bg-cover bg-center z-0 transition-opacity duration-1000"
        style={{ backgroundImage: `url(${heroBackdropImg})` }}
      />

      {/* Cybernetic Grid & Radial Vignette */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_40%,rgba(6,182,212,0.12),transparent_70%)] z-0" />
      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(to_bottom,rgba(4,7,20,0.85),rgba(4,7,20,0.92))] z-0" />

      {/* Subtle Glowing Floor Line */}
      <div className="fixed bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-cyan-950/20 via-transparent to-transparent pointer-events-none z-0" />

      {/* ========================================================================= */}
      {/* 2. TOP NAVIGATION BAR                                                     */}
      {/* ========================================================================= */}
      {!understandViewOpen && (
        <Navbar
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setActiveTab(tab);
            if (tab === 'features') {
              setUnderstandInitialMode('frontend_core');
              setUnderstandViewOpen(true);
            } else {
              setUnderstandViewOpen(false);
            }
            playChime(440);
          }}
          onOpenSearch={() => setSearchOpen(true)}
          onOpenAuth={(mode) => setAuthMode(mode)}
          soundEnabled={soundEnabled}
          onToggleSound={() => {
            const next = !soundEnabled;
            setSoundEnabled(next);
            if (next) {
              playChime(660, 'sine', true);
            }
          }}
          onOpenConceptMockup={() => setIsMockupModalOpen(true)}
          onOpenFacebookModal={() => setIsFacebookModalOpen(true)}
        />
      )}

      {/* ========================================================================= */}
      {/* 3. MAIN WORKSPACE / INTERACTION STAGE                                     */}
      {/* ========================================================================= */}
      <main className={understandViewOpen ? "relative z-10 w-full min-h-screen p-0" : "relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-4 flex flex-col justify-center"}>
        {understandViewOpen ? (
          /* Dedicated Understand Feature Frontend View */
          <UnderstandFeatureView
            initialMode={understandInitialMode}
            onBackToHome={() => {
              setUnderstandViewOpen(false);
              setActiveTab('home');
            }}
            onSelectStage={(stage) => {
              setActiveStage(stage);
              if (stage === 'understand' || stage === 'validate') {
                setUnderstandInitialMode(stage === 'validate' ? 'validation' : 'frontend_core');
                setUnderstandViewOpen(true);
                setOpenedFeature(null);
              } else {
                handleOpenFeature(stage);
              }
            }}
            playChime={playChime}
          />
        ) : activeTab === 'home' ? (
          <div className="w-full flex flex-col gap-6">
            {/* Desktop Command Deck Grid: Left Column | Center Core | Right Column */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* LEFT COLUMN: Hero Title & Real-Time Analytics Card */}
              <div className="lg:col-span-4 xl:col-span-3.5 flex flex-col gap-6 items-start justify-center order-1">
                <HeroTitle
                  onStartNow={() => setAuthMode('getstarted')}
                  onExploreFeatures={() => {
                    setActiveTab('features');
                    setUnderstandViewOpen(true);
                  }}
                  onOpenConceptMockup={() => setIsMockupModalOpen(true)}
                />

                <div className="w-full mt-2">
                  <RealTimeAnalyticsCard
                    onSelectHub={(hub: HubLocation) => {
                      playChime(600 + hub.ping * 4);
                    }}
                  />
                </div>
              </div>

              {/* CENTER COLUMN: The Holographic Core & Pedestal Dock */}
              <div className="lg:col-span-4 xl:col-span-5 flex flex-col items-center justify-center order-2 sm:my-2">
                <HolographicCore
                  activeStage={activeStage}
                  onSelectStage={handleSelectStage}
                  onTriggerAction={handleTriggerAction}
                  onOpenFeature={handleOpenFeature}
                />
              </div>

              {/* RIGHT COLUMN: Live Performance, Tasks & Global Impact */}
              <div className="lg:col-span-4 xl:col-span-3.5 flex flex-col items-center lg:items-end justify-center order-3">
                <RightSidebarWidgets
                  onTaskClick={(task: TaskItem) => {
                    playChime(task.completed ? 880 : 540);
                  }}
                />
              </div>

            </div>
          </div>
        ) : (
          /* Secondary Views when navigation tab is switched */
          <SecondaryViews
            activeTab={activeTab}
            onBackToHome={() => {
              setUnderstandViewOpen(false);
              setActiveTab('home');
            }}
            onSelectStage={handleSelectStage}
            onOpenFeature={handleOpenFeature}
          />
        )}
      </main>

      {/* ========================================================================= */}
      {/* 4. BOTTOM FOOTER STATUS STRIP                                             */}
      {/* ========================================================================= */}
      {!understandViewOpen && (
        <BottomFooters
          onLearnMore={() => setActiveTab('about')}
        />
      )}

      {/* ========================================================================= */}
      {/* 5. INTERACTIVE MODALS & DRAWERS                                           */}
      {/* ========================================================================= */}
      {/* Feature Details Modal for the three features (Understand, Predict, Validate) */}
      <FeatureDetailsModal
        stage={openedFeature}
        onClose={() => setOpenedFeature(null)}
        onSelectStage={(stage) => {
          handleSelectStage(stage);
          if (stage === 'understand') {
            setOpenedFeature(null);
            setUnderstandViewOpen(true);
            setActiveTab('features');
          }
        }}
        onTriggerAction={handleTriggerAction}
        onOpenCombinedWorkflow={() => {
          setOpenedFeature(null);
          setUnderstandViewOpen(true);
          setActiveTab('features');
          playChime(660);
        }}
      />

      {/* Action Drawer Modal */}
      <ActionDrawerModal
        action={activeAction}
        onClose={() => setActiveAction(null)}
        onSelectStage={handleSelectStage}
      />

      {/* Command Palette (⌘K) */}
      <CommandPaletteModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectTab={setActiveTab}
        onSelectStage={handleSelectStage}
        onTriggerAction={handleTriggerAction}
      />

      {/* Auth Modal (Sign In / Get Started) */}
      <AuthModal
        mode={authMode}
        onClose={() => setAuthMode(null)}
        onSuccess={() => playChime(880)}
      />

      {/* Blueprint Concept Mockup Modal */}
      <ConceptMockupModal
        isOpen={isMockupModalOpen}
        onClose={() => setIsMockupModalOpen(false)}
        onLaunchWorkflow={() => {
          setIsMockupModalOpen(false);
          setUnderstandInitialMode('frontend_core');
          setUnderstandViewOpen(true);
          setActiveTab('features');
          playChime(660);
        }}
      />

      {/* Facebook Front-End Display & Share Modal */}
      <FacebookFrontEndModal
        isOpen={isFacebookModalOpen}
        onClose={() => setIsFacebookModalOpen(false)}
        onOpenUnderstandValidate={() => {
          setIsFacebookModalOpen(false);
          handleOpenFeature('understand', 'frontend_core');
        }}
        playChime={playChime}
      />
    </div>
  );
}
