"""Dedicated terminal consent for optional external usage analytics.

REMOVED in the openjarvis-aman fork: external usage analytics (PostHog)
were deleted entirely, so there is nothing to consent to. The functions
below are kept so ``jarvis init`` keeps working; they always record
analytics as DISABLED and never prompt the user.
"""

from __future__ import annotations

import click
import tomlkit


def ask_analytics_consent(host: str | None = None) -> bool:
    """Always decline: external analytics do not exist in this fork."""
    return False


def apply_analytics_choice(content: str, choice: bool | None, *, prompt: bool) -> str:
    """Persist analytics as disabled in generated/copied TOML.

    Any explicit ``choice`` is ignored and forced to ``False``: the
    analytics backend was removed from this fork, so enabling it would
    be a lie. No prompt is ever shown.
    """
    choice = False
    doc = tomlkit.parse(content)
    if "analytics" not in doc:
        doc.add("analytics", tomlkit.table())
    doc["analytics"]["enabled"] = choice
    doc["analytics"]["choice_recorded"] = True
    return tomlkit.dumps(doc)
