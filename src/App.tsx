import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Code2, 
  GitPullRequest, 
  Network, 
  DownloadCloud, 
  Trophy, 
  Sparkles, 
  Cpu, 
  Terminal, 
  Flame, 
  Layers, 
  CheckCircle, 
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { VSCodeSimulator } from './components/VSCodeSimulator';
import { GitHubActionView } from './components/GitHubActionView';
import { ArchitectureView } from './components/ArchitectureView';
import { HackathonKitView } from './components/HackathonKitView';
import { PitchDeckView } from './components/PitchDeckView';

export default function App() {
  const [activeMainTab, setActiveMainTab] = useState<'simulator' | 'github' | 'architecture' | 'export' | 'pitch'>('simulator');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* Top Hackathon Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 border-b border-blue-700/50 py-2 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-yellow-400 text-slate-950 px-2 py-0.5 rounded-full font-extrabold text-[10px] uppercase tracking-wider shadow-sm">
              Hackathon Official MVP
            </span>
            <span className="font-semibold text-white">
              AGENTIC AI HACKATHON 2.0 - 2026
            </span>
            <span className="text-blue-200 hidden sm:inline">• Dept of AIML, Vignan University</span>
          </div>

          <div className="flex items-center gap-4 text-blue-200">
            <span className="text-[11px] font-mono">Date: 5 Nov 2026 • N-Block, 6th Floor</span>
            <span className="text-yellow-300 font-bold text-[11px]">🏆 1st Prize + CodeRepo Internship</span>
          </div>
        </div>
      </div>

      {/* Main App Navigation Header */}
      <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 border border-blue-400/40">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-white tracking-tight">
                  CodeGuard
                </h1>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-blue-950 text-blue-400 border border-blue-800">
                  v1.0 Agentic MVP
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Agentic Code Efficiency Auditor for VS Code & GitHub
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setActiveMainTab('simulator')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                activeMainTab === 'simulator'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              VS Code Simulator
            </button>

            <button
              onClick={() => setActiveMainTab('github')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                activeMainTab === 'github'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <GitPullRequest className="w-3.5 h-3.5" />
              GitHub Action Gate
            </button>

            <button
              onClick={() => setActiveMainTab('architecture')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                activeMainTab === 'architecture'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              Architecture
            </button>

            <button
              onClick={() => setActiveMainTab('export')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                activeMainTab === 'export'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <DownloadCloud className="w-3.5 h-3.5" />
              Export Starter Files
            </button>

            <button
              onClick={() => setActiveMainTab('pitch')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                activeMainTab === 'pitch'
                  ? 'bg-gradient-to-r from-amber-600 to-yellow-600 text-white shadow-md shadow-yellow-600/30 font-semibold'
                  : 'text-slate-400 hover:text-yellow-300 hover:bg-slate-900'
              }`}
            >
              <Trophy className="w-3.5 h-3.5 text-yellow-300" />
              Pitch Deck & 1st Prize Guide
            </button>
          </nav>
        </div>
      </header>

      {/* Main Interactive Stage */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 space-y-6">
        {activeMainTab === 'simulator' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-blue-400 font-semibold">
                  <Cpu className="w-4 h-4" />
                  Agentic Loop:
                </span>
                <span className="text-slate-400">1. Plan (Scope)</span>
                <span className="text-slate-600">→</span>
                <span className="text-slate-400">2. Reason (AST)</span>
                <span className="text-slate-600">→</span>
                <span className="text-slate-400">3. Tool Use (Big-O Math)</span>
                <span className="text-slate-600">→</span>
                <span className="text-slate-400">4. Act (Auto-Fix Diff)</span>
              </div>

              <div className="flex items-center gap-2 text-slate-400">
                <span>3 Categories:</span>
                <span className="text-red-400 font-medium">Efficiency</span> •
                <span className="text-amber-400 font-medium">Quality & Security</span> •
                <span className="text-blue-400 font-medium">Relevance</span>
              </div>
            </div>

            <VSCodeSimulator />
          </div>
        )}

        {activeMainTab === 'github' && <GitHubActionView />}
        {activeMainTab === 'architecture' && <ArchitectureView />}
        {activeMainTab === 'export' && <HackathonKitView />}
        {activeMainTab === 'pitch' && <PitchDeckView />}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-5 px-4 text-xs text-slate-500 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>CodeGuard: Autonomous Scale-Aware Code Efficiency Auditor</span>
            <span className="text-slate-600">•</span>
            <span>Powered by Google Gemini 3.8 Flash SDK & Deterministic AST</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Organized by Agentic AI Club & Google AI Lab</span>
            <span>AIML Dept, Vignan University</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
