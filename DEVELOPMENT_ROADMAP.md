# World Cup Bristow Challenge

## Development Roadmap

**Status:** UI Freeze 1.0 Baseline

## Vision

Build a polished, mobile-first web application for the Bristow family's
2026 FIFA World Cup competition.

### Goals

-   Follow the entire tournament live.
-   Full tournament bracket predictions.
-   Match-by-match predictions.
-   Automatic scoring after official results.
-   Beautiful iPhone-friendly experience.
-   Firebase-backed shared data.
-   Live tournament updates via API.

------------------------------------------------------------------------

# Core Principles

-   Mobile-first.
-   Firebase is the single source of truth.
-   Dark, modern UI.
-   No points before official results.
-   Incremental development (small commits).

------------------------------------------------------------------------

# UI Freeze 1.0

These are considered locked unless intentionally redesigned.

-   Home dashboard
-   Bottom navigation
-   Matches page layout
-   Tournament page layout
-   Family page layout
-   Admin page layout
-   Dark theme
-   Card styling
-   Mobile responsiveness

------------------------------------------------------------------------

# Navigation

1.  Home
2.  Matches
3.  Tournament
4.  Family
5.  Admin

------------------------------------------------------------------------

# Current Features

## Home

-   Leaderboard
-   Today's matches
-   Tournament summary

## Matches

-   All
-   Upcoming
-   Completed

## Tournament

-   Groups
-   Knockout Bracket

## Family

-   Full Bracket
-   Match-by-Match Picks
-   Family Member Selector

## Admin

-   Family management
-   Scoring settings
-   Data tools
-   Firebase status

------------------------------------------------------------------------

# Scoring Philosophy

-   Pending matches = 0 points.
-   Incorrect picks = 0 points.
-   Points awarded only after official final results.
-   Bracket predictions weighted higher than individual match picks.

------------------------------------------------------------------------

# Firebase Structure

    family
    matches
    groups
    standings
    bracket
    picks
    leaderboard
    settings

------------------------------------------------------------------------

# Development Workflow

1.  Choose one roadmap item.
2.  Make targeted code changes.
3.  Commit.
4.  Push.
5.  Test.
6.  Merge.

No wholesale UI replacements.

------------------------------------------------------------------------

# Sprint Backlog

## Sprint 1

-   Fix remaining UI bugs.
-   Restore flags beside teams.
-   Improve bracket spacing.
-   Complete knockout bracket rendering.

## Sprint 2

-   Firebase source of truth.
-   Admin functionality.
-   Backup / Restore.

## Sprint 3

-   Free World Cup API integration.
-   Live standings.
-   Live schedule.

## Sprint 4

-   API-Football integration.
-   Live scoring.
-   Dynamic leaderboard.

## Sprint 5

-   Animations.
-   Splash screen.
-   App icon.
-   Performance polish.

------------------------------------------------------------------------

# Parking Lot

Ideas for future versions:

-   Compare brackets
-   Remaining possible points
-   Pick percentages
-   Family statistics
-   Daily recap
-   Commissioner dashboard
-   Scenario analysis
-   Printable bracket
-   CSV / Excel export

------------------------------------------------------------------------

*Last Updated: June 2026*
