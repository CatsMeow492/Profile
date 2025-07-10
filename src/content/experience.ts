import { Experience } from '@/types/content';

export const experiences: Experience[] = [
  {
    id: 'lead-fullstack-dod',
    company: 'Department of Defense',
    role: 'Lead Full Stack Developer',
    location: 'Remote',
    startDate: '2024-02',
    endDate: '2025-05',
    duration: '1 year 3 months',
    description: 'Developed high-performance peer-to-peer video conferencing applications and secure data processing systems for defense applications.',
    achievements: [
      'Developed a peer-to-peer video conferencing application using WebRTC, React, and TypeScript, achieving 99.9% uptime in production',
      'Engineered a custom signaling server in Go to manage multi-user video chat coordination, supporting seamless communication for up to 100 concurrent users',
      'Designed a scalable mesh network topology to support N-to-N peer connections, reducing connection latency by 30% and improving overall video call quality',
      'Implemented WebSocket for real-time communication and ICE protocol for NAT traversal, increasing connection success rates by 25%',
      'Spearheaded the development of a secure RESTful API using Node.js and Express, facilitating data exchange for a sensitive data processing application with an encryption layer that enhanced data confidentiality by 50%'
    ],
    technologies: [
      'WebRTC', 'React', 'TypeScript', 'Go', 'WebSocket', 'Node.js', 'Express', 'ICE Protocol', 'Mesh Networks', 'REST APIs'
    ],
    impact: '99.9% uptime in production with 30% latency reduction and 50% enhanced data confidentiality',
    companyUrl: 'https://www.defense.gov'
  },
  {
    id: 'senior-fullstack-usda',
    company: 'USDA',
    role: 'Senior Full Stack Developer - Angular, React, Node, Python',
    location: 'Remote, Missouri',
    startDate: '2022-01',
    endDate: '2024-02',
    duration: '2 years 1 month',
    description: 'Led the design and implementation of scalable, data-driven applications using modern web technologies and cloud infrastructure.',
    achievements: [
      'Led the design and implementation of scalable, data-driven applications, reducing software bugs by 35% and accelerating feature delivery timelines by 20%',
      'Designed and developed microservices using Angular and FastAPI, integrating with AWS Lambda and API Gateway to enable seamless communication between architectural components',
      'Streamlined backend processes by developing Python-based APIs, enhancing system performance and reliability, resulting in a 25% reduction in latency for key workflows',
      'Migrated critical features to a modular architecture using Angular, React, and AWS services, improving maintainability and deployment efficiency by 40%',
      'Engineered end-to-end web solutions leveraging Angular, React, Node, and Python, leading to a 50% increase in user engagement and a 30% boost in application responsiveness'
    ],
    technologies: [
      'Angular', 'React', 'Node.js', 'Python', 'FastAPI', 'AWS Lambda', 'API Gateway', 'AWS', 'TypeScript', 'Microservices'
    ],
    impact: '35% reduction in software bugs, 20% faster feature delivery, and 50% increase in user engagement',
    companyUrl: 'https://www.usda.gov'
  },
  {
    id: 'fullstack-web3-coinbase',
    company: 'Coinbase',
    role: 'Full Stack/Web3 Developer – Solidity, React, Node, AWS',
    location: 'Remote, New York',
    startDate: '2021-05',
    endDate: '2022-12',
    duration: '1 year 7 months',
    description: 'Engineered Web3 decentralized applications and NFT marketplace solutions with advanced security features and blockchain integration.',
    achievements: [
      'Engineered a Web3 dApp with advanced security features, performing in-depth mempool analysis to ensure platform scalability and reliability for high transaction volumes',
      'Directed a team in developing and launching a cutting-edge NFT marketplace using React, Web3.js, and Golang, reducing time-to-market by 30%',
      'Strategized and implemented features that drove a 20% increase in quarterly revenue, enhancing user engagement and marketplace transactions',
      'Architected and deployed smart contracts on Ethereum blockchain using Solidity, leveraging AWS infrastructure to handle over 500,000 transactions monthly, ensuring robust security and scalability for decentralized applications',
      'Configured GraphQL schemas coupled with Ethereum node API, executed through React to streamline data querying processes and optimized server communication'
    ],
    technologies: [
      'Solidity', 'React', 'Node.js', 'AWS', 'Web3.js', 'Golang', 'Ethereum', 'GraphQL', 'Blockchain', 'Smart Contracts'
    ],
    impact: '30% reduction in time-to-market, 20% increase in quarterly revenue, handling 500,000+ transactions monthly',
    companyUrl: 'https://www.coinbase.com'
  },
  {
    id: 'contract-swe-apple',
    company: 'Apple',
    role: 'Contract Software Engineer',
    location: 'Remote',
    startDate: '2020-11',
    endDate: '2021-05',
    duration: '6 months',
    description: 'Architected and deployed end-to-end machine learning pipelines and chatbot workflows with advanced AI integration capabilities.',
    achievements: [
      'Architected and deployed end-to-end machine learning pipelines using open-source tools (e.g., LangChain, Hugging Face, Ray, MLflow), supporting integration of foundation models like OpenAI and Anthropic for real-time inference and fine-tuning',
      'Built modular chatbot workflows with dynamic node-based logic using GraphQL and Node.js, enabling LLM agents to interact with complex data flows and external APIs in real time',
      'Developed CI/CD pipelines for ML models and data services using open-source DevOps stacks (e.g., Docker, GitHub Actions, Terraform, Prometheus), reducing deployment friction and model rollback time by 40%',
      'Designed scalable orchestration patterns that bridge private LLMs and cloud-hosted endpoints (e.g., vLLM, Ollama, SageMaker endpoints), improving security and latency across hybrid deployments',
      'Collaborated closely with ML engineers, frontend developers, and data ops teams to streamline model serving and system observability—cutting integration delays by over 30%'
    ],
    technologies: [
      'LangChain', 'Hugging Face', 'Ray', 'MLflow', 'GraphQL', 'Node.js', 'Docker', 'GitHub Actions', 'Terraform', 'Prometheus', 'OpenAI', 'Anthropic'
    ],
    impact: '40% reduction in deployment friction and rollback time, 30% reduction in integration delays',
    companyUrl: 'https://www.apple.com'
  },
  {
    id: 'fullstack-ai-blockchain',
    company: 'Ai-Blockchain',
    role: 'Full Stack Developer',
    location: 'Remote, California',
    startDate: '2017-12',
    endDate: '2020-11',
    duration: '2 years 11 months',
    description: 'Designed and implemented scalable blockchain-based payment systems with enhanced security and operational efficiency.',
    achievements: [
      'Designed and implemented a scalable architecture for blockchain-based payment systems, enhancing operational efficiency and reducing downtime by 40%',
      'Conducted rigorous code reviews and established best practices for secure smart contract development, preventing vulnerabilities and enhancing code quality',
      'Collaborated with cross-functional teams to integrate blockchain technology with existing payment gateways, streamlining adoption for businesses',
      'Enhanced system reliability through automated testing pipelines, achieving a 90% reduction in critical bugs post-deployment',
      'Spearheaded adoption of emerging blockchain consensus protocols, improving transaction validation speed and network security'
    ],
    technologies: [
      'Blockchain', 'Smart Contracts', 'Solidity', 'Payment Systems', 'Automated Testing', 'Consensus Protocols', 'JavaScript', 'Node.js'
    ],
    impact: '40% reduction in downtime and 90% reduction in critical bugs post-deployment',
    companyUrl: 'https://www.ai-blockchain.com'
  },
  {
    id: 'fullstack-intern-zenbase',
    company: 'Zenbase',
    role: 'Full Stack Developer Intern',
    location: 'Remote',
    startDate: '2016-12',
    endDate: '2017-12',
    duration: '1 year',
    description: 'Implemented rental payment platform features and developed secure smart contracts for blockchain-based meditation platform.',
    achievements: [
      'Implemented a far-reaching rental payment platform feature using React and Node.js, enhancing user experience and increasing transaction efficiency by 25% within three months',
      'Implemented Solidity contracts for a proof of meditation platform, ensuring smart contract security and functionality using industry best practices',
      'Developed smart contracts in Solidity, enhancing gas efficiency through the use of bit manipulation and inline assembly, resulting in a 15% reduction in transaction costs',
      'Utilized modern tools to detect and address security vulnerabilities, enhancing platform security by 40%'
    ],
    technologies: [
      'React', 'Node.js', 'Solidity', 'Smart Contracts', 'Blockchain', 'JavaScript', 'Security Tools', 'Gas Optimization'
    ],
    impact: '25% increase in transaction efficiency, 15% reduction in transaction costs, and 40% enhancement in platform security',
    companyUrl: 'https://www.zenbase.com'
  }
]; 