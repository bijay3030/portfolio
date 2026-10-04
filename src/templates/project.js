import React from 'react';
import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout } from '@components';
import { email } from '@config';

const StyledProjectContainer = styled.main`
  max-width: 1000px;

  .breadcrumb {
    margin-bottom: 40px;
  }
`;

const StyledHeader = styled.header`
  margin-bottom: 50px;

  .overline {
    margin: 0 0 10px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
  }

  h1 {
    margin: 0 0 20px;
  }

  .lede {
    max-width: 760px;
    color: var(--light-slate);
    font-size: var(--fz-xl);
    line-height: 1.5;
  }
`;

const StyledFacts = styled.dl`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px 30px;
  margin: 40px 0 0;
  padding: 25px;
  border-radius: var(--border-radius);
  background-color: var(--light-navy);

  dt {
    margin-bottom: 6px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  dd {
    margin: 0;
    color: var(--lightest-slate);
    font-size: var(--fz-md);
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 6px 14px;
    margin: 0;
    padding: 0;
    list-style: none;
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
  }
`;

const StyledFigure = styled.figure`
  margin: 0 0 60px;

  img {
    display: block;
    width: 100%;
    height: auto;
    border: 1px solid var(--lightest-navy);
    border-radius: var(--border-radius);
  }

  figcaption {
    margin-top: 10px;
    color: var(--slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
  }
`;

const StyledSection = styled.section`
  margin-bottom: 50px;

  h2 {
    margin: 0 0 20px;
    font-size: var(--fz-heading);
  }

  ul {
    ${({ theme }) => theme.mixins.fancyList};
  }
`;

const StyledContent = styled.div`
  margin-bottom: 60px;

  h2 {
    margin: 2em 0 0.8em;
    font-size: var(--fz-heading);
  }

  p,
  li {
    color: var(--light-slate);
    line-height: 1.6;
  }

  ul {
    ${({ theme }) => theme.mixins.fancyList};
  }

  strong {
    color: var(--lightest-slate);
  }

  a {
    ${({ theme }) => theme.mixins.inlineLink};
  }

  .gatsby-resp-image-wrapper {
    margin: 30px 0;
    border-radius: var(--border-radius);
    overflow: hidden;
  }
`;

const StyledFooterNav = styled.nav`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding-top: 30px;
  border-top: 1px solid var(--lightest-navy);
  font-family: var(--font-mono);
  font-size: var(--fz-sm);

  a {
    ${({ theme }) => theme.mixins.inlineLink};
  }

  .next {
    margin-left: auto;
    text-align: right;
  }
`;

const StyledCta = styled.section`
  margin: 80px 0 40px;
  text-align: center;

  h2 {
    font-size: clamp(24px, 4vw, var(--fz-heading));
  }

  p {
    color: var(--light-slate);
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 30px;
  }
`;

const ProjectTemplate = ({ data, location, pageContext }) => {
  const { project, site } = data;
  const { prev, next } = pageContext;
  const { html, frontmatter } = project;
  const {
    title,
    slug,
    summary,
    description,
    domain,
    client,
    position,
    tech,
    contribution,
    diagram,
    ogImage,
    updated,
  } = frontmatter;
  const { siteUrl } = site.siteMetadata;
  const url = `${siteUrl}${slug}`;

  const schema = [
    {
      '@type': 'Article',
      '@id': `${url}#article`,
      headline: `${title}: ${domain} case study`,
      description,
      url,
      image: `${siteUrl}${ogImage}`,
      datePublished: updated,
      dateModified: updated,
      author: { '@id': `${siteUrl}/#person` },
      publisher: { '@id': `${siteUrl}/#person` },
      mainEntityOfPage: url,
      about: {
        '@type': 'SoftwareApplication',
        name: title,
        applicationCategory: 'BusinessApplication',
        description: summary,
        keywords: tech.join(', '),
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Bijay Subedi', item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: 'Projects', item: `${siteUrl}/#projects` },
        { '@type': 'ListItem', position: 3, name: title, item: url },
      ],
    },
  ];

  const seo = {
    title: `${title} — ${domain} case study`,
    description,
    image: ogImage,
    type: 'article',
    schema,
  };

  return (
    <Layout location={location} seo={seo}>
      <StyledProjectContainer>
        <span className="breadcrumb">
          <span className="arrow">&larr;</span>
          <Link to="/#projects">All projects</Link>
        </span>

        <article>
          <StyledHeader>
            <p className="overline">Case study · {domain}</p>
            <h1 className="medium-heading">{title}</h1>
            <p className="lede">{summary}</p>

            <StyledFacts>
              <div>
                <dt>Client</dt>
                <dd>{client}</dd>
              </div>
              <div>
                <dt>My role</dt>
                <dd>{position}</dd>
              </div>
              <div>
                <dt>Stack</dt>
                <dd>
                  <ul>
                    {tech.map(t => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div>
                <dt>Last updated</dt>
                <dd>
                  <time dateTime={updated}>
                    {new Date(`${updated}T00:00:00Z`).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      timeZone: 'UTC',
                    })}
                  </time>
                </dd>
              </div>
            </StyledFacts>
          </StyledHeader>

          {diagram && (
            <StyledFigure>
              <img
                src={diagram.publicURL}
                alt={`${title} architecture diagram`}
                width="1200"
                height="700"
                loading="lazy"
              />
              <figcaption>Simplified architecture. Client-specific details removed.</figcaption>
            </StyledFigure>
          )}

          {contribution && contribution.length > 0 && (
            <StyledSection>
              <h2>My contribution</h2>
              <ul>
                {contribution.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </StyledSection>
          )}

          <StyledContent dangerouslySetInnerHTML={{ __html: html }} />
        </article>

        <StyledFooterNav aria-label="More case studies">
          {prev && (
            <Link to={prev.slug} className="prev">
              &larr; {prev.title}
            </Link>
          )}
          {next && (
            <Link to={next.slug} className="next">
              {next.title} &rarr;
            </Link>
          )}
        </StyledFooterNav>

        <StyledCta>
          <h2>Need someone who can build this kind of system?</h2>
          <p>I’m open to senior full-time remote roles. Let’s talk.</p>
          <a className="email-link" href={`mailto:${email}`}>
            Get in touch
          </a>
        </StyledCta>
      </StyledProjectContainer>
    </Layout>
  );
};

export default ProjectTemplate;

ProjectTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
};

export const pageQuery = graphql`
  query ($id: String!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    project: markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        slug
        summary
        description
        domain
        client
        position
        tech
        contribution
        ogImage
        updated
        diagram {
          publicURL
        }
      }
    }
  }
`;
