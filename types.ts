export enum AgentRole {
  PROJECT_MANAGER = 'PROJECT_MANAGER',
  MARKET_ANALYST = 'MARKET_ANALYST',
  STATISTICS_EXPERT = 'STATISTICS_EXPERT',
  COMPUTATIONAL_BIOLOGIST = 'COMPUTATIONAL_BIOLOGIST',
  MOLECULAR_BIOLOGIST = 'MOLECULAR_BIOLOGIST',
  PROGRAMMER = 'PROGRAMMER',
  LITERATURE_SPECIALIST = 'LITERATURE_SPECIALIST',
  BUSINESS_STRATEGIST = 'BUSINESS_STRATEGIST',
  REGULATORY_EXPERT = 'REGULATORY_EXPERT',
  CLINICIAN = 'CLINICIAN',
  ETHICS_EXPERT = 'ETHICS_EXPERT',
  SUMMARIZER = 'SUMMARIZER',
  CUSTOM = 'CUSTOM'
}

export interface Agent {
  id: string;
  name: string;
  role: AgentRole;
  systemPrompt: string;
  shortDescription: string;
  color: string;
  isActive: boolean;
  avatarInitials: string;
  isCustom?: boolean;
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}

export interface Message {
  id: string;
  agentId: string; // 'user' if from user
  agentName: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
  groundingChunks?: GroundingChunk[];
  isThinking?: boolean;
}

export type ResearchPhase = 'Brainstorm' | 'Hypothesis Generation' | 'Experimental Design' | 'Evaluation' | 'Conclusion';

export interface Objective {
  id: string;
  text: string;
  completed: boolean;
  completedBy?: string; // agent name
  timestamp?: number;
}

export interface ActionItem {
  id: string;
  assigneeName: string;
  task: string;
  status: 'pending' | 'completed';
  timestamp: number;
}

export interface ProjectAlert {
  id: string;
  level: 'info' | 'warning' | 'critical';
  message: string;
  timestamp: number;
}

export interface ProjectState {
  phase: ResearchPhase;
  phaseStartTime: number;
  objectives: Objective[];
  actionItems: ActionItem[];
  alerts: ProjectAlert[];
}

export interface SimulationState {
  currentTopic: string;
  messages: Message[];
  isProcessing: boolean;
  activeProcessingAgentId: string | null;
  projectState: ProjectState;
}