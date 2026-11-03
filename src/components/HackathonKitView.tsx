import React, { useState } from 'react';
import { 
  Download, 
  Copy, 
  Check, 
  FileCode, 
  Terminal, 
  ExternalLink, 
  Layers, 
  BookOpen, 
  Sparkles,
  ShieldCheck,
  FolderTree
} from 'lucide-react';
import { HACKATHON_FILES, HackathonFile } from '../data/hackathonFiles';

export const HackathonKitView: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<HackathonFile>(HACKATHON_FILES[1]); // default extension.js
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleDownload = (file: HackathonFile) => {
    const cleanFilename = file.filename.split(' ')[0];
    const blob = new Blob([file.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = cleanFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl p-6">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
            <FolderTree className="w-4 h-4" />
            Hackathon Production Starter Files
          </div>
          <h2 className="text-xl font-bold text-slate-100">
            Exportable Starter Code & GitHub Action Kit
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Complete, self-contained code ready to copy, run with <code className="text-emerald-400 bg-slate-900 px-1 py-0.5 rounded font-mono">F5</code> in VS Code, and deploy to GitHub.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleCopy(selectedFile.content, selectedFile.id)}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-all"
          >
            {copiedId === selectedFile.id ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                Copied to Clipboard!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy Selected File
              </>
            )}
          </button>

          <button
            onClick={() => handleDownload(selectedFile)}
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-emerald-950 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            Download File
          </button>
        </div>
      </div>

      {/* Quick Setup Checklist */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 mb-6">
        <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-2">
          <Terminal className="w-4 h-4 text-blue-400" />
          5-Minute Hackathon Day Setup Instructions:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800/80">
            <span className="text-blue-400 font-bold block mb-1">Step 1: Local VS Code Extension</span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Create a new folder <code className="text-slate-300">codeguard-ext</code>. Save <code className="text-blue-300">package.json</code> and <code className="text-blue-300">extension.js</code>. Run <code className="text-emerald-400">npm install</code>. Press <code className="text-emerald-400 font-bold">F5</code> to launch the Extension Development Host!
            </p>
          </div>

          <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800/80">
            <span className="text-purple-400 font-bold block mb-1">Step 2: Add GitHub Action</span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              In any repository, add <code className="text-purple-300">codeguard_scanner.py</code> to the root, and add <code className="text-purple-300">.github/workflows/codeguard.yml</code>. Add <code className="text-emerald-400">GEMINI_API_KEY</code> to GitHub Secrets.
            </p>
          </div>

          <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800/80">
            <span className="text-emerald-400 font-bold block mb-1">Step 3: Demo to Judges</span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Show VS Code highlighting O(N²) nested loops in real-time, click <strong>"Apply Auto-Fix"</strong>, and show GitHub Action blocking a pull request merge due to scale bottlenecks.
            </p>
          </div>
        </div>
      </div>

      {/* File Selector Tabs & Code Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* File Tree / List */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Starter Code Files:
          </div>

          {HACKATHON_FILES.map((file) => (
            <button
              key={file.id}
              onClick={() => setSelectedFile(file)}
              className={`w-full text-left p-3 rounded-lg border text-xs transition-all flex items-start gap-2.5 ${
                selectedFile.id === file.id
                  ? 'bg-blue-950/40 border-blue-500/80 text-blue-200 shadow-md'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`}
            >
              <FileCode className={`w-4 h-4 shrink-0 mt-0.5 ${
                file.category === 'vscode' ? 'text-blue-400' :
                file.category === 'github' ? 'text-purple-400' :
                file.category === 'prompt' ? 'text-emerald-400' : 'text-amber-400'
              }`} />
              <div className="overflow-hidden">
                <div className="font-semibold truncate text-slate-200">{file.filename}</div>
                <div className="text-[11px] text-slate-500 truncate mt-0.5">{file.description}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Code Content Preview */}
        <div className="lg:col-span-8 bg-[#0b0f17] border border-slate-800 rounded-xl overflow-hidden flex flex-col">
          <div className="bg-slate-900/90 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs">
            <span className="font-mono text-slate-300 font-semibold flex items-center gap-2">
              <FileCode className="w-3.5 h-3.5 text-blue-400" />
              {selectedFile.filename}
            </span>
            <span className="text-[11px] text-slate-500 font-mono uppercase">
              {selectedFile.language}
            </span>
          </div>

          <div className="p-4 overflow-auto max-h-[520px] font-mono text-xs text-slate-300">
            <pre className="whitespace-pre-wrap">{selectedFile.content}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};
