# Helios: Healthcare Translation Operations case study

> Helios is a workflow platform that runs medical translation projects end to end — from file intake to vendor coordination, delivery, and invoicing. It replaced a process run on email and spreadsheets with one auditable system.

- URL: https://bijay3030.github.io/projects/helios/
- Client: US healthcare localization provider (under NDA)
- Role: Full-stack engineer (Rails + React) at Truemark
- Stack: Ruby on Rails 7, React.js, Sidekiq, ActionCable, AWS S3, Pundit
- Last updated: 2026-09-30

## My contribution

- Built Rails services and Sidekiq jobs that route multilingual files and run validation checks on upload
- Automated pricing and turnaround calculations and generated vendor work orders from them
- Added live job-status updates with ActionCable and role-based access with Pundit

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

- **Background jobs for anything slow.** Validation, routing, and document generation run in Sidekiq so uploads return immediately and failures can be retried safely.
- **Authorization as policies, not scattered checks.** Pundit keeps "who can do what" in one place per model, which matters when clients, vendors, and staff share one system.
- **Push, don't poll.** ActionCable pushes status changes to open dashboards, which keeps the UI current without extra load from polling.

## Results

- Manual hand-offs across intake, vendor coordination, and delivery were replaced by automated steps.
- Every step is permission-checked and logged, giving healthcare clients an audit-ready history of each job.
- The team can take on higher volumes of medical localization work without adding coordinators.
