// Single source of truth for all content. Taken from Sourav's resume (Aug 2026) and LinkedIn.
export const person = {
  first: 'SOURAV',
  last: 'MANJEE',
  fullName: 'Sourav Manjee',
  role: 'Full Stack Developer',
  stack: 'React · Node.js · MongoDB',
  email: 'souravkumarvicky42@gmail.com',
  linkedin: 'https://linkedin.com/in/souravmanjee',
  github: 'https://github.com/Souravmanjee',
};

export const approach = {
  before: 'I look at software through a',
  after:
    'full-stack lens: algorithms that keep it fast, interfaces that keep it clear, and APIs that keep it honest.',
};

export const rows = [
  { title: 'Build', text: 'React.js, Redux Toolkit, Tailwind CSS, Bootstrap and Framer Motion for responsive interfaces that load fast.' },
  { title: 'Engineer', text: 'Node.js, Express.js, REST APIs and JWT authentication over MongoDB, MySQL and Mongoose.' },
  { title: 'Foundations', text: 'Data structures and algorithms, OOP, DBMS, operating systems, TDD, Agile and CI/CD, with Git workflows from feature branches to pull request reviews.' },
];

export const stats = [
  { n: 200, suffix: '+', label: 'DSA problems solved' },
  { n: 90, suffix: '+', label: 'Lighthouse score, shipped solo' },
  { n: 99, suffix: '%', label: 'uptime on Vercel' },
  { n: 7.75, suffix: '', label: 'CGPA, B.Tech CSE' },
];

export const projects = [
  {
    key: 'metro', title: 'Metro Guide', headline: 'The shortest route, found faster.',
    description: 'I built a metro navigation system on Dijkstra’s algorithm, with nearby places indexed in MongoDB so travellers can plan around landmarks.',
    figures: [{ value: '~35%', label: 'Faster path computation' }, { value: '99%', label: 'Uptime on Vercel' }],
    tag: 'MERN stack', role: 'Full stack developer', period: '06/2024 – 09/2024',
    colors: { bg: '#a8143c', text: '#fbe9ee', title: '#f2cfda', pill: '#f6dbe3', pillText: '#a8143c' },
    details: [
      'Built a metro navigation system on Dijkstra’s algorithm, cutting shortest-path computation time by ~35% compared with brute force.',
      'Added landmark-based nearby place exploration with MongoDB, indexing 200+ station and POI records.',
      'Deployed the full stack (React, Tailwind CSS, Node.js, Express.js) on Vercel with 99% uptime.',
      'Improved travel planning efficiency by ~40% in testing across 5+ simulated routes.',
    ],
  },
  {
    key: 'nss', title: 'NSS Edge Consulting', headline: 'A consulting site that loads in under two seconds.',
    description: 'I designed, built and deployed a responsive consulting website on my own, using React, Vite and Tailwind CSS, in under three weeks.',
    figures: [{ value: '90+', label: 'Lighthouse score' }, { value: '<3 weeks', label: 'Design to deployment, solo' }],
    tag: 'React · Vite', role: 'Freelance programmer at NSS Edge Consulting', period: '07/2025',
    colors: { bg: '#d4ea63', text: '#111111', title: '#111111', pill: '#111111', pillText: '#d4ea63' },
    details: [
      'Developed a responsive, production-ready consulting website with load times under 2 seconds across 3+ device breakpoints.',
      'Optimized UI/UX and performance for a 90+ Lighthouse score and full cross-device compatibility.',
      'Delivered design to deployment in under 3 weeks as a solo developer.',
    ],
  },
  {
    key: 'webel', title: 'Heart Disease Prediction', headline: 'A model that misses fewer patients.',
    description: 'I ran feature selection and evaluation across 300+ patient records, then built three classification models to interpret health trends.',
    figures: [{ value: '+7%', label: 'Model accuracy' }, { value: '~12%', label: 'Lower false-negative rate' }],
    tag: 'Python · Scikit-learn', role: 'Data analysis intern at Webel Fujisoft', period: '06/2024 – 07/2024',
    colors: { bg: '#2f56c9', text: '#eef2ff', title: '#eef2ff', pill: '#e6ecff', pillText: '#2f56c9' },
    details: [
      'Ran feature selection and model evaluation across 300+ patient records.',
      'Preprocessed data with Scikit-learn and Python, improving accuracy by 7% and F1 score by 0.03.',
      'Built 3 classification models that cut the false-negative rate by ~12% in risk prediction.',
    ],
  },
];

export const experience = [
  { period: '09/2026 – Present', title: 'Software Engineer, Apprenticeship', where: 'Cisco · Bengaluru, Karnataka, India · On-site' },
  { period: '07/2025', title: 'Freelance Programmer', where: 'NSS Edge Consulting' },
  { period: '06/2024 – 07/2024', title: 'Data Analysis Intern', where: 'Webel Fujisoft Vara Centre of Excellence in Industry 4.0' },
  { period: 'Education', title: 'B.Tech, Computer Science and Engineering', where: 'Dr. B.C. Roy Engineering College, Durgapur · CGPA 7.75' },
];

export const recognition = [
  '200+ DSA problems',
  'LeetCode top 30%',
  'HackerRank Problem Solving (Intermediate)',
  'Google Cloud Essentials skill badge',
  'Deloitte Data Analytics simulation',
];

export const skills = ['React', 'Node.js', 'Express', 'MongoDB', 'MySQL', 'Redux', 'Tailwind', 'REST', 'JWT', 'Git', 'DSA', 'C++', 'Java', 'SQL', 'Vite', 'Vercel', 'CI/CD', 'Agile'];
