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
    'I build the software operations teams run on — workflow platforms that replace email threads and spreadsheets with one clear, auditable system.',
  availability: 'Open to senior full-time remote roles',
  overlap: '4+ hours with US Eastern · full EU workday',
  links: [
    { label: 'GitHub', href: 'https://github.com/bijay3030' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/bijay-p-subedi/' },
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
      'A workflow platform that runs medical translation projects end to end — from file intake to vendor coordination, delivery, and invoicing.',
    before: 'Email threads and spreadsheets',
    after: 'One auditable workflow',
    scale: ['~20 files per project', '4–5 language pairs each', 'up to ~100 file × language tasks to track'],
    flow: ['Intake', 'Validate', 'Price', 'Route to vendors', 'Deliver', 'Invoice'],
    client: 'US healthcare localization provider (under NDA)',
    role: 'Full-stack engineer, Rails + React',
    contribution: [
      'Rails services and Sidekiq jobs that route multilingual files and validate them on upload',
      'Automated pricing and turnaround calculations, and vendor work orders generated from them',
      'Live job status with ActionCable; role-based access with Pundit',
    ],
    problem:
      'A typical project arrives with around 20 source files that must go into 4 or 5 languages — so one project becomes up to a hundred file-and-language pieces of work, each with a vendor, a deadline, and a delivery. That coordination lived in email and spreadsheets: slow to turn around, easy to lose a file or a deadline, and hard to prove who did what to clients who expect a clean audit trail.',
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
    scale: ['more files per project than Helios', 'large worksheets that differ by project type', 'every revision kept'],
    flow: ['Request in', 'Worksheet estimate', 'Edit line items', 'New version', 'Approve', 'Hand to delivery'],
    client: 'US healthcare localization provider (under NDA)',
    role: 'Full-stack engineer, Rails + React',
    contribution: [
      'Worksheet-based pricing rules and versioned quotes modeled in PostgreSQL',
      'Multilingual line-item editor in React 18, synced live over ActionCable',
      'Intake from external systems in; approved quotes out to delivery',
    ],
    problem:
      'Pricing a translation job depends on files, word counts, language pairs, schedule, and rules that differ by client. Quoting handles even more files per project than Helios, and each project type has its own large worksheet of rules. Those worksheets lived in individual spreadsheets: quotes were slow, two PMs could price the same job differently, and when a client asked for a change there was no reliable record of the previous quote.',
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
      'Requests arrive from external intake systems through a Rails API, with file lists and word-count logs in S3.',
      'Shared worksheet rules — one large set per project type — calculate the first draft of every quote.',
      'PMs adjust line items per language pair; others viewing the quote see changes live.',
      'Every change creates a new version that can be compared or restored.',
      'Quotes are submitted or rejected; approved ones flow into delivery.',
    ],
    decisions: [
      { title: 'Immutable versions, not edits in place', body: 'Each revision is a new row, so history, comparisons, and client disputes are straightforward.' },
      { title: 'Pricing rules as data, not code', body: 'Worksheets change per client and project type without a deploy.' },
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
    name: 'aListEngine',
    domain: 'AI cataloging for auctions',
    summary:
      'AI cataloging software for auctioneers and resellers: photograph items, get drafted titles, descriptions, condition notes, and prices, then export to the auction platforms they already use.',
    before: 'Hours of writing per batch',
    after: 'Minutes, reviewed by a person',
    scale: ['live product', 'hundreds of photos per batch', '10 export platforms', 'iOS + Android capture'],
    flow: ['Capture', 'Split into lots', 'AI draft', 'Team review', 'Export'],
    client: 'Auctioneers, estate-sale teams, and resellers',
    role: 'Full-stack engineer, Rails + React',
    contribution: [
      'The photo-to-draft pipeline calling AI vision and text models',
      'A rules engine for seller-specific fields and marketplace formats',
      'Exports to Shopify, AuctionFlex, and LiveAuctioneers',
    ],
    problem:
      'Auction houses and estate-sale teams catalog hundreds of one-off items at a time — antiques, collectibles, equipment, household goods. Each lot needs a good title, a description, condition notes, and a sensible price, in a slightly different format for every auction platform. By hand it took hours per batch, and quality depended on who wrote it.',
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
      'Teams capture photos on their phones and import hundreds at a time; barcodes split them into lots and duplicates are caught.',
      'Vision and text models identify each item and draft the title, description, condition notes, and a suggested price — at quick, standard, enhanced, or thorough depth.',
      'The draft says what it isn’t sure about and which extra photo or detail would help.',
      'A rules engine applies organization and folder instructions, pricing strategy (auction or retail), and each platform’s format.',
      'The team reviews and approves, then exports files ready for HiBid, K-Bid, AuctionMethod, AuctionFlex, BidWrangler, Equip-Bid, LiveAuctioneers, EstateSales.NET, Shopify, or eBay.',
    ],
    decisions: [
      { title: 'The AI drafts, a person approves', body: 'Nothing is exported without review — quality stays high and mistakes stay cheap.' },
      { title: 'Marketplace rules outside the prompt', body: 'Formatting and required fields are enforced in code, so output is consistent and a new marketplace doesn’t mean rewriting prompts.' },
      { title: 'One export layer per marketplace', body: 'Each integration maps the same listing to its platform, so adding a channel is isolated work.' },
    ],
    results: [
      'Listing creation dropped from hours to minutes.',
      'More consistent quality across sellers and channels.',
      'Live as a paid product, with a free tier and 14-day trials.',
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

export const education = [
  { degree: 'B.Tech, Computer Science', school: 'Maharshi Dayanand University', years: '2016 — 2020' },
];

// How I work — each principle is backed by a project above.
export const principles = [
  { title: 'Slow work goes in the background.', body: 'Users get an answer immediately; the job retries safely when it fails.', from: 'Helios' },
  { title: 'Keep every version.', body: 'Edits create new records, so history is a query, not an argument.', from: 'Quoting' },
  { title: 'Rules are data.', body: 'If a business rule changes per client, it shouldn’t need a deploy.', from: 'Quoting' },
  { title: 'Push, don’t poll — where it matters.', body: 'Real-time only on the screens where people actually collaborate.', from: 'Helios · Quoting' },
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
    a: 'Full-stack web applications with Ruby on Rails 7 and React: background processing with Sidekiq, real-time updates with ActionCable and Hotwire, PostgreSQL performance tuning, microservices on AWS, and CI/CD pipelines.',
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
