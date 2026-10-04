import React from 'react';
import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout } from '@components';
import { email, socialMedia, skills, availability } from '@config';

const StyledAbout = styled.main`
  max-width: 760px;

  h1 {
    margin: 0 0 20px;
  }

  .lede {
    color: var(--lightest-slate);
    font-size: var(--fz-xl);
    line-height: 1.6;
  }

  section {
    margin-top: 45px;
  }

  h2 {
    margin: 0 0 15px;
    font-size: var(--fz-xxl);
  }

  p,
  li {
    color: var(--light-slate);
    line-height: 1.7;
  }

  ul {
    ${({ theme }) => theme.mixins.fancyList};
  }

  a {
    ${({ theme }) => theme.mixins.inlineLink};
  }
`;

const AboutPage = ({ location, data }) => {
  const projects = data.projects.nodes;
  const repos = data.repos.nodes;
  const { siteUrl } = data.site.siteMetadata;
  const links = socialMedia.filter(({ name }) => ['GitHub', 'Linkedin', 'LeetCode'].includes(name));

  const seo = {
    title: 'About — Senior Software Engineer (Rails, React, AWS)',
    description:
      'Bijay Subedi is a senior software engineer in Kathmandu, Nepal, building Ruby on Rails, React, and AWS systems for US clients at Truemark. Background, projects, and how to get in touch.',
    schema: [
      {
        '@type': 'AboutPage',
        '@id': `${siteUrl}/about/#webpage`,
        url: `${siteUrl}/about/`,
        name: 'About Bijay Subedi',
        mainEntity: { '@id': `${siteUrl}/#person` },
      },
    ],
  };

  return (
    <Layout location={location} seo={seo}>
      <StyledAbout>
        <h1 className="medium-heading">About Bijay Subedi</h1>

        <p className="lede">
          Bijay Subedi is a senior software engineer based in Kathmandu, Nepal, with 5+ years of
          experience building Ruby on Rails, React, and AWS systems. Bijay works at{' '}
          <a href="https://www.truemark.dev/">Truemark</a> on workflow and automation platforms for
          US clients.
        </p>

        <section>
          <h2>What Bijay works on</h2>
          <p>
            Most of Bijay’s work replaces manual operations, run on email and spreadsheets, with
            software teams can rely on: healthcare translation workflow platforms, a versioned
            quoting system, and an AI tool that turns product photos into marketplace listings.
          </p>
          <ul>
            <li>Led 6+ client Ruby on Rails applications at Truemark</li>
            <li>Moved a monolith to microservices on AWS, cutting inter-service latency by 40%</li>
            <li>Kept APIs serving 500K+ requests a month at 99.9% uptime</li>
            <li>Cut deployment time from about 45 minutes to under 8</li>
            <li>Mentored 3 junior engineers in Rails and React</li>
          </ul>
        </section>

        <section>
          <h2>Projects</h2>
          <ul>
            {projects.map(({ frontmatter: { title, slug, summary } }) => (
              <li key={slug}>
                <Link to={slug}>{title}</Link>: {summary}
              </li>
            ))}
            {repos.map(({ frontmatter: { title, github, summary } }) => (
              <li key={title}>
                <a href={github}>{title}</a> (open source): {summary}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Skills</h2>
          <p>{skills.join(' · ')}</p>
        </section>

        <section>
          <h2>Working with Bijay</h2>
          <p>
            Bijay works remotely from {availability.location}, with {availability.overlap}, and is{' '}
            {availability.status.toLowerCase()}.
          </p>
        </section>

        <section>
          <h2>Contact and profiles</h2>
          <ul>
            <li>
              Email: <a href={`mailto:${email}`}>{email}</a>
            </li>
            <li>
              Resume: <Link to="/resume/">HTML</Link> · <a href="/resume.pdf">PDF</a>
            </li>
            {links.map(({ name, url }) => (
              <li key={name}>
                {name === 'Linkedin' ? 'LinkedIn' : name}:{' '}
                <a href={url}>{url.replace('https://', '')}</a>
              </li>
            ))}
          </ul>
        </section>
      </StyledAbout>
    </Layout>
  );
};

AboutPage.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default AboutPage;

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        siteUrl
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
