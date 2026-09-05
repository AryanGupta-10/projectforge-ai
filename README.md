# PROJECTFORGE AI — AI Project Reality Engine

> **Tagline**: Don't just generate a project. Prove it's worth building.

**ProjectForge AI** is a production-quality, hackathon-ready application designed for final-year computer science & engineering students. It goes beyond basic project idea generation to behave as an **AI Project Discovery + Research + Critique + Optimization + Validation Engine**.

---

## 1. Problem Statement

Final-year students do not merely struggle to find project ideas. They struggle to answer critical questions:
- Is this idea actually original or has someone already built it?
- Is the problem meaningful or superficial?
- Is AI genuinely necessary or added unnecessarily?
- Can my team build this within our available timeline and skills?
- What will hackathon judges criticize?
- How can I mutate and sharpen the concept before building?

ProjectForge AI solves this deep problem by executing a rigorous 6-step intelligence loop:
$$\text{GENERATE} \rightarrow \text{INVESTIGATE} \rightarrow \text{ATTACK} \rightarrow \text{MUTATE} \rightarrow \text{VALIDATE} \rightarrow \text{BUILD}$$

---

## 2. Signature Features

### 🧬 1. Project DNA (Radar & Scorecards)
Evaluates 10 dimensional metrics (0–100):
1. **Originality** — Novelty and prior-art differentiation.
2. **Problem Impact** — Real-world bottleneck severity.
3. **AI Necessity** — Core cognitive reasoning vs superficial add-on.
4. **Technical Depth** — Architectural and data pipeline complexity.
5. **Feasibility** — Team hour budget vs workload bounds.
6. **Skill Match** — Alignment with student's known and partial skills.
7. **Industry Relevance** — Enterprise SaaS & career goal value.
8. **Demo Potential** — Visual presentation & input-output clarity.
9. **Scope Risk** — Inverted risk scale based on feature count vs weeks.
10. **Build Readiness** — Automated verification gate score.

*Labeled as **AI-assisted assessment**, accompanied by confidence levels, contributing factors, and actionable recommendations.*

---

### 📡 2. Novelty Radar & Evidence Ledger
- Searches public GitHub repositories and technical documentation matching key domain terms.
- Identifies overlapping features, prior art, and differentiating opportunities.
- Classifies claims into **FACT**, **INFERENCE**, **AI RECOMMENDATION**, or **UNCERTAIN** in an auditable Evidence Ledger.
- Uses evidence-based language: *"Potentially differentiated based on the sources analyzed."*

---

### 💀 3. Project Death Test ("TRY TO KILL MY PROJECT")
An adversarial AI reviewer that actively attacks the concept across 8 vectors:
1. **Originality Attack** (Has this already been done?)
2. **Problem Attack** (Is the problem actually important?)
3. **Technical Attack** (What could technically desync or fail?)
4. **Feasibility Attack** (Can the team build this in stated timeline?)
5. **AI Necessity Attack** (Is AI actually required?)
6. **Competition Attack** (Why choose this over existing solutions?)
7. **Scope Attack** (Is the MVP bloated?)
8. **Judge Attack** (What hard questions will hackathon evaluators ask?)

Outputs overall status (**PASS / WARNING / CRITICAL**), explicit attack points, and a direct CTA to *"Fix These Weaknesses"* in the Mutation Lab.

---

### 🧬 4. Idea Mutation Lab
Allows projects to evolve across 12 transformations:
- *Make More Original*, *Make More AI-Native*, *Reduce Scope*, *Increase Technical Depth*, *Improve Industry Value*, *Improve Social Impact*, *Make Hackathon Friendly*, *Make Portfolio Ready*, *Reduce Cost*, *Reduce API Dependency*, *Make Beginner Friendly*, *Make Advanced*.

Each action creates a **NEW PROJECT VERSION** in history. Displays side-by-side **BEFORE vs. AFTER vs. WHAT CHANGED vs. WHY BETTER** with real-time score delta recalculations.

---

### 🌳 5. Project Evolution Timeline
An interactive visual history tree tracking version progress ($V1 \rightarrow \text{Research} \rightarrow \text{Death Test} \rightarrow \text{Mutation} \rightarrow V2 \rightarrow \text{Build Ready}$). Users can inspect and switch to any historic version at any time.

---

### 🚦 6. Build Readiness Gate
A 12-point automated verification checklist:
- [x] Problem clearly defined
- [x] Target user clear
- [x] Meaningful differentiation
- [x] Evidence exists for claims
- [x] AI role meaningful
- [x] Scope realistic
- [x] Required data exists
- [x] APIs available
- [x] Team skills sufficient
- [x] Timeline realistic
- [x] MVP clearly defined
- [x] Architecture plausible

Outputs **BUILD READY** or **NEEDS REVISION**.

---

### 📦 7. Build Pack (Technical Blueprint)
Generates complete implementation documentation:
- Executive Overview & Problem Statement
- Target Users & User Stories
- Functional & Non-functional Requirements
- Tech Stack (Frontend, Backend, DB, AI, Infra)
- ASCII Architecture Diagram
- PostgreSQL DDL Database Schema (`CREATE TABLE` with constraints)
- REST & WebSocket API Contracts
- AI Pipeline Specifications & Security Checklist
- Recommended File Tree & Repository Structure
- Week-by-Week Development Sprint Milestones

---

### 👨‍⚖️ 8. Judge Mode
Simulates a demanding hackathon evaluator with pre-submission ratings, strongest/weakest aspects, likely judge questions & objections, and a 3-minute demo pitch strategy.

---

## 3. Tech Stack

- **Framework**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, Lucide Icons (`lucide-react`), Framer Motion
- **Data Visualization**: Recharts (Radar charts, score bars)
- **AI Integration**: Official `@google/genai` (Google Gemini API) with Zod validation
- **Research Engine**: GitHub Public Search API + Evidence Ledger classification
- **Scoring Engine**: Hybrid Deterministic Scoring Engine combining algorithmic skill/timeline bounds with AI qualitative signals
- **Testing**: Vitest

---

## 4. Setup & Running Locally

### Prerequisites
- Node.js 18.x or 20.x
- npm

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/project-forge-mentor.git
cd project-forge-mentor

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

### Environment Variables (`.env.local`)
```env
GEMINI_API_KEY=your_gemini_api_key_here
GITHUB_TOKEN=your_optional_github_token_here
```
*Note: If `GEMINI_API_KEY` is omitted, ProjectForge AI automatically uses its built-in offline cached intelligence for 100% demo reliability.*

### Running Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Running Unit Tests & Production Build
```bash
# Run Vitest unit tests
npm run test

# Production build
npm run build
```

---

## 5. Demo Flow (3–5 Minute Hackathon Presentation)

1. **Start**: Click **"Launch Hackathon Demo Mode"** in the top navbar.
2. **Onboarding**: Observe pre-filled CS student profile ($2\text{ members}, 4\text{ weeks}, 25\text{h/week}$, skills in Python, React, SQL).
3. **Idea Generation**: Inspect candidate project *"MedPulse AI — Real-time Clinical Triage & Risk Matrix Engine"*.
4. **Project DNA**: View the 10-metric Octagon Radar Chart and scorecards.
5. **Novelty Radar**: Inspect prior-art public repositories and Evidence Ledger.
6. **Death Test**: Run *"TRY TO KILL MY PROJECT"* to reveal 4 vulnerability warnings (clinical safety & HIPAA privacy).
7. **Mutation Lab**: Click *"Make More AI-Native"*. Observe creation of $V2$, score delta badge ($+11$ AI Necessity), and side-by-side BEFORE/AFTER diff view.
8. **Build Readiness**: Verify 12/12 checklist items passing **BUILD READY**.
9. **Build Pack**: Export technical blueprint (ASCII architecture, PostgreSQL DDL schema, API contracts, 4-week sprint roadmap).

---

## 6. Originality & Security Statement

- **Anti-Hallucination**: Public GitHub research outputs real repositories. If research fails, the system outputs *"Insufficient evidence"* rather than inventing URLs.
- **External Security**: External websites and repository READMEs are treated strictly as untrusted data (prompt injection protected).
- **Independent Implementation**: Built 100% independently for final-year students and hackathons.
