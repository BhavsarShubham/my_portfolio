import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  nextjs,
  tailwind,
  nodejs,
  mongodb,
  hardhat,
  psql,
  solidity,
  timechain,
} from "../assets";

export const navLinks = [
  { id: "about", title: "About" },
  { id: "experience", title: "Experience" },
  { id: "projects", title: "Projects" },
  { id: "skills", title: "Skills" },
  { id: "github", title: "GitHub" },
  { id: "contact", title: "Contact" },
];

export const services = [
  { title: "Full Stack Development", icon: backend },
  { title: "Blockchain / Web3", icon: creator },
  { title: "Mobile Development", icon: mobile },
  { title: "Frontend Engineering", icon: web },
];

export const technologies = [
  { name: "JavaScript", icon: javascript },
  { name: "TypeScript", icon: typescript },
  { name: "React JS", icon: reactjs },
  { name: "Next.js", icon: nextjs },
  { name: "Node JS", icon: nodejs },
  { name: "Tailwind CSS", icon: tailwind },
  { name: "Solidity", icon: solidity },
  { name: "Hardhat", icon: hardhat },
  { name: "PostgreSQL", icon: psql },
  { name: "MongoDB", icon: mongodb },
  { name: "HTML 5", icon: html },
  { name: "CSS 3", icon: css },
];

export const experiences = [
  {
    title: "Software Developer",
    company_name: "Timechain Labs",
    icon: timechain,
    iconBg: "#1a1a2e",
    date: "January 2026 – April 2026",
    location: "Hyderabad, Telangana, India · Remote",
    type: "full-time",
    points: [
      "Delivered full-stack features for the Neucron blockchain wallet console, working across frontend and backend layers.",
      "Built responsive UI components using React.js, Next.js, and TypeScript for wallet operations and asset management.",
      "Integrated 10+ RESTful APIs connecting frontend interfaces to blockchain backend services.",
      "Developed cross-platform mobile functionality using React Native, targeting iOS and Android.",
      "Built and maintained a reusable component library to accelerate feature development across the platform.",
      "Worked on digital certificate functionality and ticketing modules within the console.",
      "Debugged and resolved production issues, maintaining feature stability in a live blockchain environment.",
      "Owned feature delivery end-to-end: from scoping and implementation through deployment.",
      "Leveraged AI-assisted development tools including Claude and GitHub Copilot alongside manual code review.",
    ],
  },
  {
    title: "Developer Intern",
    company_name: "Timechain Labs",
    icon: timechain,
    iconBg: "#1a1a2e",
    date: "June 2025 – December 2025",
    location: "Remote",
    type: "internship",
    promoted: true,
    points: [
      "Built responsive web pages from Figma designs using React.js and TailwindCSS.",
      "Developed reusable component libraries following design system standards.",
      "Wrote automated test suites using Mocha and Chai for frontend and API layers.",
      "Performed manual regression testing and API testing to ensure feature quality.",
      "Collaborated closely with design and backend teams to align implementation with product requirements.",
      "Worked toward production feature delivery within an agile team environment.",
      "Received a full-time offer within 6 months of joining as an intern.",
    ],
  },
  {
    title: "Blockchain Developer Intern",
    company_name: "Timechain Labs",
    icon: timechain,
    iconBg: "#1a1a2e",
    date: "August 2024 – September 2024",
    location: "Remote",
    type: "internship",
    points: [
      "Contributed to BSV-based blockchain development projects.",
      "Explored smart contract development and wallet integration patterns.",
    ],
  },
  {
    title: "Summer Code Developer",
    company_name: "Timechain Labs",
    icon: timechain,
    iconBg: "#1a1a2e",
    date: "June 2024 – September 2024",
    location: "Remote",
    type: "program",
    points: [
      "Participated in a structured development program building blockchain-related projects.",
      "Collaborated with engineering teams on product development tasks.",
    ],
  },
  {
    title: "Campus Ambassador",
    company_name: "Timechain Labs",
    icon: timechain,
    iconBg: "#1a1a2e",
    date: "September 2024 – March 2025",
    location: "India",
    type: "ambassador",
    points: [
      "Represented Timechain Labs within the academic community.",
      "Promoted blockchain awareness and engineering initiatives among students.",
    ],
  },
];

export const projects = [
  {
    name: "Neucron Console",
    tagline: "Blockchain Wallet Platform",
    category: "Blockchain · Full Stack · Production",
    description:
      "Contributed full-stack features to the Neucron blockchain wallet console — a production platform for managing BSV-based wallet operations, digital assets, and certificates. Improved client-side UI performance, built reusable component architecture, and integrated production-grade backend APIs.",
    role: "Software Developer",
    contribution: "Full-stack features, API integration, component architecture, production debugging",
    tags: [
      { name: "React.js", color: "blue-text-gradient" },
      { name: "Next.js", color: "green-text-gradient" },
      { name: "TypeScript", color: "pink-text-gradient" },
      { name: "Node.js", color: "orange-text-gradient" },
      { name: "BSV Blockchain", color: "green-text-gradient" },
    ],
    highlights: [
      "10+ RESTful API integrations",
      "Wallet operations & asset management",
      "React Native mobile (iOS & Android)",
      "Reusable component library",
      "Digital certificates & ticketing",
    ],
    live_link: "https://console.neucron.io",
    github_link: null,
    featured: false,
  },
  {
    name: "Boxmate",
    tagline: "Multi-Platform B2C Product",
    category: "Full Stack · Mobile · Web",
    description:
      "A live B2C product with multiple product surfaces: a Host App, Client Web interface, and Admin Dashboard. Built cross-platform mobile experiences and responsive web interfaces, integrating backend APIs across all surfaces.",
    role: "Full Stack Developer",
    contribution: "React Native mobile app, Next.js web interfaces, API integration, responsive design",
    tags: [
      { name: "React Native", color: "blue-text-gradient" },
      { name: "Next.js", color: "green-text-gradient" },
      { name: "iOS & Android", color: "pink-text-gradient" },
      { name: "REST APIs", color: "orange-text-gradient" },
    ],
    highlights: [
      "Host App · Client Web · Admin Dashboard",
      "Cross-platform iOS & Android",
      "Responsive web interfaces",
      "Backend API integration",
    ],
    live_link: "https://www.boxmate.store/",
    github_link: null,
    featured: false,
  },
  {
    name: "Assetyzer",
    tagline: "Asset Management & Billing Platform",
    category: "Asset Management · Billing · Full Stack",
    description:
      "An asset management and billing platform built with SvelteKit, featuring reactive UI architecture, billing integration, and backend API connectivity. Focused on clean data flows and a maintainable frontend architecture.",
    role: "Full Stack Developer",
    contribution: "SvelteKit frontend, billing integration, API integration, reactive UI architecture",
    tags: [
      { name: "SvelteKit", color: "orange-text-gradient" },
      { name: "TypeScript", color: "blue-text-gradient" },
      { name: "Billing APIs", color: "green-text-gradient" },
      { name: "PostgreSQL", color: "pink-text-gradient" },
    ],
    highlights: [
      "SvelteKit reactive architecture",
      "Billing & payment integration",
      "Asset lifecycle management",
      "Backend API integration",
    ],
    live_link: "https://assetyzer-develop.vercel.app/asset-class",
    github_link: null,
    featured: false,
  },
  {
    name: "Open Run — Stablecoin Platform",
    tagline: "1st Place · 64 Teams · 48 Hours",
    category: "Hackathon · Blockchain · BSV",
    description:
      "Built a stablecoin platform in 48 hours during the Open Run Hackathon, enabling users to mint, transfer, and manage BSV-backed stable digital assets. Won 1st place in Track 3 among 64 competing teams.",
    role: "Builder",
    contribution: "Full product: frontend, smart contracts, BSV integration",
    tags: [
      { name: "React", color: "blue-text-gradient" },
      { name: "TypeScript", color: "green-text-gradient" },
      { name: "BSV Blockchain", color: "orange-text-gradient" },
      { name: "Smart Contracts", color: "pink-text-gradient" },
    ],
    highlights: [
      "🏆 1st Place — Track 3",
      "64 competing teams",
      "Built in 48 hours",
      "Mint · Transfer · Manage BSV assets",
      "Full-stack: React + TypeScript + BSV",
    ],
    live_link: "https://stablecoin-tcl.vercel.app/",
    github_link: null,
    featured: true,
    hackathon: true,
    achievement: "1st Place / 64 Teams",
  },
  {
    name: "News Factory",
    tagline: "Decentralized BSV News Portal",
    category: "Blockchain · Full Stack",
    description:
      "A full-stack decentralized news portal on the BSV blockchain with smart contract-driven wallet and subscription management, using SvelteKit, TypeScript, PostgreSQL, and Neucron Wallet.",
    role: "Developer",
    contribution: "Full-stack development, BSV integration, smart contracts",
    tags: [
      { name: "SvelteKit", color: "orange-text-gradient" },
      { name: "TypeScript", color: "blue-text-gradient" },
      { name: "PostgreSQL", color: "green-text-gradient" },
      { name: "BSV", color: "pink-text-gradient" },
    ],
    highlights: [
      "BSV blockchain payments",
      "Smart contract subscriptions",
      "Neucron Wallet integration",
      "Deployed on Vercel",
    ],
    live_link: null,
    github_link: "https://github.com/BhavsarShubham/news-factory",
    featured: false,
  },
  {
    name: "ICO Marketplace",
    tagline: "Decentralized Token Launch Platform",
    category: "Blockchain · DeFi · Ethereum",
    description:
      "A decentralized ICO platform on Ethereum for token sales and fundraising. Built with Solidity smart contracts and Ethers.js for transparent, secure token launches.",
    role: "Blockchain Developer",
    contribution: "Smart contracts, Ethers.js frontend integration",
    tags: [
      { name: "React", color: "blue-text-gradient" },
      { name: "Solidity", color: "green-text-gradient" },
      { name: "Ethers.js", color: "pink-text-gradient" },
      { name: "Node.js", color: "orange-text-gradient" },
    ],
    highlights: [
      "Ethereum smart contracts",
      "Token sale & fundraising",
      "Ethers.js blockchain interaction",
      "DeFi transparency",
    ],
    live_link: null,
    github_link: "https://github.com/BhavsarShubham/ICO_Market",
    featured: false,
  },
  {
    name: "Supply Chain",
    tagline: "Provenance Tracking on Ethereum",
    category: "Blockchain · Ethereum · Full Stack",
    description:
      "A blockchain-based supply chain management system on Ethereum to track goods' provenance in real time. Uses smart contracts for automated verification and fraud prevention, with a React.js interface and Web3.js integration.",
    role: "Blockchain Developer",
    contribution: "Smart contracts, Web3.js integration, React.js frontend",
    tags: [
      { name: "Next.js", color: "blue-text-gradient" },
      { name: "Solidity", color: "green-text-gradient" },
      { name: "Web3.js", color: "pink-text-gradient" },
      { name: "Ethereum", color: "orange-text-gradient" },
    ],
    highlights: [
      "Ethereum smart contracts",
      "Real-time goods provenance tracking",
      "Fraud prevention via on-chain verification",
      "Web3.js blockchain interaction",
    ],
    live_link: null,
    github_link: "https://github.com/BhavsarShubham/SHUBHAM_supply_chain_manage",
    featured: false,
  },
];

export const skillCategories = [
  {
    name: "Frontend",
    color: "#6366f1",
    skills: [
      "React.js", "Next.js", "React Native", "SvelteKit",
      "TypeScript", "JavaScript", "TailwindCSS",
      "Redux", "Zustand", "Context API",
    ],
  },
  {
    name: "Backend",
    color: "#10b981",
    skills: [
      "Node.js", "Express.js", "REST APIs",
      "PostgreSQL", "MongoDB", "SQL",
    ],
  },
  {
    name: "Blockchain",
    color: "#f59e0b",
    skills: [
      "BSV Blockchain", "Smart Contracts", "DApps",
      "Solidity", "web3.js", "ethers.js",
      "Hardhat", "Neucron Wallet",
    ],
  },
  {
    name: "Testing",
    color: "#ec4899",
    skills: [
      "Mocha", "Chai", "Jest",
      "API Testing", "Regression Testing", "E2E Testing",
    ],
  },
  {
    name: "DevOps & Tools",
    color: "#3b82f6",
    skills: [
      "Git", "GitHub", "GitLab", "Docker",
      "AWS", "Vercel", "GitHub Actions",
      "Figma", "Chrome DevTools", "JIRA",
    ],
  },
  {
    name: "AI Tools",
    color: "#8b5cf6",
    skills: [
      "Claude", "ChatGPT", "GitHub Copilot", "Antigravity", "Gemini"
    ],
  },
];

export const achievements = [
  {
    title: "Open Run Hackathon",
    subtitle: "1st Place — Track 3",
    detail: "64 competing teams · 48-hour build",
    type: "award",
    year: "2025",
    highlight: true,
    icon: "trophy",
  },
  {
    title: "Skilled Blockchain Developer",
    subtitle: "Timechain Labs",
    detail: "Certified blockchain development proficiency",
    type: "certification",
    year: "2024",
    icon: "blockchain",
    certLink: "https://drive.google.com/file/d/16IncJ7VHYmr--ldT4wkGixFtx6M5-0eW/view",
  },
  {
    title: "AWS Cloud Training",
    subtitle: "Cloud fundamentals",
    detail: "Amazon Web Services cloud practitioner training",
    type: "certification",
    year: "2024",
    icon: "aws",
    certLink: "https://drive.google.com/file/d/1GlcPySAhPSLz6422ko9eHD52QI7qFxK5/view",
  },
  {
    title: "Blockchain Development Bootcamp",
    subtitle: "Comprehensive training",
    detail: "BSV blockchain development fundamentals",
    type: "certification",
    year: "2024",
    icon: "bootcamp",
    certLink: "https://drive.google.com/file/d/1Bnu492WqC0Cf1e84VuUIBAmZzbMbqgqx/view",
  },
  {
    title: "Prompt Engineering Fundamentals",
    subtitle: "AI skills",
    detail: "Advanced prompt engineering techniques for ChatGPT",
    type: "certification",
    year: "2024",
    icon: "ai",
    certLink: "https://drive.google.com/file/d/1C7C0aaT0AXgtwASs9z_yFJELhEvOsniQ/view",
  },
  {
    title: "Bitcoin Script Course",
    subtitle: "BSV scripting",
    detail: "Bitcoin Script programming fundamentals",
    type: "certification",
    year: "2024",
    icon: "bitcoin",
    certLink: "https://drive.google.com/file/d/1I7BZbHkmXE-0cw7Whw1W3Oo3PfFUE1Ni/view",
  },
  {
    title: "Java Training",
    subtitle: "Object-oriented programming",
    detail: "Java programming fundamentals",
    type: "certification",
    year: "2023",
    icon: "java",
    certLink: "https://drive.google.com/file/d/1Bu-n1aeLfxBXQDE42H5WRbfPcSnchaxc/view",
  },
  {
    title: "C++ Training",
    subtitle: "Systems programming",
    detail: "C++ programming fundamentals",
    type: "certification",
    year: "2023",
    icon: "cpp",
    certLink: "https://drive.google.com/file/d/1upFH57_SzOE889l2vQryu4Vwdk9vaK74/view",
  },
];

export const education = [
  {
    degree: "MCA — Master of Computer Applications",
    institution: "Savitribai Phule Pune University",
    duration: "2023 – 2025",
    cgpa: "8.10 / 10",
  },
  {
    degree: "BCA — Bachelor of Computer Applications",
    institution: "North Maharashtra University",
    duration: "2020 – 2023",
    cgpa: "9.07 / 10",
  },
];

export const philosophyPillars = [
  {
    keyword: "BUILD",
    description: "Complete features instead of isolated components. Own the full surface.",
  },
  {
    keyword: "TEST",
    description: "Automated testing, API testing, and regression testing. Quality is not optional.",
  },
  {
    keyword: "DEBUG",
    description: "Understand production problems and solve them systematically, not by guessing.",
  },
  {
    keyword: "SHIP",
    description: "Own features from implementation through deployment. Finish what you start.",
  },
  {
    keyword: "LEARN",
    description: "Continuously work across frontend, backend, mobile, blockchain, and AI.",
  },
];
