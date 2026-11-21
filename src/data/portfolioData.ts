export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'web' | 'mobile' | 'ai';
  categoryLabel: string;
  featured: boolean;
  image: string;
  description: string;
  features: string[];
  technologies: string[];
  githubUrl: string;
  demoUrl?: string;
  year: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  summary: string;
  responsibilities: string[];
  skills: string[];
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    level: 'Advanced' | 'Proficient' | 'Familiar';
    category: string;
    highlight?: boolean;
  }[];
}

export interface Education {
  institution: string;
  degree: string;
  focus: string;
  period: string;
  location: string;
  details?: string;
}

export interface PortfolioDataType {
  personal: {
    name: string;
    title: string;
    headline: string;
    email: string;
    location: string;
    phone: string;
    avatar: string;
    resumePdfUrl: string;
    availabilityStatus: string;
    bio: string;
    socials: {
      github: string;
      email: string;
      phone: string;
    };
  };
  metrics: { value: string; label: string; subtext: string }[];
  projects: Project[];
  experiences: Experience[];
  skillCategories: SkillCategory[];
  education: Education[];
}

const contactEmail = (import.meta.env.VITE_CONTACT_EMAIL || '').trim();
const contactPhone = (import.meta.env.VITE_CONTACT_PHONE || '').trim();
const baseUrl = import.meta.env.BASE_URL;

export const portfolioData: PortfolioDataType = {
  personal: {
    name: 'Navaneeth B',
    title: 'Full Stack Developer',
    headline: 'Enthusiastic and detail-oriented full stack developer with a passion for problem-solving and continuous learning.',
    email: contactEmail,
    location: 'Ernakulam, Kerala, India',
    phone: contactPhone,
    avatar: `${baseUrl}assets/aistudio/prof_2b19f010.png`,
    resumePdfUrl: `${baseUrl}Navaneeth_B_Resume.pdf`,
    availabilityStatus: 'Actively seeking Entry-Level Full Stack Developer opportunities',
    bio: 'Enthusiastic and detail-oriented full stack developer with a passion for problem-solving and continuous learning. Seeking an entry-level role where I can contribute to innovative projects and grow in a collaborative team environment. Experienced in MERN stack development, React Native mobile apps, Python/FastAPI backend services, and relational/NoSQL databases.',
    socials: {
      github: 'https://github.com/Navan388',
      email: contactEmail ? `mailto:${contactEmail}` : '',
      phone: contactPhone ? `tel:${contactPhone.replace(/\s+/g, '')}` : '',
    },
  },

  metrics: [
    { value: '2', label: 'Industry Internships', subtext: 'Mobile & Web Full Stack' },
    { value: '3+', label: 'Projects', subtext: 'MERN, FastAPI, Flutter, PHP' },
    { value: '2027', label: 'B.Tech IT Candidate', subtext: 'CUSAT, Kochi' },
    { value: 'Full Stack', label: 'Core Expertise', subtext: 'React, Node.js, Python, MongoDB' },
  ],

  projects: [
    {
      id: 'ai-resume-analyzer',
      title: 'AI Resume Analyzer',
      tagline: 'MERN full-stack application integrated with FastAPI for intelligent resume parsing and job matching',
      category: 'ai',
      categoryLabel: 'AI & Full Stack',
      featured: true,
      image: `${baseUrl}ai_resume_analyzer_mockup.png`,
      description: 'An intelligent web application built with MERN stack on the frontend and backend, combined with a dedicated FastAPI microservice for machine learning and natural language processing.',
      features: [
        'Automated resume parsing to extract candidate information',
        'Skill extraction using NLP and machine learning algorithms',
        'Job-matching scoring engine comparing resumes against job descriptions',
        'Interactive dashboard for candidate insights and job recommendations',
      ],
      technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'FastAPI', 'Python', 'JavaScript'],
      githubUrl: 'https://github.com/Navan388',
      demoUrl: '#contact',
      year: '2026',
    },
    {
      id: 'blood-donor-finder',
      title: 'Blood Donor Finder App',
      tagline: 'Cross-platform mobile application connecting blood donors with recipients during urgent needs',
      category: 'mobile',
      categoryLabel: 'Mobile Application',
      featured: true,
      image: `${baseUrl}blood_donor_finder_mockup.png`,
      description: 'A life-saving mobile utility application developed using Flutter and Firebase to seamlessly connect volunteer blood donors with patients and hospitals in need of emergency blood units.',
      features: [
        'Donor search filtered by specific blood groups and geographical proximity',
        'Emergency blood request broadcasting with instant push notifications',
        'Real-time donor availability status updates and active response tracker',
        'Secure Firebase authentication and real-time database syncing',
      ],
      technologies: ['Flutter', 'Firebase', 'Dart', 'Cloud Firestore', 'Mobile UI'],
      githubUrl: 'https://github.com/Navan388',
      demoUrl: '#contact',
      year: '2026',
    },
    {
      id: 'real-estate-listing',
      title: 'Real Estate Listing System',
      tagline: 'Comprehensive property management web platform enabling seamless buyer-seller interaction',
      category: 'web',
      categoryLabel: 'Web Application',
      featured: false,
      image: `${baseUrl}real_estate_listing_mockup.png`,
      description: 'A responsive, secure web platform developed using PHP, MySQL, HTML, CSS, and JavaScript for seamless property listings, discovery, and customer inquiry management.',
      features: [
        'Detailed property listings with images, amenities, pricing, and specifications',
        'Advanced search and filtering mechanisms for prospective buyers',
        'Inquiry handling system connecting buyers directly with sellers and agents',
        'Responsive and secure web application with structured MySQL database storage',
      ],
      technologies: ['PHP', 'MySQL', 'JavaScript', 'HTML5', 'CSS3'],
      githubUrl: 'https://github.com/Navan388',
      demoUrl: '#contact',
      year: '2025',
    },
  ],

  experiences: [
    {
      id: 'exp-addonez',
      role: 'Mobile Application Development Intern',
      company: 'Addonez Marketplace LLP',
      location: 'Kochi, Kerala',
      period: '2026',
      type: 'Internship',
      summary: 'Engineered cross-platform mobile applications for customers and delivery partners along with a shared cloud-deployed backend.',
      responsibilities: [
        'Developed Customer and Delivery Partner apps using React Native and Expo.',
        'Built a shared backend using Node.js, Express.js, and MongoDB, deployed on Render.',
        'Implemented product browsing, wishlists, cart management, and order & location tracking.',
        'Engineered notification workflows, profile management, delivery routing, and earnings & payment details.',
      ],
      skills: ['React Native', 'Expo', 'Node.js', 'Express.js', 'MongoDB', 'Render', 'JavaScript'],
    },
    {
      id: 'exp-faircode',
      role: 'Web Development Intern',
      company: 'Fair Code Technologies',
      location: 'Kochi, Kerala',
      period: '2025',
      type: 'Internship',
      summary: 'Collaborated in an agile web development team building and testing features for commercial MERN applications.',
      responsibilities: [
        'Collaborated with a team to build and test features for a MERN-based Water Can Delivery website.',
        'Fixed front-end bugs and improved the overall function and usability of the website.',
        'Used online repository and Git version control for continuous team collaboration and branch management.',
      ],
      skills: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript', 'Git', 'HTML/CSS'],
    },
  ],

  skillCategories: [
    {
      title: 'Languages',
      description: 'Core programming and scripting languages',
      skills: [
        { name: 'JavaScript', level: 'Advanced', category: 'Languages', highlight: true },
        { name: 'Python', level: 'Proficient', category: 'Languages', highlight: true },
        { name: 'SQL', level: 'Proficient', category: 'Languages' },
        { name: 'HTML', level: 'Advanced', category: 'Languages' },
        { name: 'CSS', level: 'Advanced', category: 'Languages' },
      ],
    },
    {
      title: 'Tools & Frameworks',
      description: 'Full stack web, mobile, and API development frameworks',
      skills: [
        { name: 'React', level: 'Advanced', category: 'Frontend', highlight: true },
        { name: 'React Native', level: 'Advanced', category: 'Mobile', highlight: true },
        { name: 'Node.js', level: 'Advanced', category: 'Backend', highlight: true },
        { name: 'Express.js', level: 'Advanced', category: 'Backend', highlight: true },
        { name: 'FastAPI', level: 'Proficient', category: 'Backend', highlight: true },
        { name: 'Expo', level: 'Advanced', category: 'Mobile' },
        { name: 'Flutter', level: 'Proficient', category: 'Mobile' },
      ],
    },
    {
      title: 'Databases & Cloud',
      description: 'Data storage, querying, and hosting services',
      skills: [
        { name: 'MongoDB', level: 'Advanced', category: 'NoSQL Database', highlight: true },
        { name: 'MySQL', level: 'Proficient', category: 'Relational Database', highlight: true },
        { name: 'Firebase', level: 'Proficient', category: 'Cloud/BaaS' },
        { name: 'Render', level: 'Proficient', category: 'Cloud Deployment' },
        { name: 'Git & GitHub', level: 'Advanced', category: 'Version Control' },
      ],
    },
  ],

  // Excluded Higher Secondary and Secondary Education as explicitly requested!
  education: [
    {
      institution: 'Cochin University of Science and Technology, Kochi',
      degree: 'Bachelor of Technology in Information Technology',
      focus: 'Information Technology & Software Engineering',
      period: '2023 – 2027',
      location: 'Kochi, Kerala, India',
      details: 'Comprehensive coursework in Data Structures, Object-Oriented Programming, Database Management Systems, Web Technologies, and Software Engineering.',
    },
  ],
};
