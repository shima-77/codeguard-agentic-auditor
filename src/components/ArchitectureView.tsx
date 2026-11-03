import React, { useState } from 'react';
import { 
  Network, 
  Cpu, 
  Layers, 
  Terminal, 
  GitPullRequest, 
  Sparkles, 
  ShieldCheck, 
  Code2, 
  ArrowRight,
  Database,
  Calculator,
  Compass,
  Zap,
  CheckCircle2
} from 'lucide-react';

interface ArchitectureNode {
  id: string;
  name: string;
  tagline: string;
  category: 'input' | 'agent' | 'engine' | 'output';
  details: string[];
  techStack: string;
  agentPhase: string;
}

export const ArchitectureView: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('agent-controller');

  const nodes: ArchitectureNode[] = [
    {
      id: 'vscode-client',
      name: 'VS Code Extension',
      tagline: 'Developer IDE Client & Real-time Diagnostics',
      category: 'input',
      agentPhase: 'Trigger & Action Host',
      techStack: 'TypeScript, VS Code Extension API, Language Server Protocol (LSP)',
      details: [
        'Listens to onDidChangeTextDocument and onDidSaveTextDocument events.',
        'Allows developer to set Project Scope & Target Scale via StatusBar item.',
        'Draws inline squiggly red/amber underlines (vscode.DiagnosticCollection).',
        'Provides 1-click QuickFix CodeAction to replace quadratic code with hash-indexed code.'
      ]
    },
    {
      id: 'github-action',
      name: 'GitHub Action Bot',
      tagline: 'Autonomous CI/CD Repository Gatekeeper',
      category: 'input',
      agentPhase: 'Autonomous Scanner',
      techStack: 'Python 3.11, GitHub Workflows, Octokit / REST API',
      details: [
        'Triggers on git push and git pull_request.',
        'Crawls all source files (.py, .js, .ts) and identifies algorithmic changes.',
        'Fails the CI build if O(N²) or unbounded memory usage exceeds target scale threshold.',
        'Leaves formatted Markdown pull request comment with complexity comparison tables.'
      ]
    },
    {
      id: 'agent-controller',
      name: 'CodeGuard Agent Core',
      tagline: 'Orchestrates the 4-Stage Agentic Loop',
      category: 'agent',
      agentPhase: 'Plan → Reason → Tool → Act',
      techStack: 'Google GenAI TypeScript / Python SDK, Express.js / Node.js runtime',
      details: [
        'Step 1 (Plan): Ingests user Project Idea ("E-commerce for 1 lakh products") to establish baseline constraints.',
        'Step 2 (Reason): Examines control flow graphs and AST loops to locate non-linear complexity.',
        'Step 3 (Tool Use): Queries Big-O Hardware Multiplier tool to project operational count and latency.',
        'Step 4 (Act): Synthesizes 3 alert types and generates scale-ready replacement diff.'
      ]
    },
    {
      id: 'ast-engine',
      name: 'Static AST & Big-O Engine',
      tagline: 'Deterministic Syntactic Tree Parser',
      category: 'engine',
      agentPhase: 'Tool Execution',
      techStack: 'Python `ast` module, Babel / TypeScript AST parser',
      details: [
        'Zero-latency static analysis identifying loop depths, nested iterations, and list scans.',
        'Extracts variable scopes and data structure access patterns (Array.find vs Map.get).',
        'Feeds structured AST metadata into Gemini as grounded context to prevent hallucinations.',
        'Works offline even in zero-internet environments as an instant heuristic backup.'
      ]
    },
    {
      id: 'gemini-model',
      name: 'Google Gemini 3.8 Flash',
      tagline: 'High-Speed Multimodal Code Reasoning',
      category: 'engine',
      agentPhase: 'Semantic Reasoning & Synthesis',
      techStack: '@google/genai SDK, Structured JSON responseSchema',
      details: [
        'Interprets complex human project requirements (e.g., "1 lakh products", "sub-50ms latency").',
        'Evaluates architectural intent: detects if LLM-generated prototype code mismatches scale.',
        'Generates mathematically accurate optimizations (Hash maps, sliding window, generators).',
        'Guaranteed type-safe JSON schema response for seamless integration into IDE diagnostics.'
      ]
    },
    {
      id: 'alert-dispatcher',
      name: '3-Alert Category Synthesizer',
      tagline: 'Categorized Risk Assessment',
      category: 'output',
      agentPhase: 'Act: Diagnostic Formulation',
      techStack: 'JSON Diagnostic Protocol',
      details: [
        'Category 1: Efficiency Alert (Time/Space Big-O vs Project Scale Math).',
        'Category 2: Quality & Security Alert (Memory leaks, unbounded buffers, thread blocking).',
        'Category 3: Relevance Alert (Detects architectural drift from original project scope).'
      ]
    },
    {
      id: 'autofix-generator',
      name: 'Auto-Fix Patch Engine',
      tagline: '1-Click Code Replacement Engine',
      category: 'output',
      agentPhase: 'Act: Code Delivery',
      techStack: 'Unified Diff, VS Code TextEditorEdit',
      details: [
        'Generates drop-in replacements preserving existing function signatures and return types.',
        'Applies side-by-side diff preview for developer verification.',
        'Permits instant 1-click in-place editing in VS Code with a single hotkey.'
      ]
    }
  ];

  const activeNode = nodes.find(n => n.id === selectedNodeId) || nodes[2];

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl p-6">
      {/* Title */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">
            <Network className="w-4 h-4" />
            System Architecture & Agentic Data Flow
          </div>
          <h2 className="text-xl font-bold text-slate-100">
            How CodeGuard Protects Applications at Scale
          </h2>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-xs text-slate-300">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
          <span>Click any node in the diagram below to inspect</span>
        </div>
      </div>

      {/* Visual Interactive Architecture Diagram */}
      <div className="bg-[#0b0f17] border border-slate-800 rounded-xl p-6 mb-6 overflow-x-auto">
        <div className="min-w-[720px] flex flex-col items-center">
          {/* Top Layer: Developer Environments */}
          <div className="w-full flex justify-around mb-8">
            <button
              onClick={() => setSelectedNodeId('vscode-client')}
              className={`p-4 rounded-xl border transition-all text-left w-64 shadow-lg ${
                selectedNodeId === 'vscode-client'
                  ? 'bg-blue-950/80 border-blue-500 shadow-blue-500/20 ring-2 ring-blue-500/30'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2 text-blue-400 font-bold text-xs mb-1">
                <Code2 className="w-4 h-4" />
                VS Code Extension
              </div>
              <div className="text-[11px] text-slate-400">Real-time inline diagnostics & 1-click Auto-Fix</div>
            </button>

            <button
              onClick={() => setSelectedNodeId('github-action')}
              className={`p-4 rounded-xl border transition-all text-left w-64 shadow-lg ${
                selectedNodeId === 'github-action'
                  ? 'bg-purple-950/80 border-purple-500 shadow-purple-500/20 ring-2 ring-purple-500/30'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2 text-purple-400 font-bold text-xs mb-1">
                <GitPullRequest className="w-4 h-4" />
                GitHub Action Bot
              </div>
              <div className="text-[11px] text-slate-400">PR gatekeeper & autonomous repo audit</div>
            </button>
          </div>

          {/* Connection Lines Down */}
          <div className="flex items-center justify-center w-full my-[-16px] z-10">
            <div className="flex flex-col items-center text-slate-600">
              <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 mb-1">
                Project Idea + Target Scale Context
              </span>
              <div className="h-6 w-0.5 bg-blue-500/50"></div>
            </div>
          </div>

          {/* Central Hub: CodeGuard Agent Controller */}
          <div className="my-4">
            <button
              onClick={() => setSelectedNodeId('agent-controller')}
              className={`p-5 rounded-2xl border transition-all text-center w-96 shadow-2xl ${
                selectedNodeId === 'agent-controller'
                  ? 'bg-gradient-to-br from-blue-950 to-indigo-950 border-blue-400 shadow-blue-500/30 ring-2 ring-blue-400/40'
                  : 'bg-slate-900 border-slate-700 hover:border-slate-600'
              }`}
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600/30 text-blue-300 border border-blue-500/40 mb-2">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="text-sm font-bold text-slate-100">CodeGuard Agentic Core</div>
              <div className="text-xs text-blue-300 font-medium mt-0.5">Plan → Reason → Tool Use → Act</div>
              <div className="text-[11px] text-slate-400 mt-1">Grounds code evaluation in real-world project scale</div>
            </button>
          </div>

          {/* Connection Lines to Engines */}
          <div className="flex items-center justify-center w-full my-[-10px] z-10">
            <div className="h-6 w-0.5 bg-indigo-500/50"></div>
          </div>

          {/* Middle Layer: Gemini + AST Engine */}
          <div className="w-full flex justify-center gap-8 my-3">
            <button
              onClick={() => setSelectedNodeId('gemini-model')}
              className={`p-4 rounded-xl border transition-all text-left w-72 shadow-lg ${
                selectedNodeId === 'gemini-model'
                  ? 'bg-indigo-950/80 border-indigo-500 shadow-indigo-500/20 ring-2 ring-indigo-500/30'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs mb-1">
                <Sparkles className="w-4 h-4" />
                Google Gemini 3.8 Flash
              </div>
              <div className="text-[11px] text-slate-400">Structured JSON reasoning & algorithmic refactoring</div>
            </button>

            <button
              onClick={() => setSelectedNodeId('ast-engine')}
              className={`p-4 rounded-xl border transition-all text-left w-72 shadow-lg ${
                selectedNodeId === 'ast-engine'
                  ? 'bg-cyan-950/80 border-cyan-500 shadow-cyan-500/20 ring-2 ring-cyan-500/30'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs mb-1">
                <Calculator className="w-4 h-4" />
                AST & Hardware Math Engine
              </div>
              <div className="text-[11px] text-slate-400">Calculates Big-O multiplier: N × M operations</div>
            </button>
          </div>

          {/* Connection Lines Down */}
          <div className="flex items-center justify-center w-full my-[-10px] z-10">
            <div className="h-6 w-0.5 bg-emerald-500/50"></div>
          </div>

          {/* Bottom Layer: Outputs */}
          <div className="w-full flex justify-around mt-4">
            <button
              onClick={() => setSelectedNodeId('alert-dispatcher')}
              className={`p-4 rounded-xl border transition-all text-left w-64 shadow-lg ${
                selectedNodeId === 'alert-dispatcher'
                  ? 'bg-amber-950/80 border-amber-500 shadow-amber-500/20 ring-2 ring-amber-500/30'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs mb-1">
                <ShieldCheck className="w-4 h-4" />
                3 Alert Dispatcher
              </div>
              <div className="text-[11px] text-slate-400">1. Efficiency 2. Quality 3. Relevance</div>
            </button>

            <button
              onClick={() => setSelectedNodeId('autofix-generator')}
              className={`p-4 rounded-xl border transition-all text-left w-64 shadow-lg ${
                selectedNodeId === 'autofix-generator'
                  ? 'bg-emerald-950/80 border-emerald-500 shadow-emerald-500/20 ring-2 ring-emerald-500/30'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs mb-1">
                <Zap className="w-4 h-4" />
                Auto-Fix Patch Engine
              </div>
              <div className="text-[11px] text-slate-400">1-click drop-in hash index replacement</div>
            </button>
          </div>
        </div>
      </div>

      {/* Selected Node Inspector Drawer */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3 pb-3 border-b border-slate-800">
          <div>
            <div className="text-[11px] uppercase tracking-wider font-mono text-blue-400">
              Component Deep-Dive: {activeNode.agentPhase}
            </div>
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2 mt-0.5">
              {activeNode.name}
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-normal">
                {activeNode.tagline}
              </span>
            </h3>
          </div>

          <div className="bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-xs text-slate-300 font-mono">
            <strong className="text-slate-400">Tech Stack:</strong> {activeNode.techStack}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {activeNode.details.map((detail, idx) => (
            <div key={idx} className="bg-slate-950/80 border border-slate-800/80 rounded-lg p-3 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span className="text-slate-300 leading-relaxed">{detail}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
