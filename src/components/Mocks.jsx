// Dark "product window" illustrations for the three project sheets.
const frame = (children) => (
  <div className="wk-win">
    <div className="wk-bar"><i /><i /><i /></div>
    {children}
  </div>
);

const Metro = () => frame(
  <svg viewBox="0 0 400 250" fill="none" strokeLinecap="round" aria-hidden="true">
    <rect width="90" height="250" fill="#1b1c23" />
    <g fill="#2a2c36"><rect x="12" y="22" width="66" height="8" rx="4" /><rect x="12" y="42" width="50" height="8" rx="4" /><rect x="12" y="62" width="58" height="8" rx="4" /></g>
    <g stroke="#3a3d4a" strokeWidth="3"><path d="M110 200H200L250 130H380" /><path d="M130 50L200 110L250 130L300 220" /></g>
    <path d="M110 200H200L250 130L300 220" stroke="#ff5c85" strokeWidth="6" />
    <g fill="#ff5c85"><circle cx="110" cy="200" r="8" /><circle cx="200" cy="200" r="8" /><circle cx="250" cy="130" r="8" /><circle cx="300" cy="220" r="8" /></g>
    <rect x="110" y="20" width="150" height="26" rx="13" fill="#262831" />
  </svg>
);

const Site = () => frame(
  <svg viewBox="0 0 400 250" aria-hidden="true">
    <rect x="20" y="10" width="360" height="100" rx="12" fill="#1e2028" />
    <rect x="40" y="34" width="170" height="14" rx="7" fill="#e8e9ef" />
    <rect x="40" y="60" width="120" height="9" rx="4.5" fill="#4a4d5a" />
    <rect x="40" y="80" width="64" height="18" rx="9" fill="#d4ea63" />
    <circle cx="320" cy="60" r="30" fill="none" stroke="#2ecc71" strokeWidth="8" strokeDasharray="150 40" />
    <rect x="20" y="126" width="112" height="104" rx="12" fill="#1e2028" />
    <rect x="144" y="126" width="112" height="104" rx="12" fill="#1e2028" />
    <rect x="268" y="126" width="112" height="104" rx="12" fill="#1e2028" />
  </svg>
);

const Chart = () => frame(
  <svg viewBox="0 0 400 250" aria-hidden="true">
    <g fill="#272a35"><rect x="40" y="150" width="50" height="80" rx="6" /><rect x="120" y="120" width="50" height="110" rx="6" /><rect x="200" y="90" width="50" height="140" rx="6" /></g>
    <rect x="280" y="50" width="50" height="180" rx="6" fill="#6f8cff" />
    <path d="M40 70L120 56L200 44L305 30" stroke="#6f8cff" strokeWidth="3" fill="none" strokeDasharray="4 6" />
  </svg>
);

export const mocks = { metro: Metro, nss: Site, webel: Chart };
