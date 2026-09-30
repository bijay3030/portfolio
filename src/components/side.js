import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledSideElement = styled.div`
  width: 40px;
  position: fixed;
  bottom: 0;
  left: ${props => (props.orientation === 'left' ? '40px' : 'auto')};
  right: ${props => (props.orientation === 'left' ? 'auto' : '40px')};
  z-index: 10;
  color: var(--light-slate);

  @media (max-width: 1080px) {
    left: ${props => (props.orientation === 'left' ? '20px' : 'auto')};
    right: ${props => (props.orientation === 'left' ? 'auto' : '20px')};
  }

  @media (max-width: 768px) {
    display: none;
  }

  &.side-enter {
    animation: side-fade 400ms var(--easing) 600ms both;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }

  @keyframes side-fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Side = ({ children, isHome, orientation }) => (
  // Same markup on server and client; the homepage fade-in is CSS-only.
  <StyledSideElement orientation={orientation} className={isHome ? 'side-enter' : ''}>
    {children}
  </StyledSideElement>
);

Side.propTypes = {
  children: PropTypes.node.isRequired,
  isHome: PropTypes.bool,
  orientation: PropTypes.string,
};

export default Side;
