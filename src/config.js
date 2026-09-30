module.exports = {
  // One source of truth for the availability line shown in the hero, contact, and FAQ.
  availability: {
    status: 'Open to senior full-time remote roles',
    location: 'Kathmandu, Nepal (UTC+5:45)',
    overlap: '4+ hours overlap with US Eastern · full EU workday overlap',
  },

  // Measurement IDs are read from environment variables at build time so nothing
  // is tracked until you set them (see README "Measurement").
  verification: {
    google: process.env.GATSBY_GOOGLE_SITE_VERIFICATION || '',
    bing: process.env.GATSBY_BING_SITE_VERIFICATION || '',
  },

  // IndexNow key (public by design); the matching key file lives in /static.
  indexNowKey: '081dd982c4b0f09c66de720ed7a26cba',

  email: 'sharma.bj11@gmail.com',

  socialMedia: [
    {
      name: 'GitHub',
      url: 'https://github.com/bijay3030',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/_good_.vibess/',
    },
    {
      name: 'Twitter',
      url: 'https://x.com/Bj11S',
    },
    {
      name: 'Linkedin',
      url: 'https://www.linkedin.com/in/bijay-p-subedi/',
    },
    {
      name: 'LeetCode',
      url: 'https://leetcode.com/u/stanbj3030/',
    },
  ],

  navLinks: [
    {
      name: 'About',
      url: '/#about',
    },
    {
      name: 'Experience',
      url: '/#jobs',
    },
    {
      name: 'Work',
      url: '/#projects',
    },
    {
      name: 'Contact',
      url: '/#contact',
    },
  ],

  colors: {
    green: '#64ffda',
    navy: '#0a192f',
    darkNavy: '#020c1b',
  },

  srConfig: (delay = 200, viewFactor = 0.25) => ({
    origin: 'bottom',
    distance: '20px',
    duration: 500,
    delay,
    rotate: { x: 0, y: 0, z: 0 },
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor,
    viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
  }),
};
