---
date: '0.5'
title: 'Quoting'
cover: './ls-quoting-cover.png'
external: 'https://www.languagescientific.com/'
github: ''
cta: ''
domain: 'Healthcare Localization'
role: 'Quote Lifecycle Automation'
projectTypes:
  - Project managers
  - Sales & account teams
  - Delivery operations
tech:
  - Ruby on Rails 7
  - React 18
  - PostgreSQL
  - ActionCable
  - AWS S3
  - Pundit
contribution:
  - Modeled worksheet-based pricing rules and versioned quotes in PostgreSQL
  - Built multilingual line-item editing in React 18, synced live over ActionCable
  - Wired intake from external systems in, and approved quotes out to delivery
estimationInputs:
  - Intake requests from external systems
  - Worksheet rules, file lists, and word-count logs
  - Language-pair line items, schedules, and delivery constraints
workflow:
  - Ingest the request and generate a worksheet-based estimate
  - Edit multilingual line items; every change creates a new quote version
  - Submit the approved quote straight into the delivery workflow
outcomes:
  - Faster quote turnaround with less rework between PMs and sales
  - Consistent pricing from shared worksheet rules instead of personal spreadsheets
  - Full version history, access rules, and secure file handling for enterprise clients
---

**Quoting is a quote-management platform that turns a healthcare translation request into an accurate, versioned price quote.** I built it for Language Scientific's project-management team.

**The problem:** estimates depended on word counts, file lists, and pricing rules spread across spreadsheets, so quotes were slow and inconsistent. Quoting centralizes those rules, tracks every revision, and hands approved quotes directly to delivery.
