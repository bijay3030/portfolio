import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { srConfig, email, availability } from '@config';
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

// Short, self-contained answers: each one should make sense quoted on its own
// in a search snippet or an AI-generated answer.
const faqs = [
  {
    q: 'Who is Bijay Subedi?',
    a: 'Bijay Subedi is a senior software engineer based in Kathmandu, Nepal, with 5+ years of experience building Ruby on Rails, React, and AWS applications. Bijay works at Truemark, building workflow and automation platforms for US clients.',
  },
  {
    q: 'What does Bijay Subedi specialize in?',
    a: 'Full-stack web applications with Ruby on Rails 7 and React: background processing with Sidekiq, real-time updates with ActionCable and Hotwire, PostgreSQL performance tuning, microservices on AWS, and CI/CD pipelines.',
  },
  {
    q: 'What has Bijay Subedi built?',
    a: 'Helios, a platform that runs medical translation projects from intake to delivery; Quoting, a versioned quote system for a healthcare localization company; and AListEngine, an AI tool that turns product photos into marketplace-ready listings.',
  },
  {
    q: 'Does Bijay Subedi work remotely with US or European teams?',
    a: `Yes. Bijay already works remotely with US clients through Truemark and is based in ${
      availability.location
    }, with ${availability.overlap.replace(
      ' · ',
      ' and ',
    )}. Bijay is ${availability.status.toLowerCase()}.`,
  },
  {
    q: 'How can I contact Bijay Subedi?',
    a: `Email ${email}.`,
  },
];

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
