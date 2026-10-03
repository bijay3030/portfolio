import React from 'react';
import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout } from '@components';
import { email, socialMedia, skills, summary, availability } from '@config';

const StyledResume = styled.main`
  max-width: 860px;

  header {
    margin-bottom: 40px;

    h1 {
      margin: 0 0 6px;
    }

    .role {
      margin: 0 0 16px;
      color: var(--green);
      font-family: var(--font-mono);
      font-size: var(--fz-md);
    }

    .contact {
      display: flex;
      flex-wrap: wrap;
      gap: 6px 18px;
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
      margin-top: 24px;
    }
  }

  section {
    margin-bottom: 45px;
  }

  h2 {
    margin: 0 0 18px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--lightest-navy);
    font-size: var(--fz-xxl);
  }

  p,
  li {
    color: var(--light-slate);
    line-height: 1.6;
  }

  .job {
    margin-bottom: 32px;

    h3 {
      margin: 0;
      color: var(--lightest-slate);
      font-size: var(--fz-xl);
    }

    .meta {
      margin: 4px 0 12px;
      color: var(--slate);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
    }

    ul {
      ${({ theme }) => theme.mixins.fancyList};
    }

    .stack {
      margin-top: 8px;
      color: var(--slate);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
    }
  }

  .projects li,
  .skills li {
    margin-bottom: 10px;
  }

  .projects {
    ${({ theme }) => theme.mixins.fancyList};

    a {
      ${({ theme }) => theme.mixins.inlineLink};
      font-weight: 600;
    }
  }

  .skills {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 0 20px;
    padding: 0;
    list-style: none;
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
  }
`;

const profile = name => socialMedia.find(s => s.name === name)?.url;

const ResumePage = ({ location, data }) => {
  const jobs = data.jobs.nodes;
  const projects = data.projects.nodes;
  const repos = data.repos.nodes;
  const { siteUrl } = data.site.siteMetadata;
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
      <StyledResume>
        <header>
          <h1 className="medium-heading">Bijay Subedi</h1>
          <p className="role">Senior Software Engineer · Ruby on Rails · React · AWS</p>
          <ul className="contact">
            <li>Kathmandu, Nepal (UTC+5:45)</li>
            <li>
              <a href={`mailto:${email}`}>{email}</a>
            </li>
            {linkedin && (
              <li>
                <a href={linkedin}>LinkedIn</a>
              </li>
            )}
            {github && (
              <li>
                <a href={github}>GitHub</a>
              </li>
            )}
            <li>
              <Link to="/">Portfolio</Link>
            </li>
          </ul>
          <a className="pdf-link" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
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
                {title}, {company}
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
                <Link to={slug}>{title}</Link>: {projectSummary}
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
                  <a href={repoUrl}>{title}</a>: {repoSummary}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section>
          <h2>Skills</h2>
          <ul className="skills">
            {skills.map(skill => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
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
    site {
      siteMetadata {
        siteUrl
      }
    }
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
