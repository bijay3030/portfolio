import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { navLinks } from '@config';
import { Menu } from '@components';

const StyledHeader = styled.header`
  ${({ theme }) => theme.mixins.flexBetween};
  position: fixed;
  top: 0;
  z-index: 11;
  padding: 0px 50px;
  width: 100%;
  height: var(--nav-height);
  background-color: rgba(10, 25, 47, 0.85);
  filter: none !important;
  pointer-events: auto !important;
  user-select: auto !important;
  backdrop-filter: blur(10px);
  transition: var(--transition);

  @media (max-width: 1080px) {
    padding: 0 40px;
  }
  @media (max-width: 768px) {
    padding: 0 25px;
  }

  @media (prefers-reduced-motion: no-preference) {
    ${props =>
    !props.scrolledToTop &&
      css`
        height: var(--nav-scroll-height);
        transform: translateY(0px);
        background-color: rgba(10, 25, 47, 0.85);
        box-shadow: 0 10px 30px -10px var(--navy-shadow);
      `};
  }
`;

const StyledNav = styled.nav`
  ${({ theme }) => theme.mixins.flexBetween};
  position: relative;
  width: 100%;
  color: var(--lightest-slate);
  font-family: var(--font-mono);
  counter-reset: item 0;

  @keyframes nav-fadedown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .nav-enter {
    animation: nav-fadedown 300ms var(--easing) both;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }
  z-index: 12;

  .logo {
    ${({ theme }) => theme.mixins.flexCenter};

    a {
      display: block;
      color: var(--green);
    }

    .monogram {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 42px;
      height: 42px;
      border: 2px solid var(--green);
      border-radius: 10px;
      color: var(--green);
      font-family: var(--font-mono);
      font-size: 15px;
      font-weight: 700;
      letter-spacing: 0.04em;
      @media (prefers-reduced-motion: no-preference) {
        transition: var(--transition);
      }
    }

    a:hover .monogram,
    a:focus .monogram {
      background-color: var(--green-tint);
    }
  }
`;

const StyledLinks = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }

  ol {
    ${({ theme }) => theme.mixins.flexBetween};
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      margin: 0 5px;
      position: relative;
      counter-increment: item 1;
      font-size: var(--fz-xs);

      a {
        padding: 10px;
      }
    }
  }

  .resume-button {
    ${({ theme }) => theme.mixins.smallButton};
    margin-left: 15px;
    font-size: var(--fz-xs);
  }

  .search-button {
    ${({ theme }) => theme.mixins.smallButton};
    margin-left: 15px;
    font-size: var(--fz-xs);
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 0.75rem 1rem;
  }
`;

const Nav = ({ isHome, onOpenSearch }) => {
  const [scrolledToTop, setScrolledToTop] = useState(true);
  const handleScroll = () => {
    setScrolledToTop(window.pageYOffset < 50);
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Rendered identically on server and client (no hydration mismatch); the entrance
  // animation on the homepage is pure CSS.
  const enter = i =>
    isHome ? { className: 'nav-enter', style: { animationDelay: `${i * 80}ms` } } : {};

  const Monogram = (
    <span className="monogram" aria-hidden="true">
      BS
    </span>
  );

  const Logo = (
    <div className="logo" tabIndex="-1">
      {isHome ? (
        <a href="/" aria-label="Bijay Subedi, home">
          {Monogram}
        </a>
      ) : (
        <Link to="/" aria-label="Bijay Subedi, home">
          {Monogram}
        </Link>
      )}
    </div>
  );

  const ResumeLink = (
    <a className="resume-button" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
      Resume
    </a>
  );

  const SearchButton = (
    <button type="button" className="search-button" onClick={onOpenSearch} aria-label="Open search">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        width="14"
        height="14">
        <circle cx="11" cy="11" r="7" />
        <line x1="20" y1="20" x2="16.65" y2="16.65" />
      </svg>
      Search
    </button>
  );

  return (
    <StyledHeader scrolledToTop={scrolledToTop}>
      <StyledNav>
        <div {...enter(0)}>{Logo}</div>

        <StyledLinks>
          <ol>
            {navLinks &&
              navLinks.map(({ url, name }, i) => (
                <li key={i} {...enter(i + 1)}>
                  <Link to={url}>{name}</Link>
                </li>
              ))}
          </ol>
          <div {...enter(navLinks.length + 1)}>{SearchButton}</div>
          <div {...enter(navLinks.length + 2)}>{ResumeLink}</div>
        </StyledLinks>

        <Menu onOpenSearch={onOpenSearch} />
      </StyledNav>
    </StyledHeader>
  );
};

Nav.propTypes = {
  isHome: PropTypes.bool,
  onOpenSearch: PropTypes.func.isRequired,
};

export default Nav;
