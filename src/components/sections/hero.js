import React from 'react';
import styled from 'styled-components';
import { availability } from '@config';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  .hero-kicker {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h2 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .hero-status {
    margin-top: 24px;
    font-family: var(--font-mono);
    font-size: var(--fz-xs);

    p {
      margin: 0;
    }

    .status-line {
      display: flex;
      align-items: center;
      gap: 10px;
      color: var(--green);
    }

    .status-meta {
      margin-top: 6px;
      padding-left: 18px;
      color: var(--light-slate);
    }

    .dot {
      flex: none;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--green);
      box-shadow: 0 0 0 3px var(--green-tint);
    }
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 40px;
  }

  /* CSS-only entrance so the text is present in the server-rendered HTML */
  @keyframes hero-fadeup {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .hero-item {
    animation: hero-fadeup 300ms var(--easing) both;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }
`;

const Hero = () => {
  const one = <p className="hero-kicker">Senior Software Engineer · Ruby on Rails · React · AWS</p>;
  const two = <h1 className="big-heading">Bijay Subedi.</h1>;
  const three = <h2 className="big-heading">I build software that runs operations.</h2>;
  const four = (
    <>
      <p>
        I’m a senior software engineer in Kathmandu with 5+ years shipping Ruby on Rails, React, and
        AWS systems for US clients — from healthcare translation workflow platforms to AI-assisted
        e-commerce listing tools. Currently at{' '}
        <a href="https://www.truemark.dev/" target="_blank" rel="noreferrer">
          Truemark
        </a>
        , turning messy manual operations into reliable, auditable software.
      </p>
    </>
  );
  const status = (
    <div className="hero-status">
      <p className="status-line">
        <span className="dot" aria-hidden="true" />
        {availability.status}
      </p>
      <p className="status-meta">
        {availability.location} · {availability.overlap}
      </p>
    </div>
  );
  const five = (
    <a className="email-link" href="#projects">
      See what I’ve built
    </a>
  );

  const items = [one, two, three, four, status, five];

  return (
    <StyledHeroSection>
      {items.map((item, i) => (
        <div key={i} className="hero-item" style={{ animationDelay: `${(i + 1) * 100}ms` }}>
          {item}
        </div>
      ))}
    </StyledHeroSection>
  );
};

export default Hero;
