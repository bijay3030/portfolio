import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { Icon } from '@components/icons';
import { socialMedia } from '@config';

const StyledFooter = styled.footer`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  height: auto;
  min-height: 70px;
  padding: 15px;
  text-align: center;
`;

const StyledSocialLinks = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    width: 100%;
    max-width: 270px;
    margin: 0 auto 10px;
    color: var(--light-slate);
  }

  ul {
    ${({ theme }) => theme.mixins.flexBetween};
    padding: 0;
    margin: 0;
    list-style: none;

    a {
      padding: 10px;
      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

const StyledCredit = styled.div`
  .footer-links {
    display: flex;
    justify-content: center;
    gap: 18px;
    margin-bottom: 14px;
  }

  color: var(--light-slate);
  font-family: var(--font-mono);
  font-size: var(--fz-xxs);
  line-height: 1;

  a {
    color: var(--light-slate);
  }
`;

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <StyledFooter>
      <StyledSocialLinks>
        <ul>
          {socialMedia &&
            socialMedia.map(({ name, url }, i) => (
              <li key={i}>
                <a href={url} aria-label={name}>
                  <Icon name={name} />
                </a>
              </li>
            ))}
        </ul>
      </StyledSocialLinks>

      <StyledCredit>
        <nav className="footer-links" aria-label="Site">
          <Link to="/about/">About</Link>
          <Link to="/resume/">Resume</Link>
        </nav>
        <div>© {year} Bijay Subedi</div>
        <div style={{ marginTop: '10px' }}>
          Design adapted from{' '}
          <a href="https://github.com/bchiang7/v4" target="_blank" rel="noreferrer">
            Brittany Chiang
          </a>
        </div>
      </StyledCredit>
    </StyledFooter>
  );
};

export default Footer;
