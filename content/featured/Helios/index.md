---
date: '0'
updated: '2026-09-30'
title: 'Helios'
slug: '/projects/helios/'
cover: './architecture.png'
diagram: './architecture.svg'
ogImage: '/og/helios.png'
external: ''
github: ''
cta: ''
summary: 'Helios is a workflow platform that runs medical translation projects end to end — from file intake to vendor coordination, delivery, and invoicing. It replaced a process run on email and spreadsheets with one auditable system.'
description: 'Case study: Helios, a Rails 7 + React platform that automates medical translation operations from intake to invoicing — built by Bijay Subedi for a US healthcare localization provider.'
client: 'US healthcare localization provider (under NDA)'
position: 'Full-stack engineer (Rails + React) at Truemark'
domain: 'Healthcare Translation Operations'
role: 'Workflow Automation Platform'
projectTypes:
  - Project managers
  - Linguists & vendors
  - Billing & delivery teams
tech:
  - Ruby on Rails 7
  - React.js
  - Sidekiq
  - ActionCable
  - AWS S3
  - Pundit
contribution:
  - Built Rails services and Sidekiq jobs that route multilingual files and run validation checks on upload
  - Automated pricing and turnaround calculations and generated vendor work orders from them
  - Added live job-status updates with ActionCable and role-based access with Pundit
workflow:
  - Intake — client files land in S3, are validated, and routed by language pair
  - Coordinate — pricing, turnaround, and vendor work orders are generated automatically
  - Deliver — final files, invoice, and client handoff with a real-time status trail
outcomes:
  - Replaced manual hand-offs across intake, vendor coordination, and delivery
  - Every step is permission-checked and audit-logged — critical for healthcare clients
  - Handles high-volume medical localization without adding coordinator headcount
---

<!-- REVIEW: every statement below is based on the project summary and tech stack. Correct anything that is not accurate, and replace the qualitative results with real numbers (e.g. "intake-to-vendor time: 2 days → 3 hours") wherever you have them. -->

## The problem

Medical translation projects move through many hands: the client uploads source files, a project manager checks them, prices the job, picks vendors for each language pair, tracks progress, and finally delivers, invoices, and hands off.

Before Helios, most of that coordination happened in **email threads and spreadsheets**. That made it slow to turn a job around, easy to lose track of a file or a deadline, and hard to prove who did what — a real problem for healthcare clients who expect a clean audit trail.

## What I built

Helios models each translation job as a workflow with clear states, and automates the steps between them:

- **Intake and validation.** Uploaded files go to AWS S3 and are checked by background jobs (Sidekiq) before anyone touches them, so bad or missing files are caught at the door.
- **Routing and pricing.** Jobs are split by language pair, and pricing and turnaround are calculated from the job's inputs instead of by hand.
- **Vendor work orders.** Work orders for each vendor are generated automatically from the priced job.
- **Delivery and invoicing.** Final files, the invoice, and the client handoff all happen from the same record.
- **Live status.** Project managers see status changes in real time through ActionCable instead of refreshing or asking around.
- **Access control and audit.** Pundit policies decide who can see and change each job, and changes are logged.

## Key engineering decisions

<!-- REVIEW: these are the reasons such a system is typically built this way. Keep the ones that match your real reasoning and add any trade-offs you made. -->

- **Background jobs for anything slow.** Validation, routing, and document generation run in Sidekiq so uploads return immediately and failures can be retried safely.
- **Authorization as policies, not scattered checks.** Pundit keeps "who can do what" in one place per model, which matters when clients, vendors, and staff share one system.
- **Push, don't poll.** ActionCable pushes status changes to open dashboards, which keeps the UI current without extra load from polling.

## Results

- Manual hand-offs across intake, vendor coordination, and delivery were replaced by automated steps.
- Every step is permission-checked and logged, giving healthcare clients an audit-ready history of each job.
- The team can take on higher volumes of medical localization work without adding coordinators.
