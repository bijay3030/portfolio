// Everything the page says lives here. Edit this file to update the site.

export const profile = {
  name: 'Bijay Subedi',
  role: 'Senior software engineer',
  jobTitle: 'Senior Software Engineer',
  employer: { name: 'Truemark', url: 'https://www.truemark.dev/' },
  location: 'Kathmandu, Nepal',
  timezone: 'Asia/Kathmandu',
  utcOffset: 'UTC+5:45',
  email: 'sharma.bj11@gmail.com',
  resume: 'resume.pdf', // relative to the site base
  // One sentence that says what you do and for whom.
  statement:
    'I build the systems operations teams run on — replacing email threads and spreadsheets with one auditable workflow.',
  availability: 'Open to senior full-time remote roles',
  overlap: '4+ hours with US Eastern · full EU workday',
  links: [
    { label: 'GitHub', href: 'https://github.com/bijay3030' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/bijay-p-subedi/' },
  ],
};

export const about = [
  'Since 2021 I have built Ruby on Rails and React applications at Truemark for US clients — mostly in healthcare localization, where one lost file or wrong price breaks trust.',
  'My best work starts with a process people hold together by hand. I model it as explicit states, automate every step between them, and record who did what.',
  'The toolkit: PostgreSQL data models, REST APIs, Sidekiq jobs, real-time updates with ActionCable and Hotwire, AWS services, and the CI/CD that ships them.',
];

// Small, verifiable facts. Each one should be something you can explain in an interview.
export const numbers = [
  { value: '5+', label: 'years shipping Rails & React' },
  { value: '6+', label: 'client applications led' },
  { value: '99.9%', label: 'API uptime at 500K+ requests a month' },
  { value: '45→8', label: 'minutes per deploy, after rebuilding CI/CD' },
  { value: '−40%', label: 'inter-service latency, after the move to AWS microservices' },
  { value: '3', label: 'junior engineers mentored' },
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

export type Project = {
  id: string;
  name: string;
  domain: string;
  summary: string;
  before: string;
  after: string;
  // Small facts about size and reach, shown under the one-line summary.
  scale: string[];
  flow: string[];
  client: string;
  role: string;
  contribution: string[];
  problem: string;
  architecture: Architecture;
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
      'Runs medical translation projects end to end — intake, vendor coordination, delivery, and invoicing — in one platform.',
    before: 'Email threads and spreadsheets',
    after: 'One auditable workflow',
    scale: ['~20 files per project', '4–5 language pairs', 'up to ~100 tracked file × language tasks'],
    flow: ['Intake', 'Validate', 'Price', 'Route to vendors', 'Deliver', 'Invoice'],
    client: 'US healthcare localization provider (under NDA)',
    role: 'Full-stack engineer, Rails + React',
    contribution: [
      'Built Rails services and Sidekiq jobs that validate and route multilingual files on upload',
      'Automated pricing and turnaround, and generated vendor work orders from them',
      'Delivered live job status (ActionCable) and role-based access (Pundit)',
    ],
    problem:
      'Each project brings ~20 source files into 4–5 languages — up to a hundred file-and-language tasks, each with its own vendor, deadline, and delivery. Email and spreadsheets held it together: slow turnaround, easy to lose a file or miss a deadline, and no way to prove who did what to clients who demand an audit trail.',
    architecture: {
      tiers: [
        {
          label: 'Who uses it',
          nodes: [
            { name: 'Clients', note: 'upload source files, receive delivery' },
            { name: 'Project managers', note: 'price, assign, track' },
            { name: 'Vendors', note: 'one per language pair' },
          ],
        },
        {
          label: 'Rails 7 + React app',
          via: 'HTTPS · every action checked by Pundit policies',
          core: true,
          nodes: [
            { name: 'Intake', note: 'files to S3, job record created' },
            { name: 'Job workflow', note: 'intake → … → invoice' },
            { name: 'PM dashboards', note: 'React, live status' },
          ],
        },
        {
          label: 'Background work · Sidekiq',
          via: 'enqueue — the request returns immediately',
          nodes: [
            { name: 'Validate files', note: 'bad or missing files caught at the door' },
            { name: 'Split by language pair', note: '~20 files × 4–5 pairs' },
            { name: 'Generate documents', note: 'pricing, work orders, invoices' },
          ],
        },
        {
          label: 'State & real-time',
          via: 'store · broadcast',
          nodes: [
            { name: 'Database', note: 'jobs, assignments, audit history' },
            { name: 'AWS S3', note: 'source and delivered files' },
            { name: 'ActionCable', note: 'pushes status to open dashboards' },
          ],
        },
      ],
      caption: 'Simplified. Client systems and names omitted (NDA).',
    },
    built: [
      'Every upload lands in S3 and is validated in the background before anyone touches it.',
      'Jobs split by language pair; pricing and turnaround are calculated, never typed.',
      'Vendor work orders generate from the priced job.',
      'Delivery, invoice, and client handoff run from one record.',
      'Project managers watch status change live — no refreshing, no chasing.',
    ],
    decisions: [
      { title: 'Background jobs for anything slow', body: 'Validation, routing, and document generation run in Sidekiq: uploads return instantly, failures retry safely.' },
      { title: 'Authorization as policies', body: 'Pundit keeps “who can do what” in one place per model — essential when clients, vendors, and staff share one system.' },
      { title: 'Push, don’t poll', body: 'ActionCable pushes every status change to open dashboards: always current, no polling load.' },
    ],
    results: [
      'Automated every hand-off across intake, vendors, and delivery.',
      'Every step permission-checked and logged — audit-ready history for every job.',
      'More job volume, no extra coordinators.',
    ],
    stack: ['Rails 7', 'React', 'Sidekiq', 'ActionCable', 'AWS S3', 'Pundit'],
  },
  {
    id: 'quoting',
    name: 'Quoting',
    domain: 'Healthcare localization pricing',
    summary:
      'Turns a translation request into an accurate, versioned quote — and hands approved quotes straight to delivery.',
    before: 'A spreadsheet per project manager',
    after: 'Shared rules, every revision kept',
    scale: ['more files per project than Helios', 'large worksheets per project type', 'every revision kept'],
    flow: ['Request in', 'Worksheet estimate', 'Edit line items', 'New version', 'Approve', 'Hand to delivery'],
    client: 'US healthcare localization provider (under NDA)',
    role: 'Full-stack engineer, Rails + React',
    contribution: [
      'Modeled worksheet pricing rules and versioned quotes in PostgreSQL',
      'Built a multilingual line-item editor in React 18, synced live over ActionCable',
      'Connected intake from external systems and hand-off to delivery',
    ],
    problem:
      'Price depends on files, word counts, language pairs, schedule, and client-specific rules. Quoting carries more files per project than Helios, and every project type has its own large worksheet. Those worksheets lived in personal spreadsheets: quotes were slow, two PMs could price one job differently, and a client’s change request had no reliable record of the previous quote.',
    architecture: {
      tiers: [
        {
          label: 'Inputs',
          nodes: [
            { name: 'External intake systems', note: 'requests, file lists, word-count logs' },
            { name: 'Project managers', note: 'review and adjust quotes' },
          ],
        },
        {
          label: 'Rails 7 API + React 18 editor',
          via: 'Rails API · Pundit decides who can view, edit, approve',
          core: true,
          nodes: [
            { name: 'Intake API', note: 'normalises incoming requests' },
            { name: 'Worksheet rules', note: 'per project type; data, not code' },
            { name: 'Quote editor', note: 'line items per language pair' },
          ],
        },
        {
          label: 'State & real-time',
          via: 'every save writes a new version',
          nodes: [
            { name: 'PostgreSQL', note: 'immutable quote versions, rules' },
            { name: 'AWS S3', note: 'file lists, word-count logs' },
            { name: 'ActionCable', note: 'live co-editing of one quote' },
          ],
        },
        {
          label: 'Downstream',
          via: 'approved quote hands off',
          nodes: [
            { name: 'Approval', note: 'submit or reject, with history' },
            { name: 'Delivery workflow', note: 'approved work starts here' },
          ],
        },
      ],
      caption: 'Simplified. Client systems and names omitted (NDA).',
    },
    built: [
      'External intake systems send requests through a Rails API; file lists and word-count logs land in S3.',
      'Shared worksheets — one per project type — draft every quote.',
      'PMs adjust line items per language pair; everyone viewing sees changes live.',
      'Every change creates a new version — compare or restore any of them.',
      'Quotes are submitted or rejected; approved ones flow into delivery.',
    ],
    decisions: [
      { title: 'Immutable versions, not edits in place', body: 'Each revision is a new row: history, comparisons, and client disputes become simple queries.' },
      { title: 'Pricing rules as data, not code', body: 'Worksheets change per client and project type — no deploy.' },
      { title: 'Real-time only where it matters', body: 'ActionCable runs on the quote editor, where several people edit one quote — nowhere else.' },
    ],
    results: [
      'Faster quotes, less back-and-forth between PMs and sales.',
      'Consistent pricing — one set of rules for everyone.',
      'Full version history, access control, and secure file handling for enterprise clients.',
    ],
    stack: ['Rails 7', 'React 18', 'PostgreSQL', 'ActionCable', 'AWS S3', 'Pundit'],
  },
  {
    id: 'alistengine',
    name: 'aListEngine',
    domain: 'AI cataloging for auctions',
    summary:
      'AI cataloging for auctioneers and resellers: photograph items, get drafted titles, descriptions, condition notes, and prices, and export to the platforms they already use.',
    before: 'Hours of writing per batch',
    after: 'Minutes, reviewed by a person',
    scale: ['live product', 'hundreds of photos per batch', '10 export platforms', 'iOS + Android capture'],
    flow: ['Capture', 'Split into lots', 'AI draft', 'Team review', 'Export'],
    client: 'Auctioneers, estate-sale teams, and resellers',
    role: 'Full-stack engineer, Rails + React',
    contribution: [
      'Built the photo-to-draft pipeline on AI vision and text models',
      'Built a rules engine for seller fields and marketplace formats',
      'Shipped exports to Shopify, AuctionFlex, and LiveAuctioneers',
    ],
    problem:
      'Auction and estate-sale teams catalog hundreds of one-off items at a time — antiques, collectibles, equipment, household goods. Every lot needs a title, description, condition notes, and a price, formatted differently for each platform. By hand: hours per batch, and quality that depended on the writer.',
    architecture: {
      tiers: [
        {
          label: 'Capture',
          nodes: [
            { name: 'Mobile app', note: 'bulk photos in the field, iOS + Android' },
            { name: 'Web workspace', note: 'folders per sale, team roles' },
          ],
        },
        {
          label: 'Rails + React platform',
          via: 'photo batches sync to the workspace',
          core: true,
          nodes: [
            { name: 'Lot splitting', note: 'barcodes group photos, duplicates removed' },
            { name: 'AI drafting', note: 'vision + text models; 4 analysis depths' },
            { name: 'Rules engine', note: 'org/folder instructions, field rules' },
          ],
        },
        {
          label: 'Human review',
          via: 'draft + confidence notes',
          nodes: [
            { name: 'Edit & approve', note: 'every field editable; flags what photos can’t confirm' },
          ],
        },
        {
          label: 'Export layer · one adapter per platform',
          via: 'approved lots only',
          nodes: [
            { name: 'Auction platforms', note: 'HiBid, K-Bid, AuctionFlex, LiveAuctioneers, BidWrangler +3' },
            { name: 'Retail', note: 'Shopify, eBay (beta)' },
          ],
        },
      ],
      caption: 'Simplified, from the public product and my part of it.',
    },
    built: [
      'Phone capture imports hundreds of photos at once; barcodes split them into lots and catch duplicates.',
      'Vision and text models identify each item and draft title, description, condition notes, and price — at four analysis depths.',
      'Each draft flags what it can’t confirm — and which photo or detail would.',
      'A rules engine applies organization and folder instructions, auction or retail pricing, and each platform’s format.',
      'Teams approve, then export to HiBid, K-Bid, AuctionMethod, AuctionFlex, BidWrangler, Equip-Bid, LiveAuctioneers, EstateSales.NET, Shopify, or eBay.',
    ],
    decisions: [
      { title: 'The AI drafts, a person approves', body: 'Nothing exports without review: quality stays high, mistakes stay cheap.' },
      { title: 'Marketplace rules outside the prompt', body: 'Code enforces formats and required fields: consistent output, and a new marketplace never means rewriting prompts.' },
      { title: 'One export layer per marketplace', body: 'Each adapter maps one listing to one platform; a new channel is isolated work.' },
    ],
    results: [
      'Listing time: hours → minutes.',
      'Consistent quality across sellers and channels.',
      'Live, paid product with a free tier and 14-day trials.',
    ],
    stack: ['Rails', 'React', 'AI vision + text', 'Rules engine', 'iOS + Android', 'Shopify', 'AuctionFlex', 'LiveAuctioneers'],
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
      'Live prices over ActionCable WebSockets; polling as fallback',
      'Rails 8 API (Devise + JWT); React 19 + TypeScript with React Query',
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
    summary: 'Own client Rails applications end to end — data model to deploy pipeline.',
    points: [
      'Led 6+ Ruby on Rails client applications — architecture and core business logic.',
      'Migrated monoliths to AWS microservices (EC2, S3, Lambda): inter-service latency down 40%.',
      'Sustained 99.9% uptime on REST APIs serving 500K+ requests a month.',
      'Introduced Hotwire and tuned React: initial load ~35% faster, no full-page reloads in key flows.',
      'Redesigned PostgreSQL schemas and indexes: critical queries up to 60% faster.',
      'Rebuilt CI/CD on GitLab CI and AWS CodePipeline: deploys from ~45 minutes to under 8.',
      'Raised test coverage to 87% (RSpec, Jest); production bug reports down 35%.',
      'Mentored 3 junior engineers through weekly Rails and React reviews.',
    ],
  },
  {
    title: 'Associate Software Engineer',
    company: 'Truemark',
    href: 'https://www.truemark.dev/',
    period: 'Apr 2021 — Aug 2022',
    summary: 'Built APIs and integrations for high-traffic client apps.',
    points: [
      'Built Rails APIs and services with consistent sub-200ms responses.',
      'Integrated 10+ third-party APIs — payments, analytics, communication.',
      'Improved React frontends: client-reported UI issues down 25%.',
      'Helped the team adopt Scrum; kept technical documentation current.',
    ],
  },
];

export const education = [
  { degree: 'B.Tech, Computer Science', school: 'Maharshi Dayanand University', years: '2016 — 2020' },
];

// How I work — each principle is backed by a project above.
export const principles = [
  { title: 'Slow work goes in the background.', body: 'Users get an instant answer; failures retry safely.', from: 'Helios' },
  { title: 'Keep every version.', body: 'Edits create new records, so history is a query, not an argument.', from: 'Quoting' },
  { title: 'Rules are data.', body: 'A rule that changes per client should never need a deploy.', from: 'Quoting' },
  { title: 'Push, don’t poll — where it matters.', body: 'Real-time only on screens where people collaborate.', from: 'Helios · Quoting' },
  { title: 'The AI drafts, a person approves.', body: 'Models are fast and fallible; review keeps mistakes cheap.', from: 'aListEngine' },
  { title: 'One place for permissions.', body: 'Authorization as policies, not checks scattered across controllers.', from: 'Helios' },
];

export const skills = [
  { group: 'Backend', items: ['Ruby on Rails 7–8', 'PostgreSQL', 'Redis', 'Sidekiq', 'ActionCable', 'REST APIs'] },
  { group: 'Frontend', items: ['React 18–19', 'TypeScript', 'Hotwire (Turbo + Stimulus)'] },
  { group: 'Infrastructure', items: ['AWS (EC2, S3, Lambda, RDS)', 'Docker', 'Kubernetes', 'GitLab CI', 'GitHub Actions'] },
  { group: 'Quality', items: ['RSpec', 'Jest', 'TDD', 'Code review & mentoring'] },
];

// Short, self-contained answers: each should make sense quoted on its own
// in a search snippet or an AI-generated answer. Also published as FAQPage structured data.
export const faqs = [
  {
    q: 'Who is Bijay Subedi?',
    a: 'Bijay Subedi is a senior software engineer based in Kathmandu, Nepal, with 5+ years of experience building Ruby on Rails, React, and AWS applications. Bijay works at Truemark, building workflow and automation platforms for US clients.',
  },
  {
    q: 'What does Bijay Subedi specialize in?',
    a: 'Full-stack Ruby on Rails 7 and React applications: Sidekiq background processing, real-time updates with ActionCable and Hotwire, PostgreSQL performance tuning, AWS microservices, and CI/CD pipelines.',
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

// What people say. `sample: true` entries are placeholders that show only in `npm run dev`
// (with a SAMPLE badge) and are never built into the live site. To publish one: paste the
// person's real words, get their OK to use their name, and delete `sample: true`.
export const testimonials: {
  quote: string;
  name: string;
  title: string;
  relationship: string;
  href?: string;
  sample?: boolean;
}[] = [
  {
    quote:
      'Bijay took our quoting process from a pile of spreadsheets to a system our PMs trust. He asks the right questions about the business before writing code, and he ships carefully.',
    name: 'Name Surname',
    title: 'Engineering Manager, Truemark',
    relationship: 'Managed Bijay on Quoting',
    sample: true,
  },
  {
    quote:
      'Our project managers used to chase files over email. With Helios they open one screen and see where every language pair stands. Bijay was the engineer we went to when something had to be right.',
    name: 'Name Surname',
    title: 'Operations Lead, US healthcare localization client',
    relationship: 'Client stakeholder on Helios',
    sample: true,
  },
  {
    quote:
      'Bijay’s code reviews made me a better Rails developer. He explains the why, not just the fix.',
    name: 'Name Surname',
    title: 'Software Engineer, Truemark',
    relationship: 'Mentored by Bijay',
    sample: true,
  },
];
