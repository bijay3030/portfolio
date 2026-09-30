---
date: '0'
title: 'Helios'
cover: './ls-helios-cover.jpg'
external: ''
github: ''
cta: ''
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

**Helios is a workflow platform that runs medical translation projects end to end — from file intake to vendor coordination, delivery, and invoicing.** Built at Truemark for a US healthcare localization provider (client name withheld under NDA).

**The problem:** coordinators were moving files, prices, and vendor assignments between email and spreadsheets, which was slow and hard to audit. Helios automates those steps and gives every team one real-time view of each job.
