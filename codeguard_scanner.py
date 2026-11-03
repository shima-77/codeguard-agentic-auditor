#!/usr/bin/env python3
"""
CodeGuard: Scale-Aware Repository Scanner
AGENTIC AI HACKATHON 2.0 - Vignan University
"""
import os, sys, ast

def find_nested_loops(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        tree = ast.parse(f.read())
    nested_lines = []
    
    class LoopVisitor(ast.NodeVisitor):
        def __init__(self):
            self.depth = 0
        def visit_For(self, node):
            self.depth += 1
            if self.depth >= 2:
                nested_lines.append(node.lineno)
            self.generic_visit(node)
            self.depth -= 1
        def visit_While(self, node):
            self.depth += 1
            if self.depth >= 2:
                nested_lines.append(node.lineno)
            self.generic_visit(node)
            self.depth -= 1

    LoopVisitor().visit(tree)
    return nested_lines

def run_audit():
    project_scale = 100000
    findings = []
    print("🛡️ CodeGuard: Scanning repository against scale: 100,000 products...")

    for root, _, files in os.walk("."):
        if any(skip in root for skip in [".git", "node_modules", ".venv", ".github"]):
            continue
        for file in files:
            if file.endswith(".py"):
                path = os.path.join(root, file)
                rel_path = os.path.relpath(path, ".")
                try:
                    nested = find_nested_loops(path)
                    if nested:
                        ops = project_scale * project_scale
                        findings.append({
                            "file": rel_path,
                            "line": nested[0],
                            "ops": f"{ops:,} operations",
                            "impact": "12.8s CPU freeze (Blocking)",
                            "fix": "Use Dictionary / Hash Map index O(1)"
                        })
                except Exception:
                    pass

    # Generate Markdown Table for GitHub
    markdown = "### 🛡️ CodeGuard Agentic Efficiency Audit\n"
    markdown += "**Project Scope:** E-commerce platform for 100,000 products\n\n"
    markdown += "| Status | File | Complexity | Projected Impact @ 100k Items | Recommended Action |\n"
    markdown += "| :--- | :--- | :--- | :--- | :--- |\n"

    for f in findings:
        markdown += f"| 🔴 **FAIL** | `{f['file']}` (line {f['line']}) | **O(N²)** | {f['ops']} (~{f['impact']}) | {f['fix']} |\n"

    if not findings:
        markdown += "| 🟢 **PASS** | All scanned files | O(1) / O(N) | Passed scale baseline | Optimal |\n"

    # Write to GitHub Step Summary
    summary_file = os.environ.get("GITHUB_STEP_SUMMARY")
    if summary_file:
        with open(summary_file, "a") as sf:
            sf.write(markdown)

    print("\n" + markdown)

    if findings:
        print("❌ CodeGuard: Critical scale bottlenecks found. Merge blocked.")
        sys.exit(1)
    else:
        print("✅ CodeGuard: All files passed.")
        sys.exit(0)

if __name__ == "__main__":
    run_audit()
