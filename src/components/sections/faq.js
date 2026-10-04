import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { srConfig } from '@config';
import faqs from '../../data/faqs';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledFaqSection = styled.section`
  max-width: 900px;

  dl {
    margin: 0;
  }

  .faq-item {
    padding: 22px 0;
    border-bottom: 1px solid var(--lightest-navy);

    &:first-of-type {
      padding-top: 0;
    }
  }

  dt {
    margin-bottom: 8px;
    color: var(--lightest-slate);
    font-size: var(--fz-xl);
    font-weight: 600;
  }

  dd {
    margin: 0;
    color: var(--slate);
    font-size: var(--fz-lg);
  }
`;

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

const Faq = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledFaqSection id="faq" ref={revealContainer}>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <h2 className="numbered-heading">Quick Answers</h2>

      <dl>
        {faqs.map(({ q, a }) => (
          <div className="faq-item" key={q}>
            <dt>{q}</dt>
            <dd>{a}</dd>
          </div>
        ))}
      </dl>
    </StyledFaqSection>
  );
};

export default Faq;
