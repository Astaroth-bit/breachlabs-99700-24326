export type AugmentationBranch = 'architect' | 'ghost' | 'sentinel' | 'gridrunner';
export type AugmentationPath = 'none' | 'exploit_dev' | 'malware_analyst' | 'network_infiltrator' | 'covert_ops' | 'threat_hunter' | 'incident_responder';

export interface Augmentation {
  id: string;
  name: string;
  description: string;
  benefit: string;
  tier: number;
  branch: AugmentationBranch;
  path: AugmentationPath;
  apCost: number;
  specialCurrencyCost?: {
    type: 'data_fragments' | 'exploit_shards' | 'signature_keys';
    amount: number;
  };
  requires?: string[]; // IDs of prerequisite augmentations
}

export const AUGMENTATIONS: Record<AugmentationBranch, Augmentation[]> = {
  architect: [
    // Tier 1-3 (No specialization)
    {
      id: 'arch_t1_syntax',
      name: 'Syntax Prediction',
      description: 'An entry-level augment that caches common command structures.',
      benefit: 'Enables smart autocomplete in terminal challenges',
      tier: 1,
      branch: 'architect',
      path: 'none',
      apCost: 1,
    },
    {
      id: 'arch_t2_decompiler',
      name: 'Code Decompiler',
      description: 'Integrates a lightweight decompiler into your interface.',
      benefit: 'Unlocks Basic Static Analysis objectives',
      tier: 2,
      branch: 'architect',
      path: 'none',
      apCost: 1,
      requires: ['arch_t1_syntax'],
    },
    {
      id: 'arch_t3_pattern',
      name: 'Exploit Pattern Recognition',
      description: 'Your co-processor is loaded with a massive database of exploit patterns.',
      benefit: 'Activates Vulnerability Scanner tool',
      tier: 3,
      branch: 'architect',
      path: 'none',
      apCost: 1,
      requires: ['arch_t2_decompiler'],
    },
    // Path A: Exploit Developer
    {
      id: 'arch_t5_memory_mapper',
      name: 'Memory Mapper',
      description: 'Provides a real-time visualization of a process\'s memory layout.',
      benefit: 'Unlocks Memory View panel for ASLR bypass',
      tier: 5,
      branch: 'architect',
      path: 'exploit_dev',
      apCost: 1,
      specialCurrencyCost: { type: 'data_fragments', amount: 3 },
      requires: ['arch_t3_pattern'],
    },
    {
      id: 'arch_t6_rop_synth',
      name: 'ROP Chain Synthesizer',
      description: 'Automatically scans binaries for useful ROP gadgets.',
      benefit: 'Accelerates ROP chain building',
      tier: 6,
      branch: 'architect',
      path: 'exploit_dev',
      apCost: 1,
      specialCurrencyCost: { type: 'data_fragments', amount: 5 },
      requires: ['arch_t5_memory_mapper'],
    },
    {
      id: 'arch_t7_quantum_crypt',
      name: 'Quantum Cryptanalysis',
      description: 'The pinnacle of computational power for brute-force attacks.',
      benefit: 'Unlocks Decrypter tool for Master-level missions',
      tier: 7,
      branch: 'architect',
      path: 'exploit_dev',
      apCost: 2,
      specialCurrencyCost: { type: 'data_fragments', amount: 10 },
      requires: ['arch_t6_rop_synth'],
    },
    // Path B: Malware Analyst
    {
      id: 'arch_t5_sandbox',
      name: 'Dynamic Sandbox',
      description: 'A virtualized environment to safely execute and observe malware.',
      benefit: 'Unlocks Detonate in Sandbox option',
      tier: 5,
      branch: 'architect',
      path: 'malware_analyst',
      apCost: 1,
      specialCurrencyCost: { type: 'data_fragments', amount: 3 },
      requires: ['arch_t3_pattern'],
    },
    {
      id: 'arch_t6_unpacker',
      name: 'Heuristic Unpacker',
      description: 'Automatically unpack common malware packers like UPX.',
      benefit: 'Saves time in reverse engineering challenges',
      tier: 6,
      branch: 'architect',
      path: 'malware_analyst',
      apCost: 1,
      specialCurrencyCost: { type: 'data_fragments', amount: 5 },
      requires: ['arch_t5_sandbox'],
    },
    {
      id: 'arch_t7_polymorphic',
      name: 'Polymorphic Code Engine',
      description: 'Allows you to understand and create shape-shifting code.',
      benefit: 'Required for advanced malware analysis',
      tier: 7,
      branch: 'architect',
      path: 'malware_analyst',
      apCost: 2,
      specialCurrencyCost: { type: 'data_fragments', amount: 10 },
      requires: ['arch_t6_unpacker'],
    },
  ],
  ghost: [
    // Tier 1-3 (No specialization)
    {
      id: 'ghost_t1_log_scrubber',
      name: 'Log Scrubber v1.0',
      description: 'Basic log manipulation capabilities.',
      benefit: 'Reduces detection chance in stealth missions by 20%',
      tier: 1,
      branch: 'ghost',
      path: 'none',
      apCost: 1,
    },
    {
      id: 'ghost_t2_social_eng',
      name: 'Social Engineering Matrix',
      description: 'Psychology-based manipulation techniques.',
      benefit: 'Increases phishing success rate by 30%',
      tier: 2,
      branch: 'ghost',
      path: 'none',
      apCost: 1,
      requires: ['ghost_t1_log_scrubber'],
    },
    {
      id: 'ghost_t3_net_imperson',
      name: 'Network Impersonation Protocol',
      description: 'Spoof network identities and MAC addresses.',
      benefit: 'Unlocks MAC spoofing and ARP poisoning tools',
      tier: 3,
      branch: 'ghost',
      path: 'none',
      apCost: 1,
      requires: ['ghost_t2_social_eng'],
    },
    // Path A: Network Infiltrator
    {
      id: 'ghost_t5_edr_bypass',
      name: 'EDR Bypass Module',
      description: 'Techniques to evade Endpoint Detection & Response.',
      benefit: 'Unlocks stealthier process injection',
      tier: 5,
      branch: 'ghost',
      path: 'network_infiltrator',
      apCost: 1,
      specialCurrencyCost: { type: 'exploit_shards', amount: 3 },
      requires: ['ghost_t3_net_imperson'],
    },
    {
      id: 'ghost_t6_c2_weaver',
      name: 'Malleable C2 Weaver',
      description: 'Craft custom C2 profiles to mimic legitimate traffic.',
      benefit: 'Required for Expert-level Red Team ops',
      tier: 6,
      branch: 'ghost',
      path: 'network_infiltrator',
      apCost: 1,
      specialCurrencyCost: { type: 'exploit_shards', amount: 5 },
      requires: ['ghost_t5_edr_bypass'],
    },
    {
      id: 'ghost_t7_chameleon',
      name: 'Grid Chameleon Protocol',
      description: 'Alter event logs in real-time for ultimate stealth.',
      benefit: 'Unlocks Legendary difficulty Heists',
      tier: 7,
      branch: 'ghost',
      path: 'network_infiltrator',
      apCost: 2,
      specialCurrencyCost: { type: 'exploit_shards', amount: 10 },
      requires: ['ghost_t6_c2_weaver'],
    },
    // Path B: Covert Ops Specialist
    {
      id: 'ghost_t5_vocal_mod',
      name: 'Vocal Modulator',
      description: 'Real-time voice modulation for vishing attacks.',
      benefit: 'Unlocks Vishing contract type',
      tier: 5,
      branch: 'ghost',
      path: 'covert_ops',
      apCost: 1,
      specialCurrencyCost: { type: 'exploit_shards', amount: 3 },
      requires: ['ghost_t3_net_imperson'],
    },
    {
      id: 'ghost_t6_phys_infil',
      name: 'Physical Infiltration Suite',
      description: 'Techniques for physical pretexting and lock picking.',
      benefit: 'Unlocks physical infiltration missions',
      tier: 6,
      branch: 'ghost',
      path: 'covert_ops',
      apCost: 1,
      specialCurrencyCost: { type: 'exploit_shards', amount: 5 },
      requires: ['ghost_t5_vocal_mod'],
    },
    {
      id: 'ghost_t7_psych_warfare',
      name: 'Psychological Warfare Engine',
      description: 'AI-driven engine for perfect phishing lures.',
      benefit: 'Nearly 100% phishing success rate',
      tier: 7,
      branch: 'ghost',
      path: 'covert_ops',
      apCost: 2,
      specialCurrencyCost: { type: 'exploit_shards', amount: 10 },
      requires: ['ghost_t6_phys_infil'],
    },
  ],
  sentinel: [
    // Tier 1-3 (No specialization)
    {
      id: 'sentinel_t1_forensic',
      name: 'Forensic Imager',
      description: 'Create bit-perfect copies of evidence.',
      benefit: 'Unlocks forensic investigation capabilities',
      tier: 1,
      branch: 'sentinel',
      path: 'none',
      apCost: 1,
    },
    {
      id: 'sentinel_t2_threat_intel',
      name: 'Threat Intelligence Feed',
      description: 'Real-time threat intelligence integration.',
      benefit: 'Provides IOC database access',
      tier: 2,
      branch: 'sentinel',
      path: 'none',
      apCost: 1,
      requires: ['sentinel_t1_forensic'],
    },
    {
      id: 'sentinel_t3_anomaly',
      name: 'Anomaly Detection Engine',
      description: 'ML-powered behavioral anomaly detection.',
      benefit: 'Highlights suspicious network activity',
      tier: 3,
      branch: 'sentinel',
      path: 'none',
      apCost: 1,
      requires: ['sentinel_t2_threat_intel'],
    },
    // Path A: Threat Hunter
    {
      id: 'sentinel_t5_endpoint_query',
      name: 'Endpoint Query Engine',
      description: 'Hunt for IOCs across thousands of hosts.',
      benefit: 'Required for large-scale threat hunting',
      tier: 5,
      branch: 'sentinel',
      path: 'threat_hunter',
      apCost: 1,
      specialCurrencyCost: { type: 'signature_keys', amount: 3 },
      requires: ['sentinel_t3_anomaly'],
    },
    {
      id: 'sentinel_t6_yara_gen',
      name: 'YARA Rule Generator',
      description: 'AI-assisted YARA rule creation.',
      benefit: 'Create high-fidelity detection rules',
      tier: 6,
      branch: 'sentinel',
      path: 'threat_hunter',
      apCost: 1,
      specialCurrencyCost: { type: 'signature_keys', amount: 5 },
      requires: ['sentinel_t5_endpoint_query'],
    },
    {
      id: 'sentinel_t7_deception_grid',
      name: 'Automated Deception Grid',
      description: 'Deploy dynamic honeypots to trap attackers.',
      benefit: 'Powerful defensive strategy for Grid Wars',
      tier: 7,
      branch: 'sentinel',
      path: 'threat_hunter',
      apCost: 2,
      specialCurrencyCost: { type: 'signature_keys', amount: 10 },
      requires: ['sentinel_t6_yara_gen'],
    },
    // Path B: Incident Responder
    {
      id: 'sentinel_t5_mem_forensics',
      name: 'Memory Forensics Suite',
      description: 'Deep memory analysis for fileless malware.',
      benefit: 'Perform memory forensics in challenges',
      tier: 5,
      branch: 'sentinel',
      path: 'incident_responder',
      apCost: 1,
      specialCurrencyCost: { type: 'signature_keys', amount: 3 },
      requires: ['sentinel_t3_anomaly'],
    },
    {
      id: 'sentinel_t6_containment',
      name: 'Network Containment Protocol',
      description: 'Surgically isolate compromised hosts.',
      benefit: 'Critical for Blue Team in Grid Wars',
      tier: 6,
      branch: 'sentinel',
      path: 'incident_responder',
      apCost: 1,
      specialCurrencyCost: { type: 'signature_keys', amount: 5 },
      requires: ['sentinel_t5_mem_forensics'],
    },
    {
      id: 'sentinel_t7_immunization',
      name: 'Mainframe Immunization Protocol',
      description: 'Generate network-wide signatures from novel attacks.',
      benefit: 'Game-changing defensive ability',
      tier: 7,
      branch: 'sentinel',
      path: 'incident_responder',
      apCost: 2,
      specialCurrencyCost: { type: 'signature_keys', amount: 10 },
      requires: ['sentinel_t6_containment'],
    },
  ],
  gridrunner: [
    // Linear path (no specialization)
    {
      id: 'grid_t1_lab_subsidy',
      name: 'Lab Time Subsidy',
      description: 'Corporate sponsorship for extended lab access.',
      benefit: '+2 hours free lab time per day',
      tier: 1,
      branch: 'gridrunner',
      path: 'none',
      apCost: 1,
    },
    {
      id: 'grid_t2_econ_optimizer',
      name: 'Economic Optimizer',
      description: 'Algorithmic trading on The Grid\'s markets.',
      benefit: '+15% GridCoin rewards',
      tier: 2,
      branch: 'gridrunner',
      path: 'none',
      apCost: 1,
      requires: ['grid_t1_lab_subsidy'],
    },
    {
      id: 'grid_t3_black_market',
      name: 'Black Market Access',
      description: 'Connections to underground vendors.',
      benefit: 'Unlocks rare tools and wordlists',
      tier: 3,
      branch: 'gridrunner',
      path: 'none',
      apCost: 1,
      requires: ['grid_t2_econ_optimizer'],
    },
    {
      id: 'grid_t4_syndicate_comms',
      name: 'Syndicate Comms Channel',
      description: 'Direct line to The Grid\'s elite operators.',
      benefit: 'Access to exclusive contracts',
      tier: 4,
      branch: 'gridrunner',
      path: 'none',
      apCost: 2,
      requires: ['grid_t3_black_market'],
    },
    {
      id: 'grid_t5_mainframe_link',
      name: 'Mainframe Priority Link',
      description: 'High-bandwidth connection to Breach Labs mainframe.',
      benefit: 'Free lab resets (1/day) + Beta access',
      tier: 5,
      branch: 'gridrunner',
      path: 'none',
      apCost: 2,
      requires: ['grid_t4_syndicate_comms'],
    },
    {
      id: 'grid_t6_rep_broker',
      name: 'Reputation Broker',
      description: 'Master The Grid\'s political landscape.',
      benefit: '+15% reputation gains with all factions',
      tier: 6,
      branch: 'gridrunner',
      path: 'none',
      apCost: 2,
      requires: ['grid_t5_mainframe_link'],
    },
    {
      id: 'grid_t7_grid_architect',
      name: 'Grid Architect',
      description: 'Access to challenge creation tools.',
      benefit: 'Create and share custom challenges',
      tier: 7,
      branch: 'gridrunner',
      path: 'none',
      apCost: 3,
      requires: ['grid_t6_rep_broker'],
    },
  ],
};

export const getBranchColor = (branch: AugmentationBranch): string => {
  switch (branch) {
    case 'architect':
      return 'from-blue-500 to-cyan-500';
    case 'ghost':
      return 'from-red-500 to-orange-500';
    case 'sentinel':
      return 'from-cyan-500 to-teal-500';
    case 'gridrunner':
      return 'from-purple-500 to-pink-500';
  }
};

export const getBranchTextColor = (branch: AugmentationBranch): string => {
  switch (branch) {
    case 'architect':
      return 'text-blue-400';
    case 'ghost':
      return 'text-red-400';
    case 'sentinel':
      return 'text-cyan-400';
    case 'gridrunner':
      return 'text-purple-400';
  }
};
