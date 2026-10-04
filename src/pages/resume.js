import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import { Layout } from '@components';
import {
  email,
  phone,
  socialMedia,
  skillGroups,
  summary,
  availability,
  education,
  siteUrl,
} from '@config';

// When printed (and when scripts/resume-pdf.js renders resume.pdf), hide the site chrome
// and switch to a plain, one-column, black-on-white layout that ATS parsers read reliably.
const PrintStyle = createGlobalStyle`
  @media print {
    @page {
      size: Letter;
      margin: 0.55in 0.6in;
    }

    :root {
      --navy: #ffffff;
      --light-navy: #ffffff;
      --lightest-navy: #cccccc;
      --slate: #333333;
      --light-slate: #222222;
      --lightest-slate: #000000;
      --white: #000000;
      --green: #000000;
      --font-mono: var(--font-sans);
    }

    html,
    body {
      background: #ffffff !important;
      color: #000000;
      font-size: 10.5pt;
    }

    #root > div > :not(#content),
    #content > footer,
    .skip-to-content,
    .no-print {
      display: none !important;
    }

    #content {
      padding: 0 !important;
    }

    main {
      padding: 0 !important;
      max-width: none !important;
      min-height: 0 !important;
    }

    a {
      color: #000000 !important;
      text-decoration: none !important;
    }

    a:after {
      display: none !important;
    }

    .print-only {
      display: inline !important;
    }
  }
`;

const StyledResume = styled.main`
  max-width: 860px;

  .print-only {
    display: none;
  }

  header {
    margin-bottom: 36px;

    h1 {
      margin: 0 0 6px;
    }

    .role {
      margin: 0 0 14px;
      color: var(--green);
      font-family: var(--font-mono);
      font-size: var(--fz-md);
    }

    .contact {
      display: flex;
      flex-wrap: wrap;
      gap: 4px 16px;
      margin: 0;
      padding: 0;
      list-style: none;
      font-size: var(--fz-sm);

      a {
        ${({ theme }) => theme.mixins.inlineLink};
      }
    }

    .pdf-link {
      ${({ theme }) => theme.mixins.smallButton};
      display: inline-block;
      margin-top: 22px;
    }
  }

  section {
    margin-bottom: 36px;
  }

  h2 {
    margin: 0 0 14px;
    padding-bottom: 6px;
    border-bottom: 1px solid var(--lightest-navy);
    font-size: var(--fz-xxl);
  }

  p,
  li {
    color: var(--light-slate);
    line-height: 1.55;
  }

  .job {
    margin-bottom: 26px;

    h3 {
      margin: 0;
      color: var(--lightest-slate);
      font-size: var(--fz-xl);
    }

    .meta {
      margin: 3px 0 10px;
      color: var(--slate);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
    }

    ul {
      ${({ theme }) => theme.mixins.fancyList};
    }

    .stack {
      margin-top: 6px;
      color: var(--slate);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
    }
  }

  .projects {
    ${({ theme }) => theme.mixins.fancyList};

    li {
      margin-bottom: 8px;
    }

    a {
      ${({ theme }) => theme.mixins.inlineLink};
      font-weight: 600;
    }
  }

  .skills {
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      margin-bottom: 6px;
    }

    strong {
      color: var(--lightest-slate);
    }
  }

  @media print {
    /* Override the site's roomy section spacing and type scale for a dense, uniform page */
    section {
      padding: 0 !important;
      margin: 0 0 14px !important;
    }

    p,
    li,
    .contact,
    .meta,
    .stack {
      font-size: 9.5pt !important;
      line-height: 1.4 !important;
    }

    p {
      margin: 0 0 4px;
    }

    .role {
      margin-bottom: 6px !important;
      font-size: 10.5pt !important;
    }

    h1 {
      font-size: 22pt !important;
    }

    h2 {
      margin-bottom: 8px;
      font-size: 12pt;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    header {
      margin-bottom: 18px;
    }

    section {
      margin-bottom: 16px;
    }

    .job {
      margin-bottom: 12px;

      h3 {
        font-size: 11pt;
      }

      ul {
        margin: 0;
      }

      ul li {
        padding-left: 14px;
        margin-bottom: 2px;

        &:before {
          content: '•';
          color: #000000;
        }
      }
    }

    .job h3,
    .job .meta {
      break-after: avoid;
    }

    .projects li {
      padding-left: 14px;
      margin-bottom: 4px;

      &:before {
        content: '•';
        color: #000000;
      }
    }
  }
`;

const profile = name => socialMedia.find(s => s.name === name)?.url;
const bare = url => url && url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

const ResumePage = ({ location, data }) => {
  const jobs = data.jobs.nodes;
  const projects = data.projects.nodes;
  const repos = data.repos.nodes;
  const linkedin = profile('Linkedin');
  const github = profile('GitHub');

  const seo = {
    title: 'Resume — Senior Software Engineer (Rails, React, AWS)',
    description:
      'Resume of Bijay Subedi, Senior Software Engineer (Ruby on Rails, React, AWS) at Truemark in Kathmandu, Nepal: experience, projects, open source, and skills.',
    schema: [
      {
        '@type': 'WebPage',
        '@id': `${siteUrl}/resume/#webpage`,
        url: `${siteUrl}/resume/`,
        name: 'Resume of Bijay Subedi',
        mainEntity: { '@id': `${siteUrl}/#person` },
      },
    ],
  };

  return (
    <Layout location={location} seo={seo}>
      <PrintStyle />
      <StyledResume>
        <header>
          <h1 className="medium-heading">Bijay Subedi</h1>
          <p className="role">Senior Software Engineer · Ruby on Rails · React · AWS</p>
          <ul className="contact">
            <li>{availability.location}</li>
            <li>
              <a href={`mailto:${email}`}>{email}</a>
            </li>
            {phone && <li className="print-only">{phone}</li>}
            {linkedin && (
              <li>
                <a href={linkedin}>{bare(linkedin)}</a>
              </li>
            )}
            {github && (
              <li>
                <a href={github}>{bare(github)}</a>
              </li>
            )}
            <li>
              <a href={`${siteUrl}/`}>{bare(siteUrl)}</a>
            </li>
          </ul>
          <a
            className="pdf-link no-print"
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer">
            Download PDF
          </a>
        </header>

        <section>
          <h2>Summary</h2>
          <p>{summary}</p>
          <p>
            {availability.status} · {availability.overlap}.
          </p>
        </section>

        <section>
          <h2>Experience</h2>
          {jobs.map(({ html, frontmatter: { title, company, location: place, range, stack } }) => (
            <div className="job" key={`${title}-${range}`}>
              <h3>
                {title} | {company}
              </h3>
              <p className="meta">
                {range} · {place}
              </p>
              <div dangerouslySetInnerHTML={{ __html: html }} />
              {stack && <p className="stack">Stack: {stack.join(', ')}</p>}
            </div>
          ))}
        </section>

        <section>
          <h2>Selected projects</h2>
          <ul className="projects">
            {projects.map(({ frontmatter: { title, slug, summary: projectSummary } }) => (
              <li key={slug}>
                <a href={`${siteUrl}${slug}`}>{title}</a>: {projectSummary}{' '}
                <span className="print-only">({bare(`${siteUrl}${slug}`)})</span>
              </li>
            ))}
          </ul>
        </section>

        {repos.length > 0 && (
          <section>
            <h2>Open source</h2>
            <ul className="projects">
              {repos.map(({ frontmatter: { title, github: repoUrl, summary: repoSummary } }) => (
                <li key={title}>
                  <a href={repoUrl}>{title}</a>: {repoSummary}{' '}
                  <span className="print-only">({bare(repoUrl)})</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section>
          <h2>Technical skills</h2>
          <ul className="skills">
            {skillGroups.map(({ name, items }) => (
              <li key={name}>
                <strong>{name}:</strong> {items.join(', ')}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Education</h2>
          {education.map(({ degree, school, years }) => (
            <p key={degree}>
              <strong>{degree}</strong> | {school} · {years}
            </p>
          ))}
        </section>
      </StyledResume>
    </Layout>
  );
};

ResumePage.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default ResumePage;

export const pageQuery = graphql`
  {
    jobs: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/jobs/" } }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        html
        frontmatter {
          title
          company
          location
          range
          stack
        }
      }
    }
    projects: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/featured/" } }
      sort: { frontmatter: { date: ASC } }
    ) {
      nodes {
        frontmatter {
          title
          slug
          summary
        }
      }
    }
    repos: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/opensource/" } }
      sort: { frontmatter: { order: ASC } }
    ) {
      nodes {
        frontmatter {
          title
          github
          summary
        }
      }
    }
  }
`;
