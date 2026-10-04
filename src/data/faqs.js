// FAQ shown on the home page, in FAQPage JSON-LD, and in the Markdown files for AI agents.
// CommonJS so gatsby-node can read it at build time too.
const { email, availability } = require('../config');

// Short, self-contained answers: each one should make sense quoted on its own
// in a search snippet or an AI-generated answer.
module.exports = [
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
    a: 'Helios, a platform that runs medical translation projects from intake to delivery; Quoting, a versioned quote system for a healthcare localization company; and AListEngine, an AI tool that turns product photos into marketplace-ready listings.',
  },
  {
    q: 'Does Bijay Subedi work remotely with US or European teams?',
    a: `Yes. Bijay already works remotely with US clients through Truemark and is based in ${
      availability.location
    }, with ${availability.overlap.replace(
      ' · ',
      ' and ',
    )}. Bijay is ${availability.status.toLowerCase()}.`,
  },
  {
    q: 'How can I contact Bijay Subedi?',
    a: `Email ${email}.`,
  },
];
