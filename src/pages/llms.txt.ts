// A plain-text version of the page for AI assistants and anyone who prefers text.
import type { APIRoute } from 'astro';
import { url } from '../utils/url';
import { profile, about, aiWorkflow, projects, openSource, experience, skills, faqs, education } from '../data/site';

export const GET: APIRoute = ({ site }) => {
  const lines = [
    `# ${profile.name}`,
    '',
    `> ${profile.tagline}, ${profile.location} (${profile.utcOffset}). ${profile.statement}`,
    '',
    `- Availability: ${profile.availability}; overlap ${profile.overlap}`,
    `- Email: ${profile.email}`,
    `- Résumé: ${new URL(url(profile.resume), site)}`,
    ...profile.links.map((l) => `- ${l.label}: ${l.href}`),
    '',
    '## About',
    '',
    ...about.flatMap((p) => [p, '']),
    '### How I ship a feature with AI',
    '',
    ...aiWorkflow.map((w, i) => `${i + 1}. ${w.step}: ${w.detail}`),
    '',
    '## Selected work',
    '',
    ...projects.flatMap((p) => [
      `### ${p.name} — ${p.domain}`,
      '',
      p.summary,
      '',
      `- Before → after: ${p.before} → ${p.after}`,
      `- Scale: ${p.scale.join('; ')}`,
      `- Client: ${p.client}${p.href ? ` — ${p.href}` : ''}`,
      `- Problem: ${p.problem}`,
      ...p.contribution.map((c) => `- My part: ${c}`),
      `- Stack: ${p.stack.join(', ')}`,
      ...p.decisions.map((d) => `- Decision: ${d.title}. ${d.body}`),
      ...p.results.map((r) => `- Result: ${r}`),
      '',
    ]),
    ...(openSource.length
      ? ['## Open source', '', ...openSource.flatMap((o) => [`- [${o.name}](${o.href}): ${o.summary}`, ...o.notes.map((n) => `  - ${n}`)]), '']
      : []),
    '## Experience',
    '',
    ...experience.flatMap((j) => [
      `### ${j.title}, ${j.company} (${j.period})`,
      '',
      j.summary,
      '',
      ...j.metrics.map((m) => `- ${m.value} ${m.label}`),
      ...j.points.map((p) => `- ${p}`),
      '',
    ]),
    '## Education',
    '',
    ...education.map((e) => `- ${e.degree}, ${e.school} (${e.years})`),
    '',
    '## Toolkit',
    '',
    ...skills.map((s) => `- ${s.group}: ${s.items.join(', ')}`),
    '',
    '## Frequently asked questions',
    '',
    ...faqs.flatMap((f) => [`### ${f.q}`, '', f.a, '']),
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
