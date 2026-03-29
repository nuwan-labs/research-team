import React, { useState, useRef, useEffect } from 'react';
import { Agent, Message, SimulationState, GroundingChunk, ResearchPhase, ProjectState, ActionItem } from './types';
import { DEFAULT_AGENTS, INITIAL_OBJECTIVES, INITIAL_PHASE } from './constants';
import AgentSidebar from './components/AgentSidebar';
import MessageBubble from './components/MessageBubble';
import ProjectTrackingPanel from './components/ProjectTrackingPanel';
import { generateAgentResponse } from './services/geminiService';

const App: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>(DEFAULT_AGENTS);
  const [input, setInput] = useState('');
  
  // Initial Project State
  const initialProjectState: ProjectState = {
    phase: INITIAL_PHASE,
    phaseStartTime: Date.now(),
    objectives: INITIAL_OBJECTIVES,
    actionItems: [],
    alerts: []
  };

  const [state, setState] = useState<SimulationState>({
    currentTopic: 'New Research Topic',
    messages: [
      {
        id: 'welcome',
        agentId: 'system',
        agentName: 'Orchestrator System',
        role: 'model',
        content: '# Research Cockpit Initialized\n\nWelcome. I am ready to orchestrate your expert panel. \n\n1. Activate the experts you need on the left.\n2. Define your problem or research question below.\n3. Ask specific agents to weigh in, or let the Project Manager guide the discussion.',
        timestamp: Date.now()
      }
    ],
    isProcessing: false,
    activeProcessingAgentId: null,
    projectState: initialProjectState
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.messages, state.isProcessing]);

  // Toggle Agent Active State
  const toggleAgent = (id: string) => {
    setAgents(prev => prev.map(a => 
      a.id === id ? { ...a, isActive: !a.isActive } : a
    ));
  };

  // Add Custom Agent
  const addCustomAgent = (agent: Agent) => {
    setAgents(prev => [...prev, agent]);
  };

  // Logic to parse agent output for signals AND delegations
  const parseAgentSignals = (content: string, speakerName: string, currentState: ProjectState): ProjectState => {
    let newState = { ...currentState };
    let hasChanges = false;
    
    // --- 1. EXISTING SIGNALS ---

    // Parse Phase Change: [PHASE: X]
    const phaseMatch = content.match(/\[PHASE:\s*(.*?)\]/i);
    if (phaseMatch && phaseMatch[1]) {
      const newPhase = phaseMatch[1].trim() as ResearchPhase;
      if (newPhase !== newState.phase) {
        newState.phase = newPhase;
        newState.phaseStartTime = Date.now();
        hasChanges = true;
      }
    }

    // Parse Completed Objective: [COMPLETED: X]
    const completedMatch = content.match(/\[COMPLETED:\s*(.*?)\]/i);
    if (completedMatch && completedMatch[1]) {
      const targetText = completedMatch[1].trim().toLowerCase();
      const objIndex = newState.objectives.findIndex(o => o.text.toLowerCase().includes(targetText) || targetText.includes(o.text.toLowerCase()));
      if (objIndex >= 0 && !newState.objectives[objIndex].completed) {
        newState.objectives[objIndex].completed = true;
        newState.objectives[objIndex].completedBy = speakerName;
        newState.objectives[objIndex].timestamp = Date.now();
        hasChanges = true;
      }
    }

    // Parse New Objective: [NEW_OBJECTIVE: X]
    const newObjMatch = content.match(/\[NEW_OBJECTIVE:\s*(.*?)\]/i);
    if (newObjMatch && newObjMatch[1]) {
      newState.objectives.push({
        id: `obj-${Date.now()}`,
        text: newObjMatch[1].trim(),
        completed: false
      });
      hasChanges = true;
    }

    // Parse Alert: [ALERT: X]
    const alertMatch = content.match(/\[ALERT:\s*(.*?)\]/i);
    if (alertMatch && alertMatch[1]) {
      newState.alerts.push({
        id: `alert-${Date.now()}`,
        level: 'warning',
        message: alertMatch[1].trim(),
        timestamp: Date.now()
      });
      hasChanges = true;
    }

    // --- 2. DELEGATION PARSING ---
    // Look for pattern: * **Agent Name:** Task description
    // Improved Regex explanation:
    // \* matches bullet point
    // \s* matches whitespace
    // \*\* matches bold start
    // (.*?) captures the agent name (non-greedy)
    // (?::)? matches optional colon inside bold
    // \*\* matches bold end
    // :? matches optional colon outside bold
    // \s* matches whitespace
    // (.*) captures the rest of the line as the task
    const delegationRegex = /\*\s*\*\*(.*?)(?::)?\*\*:?\s*(.*)/g;
    let match;
    
    while ((match = delegationRegex.exec(content)) !== null) {
      const assignedTo = match[1].trim();
      const taskDescription = match[2].trim();
      
      // Basic check to ensure it looks like a valid agent name
      if (assignedTo && taskDescription) {
        // Only add if not duplicate (simple check)
        const isDuplicate = newState.actionItems.some(item => 
          item.assigneeName === assignedTo && 
          item.task === taskDescription &&
          item.status === 'pending'
        );

        if (!isDuplicate) {
          newState.actionItems.push({
            id: `act-${Date.now()}-${Math.random()}`,
            assigneeName: assignedTo,
            task: taskDescription,
            status: 'pending',
            timestamp: Date.now()
          });
          hasChanges = true;
        }
      }
    }

    // --- 3. AUTO-COMPLETION LOGIC ---
    // If the CURRENT speaker has pending items assigned to them, mark them as completed
    // because they are likely responding to the task.
    // We check partial matches, e.g., "Statistician" matches "Statistician" or "Statistician (ST)"
    const speakerPendingItems = newState.actionItems.filter(
      item => item.status === 'pending' && 
      (speakerName.toLowerCase().includes(item.assigneeName.toLowerCase()) || 
       item.assigneeName.toLowerCase().includes(speakerName.toLowerCase()))
    );

    if (speakerPendingItems.length > 0) {
      speakerPendingItems.forEach(item => {
        // Find the specific item in the array and update it
        const idx = newState.actionItems.findIndex(i => i.id === item.id);
        if (idx !== -1) {
          newState.actionItems[idx].status = 'completed';
          newState.actionItems[idx].timestamp = Date.now(); // Update timestamp to show when it was done
        }
      });
      hasChanges = true;
    }

    return hasChanges ? newState : currentState;
  };

  // Main interaction handler
  const handleSendMessage = async (overrideInput?: string, specificAgentId?: string) => {
    const content = overrideInput || input;
    if (!content.trim() && !overrideInput) return;

    // 1. Add User Message
    const userMsg: Message = {
      id: `u-${Date.now()}`,
      agentId: 'user',
      agentName: 'User',
      role: 'user',
      content: content,
      timestamp: Date.now()
    };

    let currentHistory = [...state.messages];
    if (content) {
      currentHistory.push(userMsg);
      setInput('');
      setState(prev => ({ 
        ...prev, 
        messages: currentHistory,
        isProcessing: true 
      }));
    } else {
       setState(prev => ({ ...prev, isProcessing: true }));
    }

    // 2. Determine who should respond
    let targetAgent: Agent | undefined;

    if (specificAgentId) {
      targetAgent = agents.find(a => a.id === specificAgentId);
    } else {
      targetAgent = agents.find(a => a.id === 'pm-01' && a.isActive);
      if (!targetAgent) {
        targetAgent = agents.find(a => a.isActive);
      }
    }

    if (!targetAgent) {
      const errorMsg: Message = {
        id: `sys-${Date.now()}`,
        agentId: 'system',
        agentName: 'System',
        role: 'model',
        content: 'No agents are currently active. Please activate an expert from the sidebar.',
        timestamp: Date.now()
      };
      setState(prev => ({
        ...prev,
        messages: [...currentHistory, errorMsg],
        isProcessing: false,
        activeProcessingAgentId: null
      }));
      return;
    }

    setState(prev => ({ ...prev, activeProcessingAgentId: targetAgent!.id }));

    const activeAgents = agents.filter(a => a.isActive);
    
    try {
      const response = await generateAgentResponse(targetAgent, activeAgents, currentHistory);
      
      // Parse signals, passing the CURRENT state to mutate
      // Note: We need to pass the state *after* the user message might have triggered updates (if any), 
      // but here we just pass current state.projectState
      const updatedProjectState = parseAgentSignals(response.text, targetAgent.name, state.projectState);

      const agentMsg: Message = {
        id: `a-${Date.now()}`,
        agentId: targetAgent.id,
        agentName: targetAgent.name,
        role: 'model',
        content: response.text, 
        groundingChunks: response.groundingChunks,
        timestamp: Date.now()
      };

      setState(prev => ({
        ...prev,
        messages: [...currentHistory, agentMsg],
        projectState: updatedProjectState,
        isProcessing: false,
        activeProcessingAgentId: null
      }));

    } catch (e) {
      console.error(e);
      setState(prev => ({ ...prev, isProcessing: false, activeProcessingAgentId: null }));
    }
  };

  const triggerAgent = (agentId: string) => {
    if (state.isProcessing) return;
    const prompt = `[Directing to ${agents.find(a=>a.id===agentId)?.name}]: Based on the discussion so far, please provide your expert analysis.`;
    handleSendMessage(prompt, agentId);
  };

  const handlePhaseChange = (phase: ResearchPhase) => {
    setState(prev => ({
      ...prev,
      projectState: { ...prev.projectState, phase, phaseStartTime: Date.now() }
    }));
  };

  const handleObjectiveToggle = (id: string) => {
    setState(prev => ({
      ...prev,
      projectState: {
        ...prev.projectState,
        objectives: prev.projectState.objectives.map(o => 
          o.id === id ? { ...o, completed: !o.completed, completedBy: !o.completed ? 'User' : undefined } : o
        )
      }
    }));
  };

  const handleAddObjective = (text: string) => {
    setState(prev => ({
      ...prev,
      projectState: {
        ...prev.projectState,
        objectives: [...prev.projectState.objectives, { id: `obj-${Date.now()}`, text, completed: false }]
      }
    }));
  };

  const activeAgents = agents.filter(a => a.isActive);

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden font-sans text-slate-200">
      
      {/* Sidebar */}
      <AgentSidebar 
        agents={agents} 
        onToggleAgent={toggleAgent}
        onAddCustomAgent={addCustomAgent}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full relative min-w-0">
        
        {/* Header */}
        <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur flex items-center px-6 justify-between shrink-0">
          <div className="min-w-0">
            <h1 className="font-semibold text-white tracking-wide truncate">Scientific Orchestrator</h1>
            <p className="text-xs text-slate-400 truncate">Multi-Agent Research Cockpit</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 uppercase font-bold tracking-wider mr-2 hidden md:block">
              Active Panel:
            </span>
            <div className="flex -space-x-2">
              {activeAgents.slice(0, 5).map(a => (
                <div key={a.id} className={`w-8 h-8 rounded-full border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold text-white ${a.color}`} title={a.name}>
                  {a.avatarInitials}
                </div>
              ))}
              {activeAgents.length > 5 && (
                <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center text-[10px] font-bold text-white">
                  +{activeAgents.length - 5}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-2 scroll-smooth">
          {state.messages.map((msg) => {
            const agent = agents.find(a => a.id === msg.agentId) || { color: 'bg-slate-600' };
            return (
              <MessageBubble 
                key={msg.id} 
                message={msg} 
                agentColor={agent.color}
              />
            );
          })}
          
          {state.isProcessing && state.activeProcessingAgentId && (
             <div className="flex w-full justify-start mb-6 animate-pulse">
                <div className="flex max-w-[85%] gap-3">
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm mt-1 bg-slate-700`}>
                     ...
                   </div>
                   <div className="bg-slate-900/50 border border-slate-800 rounded-xl rounded-tl-none p-4 text-sm text-slate-400">
                     {agents.find(a => a.id === state.activeProcessingAgentId)?.name} is researching and formulating a response...
                   </div>
                </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="shrink-0 p-6 bg-slate-900 border-t border-slate-800">
          <div className="flex gap-2 mb-3 overflow-x-auto pb-2 scrollbar-hide">
            <span className="text-xs font-medium text-slate-500 py-1.5 uppercase">Direct Ask:</span>
            {activeAgents.map(agent => (
              <button
                key={agent.id}
                onClick={() => triggerAgent(agent.id)}
                disabled={state.isProcessing}
                className={`text-xs px-3 py-1.5 rounded-full border border-slate-700 bg-slate-800 hover:bg-slate-700 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                   state.isProcessing ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${agent.color}`}></span>
                {agent.name}
              </button>
            ))}
          </div>

          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder={state.isProcessing ? "Panel is discussing..." : "Enter research topic..."}
              disabled={state.isProcessing}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 pr-12 text-sm text-white focus:border-science-500 focus:ring-1 focus:ring-science-500 outline-none resize-none h-24 shadow-inner"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={state.isProcessing || !input.trim()}
              className="absolute bottom-4 right-4 p-2 bg-science-600 hover:bg-science-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel: Project Tracking */}
      <ProjectTrackingPanel 
        projectState={state.projectState}
        agents={agents}
        messages={state.messages}
        onPhaseChange={handlePhaseChange}
        onObjectiveToggle={handleObjectiveToggle}
        onAddObjective={handleAddObjective}
      />
    </div>
  );
};

export default App;