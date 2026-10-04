module.exports = {
  // The site's public address. Change it here (or set GATSBY_SITE_URL) to move to a
  // custom domain; robots.txt, sitemap, canonical URLs, llms.txt, and the CNAME file
  // for GitHub Pages all follow it. No trailing slash.
  siteUrl: process.env.GATSBY_SITE_URL || 'https://bijay3030.github.io',

  // One source of truth for the availability line shown in the hero, contact, and FAQ.
  availability: {
    status: 'Open to senior full-time remote roles',
    location: 'Kathmandu, Nepal (UTC+5:45)',
    overlap: '4+ hours overlap with US Eastern · full EU workday overlap',
  },

  // Measurement IDs are read from environment variables at build time so nothing
  // is tracked until you set them (see README "Measurement").
  verification: {
    google: process.env.GATSBY_GOOGLE_SITE_VERIFICATION || '',
    bing: process.env.GATSBY_BING_SITE_VERIFICATION || '',
  },

  // IndexNow key (public by design); the matching key file lives in /static.
  indexNowKey: '081dd982c4b0f09c66de720ed7a26cba',

  // Core skills, shown on the home page, the resume page, and in structured data.
  skills: [
    'Ruby on Rails 7',
    'React.js / React 18',
    'Hotwire (Turbo + Stimulus)',
    'PostgreSQL & Redis',
    'Sidekiq & ActionCable',
    'AWS (EC2, S3, Lambda, RDS)',
    'Microservices & REST APIs',
    'Docker & Kubernetes',
    'RSpec, Jest & TDD',
    'CI/CD (GitLab CI, GitHub Actions)',
  ],

  // One-paragraph professional summary used on the resume and about pages.
  summary:
    'Senior software engineer with 5+ years building Ruby on Rails, React, and AWS systems for US clients. Leads client applications end to end: PostgreSQL data modeling, REST APIs, Sidekiq background jobs, real-time features with ActionCable and Hotwire, microservices on AWS, CI/CD, and mentoring.',

  // Resume-only details (shown on /resume/ and in resume.pdf, not elsewhere on the site).
  phone: '+977-9847330753',
  skillGroups: [
    {
      name: 'Languages',
      items: ['Ruby', 'JavaScript (ES6+)', 'TypeScript', 'SQL', 'HTML5', 'CSS3'],
    },
    {
      name: 'Frameworks & libraries',
      items: ['Ruby on Rails', 'React.js', 'Redux', 'Hotwire (Turbo & Stimulus)', 'Sidekiq'],
    },
    { name: 'Databases', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'] },
    {
      name: 'Cloud & infrastructure',
      items: ['AWS (EC2, S3, Lambda, RDS, CodePipeline)', 'Docker', 'Kubernetes', 'Nginx'],
    },
    { name: 'APIs', items: ['RESTful API design', 'GraphQL', 'Third-party API integration'] },
    { name: 'Testing', items: ['RSpec', 'Jest', 'TDD', 'BDD', 'Integration testing'] },
    {
      name: 'CI/CD & tools',
      items: ['GitLab CI', 'GitHub Actions', 'CircleCI', 'Git', 'GitHub', 'GitLab'],
    },
    {
      name: 'Practices',
      items: ['Agile/Scrum', 'Microservices architecture', 'System design', 'Code review'],
    },
  ],
  education: [
    {
      degree: 'B.Tech, Computer Science',
      school: 'Maharshi Dayanand University',
      years: '2016 – 2020',
    },
  ],

  email: 'sharma.bj11@gmail.com',

  socialMedia: [
    {
      name: 'GitHub',
      url: 'https://github.com/bijay3030',
    },
    {
      name: 'Twitter',
      url: 'https://x.com/Bj11S',
    },
    {
      name: 'Linkedin',
      url: 'https://www.linkedin.com/in/bijay-p-subedi/',
    },
    {
      name: 'LeetCode',
      url: 'https://leetcode.com/u/stanbj3030/',
    },
  ],

  navLinks: [
    {
      name: 'Work',
      url: '/#projects',
    },
    {
      name: 'Experience',
      url: '/#jobs',
    },
    {
      name: 'About',
      url: '/#about',
    },
    {
      name: 'Contact',
      url: '/#contact',
    },
  ],

  colors: {
    green: '#ff6b7f',
    navy: '#0e1217',
    darkNavy: '#07090c',
  },

  srConfig: (delay = 200, viewFactor = 0.25) => ({
    origin: 'bottom',
    distance: '20px',
    duration: 500,
    delay,
    rotate: { x: 0, y: 0, z: 0 },
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor,
    viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
  }),
};
