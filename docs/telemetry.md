# Telemetry (openjarvis-aman fork)

> **External usage analytics were removed in this fork.** There is no
> PostHog endpoint, no install beacon, and no usage event sent anywhere.
> The installer scripts that used to send them (`install.sh`,
> `install.ps1`) were deleted, along with the analytics backend
> (`src/openjarvis/analytics/`, `server/analytics_routes.py`) and the
> frontend analytics library. `jarvis init` no longer asks for analytics
> consent and always records analytics as disabled.

## What remains: local telemetry only

The local telemetry subsystem (`src/openjarvis/telemetry/`, the Rust
`openjarvis-telemetry` crate) is **separate** from external analytics.
It records per-inference metrics — latency, token counts, cost, energy
consumption — in a local SQLite database (`~/.openjarvis/telemetry.db`).
It **never leaves the machine** and is controlled by `[telemetry]` (not
`[analytics]`) in `config.toml`.

See also [`docs/user-guide/telemetry.md`](user-guide/telemetry.md) for
the local telemetry system, and the fork README for the full list of
changes and disabled features.
