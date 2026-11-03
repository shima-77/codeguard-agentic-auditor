import React, { useState } from 'react';
import { 
  GitPullRequest, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Terminal, 
  Play, 
  RefreshCw, 
  FileCode, 
  ExternalLink,
  Shield,
  Layers,
  Sparkles
} from 'lucide-react';

export const GitHubActionView: React.FC = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [hasRun, setHasRun] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'comment' | 'logs' | 'files'>('comment');

  const filesScanned = [
    {
      name: 'src/services/catalog_matcher.py',
      status: 'failed',
      complexity: 'O(N²)',
      lines: 24,
      issues: 'Nested loop over 100,000 catalog items',
      recommendation: 'Use dictionary hash indexing O(1)',
      impact: '10 Billion ops (~12.8s CPU freeze)'
    },
    {
      name: 'src/controllers/order_batch.js',
      status: 'failed',
      complexity: 'O(N × M)',
      lines: 48,
      issues: 'Synchronous array .filter inside .forEach',
      recommendation: 'Pre-index promotions with Map',
      impact: 'Stalls Node.js single-thread event loop'
    },
    {
      name: 'src/utils/token_limiter.py',
      status: 'warning',
      complexity: 'O(N) RAM',
      lines: 32,
      issues: 'Unbounded array memory leak in sliding window',
      recommendation: 'Use fixed deque with maxlen',
      impact: 'Memory climbs to 600MB under load'
    },
    {
      name: 'src/middleware/auth_jwt.ts',
      status: 'passed',
      complexity: 'O(1)',
      lines: 18,
      issues: 'None - cryptographically sound and constant time',
      recommendation: 'Optimal',
      impact: 'Passes scale baseline'
    },
    {
      name: 'src/db/cache_client.py',
      status: 'passed',
      complexity: 'O(1)',
      lines: 42,
      issues: 'None - connection pooling enabled',
      recommendation: 'Optimal',
      impact: 'Passes scale baseline'
    }
  ];

  const handleRunSimulation = () => {
    setIsRunning(true);
    setHasRun(false);
    setTimeout(() => {
      setIsRunning(false);
      setHasRun(true);
    }, 1800);
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
      {/* GitHub Repo Header */}
      <div className="bg-slate-900 border-b border-slate-800 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-950/60 border border-purple-800/80 rounded-lg text-purple-400">
              <GitPullRequest className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-mono">vignan-aiml / coderepo-store</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/80">
                  PR #42 Open
                </span>
              </div>
              <h2 className="text-base font-bold text-slate-100 mt-0.5">
                Feat: Catalog matcher & order processing pipeline
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRunSimulation}
              disabled={isRunning}
              className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 shadow-lg transition-all ${
                isRunning 
                  ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20 active:scale-95'
              }`}
            >
              {isRunning ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  Running GitHub Action...
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Trigger Pull Request Audit
                </>
              )}
            </button>
          </div>
        </div>

        {/* Action Status Ribbon */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs gap-3">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Workflow:</span>
            <span className="font-mono text-slate-200">.github/workflows/codeguard.yml</span>
            {hasRun && (
              <span className="flex items-center gap-1 text-red-400 font-semibold bg-red-950/50 px-2 py-0.5 rounded border border-red-800/60">
                <XCircle className="w-3.5 h-3.5 text-red-400" />
                Action Failed: Critical Scale Bottlenecks Found (2 files)
              </span>
            )}
            {isRunning && (
              <span className="flex items-center gap-1 text-amber-400 bg-amber-950/50 px-2 py-0.5 rounded border border-amber-800/60 animate-pulse">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                Scanning 5 repository files with Gemini Agent...
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('comment')}
              className={`px-2.5 py-1 rounded text-xs transition-colors ${
                activeTab === 'comment' ? 'bg-slate-800 text-slate-200 font-medium' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              PR Bot Comment
            </button>
            <button
              onClick={() => setActiveTab('files')}
              className={`px-2.5 py-1 rounded text-xs transition-colors ${
                activeTab === 'files' ? 'bg-slate-800 text-slate-200 font-medium' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Files Changed (5)
            </button>
            <button
              onClick={() => setActiveTab('logs')}
              className={`px-2.5 py-1 rounded text-xs transition-colors ${
                activeTab === 'logs' ? 'bg-slate-800 text-slate-200 font-medium' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Terminal Logs
            </button>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-4 bg-slate-950">
        {/* Tab 1: Formatted GitHub Pull Request Bot Comment */}
        {activeTab === 'comment' && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
            {/* Bot Header */}
            <div className="bg-slate-850 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                  🛡️
                </div>
                <div>
                  <span className="font-semibold text-xs text-slate-200">codeguard-agent[bot]</span>
                  <span className="text-[11px] text-slate-500 ml-2">commented on PR #42</span>
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800/80">
                Agentic Gatekeeper
              </span>
            </div>

            {/* Bot Comment Body */}
            <div className="p-4 text-xs space-y-4">
              <div className="bg-red-950/20 border-l-4 border-red-500 p-3 rounded-r-lg">
                <h4 className="font-bold text-red-300 text-xs flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-red-400" />
                  CodeGuard Gating Alert: Merge Blocked Due to Scale Regressions
                </h4>
                <p className="text-slate-300 text-[11px] mt-1">
                  Baseline Project Scope: <strong>E-commerce platform with 100,000 products</strong>.
                  2 files contain quadratic algorithmic overhead that will freeze servers under target production traffic.
                </p>
              </div>

              {/* Table of Scanned Files */}
              <div className="border border-slate-800 rounded-lg overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-800/80 text-slate-300 font-semibold">
                    <tr>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3">File Path</th>
                      <th className="py-2.5 px-3">Complexity</th>
                      <th className="py-2.5 px-3">Issue Detected</th>
                      <th className="py-2.5 px-3">Impact at 100k Items</th>
                      <th className="py-2.5 px-3">Recommended Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                    {filesScanned.map((file, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/30">
                        <td className="py-2.5 px-3">
                          {file.status === 'failed' && (
                            <span className="text-red-400 flex items-center gap-1 font-bold">
                              <XCircle className="w-3.5 h-3.5" /> FAIL
                            </span>
                          )}
                          {file.status === 'warning' && (
                            <span className="text-amber-400 flex items-center gap-1 font-bold">
                              <AlertCircle className="w-3.5 h-3.5" /> WARN
                            </span>
                          )}
                          {file.status === 'passed' && (
                            <span className="text-emerald-400 flex items-center gap-1 font-bold">
                              <CheckCircle2 className="w-3.5 h-3.5" /> PASS
                            </span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 font-semibold text-slate-200">{file.name}</td>
                        <td className="py-2.5 px-3 text-red-300 font-bold">{file.complexity}</td>
                        <td className="py-2.5 px-3 text-slate-300 font-sans">{file.issues}</td>
                        <td className="py-2.5 px-3 text-red-400 font-sans">{file.impact}</td>
                        <td className="py-2.5 px-3 text-emerald-300 font-sans">{file.recommendation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Bot Instructions */}
              <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/60 text-slate-300 text-[11px] leading-relaxed">
                <strong>💡 How to resolve:</strong>
                <ol className="list-decimal pl-4 mt-1 space-y-1">
                  <li>In VS Code, run command <code className="bg-slate-900 px-1 py-0.5 rounded text-blue-300 font-mono">CodeGuard: Apply Scale-Optimized Auto-Fix</code> or press <code className="bg-slate-900 px-1 py-0.5 rounded text-blue-300 font-mono">Ctrl+Alt+C</code>.</li>
                  <li>Or run CLI scanner locally: <code className="bg-slate-900 px-1 py-0.5 rounded text-blue-300 font-mono">python codeguard_scanner.py --fix</code> to auto-commit patches.</li>
                  <li>Once complexity drops to linear O(N), CodeGuard CI gate will automatically turn green and allow merge.</li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Terminal Logs */}
        {activeTab === 'logs' && (
          <div className="bg-[#0b0f17] border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-300 space-y-2 max-h-[480px] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-500 text-[11px]">
              <span className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-blue-400" />
                Runner: Ubuntu-latest (GitHub Hosted Runner)
              </span>
              <span>Python 3.11 • Google GenAI SDK v2.4</span>
            </div>

            <p className="text-slate-500">$ python codeguard_scanner.py --project-idea "E-commerce platform for 100k products" --target-scale "100,000"</p>
            <p className="text-blue-400">🛡️ CodeGuard: Initializing autonomous repository scale audit...</p>
            <p className="text-slate-400">📌 Project Baseline: "E-commerce platform for 100k products"</p>
            <p className="text-slate-400">🎯 Target Workload Scale: 100,000 units</p>
            <p className="text-slate-500">---------------------------------------------------------</p>
            <p className="text-slate-300">[1/5] Analyzing src/services/catalog_matcher.py (Python AST + Gemini)...</p>
            <p className="text-red-400 font-bold">&gt;&gt; [ALERT] Nested for loop detected (depth 2) on line 10. Complexity: O(N²).</p>
            <p className="text-red-400">&gt;&gt; Mathematical scale penalty: 100,000 × 100,000 = 10,000,000,000 operations.</p>
            <p className="text-red-400">&gt;&gt; Verdict: CRITICAL BOTTLENECK. Suggestion: Hash map dictionary indexing.</p>

            <p className="text-slate-300 mt-2">[2/5] Analyzing src/controllers/order_batch.js (JavaScript AST)...</p>
            <p className="text-red-400 font-bold">&gt;&gt; [ALERT] Array .find() nested in .map() on line 6. Complexity: O(N × M).</p>
            <p className="text-red-400">&gt;&gt; Verdict: CRITICAL BOTTLENECK. Suggestion: Pre-index promotion rules.</p>

            <p className="text-slate-300 mt-2">[3/5] Analyzing src/utils/token_limiter.py...</p>
            <p className="text-yellow-400">&gt;&gt; [WARN] Sliding window array accumulates unbounded elements. Memory leak potential.</p>

            <p className="text-slate-300 mt-2">[4/5] Analyzing src/middleware/auth_jwt.ts...</p>
            <p className="text-emerald-400 font-bold">&gt;&gt; [PASS] Constant time execution O(1). Zero scalability hazards.</p>

            <p className="text-slate-300 mt-2">[5/5] Analyzing src/db/cache_client.py...</p>
            <p className="text-emerald-400 font-bold">&gt;&gt; [PASS] Scalable connection pool. O(1) query time.</p>

            <p className="text-slate-500 mt-3">---------------------------------------------------------</p>
            <p className="text-red-500 font-bold">❌ Error: Process completed with exit code 1.</p>
            <p className="text-slate-400">Published markdown summary table to GITHUB_STEP_SUMMARY.</p>
          </div>
        )}

        {/* Tab 3: Files Changed */}
        {activeTab === 'files' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filesScanned.map((file, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-slate-200 font-bold flex items-center gap-1.5">
                    <FileCode className="w-3.5 h-3.5 text-blue-400" />
                    {file.name}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    file.status === 'failed' ? 'bg-red-950 text-red-400 border border-red-800' :
                    file.status === 'warning' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                    'bg-emerald-950 text-emerald-400 border border-emerald-800'
                  }`}>
                    {file.status}
                  </span>
                </div>
                <div className="text-slate-400 text-[11px] space-y-1">
                  <div><strong>Complexity:</strong> <span className="font-mono text-slate-200">{file.complexity}</span></div>
                  <div><strong>Issue:</strong> {file.issues}</div>
                  <div><strong>Fix:</strong> <span className="text-emerald-400">{file.recommendation}</span></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
