import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useLocation } from '@reach/router';
import { useStaticQuery, graphql } from 'gatsby';
import { email, socialMedia, verification, skills } from '@config';

// https://www.gatsbyjs.com/docs/add-seo-component/

const Head = ({ title, description, image, type, schema }) => {
  const { pathname } = useLocation();

  const { site, featured, repos } = useStaticQuery(
    graphql`
      {
        site {
          siteMetadata {
            defaultTitle: title
            shortTitle
            defaultDescription: description
            siteUrl
            defaultImage: image
            twitterUsername
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
              tech
              languages
            }
          }
        }
        featured: allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/content/featured/" } }
          sort: { frontmatter: { date: ASC } }
        ) {
          edges {
            node {
              frontmatter {
                title
                slug
                summary
                domain
                tech
              }
            }
          }
        }
      }
    `,
  );

  const { defaultTitle, shortTitle, defaultDescription, siteUrl, defaultImage, twitterUsername } =
    site.siteMetadata;

  const isHome = pathname === '/';
  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname}`,
  };

  const personId = `${siteUrl}/#person`;

  // The Person entity appears on every page with the same @id, so search engines and
  // AI answer engines resolve every page to one citable entity.
  const person = {
    '@type': 'Person',
    '@id': personId,
    name: 'Bijay Subedi',
    jobTitle: 'Senior Software Engineer',
    description: defaultDescription,
    url: `${siteUrl}/`,
    image: `${siteUrl}${defaultImage}`,
    email: `mailto:${email}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kathmandu',
      addressCountry: 'NP',
    },
    worksFor: {
      '@type': 'Organization',
      name: 'Truemark',
      url: 'https://www.truemark.dev/',
    },
    knowsAbout: [
      'Ruby on Rails',
      'React.js',
      'Hotwire (Turbo + Stimulus)',
      'PostgreSQL',
      'Amazon Web Services (AWS)',
      'Microservices architecture',
      'RESTful API design',
      'Sidekiq background jobs',
      'CI/CD',
      'Test-driven development (RSpec, Jest)',
      'Healthcare localization workflow software',
      'AI-assisted e-commerce listing automation',
    ],
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Senior Software Engineer',
      occupationLocation: { '@type': 'City', name: 'Kathmandu' },
      skills: skills.join(', '),
    },
    sameAs: socialMedia
      .filter(({ name }) => ['GitHub', 'Linkedin', 'Twitter', 'LeetCode'].includes(name))
      .map(({ url }) => url),
    subjectOf: [
      { '@type': 'AboutPage', url: `${siteUrl}/about/` },
      { '@type': 'WebPage', name: 'Resume', url: `${siteUrl}/resume/` },
    ],
  };

  // Site-level entities belong on the home page only.
  const homeGraph = [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: shortTitle,
      description: defaultDescription,
      publisher: { '@id': personId },
      inLanguage: 'en',
    },
    {
      '@type': 'ProfilePage',
      '@id': `${siteUrl}/#profile`,
      url: `${siteUrl}/`,
      name: defaultTitle,
      mainEntity: { '@id': personId },
    },
    {
      '@type': 'ItemList',
      '@id': `${siteUrl}/#projects`,
      name: 'Software projects by Bijay Subedi',
      itemListElement: featured.edges.map(({ node }, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${siteUrl}${node.frontmatter.slug}`,
        name: node.frontmatter.title,
        description: node.frontmatter.summary,
      })),
    },
    // Public code: lets search engines and AI answer engines link to work they can verify.
    ...repos.nodes.map(({ frontmatter }) => ({
      '@type': 'SoftwareSourceCode',
      name: frontmatter.title,
      description: frontmatter.summary,
      codeRepository: frontmatter.github,
      programmingLanguage: frontmatter.languages || [],
      keywords: (frontmatter.tech || []).join(', '),
      author: { '@id': personId },
    })),
  ];

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [person, ...(isHome ? homeGraph : []), ...schema],
  };

  return (
    <Helmet title={title} defaultTitle={seo.title} titleTemplate={`%s | ${shortTitle}`}>
      <html lang="en" />

      <meta name="description" content={seo.description} />
      <meta name="author" content="Bijay Subedi" />
      <meta name="image" content={seo.image} />
      <link rel="canonical" href={seo.url} />

      <meta property="og:site_name" content={shortTitle} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={seo.title} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content={type} />
      {type === 'profile' && <meta property="profile:first_name" content="Bijay" />}
      {type === 'profile' && <meta property="profile:last_name" content="Subedi" />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterUsername} />
      <meta name="twitter:creator" content={twitterUsername} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />

      {verification.google && (
        <meta name="google-site-verification" content={verification.google} />
      )}
      {verification.bing && <meta name="msvalidate.01" content={verification.bing} />}

      <script type="application/ld+json">{JSON.stringify(graph)}</script>
    </Helmet>
  );
};

export default Head;

Head.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  type: PropTypes.string,
  schema: PropTypes.arrayOf(PropTypes.object),
};

Head.defaultProps = {
  title: null,
  description: null,
  image: null,
  type: 'profile',
  schema: [],
};
