// A plain-text version of the page for AI assistants and anyone who prefers text.
import type { APIRoute } from 'astro';
import { profile, about, projects, openSource, experience, principles, skills } from '../data/site';

export const GET: APIRoute = ({ site }) => {
  const lines = [
    `# ${profile.name}`,
    '',
    `> ${profile.role} in ${profile.location} (${profile.utcOffset}). ${profile.statement}`,
    '',
    `- Availability: ${profile.availability}; overlap ${profile.overlap}`,
    `- Email: ${profile.email}`,
    `- Résumé: ${new URL(profile.resume, site)}`,
    ...profile.links.map((l) => `- ${l.label}: ${l.href}`),
    '',
    '## About',
    '',
    ...about.flatMap((p) => [p, '']),
    '## Selected work',
    '',
    ...projects.flatMap((p) => [
      `### ${p.name} — ${p.domain}`,
      '',
      p.summary,
      '',
      `- Before → after: ${p.before} → ${p.after}`,
      `- Role: ${p.role}; client: ${p.client}`,
      `- Stack: ${p.stack.join(', ')}`,
      ...p.decisions.map((d) => `- Decision: ${d.title}. ${d.body}`),
      ...p.results.map((r) => `- Result: ${r}`),
      '',
    ]),
    '## Open source',
    '',
    ...openSource.flatMap((o) => [`- [${o.name}](${o.href}): ${o.summary}`]),
    '',
    '## Experience',
    '',
    ...experience.flatMap((j) => [`### ${j.title}, ${j.company} (${j.period})`, '', ...j.points.map((p) => `- ${p}`), '']),
    '## How I work',
    '',
    ...principles.map((p) => `- ${p.title} ${p.body}`),
    '',
    '## Toolkit',
    '',
    ...skills.map((s) => `- ${s.group}: ${s.items.join(', ')}`),
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
