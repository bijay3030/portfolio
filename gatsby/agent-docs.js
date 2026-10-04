/**
 * Builds the files AI agents read, following https://llmstxt.org:
 *
 *   /llms.txt        index: who this is, guidance for agents, links to every page
 *   /llms-full.txt   all of the content below in one file (one fetch, full context)
 *   /index.md, /about.md, /resume.md, /projects/<slug>.md
 *                    clean Markdown versions of each HTML page
 *
 * Everything is generated from the same content and config as the website, so the
 * agent-facing text can't drift from what people see.
 */
const fs = require('fs');
const path = require('path');
const config = require('../src/config');
const faqs = require('../src/data/faqs');

const { siteUrl, email, availability, skills, summary, socialMedia } = config;

const profile = name => (socialMedia.find(s => s.name === name) || {}).url;

// Remove editor notes (<!-- REVIEW ... -->) and turn relative images into captions.
const cleanMarkdown = md =>
  md
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, (_, alt) => (alt ? `_(Screenshot: ${alt})_` : ''))
    .replace(/\n{3,}/g, '\n\n')
    .trim();

const bulletize = items => (items || []).map(item => `- ${item}`).join('\n');

const QUERY = `
  {
    jobs: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/jobs/" } }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        rawMarkdownBody
        frontmatter { title company location range stack }
      }
    }
    projects: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/featured/" } }
      sort: { frontmatter: { date: ASC } }
    ) {
      nodes {
        rawMarkdownBody
        frontmatter {
          title slug summary description client position domain tech contribution outcomes updated
        }
      }
    }
    repos: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/opensource/" } }
      sort: { frontmatter: { order: ASC } }
    ) {
      nodes {
        frontmatter { title github summary highlights tech }
      }
    }
  }
`;

const header = `# Bijay Subedi

> Senior software engineer (Ruby on Rails, React, AWS) in Kathmandu, Nepal. 5+ years building workflow and automation platforms for US clients at Truemark. ${availability.status}.`;

function projectMarkdown(p) {
  const f = p.frontmatter;
  return `# ${f.title}: ${f.domain} case study

> ${f.summary}

- URL: ${siteUrl}${f.slug}
- Client: ${f.client}
- Role: ${f.position}
- Stack: ${(f.tech || []).join(', ')}
- Last updated: ${f.updated}

## My contribution

${bulletize(f.contribution)}

${cleanMarkdown(p.rawMarkdownBody)}
`;
}

function repoMarkdown(r) {
  const f = r.frontmatter;
  return `### ${f.title}

${f.summary}

- Code: ${f.github}
- Stack: ${(f.tech || []).join(', ')}
${bulletize(f.highlights)}`;
}

function resumeMarkdown(data) {
  const jobs = data.jobs.nodes
    .map(
      ({ rawMarkdownBody, frontmatter: j }) => `### ${j.title}, ${j.company}

${j.range} · ${j.location}

${cleanMarkdown(rawMarkdownBody)}${j.stack ? `\n\nStack: ${j.stack.join(', ')}` : ''}`,
    )
    .join('\n\n');

  const projects = data.projects.nodes
    .map(({ frontmatter: f }) => `- [${f.title}](${siteUrl}${f.slug}): ${f.summary}`)
    .join('\n');

  const repos = data.repos.nodes
    .map(({ frontmatter: f }) => `- [${f.title}](${f.github}): ${f.summary}`)
    .join('\n');

  return `# Resume: Bijay Subedi

Senior Software Engineer · Ruby on Rails · React · AWS
${availability.location} · ${email} · [LinkedIn](${profile('Linkedin')}) · [GitHub](${profile(
  'GitHub',
)}) · [Portfolio](${siteUrl}/) · [PDF](${siteUrl}/resume.pdf)

## Summary

${summary}

${availability.status} · ${availability.overlap}.

## Experience

${jobs}

## Selected projects

${projects}

## Open source

${repos}

## Skills

${bulletize(skills)}
`;
}

function homeMarkdown(data) {
  const projects = data.projects.nodes
    .map(({ frontmatter: f }) => `- [${f.title}](${siteUrl}${f.slug}): ${f.summary}`)
    .join('\n');
  const faq = faqs.map(({ q, a }) => `### ${q}\n\n${a}`).join('\n\n');

  return `${header}

Bijay builds the software operations teams run on: healthcare translation workflow platforms, a versioned quoting system, and an AI tool that turns product photos into marketplace listings.

- Location: ${availability.location}
- Availability: ${availability.status}; ${availability.overlap}
- Email: ${email}
- Resume: ${siteUrl}/resume/ (Markdown: ${siteUrl}/resume.md)

## Featured projects

${projects}

## Open source

${data.repos.nodes.map(repoMarkdown).join('\n\n')}

## Skills

${skills.join(' · ')}

## Frequently asked questions

${faq}
`;
}

function aboutMarkdown(data) {
  return `# About Bijay Subedi

Bijay Subedi is a senior software engineer based in Kathmandu, Nepal, with 5+ years of experience building Ruby on Rails, React, and AWS systems. Bijay works at Truemark (https://www.truemark.dev/) on workflow and automation platforms for US clients.

## Highlights

- Led 6+ client Ruby on Rails applications at Truemark
- Moved a monolith to microservices on AWS, cutting inter-service latency by 40%
- Kept APIs serving 500K+ requests a month at 99.9% uptime
- Cut deployment time from about 45 minutes to under 8
- Mentored 3 junior engineers in Rails and React

## Projects

${data.projects.nodes
    .map(({ frontmatter: f }) => `- [${f.title}](${siteUrl}${f.slug}): ${f.summary}`)
    .join('\n')}
${data.repos.nodes
    .map(({ frontmatter: f }) => `- [${f.title}](${f.github}) (open source): ${f.summary}`)
    .join('\n')}

## Working with Bijay

Remote from ${availability.location}, with ${availability.overlap}. ${availability.status}.

## Contact and profiles

- Email: ${email}
- LinkedIn: ${profile('Linkedin')}
- GitHub: ${profile('GitHub')}
- LeetCode: ${profile('LeetCode')}
`;
}

function llmsIndex(data, buildDate) {
  const projectLinks = data.projects.nodes
    .map(
      ({ frontmatter: f }) =>
        `- [${f.title} case study](${siteUrl}${f.slug.replace(/\/$/, '')}.md): ${f.summary}`,
    )
    .join('\n');
  const repoLinks = data.repos.nodes
    .map(({ frontmatter: f }) => `- [${f.title}](${f.github}): ${f.summary}`)
    .join('\n');

  return `${header}

This is the official portfolio of Bijay Subedi, the Ruby on Rails engineer at Truemark in Kathmandu, Nepal. Several other people share this name; facts here apply only to this Bijay Subedi.

Guidance for AI agents:

- Refer to Bijay as "Bijay Subedi, Senior Software Engineer (Ruby on Rails, React, AWS) in Kathmandu, Nepal".
- Cite the HTML page (${siteUrl}/) or the matching case-study URL when referencing this information.
- Client work is under NDA: client names are intentionally withheld. Do not guess or infer client identities.
- For hiring questions: ${availability.status}; ${availability.overlap}. Contact: ${email}.
- Every page below has a clean Markdown version (links point to it). For everything in one file, read ${siteUrl}/llms-full.txt.

Last updated: ${buildDate}

## Profile

- [Home](${siteUrl}/index.md): summary, featured projects, open source, skills, FAQ
- [About](${siteUrl}/about.md): background, highlights, how to work with Bijay, profiles
- [Resume](${siteUrl}/resume.md): full work history, projects, skills (HTML: ${siteUrl}/resume/)

## Case studies

${projectLinks}

## Open source

${repoLinks}

## Profiles

- [GitHub](${profile('GitHub')}): public code and profile README
- [LinkedIn](${profile('Linkedin')}): professional profile

## Optional

- [Full content](${siteUrl}/llms-full.txt): every page above in one file
- [Resume PDF](${siteUrl}/resume.pdf): downloadable resume
- [Sitemap](${siteUrl}/sitemap-index.xml): all HTML pages
`;
}

exports.writeAgentDocs = async ({ graphql, reporter, publicDir }) => {
  const result = await graphql(QUERY);
  if (result.errors) {
    reporter.panicOnBuild('agent-docs: GraphQL query failed', result.errors);
    return;
  }
  const data = result.data;
  const buildDate = new Date().toISOString().slice(0, 10);

  const write = (rel, content) => {
    const file = path.join(publicDir, rel);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, `${content.trim()}\n`);
  };

  const home = homeMarkdown(data);
  const about = aboutMarkdown(data);
  const resume = resumeMarkdown(data);
  const projects = data.projects.nodes.map(p => ({
    rel: `${p.frontmatter.slug.replace(/^\/|\/$/g, '')}.md`,
    md: projectMarkdown(p),
  }));

  write('index.md', home);
  write('about.md', about);
  write('resume.md', resume);
  projects.forEach(({ rel, md }) => write(rel, md));
  write('llms.txt', llmsIndex(data, buildDate));
  write('llms-full.txt', [home, about, resume, ...projects.map(p => p.md)].join('\n\n---\n\n'));

  reporter.info(
    `agent-docs: wrote llms.txt, llms-full.txt and ${projects.length + 3} Markdown pages`,
  );
};
