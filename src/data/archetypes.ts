export interface Profession {
  id: string;
  name: string;
  description: string;
  bonus: string;
  bonusType: 'skill' | 'currency' | 'passive' | 'ability' | 'discount';
  bonusValue?: any;
}

export interface Archetype {
  id: string;
  name: string;
  description: string;
  skillTree: 'architect' | 'ghost' | 'sentinel';
  color: string;
  professions: Profession[];
}

export const ARCHETYPES: Archetype[] = [
  {
    id: 'netrunner',
    name: 'Netrunner',
    description: 'The Coder/Analyst - Master of code and data manipulation',
    skillTree: 'architect',
    color: 'from-blue-500 to-cyan-500',
    professions: [
      {
        id: 'malware-analyst',
        name: 'Malware Analyst',
        description: 'Deconstruct the enemy\'s code',
        bonus: 'Starts with Code Decompiler skill unlocked',
        bonusType: 'skill',
        bonusValue: 'code-decompiler',
      },
      {
        id: 'exploit-developer',
        name: 'Exploit Developer',
        description: 'Turn vulnerabilities into weapons',
        bonus: '+5 Data Fragments head start',
        bonusType: 'currency',
        bonusValue: { data_fragments: 5 },
      },
      {
        id: 'app-sec-engineer',
        name: 'Application Security Engineer',
        description: 'Secure code from the inside out',
        bonus: 'Starts with Exploit Pattern Recognition unlocked',
        bonusType: 'skill',
        bonusValue: 'exploit-pattern-recognition',
      },
      {
        id: 'cryptographer',
        name: 'Cryptographer',
        description: 'Master of secrets and ciphers',
        bonus: '+5% brute-force and decryption speed boost',
        bonusType: 'passive',
        bonusValue: { decryption_speed: 1.05 },
      },
      {
        id: 'security-software-dev',
        name: 'Security Software Developer',
        description: 'Build the tools of the trade',
        bonus: '10% discount on all tool purchases',
        bonusType: 'discount',
        bonusValue: { tool_discount: 0.10 },
      },
    ],
  },
  {
    id: 'ghost',
    name: 'Ghost',
    description: 'The Infiltrator/Red Teamer - Master of stealth and deception',
    skillTree: 'ghost',
    color: 'from-red-500 to-pink-500',
    professions: [
      {
        id: 'penetration-tester',
        name: 'Penetration Tester',
        description: 'Find the cracks in the armor',
        bonus: 'Enhanced enumeration tools reveal extra details',
        bonusType: 'passive',
        bonusValue: { enumeration_bonus: true },
      },
      {
        id: 'red-team-operator',
        name: 'Red Team Operator',
        description: 'Simulate the adversary',
        bonus: '+5 Exploit Shards head start',
        bonusType: 'currency',
        bonusValue: { exploit_shards: 5 },
      },
      {
        id: 'social-engineer',
        name: 'Social Engineer',
        description: 'Hack the human element',
        bonus: 'Starts with Social Engineering Matrix unlocked',
        bonusType: 'skill',
        bonusValue: 'social-engineering-matrix',
      },
      {
        id: 'cloud-security-specialist',
        name: 'Cloud Security Specialist',
        description: 'Conquer the new frontier',
        bonus: '1 hour free cloud lab time per month',
        bonusType: 'ability',
        bonusValue: { cloud_lab_hours: 1 },
      },
      {
        id: 'security-consultant',
        name: 'Security Consultant',
        description: 'The hired gun',
        bonus: '+5% bonus to all GridCoin rewards',
        bonusType: 'passive',
        bonusValue: { gridcoin_bonus: 1.05 },
      },
    ],
  },
  {
    id: 'architect',
    name: 'Architect',
    description: 'The Defender/Blue Teamer - Master of defense and forensics',
    skillTree: 'sentinel',
    color: 'from-cyan-500 to-blue-500',
    professions: [
      {
        id: 'soc-analyst',
        name: 'SOC Analyst',
        description: 'The watcher on the wall',
        bonus: 'Starts with Threat Intelligence Feed unlocked',
        bonusType: 'skill',
        bonusValue: 'threat-intelligence-feed',
      },
      {
        id: 'digital-forensics',
        name: 'Digital Forensics Investigator',
        description: 'Reconstruct the crime',
        bonus: 'Starts with Forensic Imager unlocked',
        bonusType: 'skill',
        bonusValue: 'forensic-imager',
      },
      {
        id: 'incident-responder',
        name: 'Incident Responder',
        description: 'The first line of defense',
        bonus: 'Unlocks special Host Isolation ability',
        bonusType: 'ability',
        bonusValue: { host_isolation: true },
      },
      {
        id: 'threat-hunter',
        name: 'Threat Hunter',
        description: 'Find the ghost in the machine',
        bonus: '+5 Signature Keys head start',
        bonusType: 'currency',
        bonusValue: { signature_keys: 5 },
      },
      {
        id: 'security-architect',
        name: 'Security Architect',
        description: 'Design the fortress',
        bonus: '5% discount on defensive tool upgrades',
        bonusType: 'discount',
        bonusValue: { defensive_discount: 0.05 },
      },
    ],
  },
];
