import React, { useState } from 'react';
import {
  X,
  Share2,
  ThumbsUp,
  MessageCircle,
  ExternalLink,
  Copy,
  Check,
  Download,
  Sparkles,
  Globe2,
  MoreHorizontal,
  Bookmark,
  Eye,
  ArrowRight,
  ShieldCheck,
  Brain
} from 'lucide-react';
import conceptImg from '../assets/images/flowlens_concept_mockup.jpg';

interface FacebookFrontEndModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenUnderstandValidate?: () => void;
  playChime?: (freq?: number) => void;
}

export const FacebookFrontEndModal: React.FC<FacebookFrontEndModalProps> = ({
  isOpen,
  onClose,
  onOpenUnderstandValidate,
  playChime,
}) => {
  const [hasLiked, setHasLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(1842);
  const [copiedLink, setCopiedLink] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const triggerSound = (freq = 660) => {
    if (playChime) playChime(freq);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleLike = () => {
    setHasLiked(prev => {
      const next = !prev;
      setLikeCount(c => next ? c + 1 : c - 1);
      triggerSound(next ? 880 : 440);
      return next;
    });
  };

  const handleCopyLink = () => {
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    triggerSound(750);
    showToast('Facebook post link copied to clipboard!');
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleShareFacebook = () => {
    triggerSound(820);
    const shareUrl = encodeURIComponent(window.location.href);
    const quote = encodeURIComponent("Check out FlowLens AI's Holographic Front-End Core — Understand & Continuous Auto-Validation Engine!");
    const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${quote}`;
    window.open(fbShareUrl, '_blank', 'noopener,noreferrer,width=620,height=600');
  };

  const handleDownloadImage = () => {
    triggerSound(680);
    const link = document.createElement('a');
    link.href = conceptImg;
    link.download = 'FlowLens_AI_Understand_Validate_FrontEnd_Core.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Front-end image download initiated');
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200 select-none">
      {/* Background backdrop click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-[130] px-4 py-2.5 rounded-xl bg-cyan-950/95 border border-cyan-400 text-cyan-200 text-xs font-bold shadow-[0_0_25px_rgba(6,182,212,0.6)] backdrop-blur-md flex items-center gap-2 animate-in slide-in-from-top-2">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modal Dialog Card */}
      <div className="relative z-10 w-full max-w-2xl max-h-[92vh] flex flex-col bg-[#0b1020] border border-cyan-500/40 rounded-3xl shadow-[0_0_60px_rgba(6,182,212,0.3)] overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-[#0d1428]">
          <div className="flex items-center gap-3">
            {/* Facebook Blue Logo Emblem */}
            <div className="w-8 h-8 rounded-full bg-[#1877F2] flex items-center justify-center text-white font-bold text-lg shadow-[0_0_12px_rgba(24,119,242,0.5)]">
              f
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">Facebook Front-End Display & Social Card</h3>
                <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/40 text-[10px] font-mono font-bold">
                  LIVE PREVIEW
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Front-end core architecture displayed on Facebook OpenGraph with high-resolution concept image
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Close Preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          
          {/* ========================================================================= */}
          {/* REALISTIC FACEBOOK POST CARD MOCKUP                                       */}
          {/* ========================================================================= */}
          <div className="rounded-2xl bg-[#18191a] border border-[#2e3136] shadow-2xl overflow-hidden text-slate-200 font-sans">
            
            {/* Post Header: Profile & Timestamp */}
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5">
                  <div className="w-full h-full rounded-full bg-[#050814] flex items-center justify-center">
                    <span className="font-tech font-black text-cyan-300 text-base">A</span>
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#1877F2] border-2 border-[#18191a] flex items-center justify-center text-[7px] text-white font-bold">
                    ✓
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-white hover:underline cursor-pointer">
                      FlowLens AI
                    </span>
                    <span className="px-1.5 py-0.2 rounded bg-cyan-950/80 text-[10px] font-bold text-cyan-300 border border-cyan-500/40">
                      Verified Enterprise
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-[#b0b3b8]">
                    <span>Just now</span>
                    <span>·</span>
                    <Globe2 className="w-3 h-3 text-[#b0b3b8]" />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 text-[#b0b3b8]">
                <button className="p-2 hover:bg-[#282a2e] rounded-full transition-colors">
                  <Bookmark className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-[#282a2e] rounded-full transition-colors">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Post Text Description */}
            <div className="px-3.5 pb-3 text-xs sm:text-[13px] text-[#e4e6eb] leading-relaxed">
              <p>
                ⚡ <strong className="text-white">Unveiling the FlowLens AI Front-End Core</strong>: Holographic Command Architecture uniting <strong className="text-cyan-300">Understand</strong> & <strong className="text-fuchsia-300">Continuous Auto-Validation</strong> into a single definitive enterprise pipeline.
              </p>
              <p className="mt-1.5 text-slate-300">
                Transform conversational inputs, transcripts, and documents into structured requirements with live semantic parity validation (94.2% verified score). Explore the 3D Holographic Core 'A' in action! 🧠✨
              </p>
              <p className="mt-2 text-cyan-400 font-medium">
                #FlowLensAI #FrontEndCore #AutoValidation #EnterpriseAI #HolographicDeck
              </p>
            </div>

            {/* Image Rich Media Card (The Concept Mockup Image Display) */}
            <div 
              onClick={() => {
                if (onOpenUnderstandValidate) {
                  onClose();
                  onOpenUnderstandValidate();
                }
              }}
              className="relative w-full overflow-hidden bg-black/90 group cursor-pointer border-t border-b border-[#2e3136]"
            >
              <img
                src={conceptImg}
                alt="FlowLens AI Holographic Command Architecture Mockup on Facebook"
                className="w-full h-auto max-h-[380px] object-cover group-hover:scale-[1.01] transition-transform duration-500"
              />

              {/* Glowing Corner Badge */}
              <div className="absolute top-3 left-3 bg-[#060c1d]/90 backdrop-blur-md px-3 py-1 rounded-xl border border-cyan-400/50 text-[10px] font-mono font-bold text-cyan-300 flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>FRONT-END ARCHITECTURE CORE</span>
              </div>

              {/* Direct Open Button Overlay */}
              <div className="absolute bottom-3 right-3 bg-[#1877F2] hover:bg-[#166fe5] text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(24,119,242,0.6)] transition-all">
                <span>Open Feature</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Rich Link Preview Bar below image */}
            <div 
              onClick={() => {
                if (onOpenUnderstandValidate) {
                  onClose();
                  onOpenUnderstandValidate();
                }
              }}
              className="p-3 bg-[#242526] hover:bg-[#2a2c2e] transition-colors cursor-pointer border-b border-[#3a3b3c] flex items-center justify-between"
            >
              <div className="min-w-0 pr-3">
                <span className="text-[11px] font-mono text-[#b0b3b8] uppercase tracking-wide">
                  FLOWLENSAI.IO / UNDERSTAND-VALIDATE
                </span>
                <h4 className="text-sm font-bold text-white truncate mt-0.5">
                  FlowLens AI — Holographic Understand & Validate Front-End Core
                </h4>
                <p className="text-[11px] text-[#b0b3b8] truncate mt-0.5">
                  Continuous auto-validation, multi-source ingestion, and 94% parity requirements matrix.
                </p>
              </div>

              <button className="px-3.5 py-1.5 rounded-lg bg-[#3a3b3c] hover:bg-[#4e4f50] text-xs font-bold text-white shrink-0">
                Open
              </button>
            </div>

            {/* Engagement Stats: Likes, Comments, Shares */}
            <div className="px-3.5 py-2 flex items-center justify-between text-xs text-[#b0b3b8] border-b border-[#2e3136]">
              <div className="flex items-center gap-1.5">
                <div className="flex items-center -space-x-1">
                  <span className="w-4 h-4 rounded-full bg-[#1877F2] flex items-center justify-center text-[9px] text-white">👍</span>
                  <span className="w-4 h-4 rounded-full bg-[#f02849] flex items-center justify-center text-[9px] text-white">❤️</span>
                  <span className="w-4 h-4 rounded-full bg-[#f7b125] flex items-center justify-center text-[9px] text-white">💡</span>
                </div>
                <span>{likeCount.toLocaleString()}</span>
              </div>

              <div className="flex items-center gap-3">
                <span>328 comments</span>
                <span>512 shares</span>
              </div>
            </div>

            {/* Facebook Action Row (Like, Comment, Share) */}
            <div className="px-2 py-1 flex items-center justify-around text-xs font-semibold text-[#b0b3b8]">
              <button
                onClick={handleToggleLike}
                className={`flex-1 py-1.5 flex items-center justify-center gap-2 rounded-lg hover:bg-[#282a2e] transition-colors cursor-pointer ${
                  hasLiked ? 'text-[#1877F2] font-bold' : ''
                }`}
              >
                <ThumbsUp className={`w-4 h-4 ${hasLiked ? 'fill-[#1877F2]' : ''}`} />
                <span>Like</span>
              </button>

              <button
                onClick={() => {
                  triggerSound(550);
                  showToast('Comments: "Incredible architecture mockup!"');
                }}
                className="flex-1 py-1.5 flex items-center justify-center gap-2 rounded-lg hover:bg-[#282a2e] transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Comment</span>
              </button>

              <button
                onClick={handleShareFacebook}
                className="flex-1 py-1.5 flex items-center justify-center gap-2 rounded-lg hover:bg-[#282a2e] transition-colors cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* QUICK CONTROLS & SOCIAL ACTIONS                                           */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {/* Action 1: Share Directly to Facebook */}
            <button
              onClick={handleShareFacebook}
              className="py-2.5 px-4 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs font-bold shadow-[0_0_20px_rgba(24,119,242,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Directly to Facebook</span>
            </button>

            {/* Action 2: Open Understand & Validate Feature */}
            {onOpenUnderstandValidate && (
              <button
                onClick={() => {
                  onClose();
                  onOpenUnderstandValidate();
                }}
                className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-fuchsia-600 hover:from-cyan-500 hover:to-fuchsia-500 text-white text-xs font-bold shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Brain className="w-4 h-4" />
                <span>Launch Understand & Validate</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Action 3: Copy Post URL */}
            <button
              onClick={handleCopyLink}
              className="py-2 px-4 rounded-xl bg-[#091124] hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-cyan-400" />}
              <span>{copiedLink ? 'Link Copied!' : 'Copy Share URL'}</span>
            </button>

            {/* Action 4: Download Blueprint Image */}
            <button
              onClick={handleDownloadImage}
              className="py-2 px-4 rounded-xl bg-[#091124] hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-fuchsia-400" />
              <span>Download Front-End Image</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
