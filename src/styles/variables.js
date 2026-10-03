import { css } from 'styled-components';

const variables = css`
  :root {
    /* Palette: warm ink background with a ruby accent (a nod to Ruby on Rails).
       Variable names are kept from the original template to avoid a mass rename. */
    --dark-navy: #07090c;
    --navy: #0e1217;
    --light-navy: #161c24;
    --lightest-navy: #28313d;
    --navy-shadow: rgba(4, 6, 9, 0.7);
    --dark-slate: #4d5866;
    --slate: #8d99a8;
    --light-slate: #b4bfcc;
    --lightest-slate: #e2e8ef;
    --white: #f4f7fa;
    --green: #ff6b7f;
    --green-tint: rgba(255, 107, 127, 0.1);
    --pink: #f57dff;
    --blue: #57cbff;

    --font-sans: 'Calibre', 'Inter', 'San Francisco', 'SF Pro Text', -apple-system, system-ui,
      sans-serif;
    --font-mono: 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace;

    --fz-xxs: 12px;
    --fz-xs: 13px;
    --fz-sm: 14px;
    --fz-md: 16px;
    --fz-lg: 18px;
    --fz-xl: 20px;
    --fz-xxl: 22px;
    --fz-heading: 32px;

    --border-radius: 4px;
    --nav-height: 100px;
    --nav-scroll-height: 70px;

    --tab-height: 42px;
    --tab-width: 120px;

    --easing: cubic-bezier(0.645, 0.045, 0.355, 1);
    --transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

    --hamburger-width: 30px;

    --ham-before: top 0.1s ease-in 0.25s, opacity 0.1s ease-in;
    --ham-before-active: top 0.1s ease-out, opacity 0.1s ease-out 0.12s;
    --ham-after: bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    --ham-after-active: bottom 0.1s ease-out,
      transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s;
  }
`;

export default variables;
