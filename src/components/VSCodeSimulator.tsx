import React, { useState, useEffect } from 'react';
import { 
  Play, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Sparkles, 
  Wand2, 
  FileCode, 
  ChevronRight, 
  Cpu, 
  Clock, 
  Layers, 
  Scale, 
  RefreshCw, 
  Zap, 
  Sliders, 
  Code2, 
  Copy, 
  ExternalLink,
  Info,
  Flame,
  ArrowRight
} from 'lucide-react';
import { STARTER_TEMPLATES, CodeSnippet } from '../data/starterTemplates';

interface AuditResult {
  isLiveAi?: boolean;
  fallbackNotice?: string;
  agentTrace: Array<{
    step: string;
    icon?: string;
    title: string;
    description: string;
  }>;
  scaleAnalysis: {
    currentTimeComplexity: string;
    currentSpaceComplexity: string;
    optimizedTimeComplexity: string;
    optimizedSpaceComplexity: string;
    scaleNumber: number;
    scaleUnit: string;
    currentOperations: string;
    optimizedOperations: string;
    speedupFactor: string;
    estimatedCurrentLatency: string;
    estimatedOptimizedLatency: string;
    verdict: string;
    verdictColor?: string;
  };
  alerts: Array<{
    category: 'efficiency' | 'quality_security' | 'relevance';
    severity: 'critical' | 'warning' | 'info';
    lines?: number[];
    title: string;
    message: string;
    mathExplanation: string;
  }>;
  optimizedCode: string;
  explanation: string;
  appliedTools?: string[];
}

export const VSCodeSimulator: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<CodeSnippet>(STARTER_TEMPLATES[0]);
  const [currentCode, setCurrentCode] = useState<string>(STARTER_TEMPLATES[0].code);
  const [projectIdea, setProjectIdea] = useState<string>(STARTER_TEMPLATES[0].projectIdea);
  const [scaleNumber, setScaleNumber] = useState<number>(STARTER_TEMPLATES[0].scaleNumber);
  
  const [isAuditing, setIsAuditing] = useState<boolean>(false);
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [activeTab, setActiveTab] = useState<'editor' | 'diff' | 'trace'>('editor');
  const [activeAlertCategory, setActiveAlertCategory] = useState<'all' | 'efficiency' | 'quality_security' | 'relevance'>('all');
  const [useLiveAi, setUseLiveAi] = useState<boolean>(true);
  const [showAutoFixToast, setShowAutoFixToast] = useState<boolean>(false);
  const [highlightedLines, setHighlightedLines] = useState<number[]>([10, 11, 12]);

  // Sync when template changes
  const handleSelectTemplate = (template: CodeSnippet) => {
    setSelectedTemplate(template);
    setCurrentCode(template.code);
    setProjectIdea(template.projectIdea);
    setScaleNumber(template.scaleNumber);
    setAuditResult(null);
  };

  // Run the Agentic Audit
  const handleRunAudit = async () => {
    setIsAuditing(true);
    setAuditResult(null);

    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: currentCode,
          language: selectedTemplate.language,
          projectIdea: projectIdea,
          targetScale: `${scaleNumber.toLocaleString()} ${selectedTemplate.scaleUnit}`,
          useAi: useLiveAi
        }),
      });

      const data = await response.json();
      if (data.success) {
        setAuditResult(data);
        
        // Extract lines to highlight
        const lines: number[] = [];
        data.alerts.forEach((alert: any) => {
          if (alert.lines) {
            lines.push(...alert.lines);
          }
        });
        setHighlightedLines(lines.length > 0 ? lines : [4, 5, 6]);
      }
    } catch (err) {
      console.error('Audit failed:', err);
    } finally {
      setIsAuditing(false);
    }
  };

  // Apply Auto-Fix
  const handleApplyAutoFix = () => {
    if (auditResult?.optimizedCode) {
      setCurrentCode(auditResult.optimizedCode);
      setShowAutoFixToast(true);
      setTimeout(() => setShowAutoFixToast(false), 4000);
      setHighlightedLines([]);
    }
  };

  // Run initial audit on load
  useEffect(() => {
    handleRunAudit();
  }, []);

  const filteredAlerts = auditResult?.alerts.filter(alert => {
    if (activeAlertCategory === 'all') return true;
    return alert.category === activeAlertCategory;
  }) || [];

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col">
      {/* VS Code Window Titlebar */}
      <div className="bg-slate-900/90 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 mr-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block"></span>
          </div>
          <span className="text-slate-300 font-medium flex items-center gap-1.5">
            <Code2 className="w-3.5 h-3.5 text-blue-400" />
            CodeGuard Studio • VS Code Extension Simulator
          </span>
          <span className="bg-blue-950/60 text-blue-300 border border-blue-800/60 px-2 py-0.5 rounded text-[11px] font-mono">
            AGENTIC AI HACKATHON 2.0
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded text-slate-300">
            <span className={`w-2 h-2 rounded-full ${useLiveAi ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
            <span className="text-[11px] font-mono">{useLiveAi ? 'Gemini 3.8 Flash (Active)' : 'Local Heuristic Engine'}</span>
          </div>
          <button
            onClick={() => setUseLiveAi(!useLiveAi)}
            className="text-[11px] text-slate-400 hover:text-slate-200 underline decoration-dotted"
          >
            {useLiveAi ? 'Switch to Offline' : 'Switch to Gemini AI'}
          </button>
        </div>
      </div>

      {/* Step 1 & 2: Project Idea & Scale Context Bar */}
      <div className="bg-slate-900 border-b border-slate-800 p-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex-1 min-w-[320px]">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">1</span>
              Project Idea & Scope Baseline
            </label>
            <span className="text-[11px] text-blue-400">Context Grounds the Auditor</span>
          </div>
          <input
            type="text"
            value={projectIdea}
            onChange={(e) => setProjectIdea(e.target.value)}
            placeholder="e.g. I am building e-commerce site for 1 lakh products"
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500 font-mono"
          />
        </div>

        <div className="min-w-[240px]">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold">2</span>
              Target Scale: <span className="text-indigo-400 font-mono font-bold">{scaleNumber.toLocaleString()}</span> {selectedTemplate.scaleUnit}
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="1000"
              max="1000000"
              step="10000"
              value={scaleNumber}
              onChange={(e) => setScaleNumber(Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRunAudit}
            disabled={isAuditing}
            className={`px-4 py-2 rounded-lg font-semibold text-xs flex items-center gap-2 shadow-lg transition-all ${
              isAuditing
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-500/20 active:scale-95'
            }`}
          >
            {isAuditing ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                Auditing Code...
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                Run CodeGuard Audit
              </>
            )}
          </button>
        </div>
      </div>

      {/* Preset Selector Tabs */}
      <div className="bg-slate-950/80 px-4 py-2 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto text-xs">
        <span className="text-slate-500 text-[11px] font-medium mr-1 uppercase tracking-wider">Presets:</span>
        {STARTER_TEMPLATES.map((tpl) => (
          <button
            key={tpl.id}
            onClick={() => handleSelectTemplate(tpl)}
            className={`px-2.5 py-1 rounded text-xs transition-colors flex items-center gap-1.5 ${
              selectedTemplate.id === tpl.id
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40 font-medium'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
            }`}
          >
            <FileCode className="w-3 h-3" />
            {tpl.name}
          </button>
        ))}
      </div>

      {/* Main Split Body: Editor on Left, Auditor Panel on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
        {/* LEFT COLUMN: VS Code Editor (7 cols) */}
        <div className="lg:col-span-7 border-r border-slate-800 flex flex-col bg-slate-950">
          {/* File Tabs */}
          <div className="bg-slate-900/60 border-b border-slate-800 flex items-center justify-between px-3">
            <div className="flex items-center">
              <div className="bg-slate-950 border-t-2 border-blue-500 px-3 py-2 text-xs font-mono text-slate-200 flex items-center gap-2 border-r border-slate-800">
                <FileCode className="w-3.5 h-3.5 text-blue-400" />
                {selectedTemplate.name}
                {auditResult?.scaleAnalysis?.verdict === 'CRITICAL BOTTLENECK' && (
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={() => setActiveTab('editor')}
                className={`px-2 py-1 rounded transition-colors ${
                  activeTab === 'editor' ? 'bg-slate-800 text-slate-200' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Code Editor
              </button>
              <button
                onClick={() => setActiveTab('diff')}
                disabled={!auditResult}
                className={`px-2 py-1 rounded transition-colors ${
                  activeTab === 'diff' ? 'bg-slate-800 text-slate-200' : 'text-slate-400 hover:text-slate-200'
                } ${!auditResult ? 'opacity-40 cursor-not-allowed' : ''}`}
              >
                Side-by-Side Diff
              </button>
              {auditResult?.optimizedCode && (
                <button
                  onClick={handleApplyAutoFix}
                  className="bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 px-2.5 py-1 rounded text-xs flex items-center gap-1.5 transition-all"
                >
                  <Wand2 className="w-3 h-3 text-emerald-400" />
                  Auto-Fix Code
                </button>
              )}
            </div>
          </div>

          {/* Toast Alert when Auto-Fix applied */}
          {showAutoFixToast && (
            <div className="bg-emerald-950/90 border border-emerald-700/80 text-emerald-200 px-4 py-2 mx-3 my-2 rounded-lg text-xs flex items-center justify-between animate-fadeIn">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span><strong>CodeGuard Applied Auto-Fix:</strong> Code complexity transformed to O(N) hash indexing!</span>
              </div>
              <button onClick={() => setCurrentCode(selectedTemplate.code)} className="underline hover:text-white">
                Revert
              </button>
            </div>
          )}

          {/* Editor Body */}
          {activeTab === 'editor' ? (
            <div className="flex-1 p-3 font-mono text-xs flex overflow-x-auto relative bg-[#0f141c]">
              {/* Line Numbers */}
              <div className="select-none text-slate-600 pr-3 border-r border-slate-800/80 text-right w-8 space-y-1">
                {currentCode.split('\n').map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`${highlightedLines.includes(idx + 1) ? 'text-red-400 font-bold bg-red-950/40' : ''}`}
                  >
                    {idx + 1}
                  </div>
                ))}
              </div>

              {/* Code lines with inline squiggles */}
              <div className="pl-3 flex-1 space-y-1 text-slate-300">
                {currentCode.split('\n').map((line, idx) => {
                  const isHighlighted = highlightedLines.includes(idx + 1);
                  return (
                    <div 
                      key={idx} 
                      className={`relative group ${isHighlighted ? 'bg-red-950/30 -mx-1 px-1 rounded' : ''}`}
                    >
                      <pre className="font-mono">{line || ' '}</pre>
                      {isHighlighted && (
                        <div className="h-0.5 w-full bg-red-500/80 relative">
                          <span className="hidden group-hover:block absolute bottom-2 left-0 bg-red-900 border border-red-700 text-red-200 px-2 py-1 rounded shadow-lg text-[10px] z-20 whitespace-nowrap">
                            ⚠️ CodeGuard Alert: O(N²) quadratic loop bottleneck detected at scale ({scaleNumber.toLocaleString()} units)
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Diff Tab */
            <div className="flex-1 p-3 grid grid-cols-2 gap-3 font-mono text-xs overflow-auto bg-[#0f141c]">
              <div className="bg-red-950/10 border border-red-900/40 rounded p-2.5">
                <div className="text-red-400 font-bold mb-2 pb-1 border-b border-red-900/40 flex items-center justify-between">
                  <span>BEFORE: Naive / LLM Generated</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-red-900/50 rounded">{auditResult?.scaleAnalysis?.currentTimeComplexity}</span>
                </div>
                <pre className="text-red-300/80 whitespace-pre-wrap">{selectedTemplate.code}</pre>
              </div>

              <div className="bg-emerald-950/10 border border-emerald-900/40 rounded p-2.5">
                <div className="text-emerald-400 font-bold mb-2 pb-1 border-b border-emerald-900/40 flex items-center justify-between">
                  <span>AFTER: CodeGuard Optimized</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-emerald-900/50 rounded">{auditResult?.scaleAnalysis?.optimizedTimeComplexity}</span>
                </div>
                <pre className="text-emerald-300 whitespace-pre-wrap">{auditResult?.optimizedCode}</pre>
              </div>
            </div>
          )}

          {/* VS Code Bottom Status Bar */}
          <div className="bg-blue-900/90 text-blue-100 text-[11px] px-3 py-1 flex items-center justify-between select-none">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <ShieldAlert className="w-3 h-3 text-amber-300" />
                CodeGuard: {auditResult ? `${auditResult.alerts.length} alerts` : 'Ready'}
              </span>
              <span className="text-blue-300">|</span>
              <span>Language: {selectedTemplate.language}</span>
              <span className="text-blue-300">|</span>
              <span>Scale Target: {scaleNumber.toLocaleString()} items</span>
            </div>

            <div className="flex items-center gap-3">
              <span>UTF-8</span>
              <span>Spaces: 4</span>
              <span className="text-emerald-300 font-mono font-semibold">
                {auditResult?.scaleAnalysis?.speedupFactor ? `⚡ ${auditResult.scaleAnalysis.speedupFactor}` : ''}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: CodeGuard Agent Intelligence Center (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/70 p-4 flex flex-col space-y-4 overflow-y-auto max-h-[660px]">
          {/* Hardware Math & Big-O Scorecard */}
          {auditResult && (
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-xl p-3.5 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-400" />
                  <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                    Scale Impact Calculator
                  </h3>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                  auditResult.scaleAnalysis.verdict === 'CRITICAL BOTTLENECK'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                }`}>
                  {auditResult.scaleAnalysis.verdict}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[10px]">Time Complexity</div>
                  <div className="flex items-center gap-1.5 font-mono mt-0.5">
                    <span className="text-red-400 font-bold">{auditResult.scaleAnalysis.currentTimeComplexity}</span>
                    <ArrowRight className="w-3 h-3 text-slate-500" />
                    <span className="text-emerald-400 font-bold">{auditResult.scaleAnalysis.optimizedTimeComplexity}</span>
                  </div>
                </div>

                <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[10px]">Projected Speedup</div>
                  <div className="text-emerald-400 font-mono font-bold mt-0.5 text-sm">
                    {auditResult.scaleAnalysis.speedupFactor}
                  </div>
                </div>

                <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[10px]">Operations @ {scaleNumber.toLocaleString()} units</div>
                  <div className="text-red-400 font-mono font-semibold text-[11px] truncate mt-0.5" title={auditResult.scaleAnalysis.currentOperations}>
                    {auditResult.scaleAnalysis.currentOperations}
                  </div>
                </div>

                <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[10px]">Est. Execution Latency</div>
                  <div className="flex items-center gap-1 text-[11px] font-mono mt-0.5">
                    <span className="text-red-400">{auditResult.scaleAnalysis.estimatedCurrentLatency.split(' ')[0]}</span>
                    <ArrowRight className="w-3 h-3 text-slate-500" />
                    <span className="text-emerald-400 font-bold">{auditResult.scaleAnalysis.estimatedOptimizedLatency}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleApplyAutoFix}
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 shadow-lg shadow-emerald-950 transition-all active:scale-98"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Apply 1-Click Scale-Optimized Auto-Fix
              </button>
            </div>
          )}

          {/* 4-Stage Agentic Loop Trace */}
          {auditResult?.agentTrace && (
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-300">
                <Cpu className="w-3.5 h-3.5 text-blue-400" />
                <span>Agentic Decision Trace (Plan → Reason → Tool → Act)</span>
              </div>

              <div className="space-y-2">
                {auditResult.agentTrace.map((step, idx) => (
                  <div key={idx} className="bg-slate-900/80 border border-slate-800/80 rounded-lg p-2 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5 font-semibold text-slate-200">
                        <span className="px-1.5 py-0.2 bg-blue-600/30 text-blue-300 border border-blue-500/30 rounded text-[10px] font-mono">
                          {step.step.toUpperCase()}
                        </span>
                        <span className="text-[11px]">{step.title}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">Stage {idx + 1}/4</span>
                    </div>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3 Categories of Alerts */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
                <AlertTriangle className="w-3.5 h-3.5 text-yellow-400" />
                <span>Active CodeGuard Alerts ({filteredAlerts.length})</span>
              </div>

              {/* Alert Category Filter Pills */}
              <div className="flex items-center gap-1 text-[10px]">
                <button
                  onClick={() => setActiveAlertCategory('all')}
                  className={`px-1.5 py-0.5 rounded ${
                    activeAlertCategory === 'all' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveAlertCategory('efficiency')}
                  className={`px-1.5 py-0.5 rounded ${
                    activeAlertCategory === 'efficiency' ? 'bg-red-900 text-red-200' : 'text-slate-400 hover:text-red-300'
                  }`}
                >
                  Efficiency
                </button>
                <button
                  onClick={() => setActiveAlertCategory('quality_security')}
                  className={`px-1.5 py-0.5 rounded ${
                    activeAlertCategory === 'quality_security' ? 'bg-amber-900 text-amber-200' : 'text-slate-400 hover:text-amber-300'
                  }`}
                >
                  Quality
                </button>
                <button
                  onClick={() => setActiveAlertCategory('relevance')}
                  className={`px-1.5 py-0.5 rounded ${
                    activeAlertCategory === 'relevance' ? 'bg-blue-900 text-blue-200' : 'text-slate-400 hover:text-blue-300'
                  }`}
                >
                  Relevance
                </button>
              </div>
            </div>

            {/* Alert Cards */}
            <div className="space-y-2.5 overflow-y-auto">
              {filteredAlerts.map((alert, idx) => {
                const isCrit = alert.severity === 'critical';
                const borderColor = alert.category === 'efficiency' 
                  ? 'border-red-800/80 bg-red-950/20' 
                  : alert.category === 'quality_security' 
                    ? 'border-amber-800/80 bg-amber-950/20' 
                    : 'border-blue-800/80 bg-blue-950/20';

                const badgeBg = alert.category === 'efficiency'
                  ? 'bg-red-500/20 text-red-300 border-red-500/30'
                  : alert.category === 'quality_security'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                    : 'bg-blue-500/20 text-blue-300 border-blue-500/30';

                return (
                  <div key={idx} className={`border rounded-lg p-2.5 text-xs ${borderColor}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border ${badgeBg}`}>
                        {alert.category.replace('_', ' & ')}
                      </span>
                      {alert.lines && (
                        <span className="text-[10px] text-slate-400 font-mono">
                          Lines {alert.lines.join('-')}
                        </span>
                      )}
                    </div>
                    <h4 className="font-semibold text-slate-200 text-xs mb-1">
                      {alert.title}
                    </h4>
                    <p className="text-slate-300 text-[11px] mb-1.5 leading-relaxed">
                      {alert.message}
                    </p>
                    <div className="bg-slate-900/90 rounded p-1.5 border border-slate-800 text-[10px] font-mono text-slate-300">
                      <strong className="text-slate-400">Scale Projection:</strong> {alert.mathExplanation}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
