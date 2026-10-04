# Quoting: Healthcare Localization case study

> Quoting is a quote-management platform that turns a healthcare translation request into an accurate, versioned price quote. It centralizes pricing rules, tracks every revision, and hands approved quotes straight to delivery.

- URL: https://bijay3030.github.io/projects/quoting/
- Client: US healthcare localization provider (under NDA)
- Role: Full-stack engineer (Rails + React) at Truemark
- Stack: Ruby on Rails 7, React 18, PostgreSQL, ActionCable, AWS S3, Pundit
- Last updated: 2026-09-30

## My contribution

- Modeled worksheet-based pricing rules and versioned quotes in PostgreSQL
- Built multilingual line-item editing in React 18, synced live over ActionCable
- Wired intake from external systems in, and approved quotes out to delivery

## The problem

Pricing a translation job depends on a lot of inputs: the files and their word counts, the language pairs, the schedule, and a set of pricing rules that differ by client and job type.

Those rules lived in **individual spreadsheets**. Quotes took a long time to put together, two project managers could price the same job differently, and when a client asked for a change there was no reliable record of what the previous quote said.

## What I built

Quoting turns that process into a single, rule-driven workflow:

- **Intake from other systems.** Requests arrive from external intake systems through a Rails API, with their file lists and word-count logs stored in AWS S3.
- **Worksheet-based estimates.** Shared worksheet rules calculate the first draft of each quote, so every PM prices the same way.
- **Multilingual line items.** A React 18 editor lets PMs adjust line items per language pair; changes sync live to other people viewing the quote through ActionCable.
- **Versioned quotes.** Every change creates a new version in PostgreSQL, so any earlier quote can be compared or restored.
- **Approval and handoff.** Quotes are submitted or rejected, and approved ones flow straight into the delivery workflow.
- **Access rules and audit.** Pundit policies control who can view, edit, and approve quotes.

## Key engineering decisions

- **Immutable versions instead of in-place edits.** Storing each revision as a new version makes history, comparisons, and client disputes straightforward.
- **Pricing rules as data, not code.** Worksheet rules can change per client without a deploy.
- **Real-time collaboration where it matters.** ActionCable is used on the quote editor, where several people may work on the same quote at once.

## Results

- Quotes are produced faster, with less back-and-forth between project managers and sales.
- Pricing is consistent because everyone uses the same worksheet rules.
- Enterprise clients get a full version history, access controls, and secure file handling.
