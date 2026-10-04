// Scroll-reveal animations were removed so people skimming the page see every
// section immediately. Components still call sr.reveal(), which is now a no-op.
const sr = { reveal: () => {} };

export default sr;
