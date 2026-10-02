import React, { useState, useEffect, useRef } from 'react';
import {
  Brain,
  ShieldCheck,
  CheckCircle2,
  Mic,
  FileText,
  MessageSquare,
  Sparkles,
  UploadCloud,
  Check,
  Zap,
  Target,
  Shield,
  BarChart2,
  FileCheck,
  Cpu,
  Layers,
  Clock,
  ChevronRight,
  Eye,
  Download,
  AlertTriangle,
  RotateCcw,
  Sliders,
  Search,
  Bell,
  Home,
  FolderKanban,
  FileCode,
  UserCheck,
  Users,
  GitFork,
  Activity,
  ClipboardCheck,
  X,
  ChevronDown,
  ArrowRight,
  Lock,
  Scale,
  HelpCircle,
  Edit3,
  Split,
  ListPlus,
  UserPlus,
  ArrowLeft,
  FileSpreadsheet,
  CheckSquare,
  RefreshCw,
  Info,
  Share2,
  ExternalLink,
  Copy,
  Play,
  Square,
  Volume2,
  HardDrive,
  FilePlus,
  Maximize2
} from 'lucide-react';
import { PipelineStage } from '../types';
import { FacebookFrontEndModal } from './FacebookFrontEndModal';
import { AllViewsFullScreenModal } from './understand/AllViewsFullScreenModal';
import { FullProjectReportModal } from './understand/FullProjectReportModal';

interface UnderstandFeatureViewProps {
  onBackToHome: () => void;
  onSelectStage: (stage: PipelineStage) => void;
  playChime?: (freq?: number) => void;
  initialMode?: 'frontend_core' | 'intake' | 'validation';
}

interface ExtractedRequirement {
  id: string;
  title: string;
  category: 'Performance' | 'Scalability' | 'Business Rule' | 'Security' | 'Timeline';
  priority: 'High' | 'Medium' | 'Low';
  confidence: number;
  description: string;
  acceptanceCriteria: string[];
}

export const UnderstandFeatureView: React.FC<UnderstandFeatureViewProps> = ({
  onBackToHome,
  onSelectStage,
  playChime,
}) => {
  // Top Navigation & Project Selection
  const [selectedProject, setSelectedProject] = useState('SmartPay Enterprise');
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [activeSidebarNav, setActiveSidebarNav] = useState('understand');
  const [isFacebookModalOpen, setIsFacebookModalOpen] = useState(false);

  // Search filter
  const [searchFilter, setSearchFilter] = useState('');

  // 1. Project Information Form State
  const [projectName, setProjectName] = useState('SmartPay Enterprise Platform');
  const [clientName, setClientName] = useState('ABC Technologies');
  const [projectType, setProjectType] = useState('Payment Platform');
  const [industry, setIndustry] = useState('FinTech');

  // 2. Input Method State (Text Input | Audio | Documents)
  const [inputTab, setInputTab] = useState<'text' | 'audio' | 'documents'>('text');
  const [conversationNotes, setConversationNotes] = useState(
`During the client meeting, the customer mentioned:
- They want the platform to support 40,000 transactions per second.
- Must have 100,000 concurrent users.
- Only verified customers above 18 can register.
- Payment transactions must be encrypted.
- Need production deployment by December.`
  );

  // Audio recording simulation
  const [isRecording, setIsRecording] = useState(false);
  const [recordDuration, setRecordDuration] = useState(0);

  // File upload simulation
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 3. AI Analysis Progress & Checklist State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiProgress, setAiProgress] = useState(75);
  const [analysisStatus, setAnalysisStatus] = useState({
    textExtraction: 'completed' as 'pending' | 'in_progress' | 'completed',
    entityDetection: 'completed' as 'pending' | 'in_progress' | 'completed',
    requirementAnalysis: 'completed' as 'pending' | 'in_progress' | 'completed',
    classification: 'completed' as 'pending' | 'in_progress' | 'completed',
    generatingOutput: 'in_progress' as 'pending' | 'in_progress' | 'completed',
  });

  // 4. Extracted Intelligence Tab & Requirements State
  const [activeFilterTab, setActiveFilterTab] = useState<'requirements' | 'rules' | 'assumptions'>('requirements');
  const [requirementsList, setRequirementsList] = useState<ExtractedRequirement[]>([
    {
      id: 'REQ-1042',
      title: 'System must support 40,000 TPS',
      category: 'Performance',
      priority: 'High',
      confidence: 96,
      description: 'The transactional engine must process 40,000 write ops/sec with P99 latency below 35ms across multi-region sharded clusters.',
      acceptanceCriteria: ['Load test at 45,000 TPS for 2 hours with 0 error rate', 'P99 response time <= 35ms', 'Automatic failover under 500ms']
    },
    {
      id: 'REQ-1043',
      title: 'System must support 100,000 users',
      category: 'Scalability',
      priority: 'High',
      confidence: 94,
      description: 'Platform concurrent sessions must maintain active state for at least 100,000 simultaneous verified enterprise accounts.',
      acceptanceCriteria: ['Concurrent session stress test with token replication', 'Zero session drop during node scaling']
    },
    {
      id: 'REQ-1044',
      title: 'Only verified customers above 18 can register',
      category: 'Business Rule',
      priority: 'Medium',
      confidence: 92,
      description: 'Mandatory KYC identity verification enforcing age >= 18 at registration gateway prior to wallet funding.',
      acceptanceCriteria: ['Automated government ID validation check', 'Under-18 immediate registration rejection flag']
    },
    {
      id: 'REQ-1045',
      title: 'Payment transactions must be encrypted',
      category: 'Security',
      priority: 'High',
      confidence: 95,
      description: 'End-to-end envelope encryption using AES-256-GCM in transit and RSA-4096 HSM key custody at rest.',
      acceptanceCriteria: ['PCI-DSS level 1 cryptographic compliance', 'Zero plaintext PAN in audit logs']
    },
    {
      id: 'REQ-1046',
      title: 'Production deployment by December',
      category: 'Timeline',
      priority: 'Medium',
      confidence: 88,
      description: 'Full SOC2 audited production rollout to primary AWS eu-west-1 region scheduled before December 15th.',
      acceptanceCriteria: ['Staging signoff by Nov 15th', 'Production canary deployment by Dec 1st']
    },
  ]);

  // 5. Add Documents List
  const [documents, setDocuments] = useState([
    { id: 'doc-1', name: 'Architecture Document.pdf', size: '2.4 MB', type: 'PDF' },
    { id: 'doc-2', name: 'Client SRS.docx', size: '1.8 MB', type: 'DOCX' },
    { id: 'doc-3', name: 'Contract.pdf', size: '1.2 MB', type: 'PDF' },
    { id: 'doc-4', name: 'Project Plan.xlsx', size: '980 KB', type: 'XLSX' },
  ]);

  // 6. Validate Documents Progress & Checklist State
  const [isValidating, setIsValidating] = useState(false);
  const [validateProgress, setValidateProgress] = useState(80);
  const [validationStatus, setValidationStatus] = useState({
    documentParsing: 'completed' as 'pending' | 'in_progress' | 'completed',
    fieldExtraction: 'completed' as 'pending' | 'in_progress' | 'completed',
    crossComparison: 'completed' as 'pending' | 'in_progress' | 'completed',
    ruleValidation: 'completed' as 'pending' | 'in_progress' | 'completed',
    generatingResults: 'in_progress' as 'pending' | 'in_progress' | 'completed',
  });

  // 7. Validation Results State
  const [validationScore, setValidationScore] = useState(72);
  const [validationMetrics, setValidationMetrics] = useState({
    matchedFields: 8,
    conflicts: 2,
    missingInfo: 1,
  });

  // Modals state
  const [activeModal, setActiveModal] = useState<
    'inconsistency' | 'req_detail' | 'report' | 'compare' | 'action' | 'owner' | null
  >(null);
  const [selectedReq, setSelectedReq] = useState<ExtractedRequirement | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New states for Step 3 (AI Analysis points one by one), Step 4 (Fullscreen), Step 5 (Resources & Tools & 5 points), Step 7 (Full Report)
  const [isAllViewsModalOpen, setIsAllViewsModalOpen] = useState(false);
  const [isFullReportModalOpen, setIsFullReportModalOpen] = useState(false);
  const [visibleAiPoints, setVisibleAiPoints] = useState(3);
  const [isRequirementsReady, setIsRequirementsReady] = useState(false);
  const [hasFileAccess, setHasFileAccess] = useState(true);
  const [isVoiceMemoPlaying, setIsVoiceMemoPlaying] = useState(false);
  const [memoDuration, setMemoDuration] = useState(0);
  const card5Ref = useRef<HTMLDivElement>(null);

  const triggerSound = (freq = 600) => {
    if (playChime) playChime(freq);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Recording timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordDuration((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordDuration(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // Voice memo simulation player
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isVoiceMemoPlaying) {
      interval = setInterval(() => {
        setMemoDuration((prev) => {
          if (prev >= 45) {
            setIsVoiceMemoPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isVoiceMemoPlaying]);

  // Handle "✦ Analyze with AI →" with 3 AI points coming in one by one
  const handleAnalyzeWithAI = () => {
    triggerSound(680);
    setIsAnalyzing(true);
    setVisibleAiPoints(0);
    setAiProgress(20);
    setAnalysisStatus({
      textExtraction: 'in_progress',
      entityDetection: 'pending',
      requirementAnalysis: 'pending',
      classification: 'pending',
      generatingOutput: 'pending',
    });
    showToast('AI Initiating Multi-Modal Intake & Analysis...');

    // Point 1 arrives at 600ms
    setTimeout(() => {
      triggerSound(620);
      setVisibleAiPoints(1);
      setAiProgress(50);
      setAnalysisStatus(prev => ({
        ...prev,
        textExtraction: 'completed',
        entityDetection: 'completed',
        requirementAnalysis: 'in_progress'
      }));
      showToast('✦ Point 1: Multi-Modal Semantic Ingestion & Entity Mapping');
    }, 600);

    // Point 2 arrives at 1300ms
    setTimeout(() => {
      triggerSound(750);
      setVisibleAiPoints(2);
      setAiProgress(80);
      setAnalysisStatus(prev => ({
        ...prev,
        requirementAnalysis: 'completed',
        classification: 'completed',
        generatingOutput: 'in_progress'
      }));
      showToast('✦ Point 2: Architecture & Security Protocol Decomposition');
    }, 1300);

    // Point 3 arrives at 2000ms
    setTimeout(() => {
      triggerSound(920);
      setVisibleAiPoints(3);
      setAiProgress(100);
      setAnalysisStatus({
        textExtraction: 'completed',
        entityDetection: 'completed',
        requirementAnalysis: 'completed',
        classification: 'completed',
        generatingOutput: 'completed'
      });
      setIsAnalyzing(false);
      showToast('✦ Point 3: Discrepancy & Constraint Synthesis — 3 AI Points Completed!');
    }, 2000);
  };

  // Handle "Validate Documents" trigger
  const handleRunValidation = () => {
    triggerSound(720);
    setIsValidating(true);
    showToast('Cross-checking extracted requirements against documents...');
    setValidateProgress(90);

    setTimeout(() => {
      triggerSound(880);
      setValidateProgress(100);
      setValidationStatus(prev => ({ ...prev, generatingResults: 'completed' }));
      setValidationScore(94);
      setValidationMetrics({
        matchedFields: 10,
        conflicts: 1,
        missingInfo: 0,
      });
      setIsValidating(false);
      showToast('Validation Complete! Parity raised to 94%.');
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full bg-[#040714] text-slate-100 flex flex-col font-sans select-none overflow-x-hidden">
      
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 px-4 py-2.5 rounded-xl bg-cyan-950/95 border border-cyan-400 text-cyan-200 text-xs font-bold shadow-[0_0_30px_rgba(6,182,212,0.6)] backdrop-blur-md animate-in slide-in-from-top-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. TOP HEADER BAR (Exact match to HandoffGuard AI Header in Screenshot)   */}
      {/* ========================================================================= */}
      <header className="h-14 w-full bg-[#040714]/95 border-b border-slate-800/80 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md">
        
        {/* Left: Brand Emblem & Title */}
        <div 
          onClick={onBackToHome}
          className="flex items-center gap-3 cursor-pointer group"
          title="Return to FlowLens AI Command Deck"
        >
          {/* Glowing Circular "A" Emblem */}
          <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-500 p-0.5 shadow-[0_0_15px_rgba(6,182,212,0.6)] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#040714] rounded-full flex items-center justify-center">
              <span className="font-tech font-black text-cyan-300 text-base tracking-tighter">A</span>
            </div>
          </div>

          <div>
            <div className="text-sm font-black tracking-wide text-white leading-none">
              HandoffGuard AI
            </div>
            <div className="text-[10px] font-medium text-slate-400 tracking-wider leading-tight mt-0.5 flex items-center gap-1.5">
              <span className="text-cyan-400">Understand</span>
              <span className="text-slate-600">•</span>
              <span className="text-amber-400">Predict</span>
              <span className="text-slate-600">•</span>
              <span className="text-fuchsia-400">Validate</span>
            </div>
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search projects, requirements, documents..."
              className="w-full h-9 pl-9 pr-16 bg-[#091124] border border-slate-800 hover:border-slate-700 focus:border-cyan-500/80 rounded-xl text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none transition-colors"
            />
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400 border border-slate-700/80 bg-slate-900/80 px-1.5 py-0.5 rounded">
              Ctrl + K
            </span>
          </div>
        </div>

        {/* Right: Project Selector, Facebook Display, Notifications & User Avatar */}
        <div className="flex items-center gap-2.5">
          {/* Project Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProjectDropdownOpen(prev => !prev)}
              className="flex items-center gap-2 h-9 px-3 rounded-xl bg-[#091124] border border-slate-800 hover:border-slate-700 text-xs text-slate-200 font-semibold transition-colors cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span className="truncate max-w-[130px]">{selectedProject}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isProjectDropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-52 rounded-xl bg-[#070e20] border border-slate-700/80 shadow-[0_10px_30px_rgba(0,0,0,0.8)] p-1 z-50 animate-in fade-in zoom-in-95">
                {['SmartPay Enterprise', 'OmniPlatform Global', 'FinSafe Gateway', 'CloudVault Infrastructure'].map(proj => (
                  <button
                    key={proj}
                    onClick={() => {
                      setSelectedProject(proj);
                      setIsProjectDropdownOpen(false);
                      triggerSound(550);
                      showToast(`Switched workspace to ${proj}`);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      selectedProject === proj ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-300 hover:bg-slate-800/80'
                    }`}
                  >
                    {proj}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Facebook Preview / Display Button */}
          <button
            onClick={() => {
              triggerSound(700);
              setIsFacebookModalOpen(true);
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1877F2]/90 hover:bg-[#1877F2] text-white text-xs font-bold transition-all shadow-[0_0_12px_rgba(24,119,242,0.4)] cursor-pointer"
            title="Display Front-End on Facebook"
          >
            <span className="w-3.5 h-3.5 rounded-full bg-white text-[#1877F2] flex items-center justify-center text-[9px] font-black">f</span>
            <span>Display on Facebook</span>
          </button>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => {
                setIsNotificationsOpen(prev => !prev);
                triggerSound(600);
              }}
              className="relative w-9 h-9 rounded-xl bg-[#091124] border border-slate-800 hover:border-slate-700 flex items-center justify-center text-slate-300 transition-colors cursor-pointer"
            >
              <Bell className="w-4 h-4 text-slate-300" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-1.5 w-72 rounded-xl bg-[#070e20] border border-slate-700/80 shadow-[0_10px_30px_rgba(0,0,0,0.8)] p-3 z-50 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs font-bold text-white">
                  <span>Notifications (1 Unread)</span>
                  <span className="text-[10px] text-cyan-400 font-mono">1m ago</span>
                </div>
                <div 
                  onClick={() => {
                    setIsNotificationsOpen(false);
                    setActiveModal('inconsistency');
                  }}
                  className="mt-2.5 p-2 rounded-lg bg-red-950/30 border border-red-500/30 text-xs cursor-pointer hover:bg-red-950/50 transition-colors"
                >
                  <div className="flex items-center gap-1.5 text-red-400 font-bold text-[11px]">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Inconsistency Detected</span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                    Requirement REQ-1042 (40,000 TPS) exceeds Architecture Doc benchmark (25,000 TPS).
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* User Profile (Sunny S) */}
          <div className="flex items-center gap-2.5 pl-2 border-l border-slate-800">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-600 to-blue-700 text-white font-bold text-xs flex items-center justify-center border border-cyan-400/60 shadow-[0_0_10px_rgba(6,182,212,0.4)]">
              SS
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-bold text-white leading-none">Sunny S</div>
              <div className="text-[10px] text-slate-400 leading-tight mt-0.5">Project Manager</div>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. BODY LAYOUT: LEFT SIDEBAR + WORKSPACE STAGE                            */}
      {/* ========================================================================= */}
      <div className="flex-1 flex w-full">
        
        {/* LEFT SIDEBAR NAVIGATION */}
        <aside className="w-56 shrink-0 bg-[#040714] border-r border-slate-800/80 p-3 hidden lg:flex flex-col justify-between select-none">
          {/* Top Nav List */}
          <div className="space-y-1">
            <button
              onClick={() => {
                triggerSound(400);
                onBackToHome();
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900/60 transition-colors cursor-pointer group"
            >
              <Home className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
              <span>Home</span>
            </button>

            {[
              { id: 'projects', label: 'Projects', icon: FolderKanban },
              { id: 'requirements', label: 'Requirements', icon: FileText },
              { id: 'conversations', label: 'Conversations', icon: MessageSquare },
              { id: 'documents', label: 'Documents', icon: FileCode },
              { id: 'responsibilities', label: 'Responsibilities', icon: UserCheck },
              { id: 'resources', label: 'Resources', icon: Users },
              { id: 'dependencies', label: 'Dependencies', icon: GitFork },
              { id: 'risks', label: 'Risks', icon: AlertTriangle },
              { id: 'simulation', label: 'Simulation', icon: Activity },
              { id: 'outcomes', label: 'Outcomes', icon: ClipboardCheck },
              { id: 'reports', label: 'Reports', icon: BarChart2 },
            ].map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSidebarNav(item.id);
                    triggerSound(500);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    activeSidebarNav === item.id
                      ? 'text-white bg-slate-900/80 border border-slate-800'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/40'
                  }`}
                >
                  <Icon className="w-4 h-4 text-slate-400" />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* HIGHLIGHTED ACTIVE CARD: Understand + Validate */}
            <div className="pt-2">
              <div className="w-full p-2.5 rounded-xl bg-gradient-to-r from-blue-950 via-cyan-950 to-blue-900 border border-cyan-400/80 shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center gap-2.5 cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-cyan-900/80 border border-cyan-400/70 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(6,182,212,0.5)]">
                  <Brain className="w-4 h-4 text-cyan-300 animate-pulse" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-white tracking-wide truncate">
                    Understand + Validate
                  </div>
                  <div className="text-[10px] text-cyan-300/90 truncate">
                    Requirements Intelligence
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Sidebar Items */}
          <div className="space-y-1 pt-4 border-t border-slate-800/80">
            <button 
              onClick={() => showToast('AI Assistant is actively monitoring validation parity.')}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900/50 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>AI Assistant</span>
            </button>

            <button 
              onClick={() => setIsNotificationsOpen(prev => !prev)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900/50 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Bell className="w-4 h-4 text-slate-400" />
                <span>Notifications</span>
              </div>
              <span className="w-4 h-4 rounded-full bg-red-600 text-white text-[9px] font-bold flex items-center justify-center">
                3
              </span>
            </button>

            <button 
              onClick={() => showToast('Workspace settings configured for SmartPay Enterprise.')}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900/50 transition-colors"
            >
              <Sliders className="w-4 h-4 text-slate-400" />
              <span>Settings</span>
            </button>

            {/* Bottom Workspace Badge */}
            <div className="mt-3 p-2 rounded-xl bg-[#060a18] border border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-6 h-6 rounded-full bg-cyan-600/30 border border-cyan-400/50 flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold text-cyan-300">A</span>
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-bold text-white truncate">HandoffGuard AI</div>
                  <div className="text-[9px] text-slate-400 truncate">Smarter Project Intelligence</div>
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            </div>
          </div>
        </aside>

        {/* ========================================================================= */}
        {/* MAIN WORKSPACE CONTENT: EXACT MATCH TO USER'S UPLOADED SCREENSHOT         */}
        {/* ========================================================================= */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#030612] px-3 sm:px-5 py-3.5 overflow-y-auto space-y-4">
          
          {/* Top Quick Actions Row: Return to Command Deck & Close */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                triggerSound(420);
                onBackToHome();
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>Return to Command Deck</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsFacebookModalOpen(true)}
                className="inline-flex sm:hidden items-center gap-1 px-2.5 py-1 rounded-lg bg-[#1877F2] text-white text-[11px] font-bold"
              >
                <span>f</span>
                <span>Facebook</span>
              </button>

              <button
                onClick={() => {
                  triggerSound(400);
                  onBackToHome();
                }}
                className="flex items-center gap-1 px-3 py-1 rounded-xl bg-slate-900 border border-slate-700/80 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Close</span>
              </button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* TOP BANNER: Understand + Validate & 5-Step Process Flow                   */}
          {/* ========================================================================= */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#080d1e] border border-blue-500/30 shadow-[0_4px_30px_rgba(0,0,0,0.6)] flex flex-col xl:flex-row xl:items-center justify-between gap-4">
            
            {/* Left: Glowing Icon & Title */}
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 p-0.5 shadow-[0_0_20px_rgba(6,182,212,0.5)] shrink-0 flex items-center justify-center">
                <div className="w-full h-full bg-[#080d1e] rounded-2xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-cyan-300" />
                </div>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black tracking-wide text-white">
                  Understand + Validate
                </h1>
                <p className="text-xs text-slate-300/90 mt-0.5 max-w-xl">
                  Convert conversations and documents into structured requirements and validate them against your project data.
                </p>
              </div>
            </div>

            {/* Right: Sequential 5-Step Process Flow (Exact Stepper from Screenshot) */}
            <div className="flex items-center gap-2 overflow-x-auto py-1">
              {[
                { num: '1', title: 'Understand', desc: 'Extract Intelligence', active: true },
                { num: '2', title: 'Documents', desc: 'Add Project Documents', active: false },
                { num: '3', title: 'Analyze', desc: 'AI Processing', active: false },
                { num: '4', title: 'Validate', desc: 'Check & Verify', active: false },
                { num: '5', title: 'Results', desc: 'View Insights', active: false },
              ].map((step, index, arr) => (
                <React.Fragment key={step.num}>
                  <div className="flex items-center gap-2 shrink-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                      step.active 
                        ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.8)] border border-blue-400' 
                        : 'bg-[#091124] text-slate-400 border border-slate-700'
                    }`}>
                      {step.num}
                    </div>
                    <div className="text-left">
                      <div className={`text-xs font-bold ${step.active ? 'text-white' : 'text-slate-300'}`}>
                        {step.title}
                      </div>
                      <div className="text-[10px] text-slate-400 whitespace-nowrap">
                        {step.desc}
                      </div>
                    </div>
                  </div>
                  {index < arr.length - 1 && (
                    <span className="text-slate-600 text-xs px-1">→</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* ROW 1: FOUR CARDS ACROSS (Exact layout from uploaded image)               */}
          {/* Card 1: 1. Project Information                                            */}
          {/* Card 2: 2. Understand - Input                                             */}
          {/* Card 3: 3. AI Analysis                                                    */}
          {/* Card 4: 4. Extracted Intelligence                                         */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-stretch">
            
            {/* ----------------------------------------------------------------------- */}
            {/* CARD 1: 1. Project Information                                          */}
            {/* ----------------------------------------------------------------------- */}
            <div className="p-4 rounded-2xl bg-[#080d1e] border border-blue-500/30 shadow-[0_4px_25px_rgba(0,0,0,0.5)] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-1 text-white">
                  <div className="w-6 h-6 rounded-lg bg-blue-950/80 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-sm font-bold tracking-wide">1. Project Information</h3>
                </div>
                <p className="text-[11px] text-slate-400 mb-3">
                  Provide basic project details to get accurate insights.
                </p>

                <div className="space-y-2.5 text-xs">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Project Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      className="w-full h-8 px-3 rounded-lg bg-[#040714] border border-slate-700/80 focus:border-cyan-400 text-xs text-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Client <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full h-8 px-3 rounded-lg bg-[#040714] border border-slate-700/80 focus:border-cyan-400 text-xs text-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        Project Type <span className="text-red-400">*</span>
                      </label>
                      <select
                        value={projectType}
                        onChange={(e) => setProjectType(e.target.value)}
                        className="w-full h-8 px-2 rounded-lg bg-[#040714] border border-slate-700/80 focus:border-cyan-400 text-xs text-white focus:outline-none cursor-pointer"
                      >
                        <option value="Payment Platform">Payment Platform</option>
                        <option value="Enterprise ERP">Enterprise ERP</option>
                        <option value="AI Analytics Hub">AI Analytics Hub</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        Industry <span className="text-red-400">*</span>
                      </label>
                      <select
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        className="w-full h-8 px-2 rounded-lg bg-[#040714] border border-slate-700/80 focus:border-cyan-400 text-xs text-white focus:outline-none cursor-pointer"
                      >
                        <option value="FinTech">FinTech</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="E-Commerce">E-Commerce</option>
                        <option value="Logistics">Logistics</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 flex justify-end">
                <button
                  onClick={() => {
                    triggerSound(550);
                    showToast('Project info validated. Ready for conversation input.');
                  }}
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                >
                  <span>Next</span>
                  <span>→</span>
                </button>
              </div>
            </div>

            {/* ----------------------------------------------------------------------- */}
            {/* CARD 2: 2. Understand - Input                                           */}
            {/* ----------------------------------------------------------------------- */}
            <div className="p-4 rounded-2xl bg-[#080d1e] border border-blue-500/30 shadow-[0_4px_25px_rgba(0,0,0,0.5)] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-1 text-white">
                  <div className="w-6 h-6 rounded-lg bg-blue-950/80 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
                    <MessageSquare className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-sm font-bold tracking-wide">2. Understand - Input</h3>
                </div>
                <p className="text-[11px] text-slate-400 mb-2.5">
                  Add your conversation or meeting data to extract requirements.
                </p>

                {/* Input Method Pills: [Text Input] [Audio] [Documents] */}
                <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-[#040714] border border-slate-800 mb-2.5">
                  <button
                    onClick={() => {
                      setInputTab('text');
                      triggerSound(520);
                    }}
                    className={`flex items-center justify-center gap-1 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      inputTab === 'text'
                        ? 'bg-blue-600 text-white shadow-[0_0_10px_rgba(37,99,235,0.6)]'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <FileText className="w-3 h-3" />
                    <span>Text Input</span>
                  </button>

                  <button
                    onClick={() => {
                      setInputTab('audio');
                      triggerSound(540);
                    }}
                    className={`flex items-center justify-center gap-1 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      inputTab === 'audio'
                        ? 'bg-blue-600 text-white shadow-[0_0_10px_rgba(37,99,235,0.6)]'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Mic className="w-3 h-3" />
                    <span>Audio</span>
                  </button>

                  <button
                    onClick={() => {
                      setInputTab('documents');
                      triggerSound(560);
                    }}
                    className={`flex items-center justify-center gap-1 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      inputTab === 'documents'
                        ? 'bg-blue-600 text-white shadow-[0_0_10px_rgba(37,99,235,0.6)]'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <FileCode className="w-3 h-3" />
                    <span>Documents</span>
                  </button>
                </div>

                {/* TAB 1: TEXT INPUT */}
                {inputTab === 'text' && (
                  <div className="space-y-2">
                    <div className="relative">
                      <textarea
                        rows={5}
                        value={conversationNotes}
                        onChange={(e) => setConversationNotes(e.target.value)}
                        className="w-full p-2 rounded-xl bg-[#040714] border border-slate-700/80 focus:border-cyan-400 text-[11px] text-slate-100 placeholder:text-slate-500 focus:outline-none resize-none leading-relaxed font-sans"
                      />
                      <span className="absolute bottom-2 right-2 text-[10px] font-mono text-slate-400">
                        {conversationNotes.length}/2000
                      </span>
                    </div>

                    {/* Quick Presets */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-mono text-slate-400">Templates:</span>
                      <button
                        type="button"
                        onClick={() => {
                          setConversationNotes(`During the client meeting, the customer mentioned:
- They want the platform to support 40,000 transactions per second.
- Must have 100,000 concurrent users.
- Only verified customers above 18 can register.
- Payment transactions must be encrypted.
- Need production deployment by December.`);
                          triggerSound(600);
                          showToast('Loaded FinTech High-TPS Bank notes');
                        }}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-700 cursor-pointer"
                      >
                        FinTech 40k TPS
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setConversationNotes(`Customer discovery session notes:
- Global multi-currency payment checkout gateway with Stripe integration.
- Peak throughput target of 25,000 TPS on Black Friday.
- PCI-DSS level 1 security and automated fraud chargeback prevention.
- SOC2 compliant logging and KYC verification.`);
                          triggerSound(600);
                          showToast('Loaded E-Commerce notes');
                        }}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 cursor-pointer"
                      >
                        E-Commerce Scale
                      </button>
                    </div>
                  </div>
                )}

                {/* TAB 2: AUDIO INTAKE */}
                {inputTab === 'audio' && (
                  <div className="p-3 rounded-xl bg-[#040714] border border-slate-800 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${isRecording ? 'bg-red-500 animate-ping' : 'bg-slate-600'}`} />
                        <span className="text-xs font-bold text-white">
                          {isRecording ? 'Recording Live Audio...' : 'Audio Input Ready'}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-cyan-300 font-bold">
                        {isRecording ? `00:${recordDuration < 10 ? '0' : ''}${recordDuration}` : '00:45'}
                      </span>
                    </div>

                    {/* Animated Audio Equalizer Visualizer */}
                    <div className="h-10 rounded-lg bg-[#060c22] border border-slate-800/80 flex items-center justify-center gap-1.5 px-4 overflow-hidden">
                      {[14, 28, 40, 24, 36, 18, 30, 22, 34, 16, 26, 38].map((h, i) => (
                        <div
                          key={i}
                          style={{
                            height: isRecording || isVoiceMemoPlaying ? `${Math.max(8, (h * ((i % 3) + 1)) % 36)}px` : '6px',
                            transition: 'height 0.15s ease'
                          }}
                          className={`w-1.5 rounded-full ${
                            isRecording
                              ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]'
                              : isVoiceMemoPlaying
                                ? 'bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]'
                                : 'bg-slate-700'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Audio Controls */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          const next = !isRecording;
                          setIsRecording(next);
                          triggerSound(next ? 700 : 500);
                          if (!next) {
                            showToast('Voice memo transcribed: 40k TPS & 18+ KYC extracted!');
                          }
                        }}
                        className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          isRecording
                            ? 'bg-red-600 text-white shadow-[0_0_12px_rgba(239,68,68,0.7)]'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                        }`}
                      >
                        <Mic className="w-3.5 h-3.5" />
                        <span>{isRecording ? 'Stop Recording' : 'Record Audio'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          const next = !isVoiceMemoPlaying;
                          setIsVoiceMemoPlaying(next);
                          triggerSound(next ? 660 : 440);
                          if (next) showToast('Playing client discovery audio memo (0:45)...');
                        }}
                        className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          isVoiceMemoPlaying
                            ? 'bg-cyan-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.7)]'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                        }`}
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>{isVoiceMemoPlaying ? 'Stop Memo' : 'Play Client Memo'}</span>
                      </button>
                    </div>

                    <div className="p-2 rounded-lg bg-[#020510] border border-slate-800/80 text-[10px] text-slate-300 leading-relaxed">
                      <span className="text-[9px] font-mono text-cyan-300 block mb-0.5">AUTO-TRANSCRIPT PREVIEW:</span>
                      "Customer requested 40k TPS throughput, 100k concurrent active accounts, strict 18+ KYC onboarding gate, and AES-256 encrypted payments with December delivery."
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setConversationNotes(
`During the client meeting, the customer mentioned:
- They want the platform to support 40,000 transactions per second.
- Must have 100,000 concurrent users.
- Only verified customers above 18 can register.
- Payment transactions must be encrypted.
- Need production deployment by December.`
                        );
                        triggerSound(680);
                        showToast('Audio transcript inserted into intake notes!');
                      }}
                      className="w-full py-1 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 text-cyan-300 text-[11px] font-bold border border-blue-500/40 flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Check className="w-3 h-3 text-cyan-400" />
                      <span>Sync Audio Transcript into Notes</span>
                    </button>
                  </div>
                )}

                {/* TAB 3: DOCUMENTS & FILE ACCESS */}
                {inputTab === 'documents' && (
                  <div className="p-3 rounded-xl bg-[#040714] border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <HardDrive className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="text-xs font-bold text-white">Repository Files</span>
                      </div>
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                        {hasFileAccess ? 'Access Granted' : 'Access Restricted'}
                      </span>
                    </div>

                    <div className="space-y-1">
                      {[
                        { name: 'Architecture_v2.4.pdf', size: '2.4 MB', type: 'PDF' },
                        { name: 'Client_SRS_Notes.docx', size: '1.8 MB', type: 'DOCX' },
                        { name: 'Security_Contract.pdf', size: '1.2 MB', type: 'PDF' },
                        { name: 'Project_Plan.xlsx', size: '980 KB', type: 'XLSX' },
                      ].map((f, i) => (
                        <div key={i} className="flex items-center justify-between p-1.5 rounded-lg bg-[#060c22] border border-slate-800 text-[10px]">
                          <div className="flex items-center gap-1.5 truncate">
                            <span className="text-cyan-400 font-mono">📄</span>
                            <span className="text-white truncate">{f.name}</span>
                          </div>
                          <span className="text-slate-400 font-mono shrink-0 ml-1">{f.size}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex-1 py-1.5 px-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold shadow-[0_0_10px_rgba(37,99,235,0.5)] flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <FilePlus className="w-3.5 h-3.5" />
                        <span>Give Access / Add Files</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Actions: [<-] [ ✨ Analyze with AI -> ] [Next ->] */}
              <div className="pt-2.5 flex items-center justify-between gap-2">
                <button
                  onClick={() => triggerSound(480)}
                  className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 text-xs cursor-pointer"
                  title="Previous Step"
                >
                  ←
                </button>

                <button
                  onClick={handleAnalyzeWithAI}
                  disabled={isAnalyzing}
                  className="flex-1 py-1.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-bold shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
                  <span>{isAnalyzing ? 'Analyzing...' : 'Analyze with AI'}</span>
                  <span>→</span>
                </button>

                <button
                  onClick={() => {
                    triggerSound(550);
                    showToast('Step 2 complete. Advancing to analysis.');
                  }}
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-0.5 cursor-pointer whitespace-nowrap"
                >
                  <span>Next</span>
                  <span>→</span>
                </button>
              </div>
            </div>

            {/* ----------------------------------------------------------------------- */}
            {/* CARD 3: 3. AI Analysis                                                  */}
            {/* ----------------------------------------------------------------------- */}
            <div className="p-4 rounded-2xl bg-[#080d1e] border border-blue-500/30 shadow-[0_4px_25px_rgba(0,0,0,0.5)] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-1 text-white">
                  <div className="w-6 h-6 rounded-lg bg-blue-950/80 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
                    <Brain className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-sm font-bold tracking-wide">3. AI Analysis</h3>
                </div>
                <p className="text-[11px] text-slate-400 mb-3 truncate">
                  AI is extracting and structuring the information...
                </p>

                <div className="flex items-center gap-3">
                  {/* Glowing Concentric Radar Orb with Brain Emblem */}
                  <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-cyan-500/10 blur-md animate-pulse" />
                    
                    {/* Concentric animated radar lines */}
                    <svg className="absolute inset-0 w-full h-full animate-[spin_20s_linear_infinite]" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(6,182,212,0.2)" strokeWidth="1.5" strokeDasharray="6 4" />
                      <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(59,130,246,0.3)" strokeWidth="1" />
                      <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(6,182,212,0.6)" strokeWidth="1.5" strokeDasharray="10 6" />
                    </svg>

                    <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-950 via-[#0a1530] to-blue-950 border border-cyan-400/80 shadow-[0_0_20px_rgba(6,182,212,0.6)] flex items-center justify-center z-10">
                      <Brain className="w-6 h-6 text-cyan-300 animate-pulse" />
                    </div>
                  </div>

                  {/* Checklist matching image */}
                  <div className="flex-1 space-y-1.5 text-xs">
                    {[
                      { label: 'Text Extraction', status: analysisStatus.textExtraction },
                      { label: 'Entity Detection', status: analysisStatus.entityDetection },
                      { label: 'Requirement Analysis', status: analysisStatus.requirementAnalysis },
                      { label: 'Classification', status: analysisStatus.classification },
                      { label: 'Generating Output', status: analysisStatus.generatingOutput },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        {item.status === 'completed' ? (
                          <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center shrink-0">
                            <Check className="w-2.5 h-2.5 text-emerald-300 stroke-[3]" />
                          </div>
                        ) : (
                          <div className="w-3.5 h-3.5 rounded-full bg-blue-500/20 border border-blue-400 flex items-center justify-center shrink-0 animate-spin">
                            <span className="w-1 h-1 rounded-full bg-blue-300" />
                          </div>
                        )}
                        <span className={`text-[11px] font-medium leading-none ${
                          item.status === 'completed' ? 'text-slate-200' : 'text-cyan-300 font-bold'
                        }`}>
                          {item.label}
                        </span>
                        <span className="text-[9px] font-mono text-slate-400 ml-auto leading-none">
                          {item.status === 'completed' ? 'Completed' : 'In Progress...'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3 AI Analysis Points - Appears One by One */}
                <div className="space-y-1.5 mt-2.5 pt-2 border-t border-slate-800/80">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-cyan-300 font-bold flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-cyan-400" />
                      <span>3 AI Analysis Points ({visibleAiPoints}/3 Complete)</span>
                    </span>
                    {isAnalyzing && (
                      <span className="text-cyan-400 animate-pulse text-[9px]">Synthesizing...</span>
                    )}
                  </div>

                  {/* Point 1 */}
                  {visibleAiPoints >= 1 && (
                    <div className="p-1.5 rounded-xl bg-[#040818] border border-cyan-500/40 animate-in fade-in slide-in-from-top-1 duration-300">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="text-[10px] font-bold text-white flex items-center gap-1">
                          <span className="w-3.5 h-3.5 rounded bg-cyan-950 text-cyan-300 font-mono text-[9px] flex items-center justify-center border border-cyan-500/40">1</span>
                          <span>Multi-Modal Semantic Ingestion</span>
                        </span>
                        <span className="text-[9px] font-mono text-emerald-400 font-bold">98% Conf</span>
                      </div>
                      <p className="text-[10px] text-slate-300 leading-tight">
                        Extracted 14 core entities: 40,000 TPS write target, 100,000 active sessions.
                      </p>
                    </div>
                  )}

                  {/* Point 2 */}
                  {visibleAiPoints >= 2 && (
                    <div className="p-1.5 rounded-xl bg-[#040818] border border-blue-500/40 animate-in fade-in slide-in-from-top-1 duration-300">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="text-[10px] font-bold text-white flex items-center gap-1">
                          <span className="w-3.5 h-3.5 rounded bg-blue-950 text-blue-300 font-mono text-[9px] flex items-center justify-center border border-blue-500/40">2</span>
                          <span>Architecture & Security Protocol</span>
                        </span>
                        <span className="text-[9px] font-mono text-emerald-400 font-bold">95% Conf</span>
                      </div>
                      <p className="text-[10px] text-slate-300 leading-tight">
                        Decoupled PCI-DSS Level 1 specs, AES-256 envelope crypto, and strict 18+ KYC rule.
                      </p>
                    </div>
                  )}

                  {/* Point 3 */}
                  {visibleAiPoints >= 3 && (
                    <div className="p-1.5 rounded-xl bg-[#040818] border border-purple-500/40 animate-in fade-in slide-in-from-top-1 duration-300">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="text-[10px] font-bold text-white flex items-center gap-1">
                          <span className="w-3.5 h-3.5 rounded bg-purple-950 text-purple-300 font-mono text-[9px] flex items-center justify-center border border-purple-500/40">3</span>
                          <span>Discrepancy & Constraint Synthesis</span>
                        </span>
                        <span className="text-[9px] font-mono text-cyan-300 font-bold">92% Conf</span>
                      </div>
                      <p className="text-[10px] text-slate-300 leading-tight">
                        Flagged critical 40k vs 20k TPS mismatch between conversation and legacy SRS.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Progress Bar: Analyzing your data... 75% */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                  <span>Analyzing your data...</span>
                  <span className="font-mono text-cyan-300 font-bold">{aiProgress}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div 
                    style={{ width: `${aiProgress}%` }}
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-400 shadow-[0_0_8px_rgba(6,182,212,0.8)] transition-all duration-500"
                  />
                </div>
              </div>
            </div>

            {/* ----------------------------------------------------------------------- */}
            {/* CARD 4: 4. Extracted Intelligence                                       */}
            {/* ----------------------------------------------------------------------- */}
            <div className="p-4 rounded-2xl bg-[#080d1e] border border-blue-500/30 shadow-[0_4px_25px_rgba(0,0,0,0.5)] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-1 text-white">
                  <div className="w-6 h-6 rounded-lg bg-blue-950/80 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
                    <FileCheck className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-sm font-bold tracking-wide">4. Extracted Intelligence</h3>
                </div>
                <p className="text-[11px] text-slate-400 mb-2.5 truncate">
                  Here are the structured insights from your input.
                </p>

                {/* Filter Pills & Click All Views Fullscreen Button */}
                <div className="flex items-center justify-between gap-1 mb-2.5 text-xs overflow-x-auto">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setActiveFilterTab('requirements')}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                        activeFilterTab === 'requirements'
                          ? 'bg-blue-600 text-white shadow-[0_0_8px_rgba(37,99,235,0.6)]'
                          : 'bg-slate-800/80 text-slate-400 hover:text-white'
                      }`}
                    >
                      Requirements 5
                    </button>
                    <button
                      onClick={() => setActiveFilterTab('rules')}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                        activeFilterTab === 'rules'
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-800/80 text-slate-400 hover:text-white'
                      }`}
                    >
                      Rules 4
                    </button>
                    <button
                      onClick={() => setActiveFilterTab('assumptions')}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                        activeFilterTab === 'assumptions'
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-800/80 text-slate-400 hover:text-white'
                      }`}
                    >
                      Assumptions 3
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      triggerSound(700);
                      setIsAllViewsModalOpen(true);
                    }}
                    className="px-2 py-0.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/60 text-[10px] font-bold text-cyan-300 hover:text-white flex items-center gap-1 cursor-pointer shrink-0 shadow-[0_0_12px_rgba(6,182,212,0.4)] animate-pulse"
                  >
                    <Maximize2 className="w-3 h-3" />
                    <span>Click All Views</span>
                    <span>→</span>
                  </button>
                </div>

                {/* Requirements Items matching image */}
                <div className="space-y-1.5">
                  {requirementsList.map(req => (
                    <div
                      key={req.id}
                      onClick={() => {
                        setSelectedReq(req);
                        setActiveModal('req_detail');
                        triggerSound(640);
                      }}
                      className="p-1.5 px-2 rounded-xl bg-[#040714] border border-slate-800 hover:border-cyan-500/50 hover:bg-[#060c20] transition-colors cursor-pointer flex items-center justify-between gap-1.5"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-mono text-cyan-400 font-bold shrink-0">{req.id}</span>
                          <span className="text-[11px] text-white font-medium truncate">{req.title}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-medium bg-slate-800 text-slate-300">
                          {req.category}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-cyan-400">
                          {req.confidence}%
                        </span>
                        <span className="text-slate-500 text-[10px]">›</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* ROW 2: THREE CARDS ACROSS (Exact layout from uploaded image)              */}
          {/* Card 5: 5. Add Documents                                                  */}
          {/* Card 6: 6. Validate Documents                                             */}
          {/* Card 7: 7. Validation Results                                             */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
            
            {/* ----------------------------------------------------------------------- */}
            {/* CARD 5: 5. Add Documents & Resource Allocation                           */}
            {/* ----------------------------------------------------------------------- */}
            <div
              ref={card5Ref}
              className={`p-4 rounded-2xl bg-[#080d1e] border transition-all duration-500 flex flex-col justify-between ${
                isRequirementsReady
                  ? 'border-cyan-400 ring-2 ring-cyan-400/50 shadow-[0_0_30px_rgba(6,182,212,0.4)]'
                  : 'border-blue-500/30 shadow-[0_4px_25px_rgba(0,0,0,0.5)]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2 text-white">
                    <div className="w-6 h-6 rounded-lg bg-blue-950/80 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
                      <UploadCloud className="w-3.5 h-3.5" />
                    </div>
                    <h3 className="text-sm font-bold tracking-wide">5. Add Documents & Resources</h3>
                  </div>

                  {isRequirementsReady && (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40 animate-pulse flex items-center gap-1">
                      <Check className="w-2.5 h-2.5 text-emerald-400 stroke-[3]" />
                      <span>Requirements Ready</span>
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-slate-400 mb-2.5">
                  Upload project documents & review resources to validate against extracted requirements.
                </p>

                {/* Section A: Documents Upload & Repository Files */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 items-stretch mb-2.5">
                  {/* Left: Drag & Drop upload box */}
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2.5 rounded-xl border border-dashed border-cyan-500/40 bg-[#040714] hover:bg-cyan-950/20 text-center cursor-pointer transition-colors flex flex-col items-center justify-center gap-1"
                  >
                    <UploadCloud className="w-5 h-5 text-cyan-400" />
                    <span className="text-[11px] text-slate-300">Drop files or</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                      className="px-2.5 py-0.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold shadow-[0_0_8px_rgba(37,99,235,0.5)] transition-all cursor-pointer"
                    >
                      Choose Files
                    </button>
                    <span className="text-[9px] text-slate-400">PDF, DOCX, XLSX, TXT</span>
                    <input 
                      ref={fileInputRef} 
                      type="file" 
                      multiple
                      className="hidden" 
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          showToast(`Attached document: ${e.target.files[0].name}`);
                        }
                      }}
                    />
                  </div>

                  {/* Right: Uploaded Documents Checklist */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 block">
                      Uploaded Documents ({documents.length})
                    </span>
                    <div className="max-h-24 overflow-y-auto space-y-1 pr-1">
                      {documents.map(doc => (
                        <div
                          key={doc.id}
                          className="p-1.5 rounded-lg bg-[#040714] border border-slate-800 flex items-center justify-between text-[10px]"
                        >
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span className="text-blue-400 font-mono">📄</span>
                            <span className="font-medium text-white truncate">{doc.name}</span>
                          </div>
                          <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center shrink-0">
                            <Check className="w-2 h-2 text-emerald-300 stroke-[3]" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Section B: All Resources, What is Used & Tools */}
                <div className="p-2 rounded-xl bg-[#040816] border border-slate-800 space-y-2 mb-2.5 text-[11px]">
                  <div className="flex items-center justify-between text-[10px] font-mono border-b border-slate-800/80 pb-1">
                    <span className="text-cyan-300 font-bold">ALL RESOURCES & TOOLS USED:</span>
                    <span className="text-slate-400">Stack Verified</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <div>
                      <span className="text-slate-400 block font-mono text-[9px]">INFRASTRUCTURE & COMPUTE:</span>
                      <p className="text-slate-200 truncate">• AWS Aurora Multi-Master Shards</p>
                      <p className="text-slate-200 truncate">• Redis 7.0 In-Memory Cluster</p>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-mono text-[9px]">TOOLS & TESTING:</span>
                      <p className="text-slate-200 truncate">• k6 Load Tester (45k TPS)</p>
                      <p className="text-slate-200 truncate">• Docker, Terraform, Datadog</p>
                    </div>
                  </div>
                </div>

                {/* Section C: 5 Validate Points Displayed */}
                <div className="p-2 rounded-xl bg-[#040816] border border-cyan-500/30 space-y-1.5 text-[10px]">
                  <span className="font-mono text-cyan-300 font-bold block text-[10px]">
                    5 CRITICAL VALIDATION POINTS:
                  </span>
                  
                  <div className="space-y-1">
                    {[
                      { num: 1, title: 'Throughput', desc: 'Validate 40,000 write TPS against sharded database' },
                      { num: 2, title: 'Security', desc: 'Verify AES-256 envelope & CloudHSM key custody' },
                      { num: 3, title: 'KYC Gate', desc: 'Enforce mandatory age >= 18 verification rule' },
                      { num: 4, title: 'Session SLA', desc: 'Support 100,000 concurrent active sessions' },
                      { num: 5, title: 'Timeline', desc: 'Confirm 45-day plan aligns with Dec deadline' },
                    ].map(pt => (
                      <div key={pt.num} className="flex items-start gap-1.5">
                        <span className="w-3.5 h-3.5 rounded bg-cyan-950 text-cyan-300 font-mono text-[9px] flex items-center justify-center border border-cyan-500/40 shrink-0 mt-0.5">
                          {pt.num}
                        </span>
                        <div className="min-w-0">
                          <span className="font-bold text-white mr-1">{pt.title}:</span>
                          <span className="text-slate-300 leading-tight">{pt.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Bottom Validate Button */}
              <div className="pt-2.5 flex items-center justify-between gap-2">
                <button
                  onClick={() => triggerSound(480)}
                  className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 text-xs cursor-pointer"
                  title="Previous Step"
                >
                  ←
                </button>

                <button
                  onClick={handleRunValidation}
                  disabled={isValidating}
                  className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white text-xs font-bold shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-200" />
                  <span>{isValidating ? 'Validating 5 Points...' : 'Validate All Documents & Requirements'}</span>
                  <span>→</span>
                </button>
              </div>
            </div>

            {/* ----------------------------------------------------------------------- */}
            {/* CARD 6: 6. Validate Documents                                           */}
            {/* ----------------------------------------------------------------------- */}
            <div className="p-4 rounded-2xl bg-[#080d1e] border border-blue-500/30 shadow-[0_4px_25px_rgba(0,0,0,0.5)] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-1 text-white">
                  <div className="w-6 h-6 rounded-lg bg-blue-950/80 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-sm font-bold tracking-wide">6. Validate Documents</h3>
                </div>
                <p className="text-[11px] text-slate-400 mb-3 truncate">
                  AI is cross-checking documents, finding inconsistencies and verifying data.
                </p>

                <div className="flex items-center gap-3">
                  {/* Glowing Circular Scanner with Document Icon & Green Checkmark */}
                  <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-cyan-500/10 blur-md animate-pulse" />
                    
                    <svg className="absolute inset-0 w-full h-full animate-[spin_24s_linear_infinite]" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(6,182,212,0.2)" strokeWidth="1.5" strokeDasharray="6 4" />
                      <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(59,130,246,0.3)" strokeWidth="1" />
                      <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(6,182,212,0.6)" strokeWidth="1.5" strokeDasharray="8 6" />
                    </svg>

                    <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-950 via-[#0a1530] to-blue-950 border border-cyan-400/80 shadow-[0_0_20px_rgba(6,182,212,0.6)] flex items-center justify-center z-10">
                      <FileCheck className="w-7 h-7 text-cyan-300" />
                      <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border border-white flex items-center justify-center text-[8px] text-white font-bold">
                        ✓
                      </span>
                    </div>
                  </div>

                  {/* Checklist matching image */}
                  <div className="flex-1 space-y-1.5 text-xs">
                    {[
                      { label: 'Document Parsing', status: validationStatus.documentParsing },
                      { label: 'Field Extraction', status: validationStatus.fieldExtraction },
                      { label: 'Cross-Document Comparison', status: validationStatus.crossComparison },
                      { label: 'Rule Validation', status: validationStatus.ruleValidation },
                      { label: 'Generating Results', status: validationStatus.generatingResults },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        {item.status === 'completed' ? (
                          <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center shrink-0">
                            <Check className="w-2.5 h-2.5 text-emerald-300 stroke-[3]" />
                          </div>
                        ) : (
                          <div className="w-3.5 h-3.5 rounded-full bg-blue-500/20 border border-blue-400 flex items-center justify-center shrink-0 animate-spin">
                            <span className="w-1 h-1 rounded-full bg-blue-300" />
                          </div>
                        )}
                        <span className={`text-[11px] font-medium leading-none ${
                          item.status === 'completed' ? 'text-slate-200' : 'text-cyan-300 font-bold'
                        }`}>
                          {item.label}
                        </span>
                        <span className="text-[9px] font-mono text-slate-400 ml-auto leading-none">
                          {item.status === 'completed' ? 'Completed' : 'In Progress...'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Progress Bar: Validating documents... 80% */}
              <div className="pt-3">
                <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                  <span>Validating documents...</span>
                  <span className="font-mono text-cyan-300 font-bold">{validateProgress}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div 
                    style={{ width: `${validateProgress}%` }}
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-400 shadow-[0_0_8px_rgba(6,182,212,0.8)] transition-all duration-500"
                  />
                </div>
              </div>
            </div>

            {/* ----------------------------------------------------------------------- */}
            {/* CARD 7: 7. Validation Results                                           */}
            {/* ----------------------------------------------------------------------- */}
            <div className="p-4 rounded-2xl bg-[#080d1e] border border-blue-500/30 shadow-[0_4px_25px_rgba(0,0,0,0.5)] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-1 text-white">
                  <div className="w-6 h-6 rounded-lg bg-blue-950/80 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
                    <Shield className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-sm font-bold tracking-wide">7. Validation Results</h3>
                </div>
                <p className="text-[11px] text-slate-400 mb-2.5 truncate">
                  Here are the validation results and detected issues.
                </p>

                {/* Score & Metrics Row */}
                <div className="flex items-center gap-3 mb-2.5">
                  {/* Circular Score Gauge */}
                  <div className="relative w-18 h-18 shrink-0 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-slate-800"
                        strokeWidth="3.5"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] transition-all duration-1000"
                        strokeDasharray={`${validationScore}, 100`}
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-base font-black text-white">{validationScore}%</span>
                      <span className="text-[7px] text-cyan-300 uppercase leading-none">Validation Score</span>
                    </div>
                  </div>

                  {/* 3 Metric Pills: Matched Fields, Conflicts, Missing Info */}
                  <div className="flex-1 grid grid-cols-3 gap-1.5 text-center">
                    <div className="p-1.5 rounded-lg bg-[#040714] border border-emerald-500/30">
                      <span className="text-sm font-black text-emerald-400 block">{validationMetrics.matchedFields}</span>
                      <span className="text-[9px] text-slate-400 block leading-tight">Matched Fields</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-[#040714] border border-red-500/30">
                      <span className="text-sm font-black text-red-400 block">{validationMetrics.conflicts}</span>
                      <span className="text-[9px] text-slate-400 block leading-tight">Conflicts</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-[#040714] border border-amber-500/30">
                      <span className="text-sm font-black text-amber-400 block">{validationMetrics.missingInfo}</span>
                      <span className="text-[9px] text-slate-400 block leading-tight">Missing Info</span>
                    </div>
                  </div>
                </div>

                {/* Red Inconsistency Alert Banner */}
                <div 
                  onClick={() => {
                    setActiveModal('inconsistency');
                    triggerSound(680);
                  }}
                  className="p-2 rounded-xl bg-gradient-to-r from-red-950/70 to-red-900/50 border border-red-500/50 hover:border-red-400 transition-colors cursor-pointer flex items-center justify-between gap-2 mb-2 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-5 h-5 rounded bg-red-900 border border-red-400 flex items-center justify-center shrink-0">
                      <AlertTriangle className="w-3 h-3 text-red-300" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] font-black text-red-300 uppercase tracking-wide truncate">
                        INCONSISTENCY DETECTED
                      </div>
                      <div className="text-[10px] text-slate-200 truncate">
                        Requirement vs Architecture mismatch
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-red-300 hover:text-white flex items-center gap-0.5 whitespace-nowrap shrink-0">
                    <span>View Details</span>
                    <span>→</span>
                  </span>
                </div>

                {/* Key Issues List */}
                <div className="space-y-1 text-xs">
                  <span className="text-[10px] font-bold text-slate-400 block">Key Issues</span>
                  <div className="flex items-center justify-between text-[11px] p-1 rounded-lg bg-[#040714] border border-slate-800">
                    <span className="text-slate-300 truncate">1. TPS capacity mismatch (40,000 vs 20,000)</span>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-red-950 text-red-400 border border-red-500/40">HIGH</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] p-1 rounded-lg bg-[#040714] border border-slate-800">
                    <span className="text-slate-300 truncate">2. Missing security details in SRS</span>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-950 text-amber-400 border border-amber-500/40">MEDIUM</span>
                  </div>
                </div>
              </div>

              {/* Bottom Action Buttons: [View Full Report] [Export Report] [Close] */}
              <div className="pt-3 flex items-center gap-1.5">
                <button
                  onClick={() => {
                    setIsFullReportModalOpen(true);
                    triggerSound(750);
                  }}
                  className="flex-1 py-1.5 px-2 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 border border-cyan-400/60 text-[11px] font-bold text-white shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all cursor-pointer text-center animate-pulse"
                >
                  View Full Report
                </button>

                <button
                  onClick={() => {
                    triggerSound(600);
                    showToast('Exporting validation report to PDF/JSON...');
                  }}
                  className="flex-1 py-1.5 px-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-[11px] font-bold text-slate-200 transition-colors cursor-pointer text-center"
                >
                  Export Report
                </button>

                <button
                  onClick={() => {
                    triggerSound(400);
                    onBackToHome();
                  }}
                  className="py-1.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-[11px] font-bold text-white shadow-[0_0_10px_rgba(37,99,235,0.6)] transition-all cursor-pointer text-center"
                >
                  Close
                </button>
              </div>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* ROW 3: BOTTOM AI INSIGHTS FULL-WIDTH BANNER (Exact match to screenshot)   */}
          {/* ========================================================================= */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#080d1e] border border-blue-500/30 shadow-[0_4px_30px_rgba(0,0,0,0.6)] flex flex-col xl:flex-row xl:items-center justify-between gap-4">
            
            {/* Left Title: AI Insights */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                <Brain className="w-5 h-5 text-cyan-300" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white tracking-wide">AI Insights</h3>
                <p className="text-[11px] text-slate-400">
                  Based on your documents and analysis, here are the key findings:
                </p>
              </div>
            </div>

            {/* 4 Insight Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 flex-1">
              {/* Insight 1: Capacity Mismatch */}
              <div className="p-2.5 rounded-xl bg-[#040714] border border-purple-500/30 flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-purple-950/80 border border-purple-400/50 flex items-center justify-center text-purple-300 text-xs shrink-0">
                  ⚡
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-bold text-white leading-tight">Capacity Mismatch</div>
                  <div className="text-[10px] text-purple-300 font-mono">40,000 TPS vs 20,000 TPS</div>
                  <div className="text-[9px] text-slate-400 truncate">Requires architecture update</div>
                </div>
              </div>

              {/* Insight 2: Security Enhancement */}
              <div className="p-2.5 rounded-xl bg-[#040714] border border-amber-500/30 flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-amber-950/80 border border-amber-400/50 flex items-center justify-center text-amber-300 text-xs shrink-0">
                  🛡️
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-bold text-white leading-tight">Security Enhancement</div>
                  <div className="text-[10px] text-amber-300 font-mono">Encryption details missing</div>
                  <div className="text-[9px] text-slate-400 truncate">Add to SRS document</div>
                </div>
              </div>

              {/* Insight 3: Timeline Risk */}
              <div className="p-2.5 rounded-xl bg-[#040714] border border-red-500/30 flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-red-950/80 border border-red-400/50 flex items-center justify-center text-red-300 text-xs shrink-0">
                  ⏱️
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-bold text-white leading-tight">Timeline Risk</div>
                  <div className="text-[10px] text-red-300 font-mono">Production by Dec 2026</div>
                  <div className="text-[9px] text-slate-400 truncate">May face 2-4 week delay</div>
                </div>
              </div>

              {/* Insight 4: Resource Alert */}
              <div className="p-2.5 rounded-xl bg-[#040714] border border-pink-500/30 flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-pink-950/80 border border-pink-400/50 flex items-center justify-center text-pink-300 text-xs shrink-0">
                  👥
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-bold text-white leading-tight">Resource Alert</div>
                  <div className="text-[10px] text-pink-300 font-mono">Backend team at 94%</div>
                  <div className="text-[9px] text-slate-400 truncate">Consider additional resource</div>
                </div>
              </div>
            </div>

            {/* Right: View Detailed Report Button with Animated Wave Accent */}
            <div className="relative shrink-0 flex items-center justify-end">
              <button
                onClick={() => {
                  setActiveModal('report');
                  triggerSound(680);
                }}
                className="relative z-10 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-[0_0_20px_rgba(37,99,235,0.7)] transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>View Detailed Report</span>
                <span>→</span>
              </button>

              {/* Subtle neon glowing wave accent behind button */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-cyan-500/40 blur-xl pointer-events-none" />
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. INTERACTIVE MODALS & DRAWERS                                           */}
      {/* ========================================================================= */}

      {/* Modal 1: INCONSISTENCY DETECTED MODAL */}
      {activeModal === 'inconsistency' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-xl rounded-3xl bg-[#091124] border border-red-500/60 shadow-[0_0_50px_rgba(239,68,68,0.4)] p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-950 border border-red-400 flex items-center justify-center text-red-400 shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Inconsistency Conflict Analysis</h3>
                  <p className="text-xs text-slate-400">Cross-document discrepancy detected by AI parity engine</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-red-950/30 border border-red-500/40">
                <div className="font-bold text-red-300 text-xs mb-1">REQ-1042 vs Architecture Document.pdf</div>
                <div className="grid grid-cols-2 gap-3 text-slate-300 mt-2">
                  <div className="p-2 rounded-lg bg-[#040714] border border-slate-800">
                    <span className="text-[10px] text-cyan-400 block font-mono">CLIENT CONVERSATION</span>
                    <span className="font-bold text-white">40,000 Transactions / Sec</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#040714] border border-slate-800">
                    <span className="text-[10px] text-amber-400 block font-mono">ARCHITECTURE DOC</span>
                    <span className="font-bold text-white">20,000 Transactions / Sec</span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5 text-slate-300">
                <span className="font-bold text-white block">Recommended Resolution</span>
                <p className="text-[11px] leading-relaxed">
                  Upgrade transaction write pipeline to Aurora multi-master sharding or negotiate phased SLA throughput with client ABC Technologies before sprint kickoff.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                onClick={() => {
                  showToast('Reconciliation draft generated.');
                  setActiveModal(null);
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold cursor-pointer"
              >
                Apply Architecture Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: REQUIREMENT DETAIL MODAL */}
      {activeModal === 'req_detail' && selectedReq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-[#091124] border border-cyan-500/60 shadow-[0_0_50px_rgba(6,182,212,0.4)] p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40">
                  {selectedReq.id}
                </span>
                <h3 className="text-base font-bold text-white">{selectedReq.title}</h3>
              </div>
              <button 
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div>
                <span className="text-[10px] text-slate-400 block font-mono">SPECIFICATION DESCRIPTION</span>
                <p className="mt-1 leading-relaxed text-slate-200">{selectedReq.description}</p>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 block font-mono mb-1.5">ACCEPTANCE CRITERIA</span>
                <ul className="space-y-1">
                  {selectedReq.acceptanceCriteria.map((c, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-200">
                      <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px]">
                <span className="text-slate-400">Confidence Score:</span>
                <span className="font-mono text-cyan-300 font-bold">{selectedReq.confidence}% Confidence</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 3: DETAILED REPORT MODAL */}
      {activeModal === 'report' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-2xl rounded-3xl bg-[#091124] border border-cyan-500/60 shadow-[0_0_50px_rgba(6,182,212,0.4)] p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-950 border border-blue-400 flex items-center justify-center text-cyan-300 shrink-0">
                  <BarChart2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Full Parity & Requirements Report</h3>
                  <p className="text-xs text-slate-400">SmartPay Enterprise Platform · Comprehensive Audit</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-300">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-xl bg-[#040714] border border-cyan-500/30">
                  <span className="text-xs text-slate-400 block font-mono">PARITY SCORE</span>
                  <span className="text-xl font-black text-cyan-400">{validationScore}%</span>
                </div>
                <div className="p-3 rounded-xl bg-[#040714] border border-emerald-500/30">
                  <span className="text-xs text-slate-400 block font-mono">MATCHED REQS</span>
                  <span className="text-xl font-black text-emerald-400">8 of 10</span>
                </div>
                <div className="p-3 rounded-xl bg-[#040714] border border-amber-500/30">
                  <span className="text-xs text-slate-400 block font-mono">SLA COMPLIANCE</span>
                  <span className="text-xl font-black text-amber-400">99.8%</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-white block">Audit Summary</span>
                <p className="leading-relaxed">
                  All 5 client intake requirements were parsed and converted into formal engineering tickets. Two contractual documents were compared with zero fatal security oversights, though TPS sizing requires confirmation with the DevOps team.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                onClick={() => {
                  showToast('Exporting PDF audit document...');
                  setActiveModal(null);
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold cursor-pointer"
              >
                Download PDF
              </button>
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold cursor-pointer"
              >
                Close Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Facebook Front-End Display & Sharing Modal */}
      <FacebookFrontEndModal
        isOpen={isFacebookModalOpen}
        onClose={() => setIsFacebookModalOpen(false)}
        onOpenUnderstandValidate={() => {
          setIsFacebookModalOpen(false);
          triggerSound(660);
        }}
        playChime={playChime}
      />

      {/* Fullscreen All Views Modal for Requirements & Business Rules */}
      <AllViewsFullScreenModal
        isOpen={isAllViewsModalOpen}
        onClose={() => setIsAllViewsModalOpen(false)}
        onReadyRequirements={() => {
          setIsAllViewsModalOpen(false);
          setIsRequirementsReady(true);
          showToast('Requirements Confirmed Ready! Advancing to Step 5: Add Documents & Validation');
          setTimeout(() => {
            card5Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 150);
        }}
        playChime={playChime}
      />

      {/* Full Project Delivery Report Modal (Skills Persons, Used Resources & Tools, Days & Deadline) */}
      <FullProjectReportModal
        isOpen={isFullReportModalOpen}
        onClose={() => setIsFullReportModalOpen(false)}
        projectName={projectName}
        clientName={clientName}
        validationScore={validationScore}
        playChime={playChime}
      />

    </div>
  );
};
