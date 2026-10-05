// Everything the page says lives here. Edit this file to update the site.

export const profile = {
  name: 'Bijay Subedi',
  role: 'Senior software engineer',
  jobTitle: 'Senior Software Engineer',
  // Title, stack, and years: what a recruiter scans for first.
  tagline: 'Senior Rails & React engineer · Kathmandu, Nepal',
  employer: { name: 'Truemark', url: 'https://www.truemark.dev/' },
  location: 'Kathmandu, Nepal',
  timezone: 'Asia/Kathmandu',
  utcOffset: 'UTC+5:45',
  email: 'sharma.bj11@gmail.com',
  resume: 'resume.pdf', // relative to the site base
  // One sentence: the niche, who it's for, and where it's built from.
  statement:
    'I turn operations run on email and spreadsheets into Rails systems teams rely on — and I build them with AI in the loop.',
  availability: 'Open to senior full-time remote roles',
  overlap: '4+ hours with US Eastern · full EU workday',
  links: [
    { label: 'GitHub', href: 'https://github.com/bijay3030' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/bijay-p-subedi/' },
  ],
};

export const about = [
  'I joined Truemark in 2021 as an associate engineer and was leading client applications as a senior 16 months later. Most of that work serves US healthcare clients, where one lost file or wrong price breaks trust.',
  'I start by mapping how the work actually moves — who touches what, and where it breaks — then model it as explicit states and automate every step between. I orchestrate frontier models to write features, and every change ships only after tests and review.',
];

export type Architecture = {
  tiers: {
    label: string;
    // What travels from the tier above into this one.
    via?: string;
    core?: boolean;
    nodes: { name: string; note: string }[];
  }[];
  caption: string;
};

// Each fact appears once per project: summary (what), shift (before → after), scale (size),
// flow (steps), problem (why), architecture (how), my part (ownership), decisions (judgement), impact (results).
export type Project = {
  id: string;
  name: string;
  domain: string;
  summary: string;
  before: string;
  after: string;
  scale: string[];
  flow: string[];
  client: string;
  contribution: string[];
  problem: string;
  architecture: Architecture;
  decisions: { title: string; body: string }[];
  results: string[];
  stack: string[];
  href?: string;
};

export const projects: Project[] = [
  {
    id: 'helios',
    name: 'Helios',
    domain: 'Medical translation',
    summary: 'One platform for medical translation projects, from file intake to invoice.',
    before: 'Email threads and spreadsheets',
    after: 'One auditable workflow',
    scale: ['~20 files per project', '4–5 language pairs', 'up to ~100 tracked tasks'],
    flow: ['Intake', 'Validate', 'Price', 'Route to vendors', 'Deliver', 'Invoice'],
    client: 'US healthcare localization provider (NDA)',
    contribution: [
      'Sidekiq pipeline that validates and routes multilingual files on upload',
      'Automated pricing, turnaround, and vendor work orders',
      'Live dashboards and role-based access',
    ],
    problem:
      'Every file, in every language, needed its own vendor, deadline, and delivery. Coordinating that by hand was slow, risked lost files, and left no audit trail — for clients who require one.',
    architecture: {
      tiers: [
        {
          label: 'Users',
          nodes: [
            { name: 'Clients', note: 'upload sources, receive delivery' },
            { name: 'Project managers', note: 'price, assign, track' },
            { name: 'Vendors', note: 'one per language' },
          ],
        },
        {
          label: 'Rails 7 + React app',
          via: 'HTTPS · Pundit policies',
          core: true,
          nodes: [
            { name: 'Intake', note: 'files to S3, job record created' },
            { name: 'Job workflow', note: 'one state per stage' },
            { name: 'PM dashboards', note: 'live status' },
          ],
        },
        {
          label: 'Background · Sidekiq',
          via: 'enqueue — request returns immediately',
          nodes: [
            { name: 'Validate files', note: 'bad or missing files caught at upload' },
            { name: 'Split by language pair', note: 'one task per file per language' },
            { name: 'Generate documents', note: 'pricing, work orders, invoices' },
          ],
        },
        {
          label: 'State & real-time',
          via: 'store · broadcast',
          nodes: [
            { name: 'Database', note: 'jobs, assignments, audit history' },
            { name: 'AWS S3', note: 'source and delivered files' },
            { name: 'ActionCable', note: 'status to open dashboards' },
          ],
        },
      ],
      caption: 'Simplified. Client systems omitted (NDA).',
    },
    decisions: [
      { title: 'Background jobs for anything slow', body: 'Uploads return instantly; failed validation or routing retries safely.' },
      { title: 'Authorization as policies', body: 'One Pundit policy per model decides who can do what — essential when clients, vendors, and staff share one system.' },
      { title: 'Push, don’t poll', body: 'Dashboards update the moment status changes, with no polling load.' },
    ],
    results: ['Every hand-off automated.', 'Audit-ready history for every job.', 'More volume without more coordinators.'],
    stack: ['Rails 7', 'React', 'Sidekiq', 'ActionCable', 'AWS S3', 'Pundit', 'Docker'],
  },
  {
    id: 'quoting',
    name: 'Quoting',
    domain: 'Localization pricing',
    summary: 'Turns a translation request into an accurate, versioned quote.',
    before: 'A spreadsheet per project manager',
    after: 'One shared rulebook',
    scale: ['larger file sets than Helios', 'large worksheets per project type'],
    flow: ['Request in', 'Worksheet estimate', 'Edit line items', 'New version', 'Approve', 'Hand to delivery'],
    client: 'Same client as Helios',
    contribution: [
      'Pricing-rule and version data model in PostgreSQL',
      'Multilingual line-item editor with live co-editing',
      'Integrations: external intake in, delivery out',
    ],
    problem:
      'Price depends on word counts, language pairs, schedule, and client-specific rules. Each PM priced from a personal spreadsheet: quotes were slow, one job could get two prices, and a change request had no reliable record of the previous quote.',
    architecture: {
      tiers: [
        {
          label: 'Inputs',
          nodes: [
            { name: 'External intake systems', note: 'requests with file lists' },
            { name: 'Project managers', note: 'review and adjust' },
          ],
        },
        {
          label: 'Rails 7 API + React 18 editor',
          via: 'Rails API · Pundit: view, edit, approve',
          core: true,
          nodes: [
            { name: 'Intake API', note: 'normalises requests' },
            { name: 'Worksheet rules', note: 'one worksheet each' },
            { name: 'Quote editor', note: 'line items per language pair' },
          ],
        },
        {
          label: 'State & real-time',
          via: 'every save writes a new version',
          nodes: [
            { name: 'PostgreSQL', note: 'immutable versions, rules' },
            { name: 'AWS S3', note: 'file lists, word-count logs' },
            { name: 'ActionCable', note: 'co-editing sync' },
          ],
        },
        {
          label: 'Downstream',
          via: 'approved quote hands off',
          nodes: [
            { name: 'Approval', note: 'submit or reject' },
            { name: 'Delivery workflow', note: 'work begins' },
          ],
        },
      ],
      caption: '',
    },
    decisions: [
      { title: 'Immutable versions, not edits in place', body: 'History, comparisons, and client disputes become simple queries.' },
      { title: 'Pricing rules as data, not code', body: 'A new client or project type is a data change, not a deploy.' },
      { title: 'Real-time only where it matters', body: 'Live sync runs on the editor alone, where several people touch one quote.' },
    ],
    results: ['Faster quotes, less back-and-forth between PMs and sales.', 'One price per job, whoever quotes it.', 'Full revision history for enterprise clients.'],
    stack: ['Rails 7', 'React 18', 'PostgreSQL', 'ActionCable', 'AWS S3', 'Pundit', 'Docker'],
  },
  {
    id: 'alistengine',
    name: 'aListEngine',
    domain: 'AI cataloging',
    summary: 'Photos in, auction-ready listings out — for auctioneers and resellers.',
    before: 'Hours of writing per batch',
    after: 'Minutes, reviewed by a person',
    scale: ['live product', 'hundreds of photos per batch', '10 export platforms', 'iOS + Android'],
    flow: ['Capture', 'Split into lots', 'AI draft', 'Team review', 'Export'],
    client: 'Auctioneers, estate-sale teams, resellers',
    contribution: [
      'Photo-to-draft AI pipeline',
      'Rules engine for seller fields and marketplace formats',
      'Shopify, AuctionFlex, and LiveAuctioneers exports',
    ],
    problem:
      'Every one-off item — antiques, collectibles, equipment — needs a title, description, condition notes, and price, formatted differently for each platform. By hand, quality depended on the writer.',
    architecture: {
      tiers: [
        {
          label: 'Capture',
          nodes: [
            { name: 'Mobile app', note: 'bulk photos in the field' },
            { name: 'Web workspace', note: 'folders per sale, team roles' },
          ],
        },
        {
          label: 'Rails + React platform',
          via: 'batches sync',
          core: true,
          nodes: [
            { name: 'Lot splitting', note: 'barcodes group photos, duplicates removed' },
            { name: 'AI drafting', note: 'vision + text models, 4 analysis depths' },
            { name: 'Rules engine', note: 'org and folder instructions, auction or retail pricing' },
          ],
        },
        {
          label: 'Human review',
          via: 'draft + confidence notes',
          nodes: [{ name: 'Edit & approve', note: 'flags what photos can’t confirm' }],
        },
        {
          label: 'Export',
          via: 'approved lots only',
          nodes: [
            { name: 'Auction platforms', note: 'HiBid, K-Bid, AuctionMethod, AuctionFlex, BidWrangler, Equip-Bid, LiveAuctioneers, EstateSales.NET' },
            { name: 'Retail', note: 'Shopify, eBay (beta)' },
          ],
        },
      ],
      caption: 'From the public product and my part of it.',
    },
    decisions: [
      { title: 'The AI drafts, a person approves', body: 'Quality stays high; mistakes stay cheap.' },
      { title: 'Marketplace rules outside the prompt', body: 'Code enforces formats, so a new marketplace never means rewriting prompts.' },
      { title: 'One adapter per marketplace', body: 'Adding a channel is isolated work.' },
    ],
    results: ['Consistent quality across sellers and channels.', 'Paid product with a free tier and 14-day trials.'],
    stack: ['Rails', 'React', 'Docker'],
    href: 'https://alistengine.com/',
  },
];

export const openSource = [
  {
    name: 'NEPSE Trade Journal',
    href: 'https://github.com/bijay3030/nepse-trade-journal',
    summary:
      'A trading journal for Nepal Stock Exchange traders: plan, execute, and review trades; journal daily; track win rate, P&L, and expectancy.',
    notes: [
      'Plan → Execute → Result lifecycle updates the portfolio automatically',
      'Live prices over WebSockets, polling as fallback',
      'JWT auth on the API; React Query on the client',
      '88 RSpec spec files; Dockerfile with Kamal deploy',
    ],
    stack: ['Rails 8', 'PostgreSQL', 'ActionCable', 'React 19', 'TypeScript', 'Tailwind', 'Docker'],
  },
];

export const experience = [
  {
    title: 'Senior Software Engineer',
    company: 'Truemark',
    href: 'https://www.truemark.dev/',
    period: 'Aug 2022 — Present',
    summary: 'Own each application end to end — data model to deploy pipeline.',
    // The headline results, shown as a grid; each appears nowhere else.
    metrics: [
      { value: '6+', label: 'client Rails applications led' },
      { value: '99.9%', label: 'API uptime at 500K+ requests a month' },
      { value: '−40%', label: 'inter-service latency, monolith → AWS microservices' },
      { value: '<8 min', label: 'deploys, down from ~45 after a CI/CD rebuild' },
      { value: '−60%', label: 'critical query time, PostgreSQL schema and index redesign' },
      { value: '87%', label: 'test coverage (RSpec, Jest); bug reports down 35%' },
    ],
    points: [
      'Introduced Hotwire and tuned React: initial load ~35% faster, no full-page reloads in key flows.',
      'Mentored 3 junior engineers through weekly Rails and React reviews.',
    ],
  },
  {
    title: 'Associate Software Engineer',
    company: 'Truemark',
    href: 'https://www.truemark.dev/',
    period: 'Apr 2021 — Aug 2022',
    summary: 'Backend foundations for high-traffic client apps.',
    metrics: [],
    points: [
      'Shipped Rails APIs and services with consistent sub-200ms responses.',
      'Integrated 10+ third-party services — payments, analytics, communication.',
      'Improved React frontends: client-reported UI issues down 25%.',
      'Helped the team adopt Scrum; kept technical documentation current.',
    ],
  },
];

export const education = [
  { degree: 'B.Tech, Computer Science', school: 'Maharshi Dayanand University', years: '2016 — 2020' },
];

export const skills = [
  { group: 'Backend', items: ['Ruby on Rails 7–8', 'PostgreSQL', 'Redis', 'Sidekiq', 'ActionCable', 'REST APIs'] },
  { group: 'Frontend', items: ['React 18–19', 'TypeScript', 'Hotwire (Turbo + Stimulus)'] },
  { group: 'Infrastructure', items: ['AWS (EC2, S3, Lambda, RDS)', 'Docker', 'GitLab CI', 'GitHub Actions'] },
  { group: 'AI', items: ['Agentic coding', 'LLM fundamentals', 'Production AI pipelines'] },
  { group: 'Quality', items: ['RSpec', 'Jest', 'TDD'] },
];

// Short, self-contained answers for AI agents: published in /llms.txt only, not on the page,
// so the page itself never repeats a fact.
export const faqs = [
  {
    q: 'Who is Bijay Subedi?',
    a: 'Bijay Subedi is a senior software engineer based in Kathmandu, Nepal, with 5+ years of experience building Ruby on Rails, React, and AWS applications. Bijay works at Truemark, building workflow and automation platforms for US clients.',
  },
  {
    q: 'What does Bijay Subedi specialize in?',
    a: 'Full-stack Ruby on Rails 7 and React applications: Sidekiq background processing, real-time updates with ActionCable and Hotwire, PostgreSQL performance tuning, AWS microservices, and CI/CD pipelines. Bijay builds with AI daily, orchestrating frontier models to write features and validating their output with tests and review.',
  },
  {
    q: 'What has Bijay Subedi built?',
    a: 'Helios, a platform that runs medical translation projects from intake to delivery; Quoting, a versioned quote system for a healthcare localization company; and aListEngine (alistengine.com), AI cataloging software that turns item photos into auction-ready listings.',
  },
  {
    q: 'Does Bijay Subedi work remotely with US or European teams?',
    a: `Yes. Bijay already works remotely with US clients through Truemark and is based in ${profile.location} (${profile.utcOffset}), with 4+ hours of overlap with US Eastern and a full EU workday. Bijay is open to senior full-time remote roles.`,
  },
  {
    q: 'How can I contact Bijay Subedi?',
    a: `Email ${profile.email}.`,
  },
];

// What people say. Only entries with `approved: true` are built into the live site; the rest show
// in `npm run dev` with a PENDING badge. Set `approved: true` only after the person has read and
// approved the exact wording, and naming their company is allowed.
export const testimonials: {
  quote: string;
  name: string;
  title: string;
  relationship: string;
  href?: string;
  approved?: boolean;
}[] = [
  {
    // DRAFT written for Ananta to review — not his words until he approves them.
    quote:
      'Bijay built Helios and Quoting with our team. He took workflows our project managers ran by hand and turned them into systems they depend on — and he understood our business before he wrote a line of code.',
    name: 'Ananta Raj Lamichhane',
    title: 'Senior Software Engineer, Language Scientific',
    relationship: 'Client on Helios and Quoting',
  },
];
