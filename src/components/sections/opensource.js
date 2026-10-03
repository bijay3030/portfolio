import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { Icon } from '@components/icons';

const StyledOpenSourceSection = styled.section`
  max-width: 1000px;

  .intro {
    margin: 0 0 30px;
    max-width: 700px;
    color: var(--slate);
    font-size: var(--fz-lg);
  }

  .repo {
    ${({ theme }) => theme.mixins.boxShadow};
    padding: 30px;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
  }

  .repo-header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 10px 20px;
    margin-bottom: 15px;

    h3 {
      margin: 0;
      color: var(--lightest-slate);
      font-size: var(--fz-xxl);
    }
  }

  .code-link {
    ${({ theme }) => theme.mixins.smallButton};
    display: inline-flex;
    align-items: center;
    gap: 8px;

    svg {
      width: 16px;
      height: 16px;
    }
  }

  p {
    color: var(--light-slate);
  }

  ul.highlights {
    ${({ theme }) => theme.mixins.fancyList};
    margin-top: 15px;
  }

  ul.tech {
    display: flex;
    flex-wrap: wrap;
    gap: 6px 16px;
    margin: 20px 0 0;
    padding: 0;
    list-style: none;
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
  }
`;

const OpenSource = () => {
  const data = useStaticQuery(graphql`
    {
      repos: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/opensource/" } }
        sort: { frontmatter: { order: ASC } }
      ) {
        nodes {
          frontmatter {
            title
            github
            summary
            highlights
            tech
          }
        }
      }
    }
  `);

  const repos = data.repos.nodes;

  if (repos.length === 0) {
    return null;
  }

  return (
    <StyledOpenSourceSection id="open-source">
      <h2 className="numbered-heading">Open Source</h2>
      <p className="intro">My client work is under NDA, so here is code you can read in full.</p>

      {repos.map(({ frontmatter: { title, github, summary, highlights, tech } }) => (
        <article className="repo" key={title}>
          <div className="repo-header">
            <h3>{title}</h3>
            <a className="code-link" href={github} target="_blank" rel="noreferrer">
              <Icon name="GitHub" /> View the code
            </a>
          </div>
          <p>{summary}</p>
          {highlights && (
            <ul className="highlights">
              {highlights.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
          {tech && (
            <ul className="tech">
              {tech.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </article>
      ))}
    </StyledOpenSourceSection>
  );
};

export default OpenSource;
