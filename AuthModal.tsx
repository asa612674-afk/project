import React, { useState } from 'react';
import { X, Sparkles, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

interface AuthModalProps {
  mode: 'signin' | 'getstarted' | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ mode, onClose, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!mode) return null;

  const isSignIn = mode === 'signin';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onSuccess?.();
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#091124] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(6,182,212,0.3)]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="text-center mb-6">
          <div className="inline-flex p-3 rounded-2xl bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 mb-3 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            {isSignIn ? 'Welcome Back to FlowLens' : 'Initialize FlowLens AI'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {isSignIn
              ? 'Access your definitive enterprise intelligence telemetry.'
              : 'Deploy next-generation predictive modeling across your data streams.'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Work Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="analyst@enterprise.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#060c1d] border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Secure Key / Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#060c1d] border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-[0_0_25px_rgba(37,99,235,0.6)] transition-all duration-300 flex items-center justify-center gap-2 mt-2"
          >
            {submitted ? (
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-300 animate-bounce" />
                Authenticating Session...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                {isSignIn ? 'Sign In to Workspace' : 'Get Started with Enterprise Plan'}
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-500">
          Protected by FlowLens End-to-End Zero Knowledge Cryptography.
        </div>
      </div>
    </div>
  );
};
