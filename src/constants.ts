export const BRAND_NAME = 'Pratik Bhawkar'
import profile5 from './assets/profile5.png'

export const CONTACT = {
  email: 'pratik.bhawkar@gmail.com',
  phone: '+91-9890824179',
  location: 'Pune, Maharashtra',
  linkedin: 'https://www.linkedin.com/in/pratikbhawkar/',
  github: 'https://github.com/Pratik-Bhawkar',
}

// Update this to your GitHub username if needed.
export const DEFAULT_GITHUB_USERNAME = 'Pratik-Bhawkar'

// GitHub Personal Access Token - stored in code (not recommended for public repos)
// Better practice: use environment variables or server-side API
// Prefer environment-provided token if available (Vite: VITE_GITHUB_TOKEN). Avoid hardcoding secrets in the repo.
const ENV_GITHUB_TOKEN = (import.meta as any)?.env?.VITE_GITHUB_TOKEN as string | undefined
export const GITHUB_TOKEN = ENV_GITHUB_TOKEN && ENV_GITHUB_TOKEN.trim()
  ? ENV_GITHUB_TOKEN
  : ''

// Use authenticated user endpoint instead of username-based endpoint
// This automatically fetches repos for the token owner
export const GITHUB_REPOS_ENDPOINT = (GITHUB_TOKEN && GITHUB_TOKEN.trim())
  ? 'https://api.github.com/user/repos?sort=updated&per_page=100&affiliation=owner'
  : `https://api.github.com/users/${encodeURIComponent(DEFAULT_GITHUB_USERNAME)}/repos?sort=updated&per_page=100`

export type QuickProfile = {
  label: string
  href: string
  desc?: string
  avatarUrl?: string
  themeColor?: string // hex or tailwind color
}

export const QUICK_PROFILES: QuickProfile[] = [
  {
    label: 'Recruiter',
    href: '#',
    desc: 'Fresher - AI Engineer & Developer',
    avatarUrl: 'data:image/jpeg;base64,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',
    themeColor: '#E50914',
  },
  {
    label: 'Developer',
    href: '#',
    desc: 'Learning & Building Projects',
    avatarUrl: 'data:image/png;base64,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',
    themeColor: '#0074D9',
  },
  {
    label: 'Agent',
    href: '#',
    desc: 'Agent Profile',
    avatarUrl: 'data:image/jpeg;base64,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',
    themeColor: '#2ECC40',
  },
  {
    label: 'Adventure',
    href: '#',
    desc: 'Adventure Profile',
  avatarUrl: profile5,
    themeColor: '#B10DC9',
  },

  // ...other profiles...
]

export type Certification = {
  name: string
  issuer: string
  year?: string // legacy support
  issued?: string // e.g., 'Oct 2025'
  credentialId?: string
  url?: string
}

export const CERTIFICATIONS: Certification[] = [
  {
    name: 'IBM Data Science Fundamentals',
    issuer: 'IBM',
    issued: '2024',
    credentialId: 'f164c7fa-d6e4-4f68-b721-263989f652dc',
    url: 'https://www.credly.com/badges/f164c7fa-d6e4-4f68-b721-263989f652dc/public_url',
  },
  {
    name: 'Python 101 for Data Science',
    issuer: 'Cognitive Class (IBM)',
    issued: '2024',
    credentialId: 'f244db2a24144de2b5cb1efd065f919e',
    url: 'https://courses.cognitiveclass.ai/certificates/f244db2a24144de2b5cb1efd065f919e',
  },
  {
    name: 'Data Analysis Course',
    issuer: 'QSpiders, Deccan, Pune',
    issued: '2023',
    credentialId: '',
    url: '#',
  },
  {
    name: 'AI/ML Development',
    issuer: 'Self-Study & Projects',
    issued: 'Ongoing',
    credentialId: '',
    url: '#',
  },
  {
    name: 'Full-Stack Development',
    issuer: 'Various Platforms',
    issued: 'Ongoing',
    credentialId: '',
    url: '#',
  },
]



export type Project = {
  id: string
  title: string
  subtitle?: string
  tags?: string[]
  href?: string
}

export const PROJECTS: Project[] = [
  { id: 'p1', title: 'WELLNESS-PLATFORM', subtitle: 'AI-Driven Mental Wellness & RAG System', tags: ['Python', 'FastAPI', 'LangChain', 'RAG'], href: 'https://github.com/Pratik-Bhawkar/WELLNESS-PLATFORM' },
  { id: 'p2', title: 'SECURE_PASS', subtitle: 'AI Vehicle Access Control System', tags: ['Python', 'YOLOv8', 'OpenCV', 'FastAPI'], href: 'https://github.com/Pratik-Bhawkar/SECURE_PASS' },
  { id: 'p3', title: 'OPEN_AI-RAG', subtitle: 'Document Processing with RAG', tags: ['Python', 'OpenAI API', 'RAG', 'NLP'], href: 'https://github.com/Pratik-Bhawkar/OPEN_AI-RAG' },
  { id: 'p4', title: 'Python-Games', subtitle: 'Interactive Python Games Collection', tags: ['Python', 'Streamlit', 'Games'], href: 'https://github.com/Pratik-Bhawkar/Python-Games' },
]

export type Experience = {
  role: string
  company: string
  period: string
  summary: string
}

export const EXPERIENCES: Experience[] = [
  {
    role: 'Full-Stack AI Engineer Intern',
    company: 'RoboWaves',
    period: 'Jan 2025 – Jul 2025',
    summary:
      'Worked on AI automation projects using Python, FastAPI, and machine learning APIs. Built backend systems with SQL databases and integrated AI models for real-world applications. Gained hands-on experience with LangChain, RAG pipelines, and prompt engineering.',
  },
  {
    role: 'Backend Developer & AI Enthusiast',
    company: 'Personal Projects',
    period: '2022 – Present',
    summary:
      'Ambitious developer specializing in AI and machine learning with backend technologies. Strong with Python, FastAPI, and databases. Currently learning frontend development while building smart applications. Enjoy creating AI-powered solutions that solve real problems.',
  },
]


export type Education = {
  degree: string
  field: string
  institution: string
  location: string
  period: string
}

export const EDUCATION: Education[] = [
  {
    degree: 'Bachelor of Engineering',
    field: 'Artificial Intelligence and Data Science',
    institution: 'Savitribai Phule Pune University',
    location: 'Pune, India',
    period: '2022 – 2025',
  },
]

export const SKILLS: string[] = [
  'Python',
  'JavaScript',
  'TypeScript',
  'React',
  'Node.js',
  'FastAPI',
  'LangChain',
  'RAG',
  'OpenAI API',
  'YOLOv8',
  'OpenCV',
  'SQL',
  'PostgreSQL',
  'MongoDB',
  'Git',
  'AI/ML',
  'NLP'
]
