import React, { useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledTestimonialsSection = styled.section`
  max-width: 1000px;

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  figure {
    ${({ theme }) => theme.mixins.boxShadow};
    display: flex;
    flex-direction: column;
    height: 100%;
    margin: 0;
    padding: 28px;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
  }

  blockquote {
    flex: 1;
    margin: 0 0 20px;
    color: var(--light-slate);
    font-size: var(--fz-lg);
    line-height: 1.6;

    p {
      margin: 0;
    }
  }

  figcaption {
    font-size: var(--fz-sm);

    .name {
      color: var(--lightest-slate);
      font-weight: 600;
    }

    .name a {
      ${({ theme }) => theme.mixins.inlineLink};
      color: var(--lightest-slate);
    }

    .meta {
      display: block;
      margin-top: 4px;
      color: var(--slate);
      font-family: var(--font-mono);
      font-size: var(--fz-xxs);
    }
  }
`;

const Testimonials = () => {
  const data = useStaticQuery(graphql`
    {
      testimonials: allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/content/testimonials/" }
          frontmatter: { draft: { ne: true } }
        }
        sort: { frontmatter: { order: ASC } }
      ) {
        edges {
          node {
            html
            frontmatter {
              name
              title
              company
              relationship
              linkedin
            }
          }
        }
      }
    }
  `);

  const testimonials = data.testimonials.edges;
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !revealContainer.current) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  // Hidden until at least one real, approved testimonial is published.
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <StyledTestimonialsSection id="testimonials" ref={revealContainer}>
      <h2 className="numbered-heading">What People Say</h2>

      <ul className="grid">
        {testimonials.map(({ node }) => {
          const { name, title, company, relationship, linkedin } = node.frontmatter;
          return (
            <li key={name}>
              <figure>
                <blockquote dangerouslySetInnerHTML={{ __html: node.html }} />
                <figcaption>
                  <span className="name">
                    {linkedin ? (
                      <a href={linkedin} target="_blank" rel="noreferrer">
                        {name}
                      </a>
                    ) : (
                      name
                    )}
                  </span>
                  <span className="meta">
                    {[title, company].filter(Boolean).join(', ')}
                    {relationship && ` · ${relationship}`}
                  </span>
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ul>
    </StyledTestimonialsSection>
  );
};

export default Testimonials;
