<div align="center">
  <img alt="OpenJarvis" src="assets/OpenJarvis_Horizontal_Logo.png" width="400">

  <p><i>Personal AI, On Personal Devices.</i></p>

  <p>
    <a href="https://arxiv.org/abs/2605.17172"><img src="https://img.shields.io/badge/arXiv-2605.17172-b31b1b.svg" alt="arXiv"></a>
    <a href="https://openjarvis.stanford.edu/"><img src="https://img.shields.io/badge/project-OpenJarvis-blue" alt="Project"></a>
    <a href="https://open-jarvis.github.io/OpenJarvis/"><img src="https://img.shields.io/badge/docs-mkdocs-blue" alt="Docs"></a>
    <img src="https://img.shields.io/badge/python-%3E%3D3.11-blue" alt="Python">
    <img src="https://img.shields.io/badge/license-Apache%202.0-green" alt="License">
    <a href="https://discord.gg/CMVBmDQ5Fj"><img src="https://img.shields.io/badge/discord-join-7289da?logo=discord&logoColor=white" alt="Discord"></a>
    <a href="https://x.com/OpenJarvisAI"><img src="https://img.shields.io/badge/X-@OpenJarvisAI-black?logo=x&logoColor=white" alt="X / Twitter"></a>
  </p>
</div>

---

<div align="center">
  <img alt="OpenJarvis demo reel" src="assets/openjarvis_demo_reel.webp" width="75%">
</div>

---

> **[Documentation](https://open-jarvis.github.io/OpenJarvis/)**
>
> **[Project Site](https://openjarvis.stanford.edu/)**
>
> **[Paper](https://arxiv.org/abs/2605.17172)**
>
> **[Leaderboard](https://open-jarvis.github.io/OpenJarvis/leaderboard/)**
>
> **[Roadmap](https://open-jarvis.github.io/OpenJarvis/development/roadmap/)**

## Why OpenJarvis?

Personal AI agents are exploding in popularity, but nearly all of them still route intelligence through cloud APIs. Your "personal" AI continues to depend on someone else's server. At the same time, our [Intelligence Per Watt](https://www.intelligence-per-watt.ai/) research showed that local language models already handle 88.7% of single-turn chat and reasoning queries, with intelligence efficiency improving 5.3× from 2023 to 2025. The models and hardware are increasingly ready. What has been missing is the software stack to make local-first personal AI practical.

OpenJarvis is that stack. It is a framework for local-first personal AI, built around three core ideas: shared primitives for building on-device agents; evaluations that treat energy, FLOPs, latency, and dollar cost as first-class constraints alongside accuracy; and a learning loop that improves models using local trace data. The goal is simple: make it possible to build personal AI agents that run locally by default, calling the cloud only when truly necessary. OpenJarvis aims to be both a research platform and a production foundation for local AI, in the spirit of PyTorch.

## Fork Security & Attribution

- **Fork Name:** `openjarvis-aman` (on `danryu655-ship-it`)
- **Pinned Upstream Commit:** `c3ed63f1d2a2c0c1f7dabbc69050e1968a11dc10` (from [OpenJarvis Upstream](https://github.com/open-jarvis/OpenJarvis))
- **Original License:** Apache-2.0 (Stanford Hazy Research & contributors)

### Disabled Features & Hardening
To ensure absolute safety and privacy, the following modifications have been made in this fork:
1. **Telemetry & Analytics:** Completely removed all PostHog and usage telemetry code, endpoints, and packages.
2. **Gmail Scopes & Actions:** Restricted to read-only (`gmail.readonly`). Sending emails, trashing, and modifying/labeling emails are disabled.
3. **Calendar Scopes & Actions:** Restricted to read-only (`calendar.readonly`). Accepting or declining events is disabled.
4. **Auto-Installers:** Removed all remote script execution (`curl | bash`, `irm | iex`). Manual installation is strictly required.
5. **Removed analytics leftovers (verification pass):** the server's import of the deleted analytics routes, the `jarvis init` analytics prompt and `--analytics` flag, and all frontend analytics calls (`App.tsx`, `main.tsx`, `store.ts`, the sharing dialog) were removed as well — no code in this fork references the analytics module anymore. The sharing dialog is now leaderboard-only.
6. **Update checks are opt-in:** the PyPI version check is off by default; enable it explicitly with `[updates] auto_update = true` in `config.toml`.
7. **Lockfiles regenerated:** `uv.lock` and `frontend/package-lock.json` were regenerated so the PostHog packages are no longer installed.
8. **Upstream CI/release workflows removed** (`.github/workflows/`): not needed for a local install, and they included GitHub-app automations (Claude review/issues) that have no place in a personal fork.

---

## Installation (Manual Windows Native Instructions)

Automated script installers have been removed for security. Follow these manual steps on Windows:

### Prerequisites
- **Hardware:** PC with 16GB+ RAM (recommended for local LLMs).
- **Python:** Python 3.11–3.13 installed and added to PATH.
- **Ollama:** Download and install from [ollama.com](https://ollama.com), then pull a model (e.g., `ollama run llama3`).
- **uv:** Install the Astral uv package manager: `pip install uv`

### Setup Steps
1. Clone this repository:
   ```powershell
   git clone https://github.com/danryu655-ship-it/openjarvis-aman.git
   cd openjarvis-aman
   ```
2. Create a virtual environment and sync dependencies:
   ```powershell
   uv venv
   .venv\Scripts\activate
   uv sync
   ```
3. Run morning-digest or chat:
   ```powershell
   jarvis init --preset morning-digest-minimal --force
   jarvis digest --fresh
   ```

## Quick Start

```bash
jarvis                          # start chatting (default: chat-simple)
jarvis gui                      # start the graphical browser interface
jarvis init --preset <name> --force  # replace config with a starter preset
```

`jarvis gui` starts the local API server and frontend, then opens the graphical
chat interface in your default browser. It requires Node.js 22+ and is
available from a source checkout; packaged desktop installers are available
from the [latest release](https://github.com/open-jarvis/OpenJarvis/releases/latest).

> Prefix `jarvis ...` with `uv run`, or `source .venv/bin/activate` first.

| Preset | What it does |
|---|---|
| `morning-digest-mac` / `morning-digest-linux` / `morning-digest-minimal` | Spoken daily briefing from email, calendar, health, news |
| `deep-research` | Multi-hop research across indexed docs with citations |
| `code-assistant` | Agent with code execution, file I/O, and shell access |
| `scheduled-monitor` | Stateful agent on a schedule with memory |
| `chat-simple` | Lightweight conversation, no tools |

Example:

```bash
jarvis init --preset morning-digest-mac --force
jarvis connect gdrive          # one OAuth covers Gmail / Calendar / Tasks
jarvis digest --fresh          # generate and play your first briefing
```

Per-preset deep dives: [morning digest](https://open-jarvis.github.io/OpenJarvis/user-guide/morning-digest/) · [deep research](https://open-jarvis.github.io/OpenJarvis/user-guide/deep-research/) · [code assistant](https://open-jarvis.github.io/OpenJarvis/user-guide/code-assistant/) · [scheduled monitor](https://open-jarvis.github.io/OpenJarvis/user-guide/scheduled-monitor/) · [chat simple](https://open-jarvis.github.io/OpenJarvis/user-guide/chat-simple/) · or the full [quickstart guide](https://open-jarvis.github.io/OpenJarvis/getting-started/quickstart/).

### Skills

Skills teach agents how to better use tools and improve their reasoning. Every skill is a tool — agents discover them from a catalog and invoke them on demand.

```bash
# Install skills from public sources
jarvis skill install hermes:arxiv
jarvis skill sync hermes --category research

# Use skills with any agent
jarvis ask "Use the code-explainer skill to explain this Python code: for i in range(5): print(i*2)"

# Optimize skills from your trace history
jarvis optimize skills --policy dspy

# Benchmark the impact
jarvis bench skills --max-samples 5 --seeds 42
```

Import from [Hermes Agent](https://github.com/NousResearch/hermes-agent) (~150 skills), [OpenClaw](https://github.com/openclaw/skills) (~13,700 community skills), or any GitHub repo. Skills follow the [agentskills.io](https://agentskills.io/specification) open standard.

See the [Skills User Guide](https://open-jarvis.github.io/OpenJarvis/user-guide/skills/) and [Skills Tutorial](https://open-jarvis.github.io/OpenJarvis/tutorials/skills-workflow/) for details.

### Built-in Agents

OpenJarvis ships with eight built-in agents across three execution modes (on-demand, scheduled, continuous):

| Agent | Type | What it does |
|-------|------|-------------|
| `morning_digest` | Scheduled | Daily briefing from email, calendar, health, news — with TTS audio |
| `deep_research` | On-demand | Multi-hop research with citations across web and local docs |
| `monitor_operative` | Continuous | Long-horizon monitoring with memory, compression, and retrieval |
| `orchestrator` | On-demand | Multi-turn reasoning with automatic tool selection |
| `native_react` | On-demand | ReAct (Thought-Action-Observation) loop agent |
| `operative` | Continuous | Persistent autonomous agent with state management |
| `native_openhands` | On-demand | CodeAct — generates and executes Python code |
| `simple` | On-demand | Single-turn chat, no tools |

See the [User Guide](https://open-jarvis.github.io/OpenJarvis/user-guide/morning-digest/) and [Tutorials](https://open-jarvis.github.io/OpenJarvis/tutorials/) for detailed setup instructions.

Full documentation — including Docker deployment, cloud engines, development setup, and tutorials — at **[open-jarvis.github.io/OpenJarvis](https://open-jarvis.github.io/OpenJarvis/)**.

## Community

- **GitHub:** [github.com/open-jarvis/OpenJarvis](https://github.com/open-jarvis/OpenJarvis)
- **Discord:** [discord.gg/CMVBmDQ5Fj](https://discord.gg/CMVBmDQ5Fj)
- **X / Twitter:** [@OpenJarvisAI](https://x.com/OpenJarvisAI)
- **Docs:** [open-jarvis.github.io/OpenJarvis](https://open-jarvis.github.io/OpenJarvis/)

## Contributing

We welcome contributions! See the [Contributing Guide](CONTRIBUTING.md) for incentives, contribution types, and the PR process.

Quick start for contributors:

```bash
git clone https://github.com/open-jarvis/OpenJarvis.git
cd OpenJarvis
uv sync --extra dev
uv run pre-commit install
uv run pytest tests/ -v
```

Browse the [Roadmap](https://open-jarvis.github.io/OpenJarvis/development/roadmap/) for areas where help is needed. Comment **"take"** on any issue to get auto-assigned.

## About

OpenJarvis is part of [Intelligence Per Watt](https://www.intelligence-per-watt.ai/), a research initiative studying the intelligence efficiency of AI systems. The project is developed at [Hazy Research](https://hazyresearch.stanford.edu/) and the [Scaling Intelligence Lab](https://scalingintelligence.stanford.edu/) at [Stanford SAIL](https://ai.stanford.edu/).

## Sponsors

<p>
  <a href="https://www.laude.org/">Laude Institute</a> &bull;
  <a href="https://datascience.stanford.edu/marlowe">Stanford Marlowe</a> &bull;
  <a href="https://cloud.google.com/">Google Cloud Platform</a> &bull;
  <a href="https://lambda.ai/">Lambda Labs</a> &bull;
  <a href="https://ollama.com/">Ollama</a> &bull;
  <a href="https://research.ibm.com/">IBM Research</a> &bull;
  <a href="https://hai.stanford.edu/">Stanford HAI</a>
</p>

## Citation
```bibtex
@misc{saadfalcon2026openjarvispersonalaipersonal,
      title={OpenJarvis: Personal AI, On Personal Devices}, 
      author={Jon Saad-Falcon and Avanika Narayan and Robby Manihani and Tanvir Bhathal and Herumb Shandilya and Hakki Orhun Akengin and Gabriel Bo and Andrew Park and Matthew Hart and Caia Costello and Chuan Li and Christopher Ré and Azalia Mirhoseini},
      year={2026},
      eprint={2605.17172},
      archivePrefix={arXiv},
      primaryClass={cs.LG},
      url={https://arxiv.org/abs/2605.17172}, 
}
```

## License

[Apache 2.0](LICENSE)
