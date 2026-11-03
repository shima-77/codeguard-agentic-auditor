import React, { useState } from 'react';
import { 
  Trophy, 
  Briefcase, 
  Target, 
  MessageSquare, 
  CheckCircle2, 
  Sparkles, 
  Flame, 
  HelpCircle, 
  Clock, 
  Users, 
  MapPin, 
  Calendar, 
  Star,
  Zap,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const PitchDeckView: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const pitchFaqs = [
    {
      q: 'Judge Question: "Why not just use SonarQube, ESLint, or traditional linters?"',
      a: 'Traditional linters (SonarQube, ESLint, Pylint) are static syntax pattern matchers. They have zero understanding of project context or volume. An O(N²) nested loop looks completely legal and valid to SonarQube. But when CodeGuard knows the project context ("E-commerce platform with 1 lakh products"), it recognizes that N=100,000 transforms that loop into 10 Billion operations, crashing production. CodeGuard is context-aware and scale-grounded, which static tools can never be.'
    },
    {
      q: 'Judge Question: "What makes this an Agentic AI system, rather than just a ChatGPT prompt?"',
      a: 'CodeGuard executes an autonomous, multi-step agentic loop: 1) PLAN: It ingests user intent and hardware constraints. 2) REASON: It inspects code structure and AST trees. 3) TOOL USE: It autonomously calls a Big-O hardware scale calculator and static AST linters to project real-world millisecond latency. 4) ACT: It proactively takes action by placing diagnostics in VS Code, posting automated PR reviews on GitHub, and synthesizes 1-click patches without user prompt babysitting.'
    },
    {
      q: 'Judge Question: "How do you guarantee that Gemini will not hallucinate incorrect code when auto-fixing?"',
      a: 'We use a dual-gate architecture: First, deterministic static AST analysis (via Python AST) provides mathematical truth about loop depth and variable scope. Second, we enforce Gemini 3.8 Flash to return strict JSON via `responseSchema` with typed properties. Third, the auto-fix undergoes AST validation before presenting to the developer, and the developer always sees a side-by-side diff before 1-click applying.'
    },
    {
      q: 'Judge Question: "How does this scale to large production repositories at a company like CodeRepo?"',
      a: 'CodeGuard uses incremental scanning: in VS Code, it only evaluates active buffers or saved changes. In GitHub Actions, it only analyzes git diffs on PRs. This keeps Gemini token costs minimal (under 500 tokens per function audit) while delivering immediate sub-second feedback.'
    }
  ];

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl p-6 space-y-6">
      {/* Event Header Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-indigo-950 to-purple-950 border border-blue-800/80 rounded-xl p-5 shadow-xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-yellow-400 uppercase tracking-wider mb-1">
              <Trophy className="w-4 h-4" />
              1st Prize Strategy & CodeRepo Internship Guide
            </div>
            <h2 className="text-xl font-bold text-slate-100">
              AGENTIC AI HACKATHON 2.0 • Vignan University
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 mt-2 font-mono">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-blue-400" />
                5 Nov 2026 (8:30 AM - 4:00 PM)
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-red-400" />
                N-Block, 6th Floor, AIML Dept
              </span>
              <span className="flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-emerald-400 font-bold" />
                Target: 1st Prize (Rs 3000) + CodeRepo Internship
              </span>
            </div>
          </div>

          <div className="bg-slate-900/90 border border-yellow-500/40 px-4 py-2 rounded-xl text-center shadow-lg">
            <span className="text-[10px] text-yellow-400 uppercase font-bold tracking-wider block">Target Award</span>
            <span className="text-lg font-extrabold text-white">🏆 1st Prize</span>
            <span className="text-[11px] text-slate-300 block font-medium">+ CodeRepo Internship</span>
          </div>
        </div>
      </div>

      {/* 3-Minute Winning Pitch Script */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
              The 3-Minute Winning Pitch Script (Word-for-Word Guide)
            </h3>
          </div>
          <span className="text-xs bg-emerald-950 text-emerald-300 border border-emerald-800/80 px-2 py-0.5 rounded font-mono">
            Timer: 180 Seconds
          </span>
        </div>

        <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
          {/* Step 1: Hook */}
          <div className="bg-slate-950 p-3.5 rounded-lg border-l-4 border-blue-500">
            <div className="flex items-center justify-between text-blue-400 font-bold text-[11px] mb-1">
              <span>0:00 - 0:30 • THE HOOK (The Silent Crisis of AI-Generated Code)</span>
              <span>30 Sec</span>
            </div>
            <p className="italic">
              "Respected judges and professors from the AIML Department: Today, nearly every developer uses ChatGPT, GitHub Copilot, and Cursor. But here is the dangerous secret: <strong>AI generates code that looks beautiful, but fails catastrophically at scale.</strong> An LLM will happily give you an O(N²) nested loop for catalog matching. In a tutorial with 10 items, it takes 0.1 milliseconds. But in an e-commerce platform with 1 lakh items, that exact same AI code executes <strong>10 Billion operations and freezes your production servers for 13 seconds!</strong> Today, we introduce <strong>CodeGuard: The Autonomous Agentic Code Efficiency Auditor</strong>."
            </p>
          </div>

          {/* Step 2: Solution & Scale Context */}
          <div className="bg-slate-950 p-3.5 rounded-lg border-l-4 border-indigo-500">
            <div className="flex items-center justify-between text-indigo-400 font-bold text-[11px] mb-1">
              <span>0:30 - 1:15 • THE CORE INNOVATION (Contextual Scale-Awareness)</span>
              <span>45 Sec</span>
            </div>
            <p className="italic">
              "Unlike conventional tools like SonarQube that only check syntax rules, CodeGuard begins by asking the developer their <strong>Project Scope and Scale Target</strong>. If you tell CodeGuard: 'I am building an e-commerce catalog for 1 lakh products', our agent grounds its entire evaluation in that scale baseline. It operates inside VS Code while you code, and as an autonomous GitHub Action when you push code."
            </p>
          </div>

          {/* Step 3: Live Demo Sequence */}
          <div className="bg-slate-950 p-3.5 rounded-lg border-l-4 border-emerald-500">
            <div className="flex items-center justify-between text-emerald-400 font-bold text-[11px] mb-1">
              <span>1:15 - 2:15 • THE LIVE DEMO (The 'Shock & Wow' Moment)</span>
              <span>60 Sec</span>
            </div>
            <p className="italic">
              "Watch this live on my screen: Here is a standard product matcher generated by an LLM. Notice the red squiggly line appearing immediately in VS Code. CodeGuard alerts us: <em>'At 100,000 items, this nested loop causes 10 Billion operations and a 12.8 second freeze.'</em> It provides our 3 alert categories: 1. Efficiency Alert, 2. Quality Alert, and 3. Relevance Alert. Now, watch me click this single button: <strong>'Apply Auto-Fix'</strong>. Instantly, CodeGuard refactors the quadratic sweep into an O(1) hash indexed dictionary, cutting operations by <strong>100,000x</strong> down to 2.1 milliseconds! On GitHub, our Action blocks the pull request merge until this fix is committed."
            </p>
          </div>

          {/* Step 4: Tech Stack & Internship Alignment */}
          <div className="bg-slate-950 p-3.5 rounded-lg border-l-4 border-yellow-500">
            <div className="flex items-center justify-between text-yellow-400 font-bold text-[11px] mb-1">
              <span>2:15 - 3:00 • TECH STACK & VALUE TO CODEREPO</span>
              <span>45 Sec</span>
            </div>
            <p className="italic">
              "Under the hood, CodeGuard implements a strict 4-stage Agentic Loop: <strong>Plan</strong> (Scale ingestion), <strong>Reason</strong> (AST complexity analysis), <strong>Tool Use</strong> (Big-O hardware calculation engine), and <strong>Act</strong> (Auto-Fix generation using Google Gemini 3.8 Flash). For a software company like <strong>CodeRepo</strong>, CodeGuard prevents cloud bill explosions, prevents production outages, and ensures that junior developers and AI assistants write production-ready code. Thank you, and we welcome your questions!"
            </p>
          </div>
        </div>
      </div>

      {/* Judge Q&A Defense Guide */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-800">
          <HelpCircle className="w-4 h-4 text-blue-400" />
          <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
            Judge Q&A Defense: Master the Hard Questions
          </h3>
        </div>

        <div className="space-y-3">
          {pitchFaqs.map((faq, idx) => (
            <div key={idx} className="bg-slate-950 border border-slate-800 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full text-left p-3.5 flex items-center justify-between text-xs font-semibold text-slate-200 hover:text-blue-400 transition-colors"
              >
                <span>{faq.q}</span>
                {activeFaq === idx ? (
                  <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>

              {activeFaq === idx && (
                <div className="px-3.5 pb-3.5 text-xs text-slate-300 leading-relaxed border-t border-slate-800/80 pt-2.5 bg-slate-900/40">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CodeRepo Internship Alignment Checklist */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex items-center gap-2 mb-3">
          <Briefcase className="w-4 h-4 text-purple-400" />
          <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
            Why CodeRepo Recruiters Will Want to Hire Your Team
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <span className="text-emerald-400 font-bold block mb-1">1. Solves Real Enterprise Cost</span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Companies spend thousands of dollars on AWS/GCP computing bills due to unoptimized loops running in microservices. CodeGuard directly saves company revenue.
            </p>
          </div>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <span className="text-blue-400 font-bold block mb-1">2. Developer Tooling Pedigree</span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Building a real VS Code Extension and GitHub Action proves hands-on full-stack engineering skills, not just high-level toy prompts.
            </p>
          </div>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <span className="text-purple-400 font-bold block mb-1">3. Agentic Autonomy</span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Demonstrates actual agent tool use, AST graph traversal, and deterministic mathematical verification grounded in Google Gemini models.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
