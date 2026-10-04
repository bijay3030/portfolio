// Everything the page says lives here. Edit this file to update the site.

export const profile = {
  name: 'Bijay Subedi',
  role: 'Senior software engineer',
  location: 'Kathmandu, Nepal',
  timezone: 'Asia/Kathmandu',
  utcOffset: 'UTC+5:45',
  email: 'sharma.bj11@gmail.com',
  resume: '/resume.pdf',
  // One sentence that says what you do and for whom.
  statement:
    'I build the software operations teams run on — workflow platforms that replace email threads and spreadsheets with one clear, auditable system.',
  availability: 'Open to senior full-time remote roles',
  overlap: '4+ hours with US Eastern · full EU workday',
  links: [
    { label: 'GitHub', href: 'https://github.com/bijay3030' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/bijay-p-subedi/' },
    { label: 'LeetCode', href: 'https://leetcode.com/u/stanbj3030/' },
  ],
};

export const about = [
  'Since 2021 I have worked at Truemark, building Ruby on Rails and React applications for US clients — mostly in healthcare localization, where a lost file or a wrong price is a real problem.',
  'The work I like best starts with a messy process that people hold together by hand. I model it as clear states, automate the steps between them, and leave a record of who did what.',
  'Day to day that means PostgreSQL data models, REST APIs, Sidekiq background jobs, real-time updates with ActionCable and Hotwire, services on AWS, and the CI/CD that ships them.',
];

// Small, verifiable facts. Each one should be something you can explain in an interview.
export const numbers = [
  { value: '5+', label: 'years shipping Rails & React' },
  { value: '6+', label: 'client applications led' },
  { value: '99.9%', label: 'uptime on APIs serving 500K+ requests a month' },
  { value: '45→8', label: 'minutes to deploy, after rebuilding CI/CD' },
  { value: '−40%', label: 'inter-service latency after moving to AWS microservices' },
  { value: '3', label: 'junior engineers mentored' },
];

export type Project = {
  id: string;
  name: string;
  domain: string;
  summary: string;
  before: string;
  after: string;
  flow: string[];
  client: string;
  role: string;
  contribution: string[];
  problem: string;
  built: string[];
  decisions: { title: string; body: string }[];
  results: string[];
  stack: string[];
  href?: string;
};

export const projects: Project[] = [
  {
    id: 'helios',
    name: 'Helios',
    domain: 'Healthcare translation operations',
    summary:
      'A workflow platform that runs medical translation projects end to end — from file intake to vendor coordination, delivery, and invoicing.',
    before: 'Email threads and spreadsheets',
    after: 'One auditable workflow',
    flow: ['Intake', 'Validate', 'Price', 'Route to vendors', 'Deliver', 'Invoice'],
    client: 'US healthcare localization provider (under NDA)',
    role: 'Full-stack engineer, Rails + React',
    contribution: [
      'Rails services and Sidekiq jobs that route multilingual files and validate them on upload',
      'Automated pricing and turnaround calculations, and vendor work orders generated from them',
      'Live job status with ActionCable; role-based access with Pundit',
    ],
    problem:
      'Medical translation jobs pass through many hands: upload, file checks, pricing, a vendor per language pair, tracking, delivery, invoicing. Most of that coordination lived in email and spreadsheets — slow to turn around, easy to lose a file or a deadline, and hard to prove who did what to clients who expect a clean audit trail.',
    built: [
      'Uploads land in S3 and are checked by background jobs before anyone touches them.',
      'Jobs split by language pair; pricing and turnaround are calculated, not typed.',
      'Vendor work orders are generated from the priced job.',
      'Delivery, invoice, and client handoff happen from the same record.',
      'Project managers see status change live instead of refreshing or asking around.',
    ],
    decisions: [
      { title: 'Background jobs for anything slow', body: 'Validation, routing, and document generation run in Sidekiq, so uploads return immediately and failures retry safely.' },
      { title: 'Authorization as policies', body: 'Pundit keeps “who can do what” in one place per model — important when clients, vendors, and staff share one system.' },
      { title: 'Push, don’t poll', body: 'ActionCable pushes status changes to open dashboards, keeping the UI current without polling load.' },
    ],
    results: [
      'Manual hand-offs across intake, vendors, and delivery replaced by automated steps.',
      'Every step permission-checked and logged — an audit-ready history for each job.',
      'Higher job volume without adding coordinators.',
    ],
    stack: ['Rails 7', 'React', 'Sidekiq', 'ActionCable', 'AWS S3', 'Pundit'],
  },
  {
    id: 'quoting',
    name: 'Quoting',
    domain: 'Healthcare localization pricing',
    summary:
      'A quote-management platform that turns a translation request into an accurate, versioned price quote — and hands approved quotes straight to delivery.',
    before: 'A spreadsheet per project manager',
    after: 'Shared rules, every revision kept',
    flow: ['Request in', 'Worksheet estimate', 'Edit line items', 'New version', 'Approve', 'Hand to delivery'],
    client: 'US healthcare localization provider (under NDA)',
    role: 'Full-stack engineer, Rails + React',
    contribution: [
      'Worksheet-based pricing rules and versioned quotes modeled in PostgreSQL',
      'Multilingual line-item editor in React 18, synced live over ActionCable',
      'Intake from external systems in; approved quotes out to delivery',
    ],
    problem:
      'Pricing a translation job depends on files, word counts, language pairs, schedule, and rules that differ by client. Those rules lived in individual spreadsheets: quotes were slow, two PMs could price the same job differently, and when a client asked for a change there was no reliable record of the previous quote.',
    built: [
      'Requests arrive from external intake systems through a Rails API, with file lists and word-count logs in S3.',
      'Shared worksheet rules calculate the first draft of every quote.',
      'PMs adjust line items per language pair; others viewing the quote see changes live.',
      'Every change creates a new version that can be compared or restored.',
      'Quotes are submitted or rejected; approved ones flow into delivery.',
    ],
    decisions: [
      { title: 'Immutable versions, not edits in place', body: 'Each revision is a new row, so history, comparisons, and client disputes are straightforward.' },
      { title: 'Pricing rules as data, not code', body: 'Worksheet rules change per client without a deploy.' },
      { title: 'Real-time only where it matters', body: 'ActionCable is used on the quote editor, where several people work on one quote at once — nowhere else.' },
    ],
    results: [
      'Quotes produced faster, with less back-and-forth between PMs and sales.',
      'Consistent pricing, because everyone uses the same rules.',
      'Full version history, access control, and secure file handling for enterprise clients.',
    ],
    stack: ['Rails 7', 'React 18', 'PostgreSQL', 'ActionCable', 'AWS S3', 'Pundit'],
  },
  {
    id: 'alistengine',
    name: 'AListEngine',
    domain: 'AI listing automation',
    summary:
      'An AI tool that turns product photos into ready-to-publish listings for e-commerce stores and auction houses.',
    before: 'Hours of writing per batch',
    after: 'Minutes, reviewed by a person',
    flow: ['Photos', 'AI draft', 'Seller rules', 'Human review', 'Export'],
    client: 'E-commerce sellers and auction houses',
    role: 'Full-stack engineer, Rails + React',
    contribution: [
      'The photo-to-draft pipeline calling AI vision and text models',
      'A rules engine for seller-specific fields and marketplace formats',
      'Exports to Shopify, AuctionFlex, and LiveAuctioneers',
    ],
    problem:
      'Auction houses list hundreds of one-off items — antiques, collectibles, second-hand goods. Each needs a good title, a detailed description, item specifics, and a sensible starting price, in a slightly different format for every marketplace. By hand it took hours per batch, and quality depended on who wrote it.',
    built: [
      'Sellers upload photos with a category and their own required fields.',
      'Vision and text models identify the item and draft title, description, specifics, and a starting price.',
      'A rules engine applies seller fields and each marketplace’s format.',
      'The seller edits and approves, then exports.',
    ],
    decisions: [
      { title: 'The AI drafts, a person approves', body: 'Nothing is exported without review — quality stays high and mistakes stay cheap.' },
      { title: 'Marketplace rules outside the prompt', body: 'Formatting and required fields are enforced in code, so output is consistent and a new marketplace doesn’t mean rewriting prompts.' },
      { title: 'One export layer per marketplace', body: 'Each integration maps the same listing to its platform, so adding a channel is isolated work.' },
    ],
    results: [
      'Listing creation dropped from hours to minutes.',
      'More consistent quality across sellers and channels.',
      'Far more items listed per day.',
    ],
    stack: ['Rails', 'React', 'AI vision + text', 'Rules engine', 'Shopify', 'AuctionFlex', 'LiveAuctioneers'],
  },
];

export const openSource = [
  {
    name: 'NEPSE Trade Journal',
    href: 'https://github.com/bijay3030/nepse-trade-journal',
    summary:
      'A trading journal for Nepal Stock Exchange traders: plan, execute, and review trades, keep a daily journal, and see win rate, P&L, and expectancy.',
    notes: [
      'Trades modeled as Plan → Execute → Result, updating the portfolio automatically',
      'Live prices over ActionCable WebSockets, with a polling fallback',
      'Rails 8 API with Devise + JWT; React 19 + TypeScript with React Query',
    ],
    stack: ['Rails 8', 'PostgreSQL', 'ActionCable', 'React 19', 'TypeScript', 'Tailwind'],
  },
];

export const experience = [
  {
    title: 'Senior Software Engineer',
    company: 'Truemark',
    href: 'https://www.truemark.dev/',
    period: 'Aug 2022 — Present',
    summary: 'Lead client Rails applications end to end, from data model to deploy pipeline.',
    points: [
      'Led 6+ Ruby on Rails client applications, owning architecture and complex business logic.',
      'Moved monoliths to microservices on AWS (EC2, S3, Lambda), cutting inter-service latency by 40%.',
      'Kept REST APIs serving 500K+ requests a month at 99.9% uptime.',
      'Introduced Hotwire and tuned React interfaces, cutting initial load ~35% and removing full-page reloads in key flows.',
      'Redesigned PostgreSQL schemas and indexes, cutting critical queries by up to 60%.',
      'Rebuilt CI/CD on GitLab CI and AWS CodePipeline: deploys from ~45 minutes to under 8.',
      'Raised test coverage to 87% with RSpec and Jest; production bug reports fell 35%.',
      'Mentored 3 junior engineers through weekly reviews in Rails and React.',
    ],
  },
  {
    title: 'Associate Software Engineer',
    company: 'Truemark',
    href: 'https://www.truemark.dev/',
    period: 'Apr 2021 — Aug 2022',
    summary: 'Built APIs and integrations for high-traffic client apps.',
    points: [
      'Built Rails APIs and backend services with consistent sub-200ms responses.',
      'Integrated 10+ third-party APIs — payments, analytics, communication.',
      'Worked on React frontends, reducing client-reported UI issues by 25%.',
      'Helped the team adopt Scrum and kept technical documentation current.',
    ],
  },
];

// How I work — each principle is backed by a project above.
export const principles = [
  { title: 'Slow work goes in the background.', body: 'Users get an answer immediately; the job retries safely when it fails.', from: 'Helios' },
  { title: 'Keep every version.', body: 'Edits create new records, so history is a query, not an argument.', from: 'Quoting' },
  { title: 'Rules are data.', body: 'If a business rule changes per client, it shouldn’t need a deploy.', from: 'Quoting' },
  { title: 'Push, don’t poll — where it matters.', body: 'Real-time only on the screens where people actually collaborate.', from: 'Helios · Quoting' },
  { title: 'The AI drafts, a person approves.', body: 'Models are fast and fallible; review keeps mistakes cheap.', from: 'AListEngine' },
  { title: 'One place for permissions.', body: 'Authorization as policies, not checks scattered across controllers.', from: 'Helios' },
];

export const skills = [
  { group: 'Backend', items: ['Ruby on Rails 7–8', 'PostgreSQL', 'Redis', 'Sidekiq', 'ActionCable', 'REST APIs'] },
  { group: 'Frontend', items: ['React 18–19', 'TypeScript', 'Hotwire (Turbo + Stimulus)'] },
  { group: 'Infrastructure', items: ['AWS (EC2, S3, Lambda, RDS)', 'Docker', 'Kubernetes', 'GitLab CI', 'GitHub Actions'] },
  { group: 'Quality', items: ['RSpec', 'Jest', 'TDD', 'Code review & mentoring'] },
];
