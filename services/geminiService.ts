import { GoogleGenAI, Tool } from "@google/genai";
import { Agent, Message, GroundingChunk, AgentRole } from "../types";

// Helper to clean environment variable
const getApiKey = (): string => {
  const key = process.env.API_KEY;
  if (!key) {
    console.error("API_KEY is missing from environment variables.");
    return "";
  }
  return key;
};

// Determine model based on agent complexity
const getModelForAgent = (role: AgentRole): string => {
  switch (role) {
    case AgentRole.STATISTICS_EXPERT:
    case AgentRole.COMPUTATIONAL_BIOLOGIST:
    case AgentRole.PROGRAMMER:
    case AgentRole.CLINICIAN:
    case AgentRole.REGULATORY_EXPERT:
    case AgentRole.LITERATURE_SPECIALIST:
    // Complex reasoning tasks & Deep research
      return 'gemini-3-pro-preview';
    default:
    // Standard tasks & General knowledge
      return 'gemini-3-flash-preview';
  }
};

// Determine tools based on agent role
const getToolsForAgent = (role: AgentRole): Tool[] => {
  const tools: Tool[] = [];
  
  // Web Search - Available to most except purely internal processors
  // Summarizer strictly synthesizes context.
  if (role !== AgentRole.SUMMARIZER) {
    tools.push({ googleSearch: {} });
  }

  // Code Execution - Exclusive to specific roles
  if (
    role === AgentRole.STATISTICS_EXPERT ||
    role === AgentRole.COMPUTATIONAL_BIOLOGIST ||
    role === AgentRole.PROGRAMMER
  ) {
    tools.push({ codeExecution: {} });
  }

  return tools;
};

export const generateAgentResponse = async (
  targetAgent: Agent,
  otherActiveAgents: Agent[],
  messageHistory: Message[]
): Promise<{ text: string; groundingChunks: GroundingChunk[] }> => {
  
  const apiKey = getApiKey();
  if (!apiKey) throw new Error("API Key not found");

  const ai = new GoogleGenAI({ apiKey });

  // 1. Construct the "Orchestration Context"
  const activeAgentNames = otherActiveAgents
    .filter(a => a.id !== targetAgent.id)
    .map(a => `${a.name} (${a.shortDescription})`)
    .join(", ");

  const systemInstruction = `
    [SYSTEM CONTEXT: SCIENTIFIC ORCHESTRATION]
    You are participating in a multi-agent specialized research panel.
    
    YOUR IDENTITY: ${targetAgent.name}
    
    YOUR ROLE & TOOLKIT:
    ${targetAgent.systemPrompt}
    
    OTHER ACTIVE EXPERTS: ${activeAgentNames || "None. You are currently the only active expert."}
    
    COLLABORATION RULES:
    1. STICK TO YOUR LANE. Use your exclusive tools (simulated or real). Do not attempt tasks listed in your "CANNOT DO" list.
    2. DELEGATE. If a user asks for something outside your domain, explicitly ask the relevant expert (if active) or suggest the user activate them.
    3. CITE SOURCES. Always provide URLs or citations when stating facts.
    4. INTERACT. Respond to the last message, but consider the whole context.
    5. FORMAT DELEGATION. When assigning a task, requesting specific info, or recording an action item, you MUST use this bullet point format:
       * **Target Agent Name:** Task description
       
       Example:
       * **Statistician:** Calculate power analysis for n=30.
       * **Market Analyst:** Check competitors in South East Asia.
  `;

  // 2. Format History
  // We take the last 15 messages to keep context window managed.
  const recentHistory = messageHistory.slice(-15);
  
  let conversationScript = "";
  recentHistory.forEach(msg => {
    conversationScript += `${msg.agentName.toUpperCase()}: ${msg.content}\n\n`;
  });

  const prompt = `[TRANSCRIPT OF CURRENT DISCUSSION]\n${conversationScript}\n\n[YOUR TURN]\n${targetAgent.name}:`;

  // 3. Configure Tools & Model
  const tools = getToolsForAgent(targetAgent.role);
  const model = getModelForAgent(targetAgent.role);

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        tools: tools,
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    // 4. Extract Text and Grounding
    const text = response.text || "I apologize, I could not generate a response.";
    
    const groundingChunks: GroundingChunk[] = 
      response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    return { text, groundingChunks };

  } catch (error) {
    console.error("Gemini API Error:", error);
    return { 
      text: "I encountered an error while processing your request. Please check your API key and connection.", 
      groundingChunks: [] 
    };
  }
};