import React, { useMemo } from 'react';
import { Agent, Message, ProjectState, ResearchPhase, Objective } from '../types';

interface ProjectTrackingPanelProps {
  projectState: ProjectState;
  agents: Agent[];
  messages: Message[];
  onPhaseChange: (phase: ResearchPhase) => void;
  onObjectiveToggle: (id: string) => void;
  onAddObjective: (text: string) => void;
}

const PHASES: ResearchPhase[] = [
  'Brainstorm',
  'Hypothesis Generation',
  'Experimental Design',
  'Evaluation',
  'Conclusion'
];

const ProjectTrackingPanel: React.FC<ProjectTrackingPanelProps> = ({
  projectState,
  agents,
  messages,
  onPhaseChange,
  onObjectiveToggle,
  onAddObjective
}) => {
  const [newObjective, setNewObjective] = React.useState('');

  // --- METRICS CALCULATIONS ---
  const metrics = useMemo(() => {
    // ... (existing metrics calculation logic kept simple for brevity if unchanged, but included below fully for safety)
    const totalMessages = messages.length;
    
    // Participation Balance
    const counts: Record<string, number> = {};
    const activeAgents = agents.filter(a => a.isActive);
    activeAgents.forEach(a => counts[a.id] = 0);
    messages.filter(m => m.role === 'model').forEach(m => {
      if (counts[m.agentId] !== undefined) {
        counts[m.agentId]++;
      }
    });
    
    const totalModelMessages = messages.filter(m => m.role === 'model').length;
    const participation = activeAgents.map(a => ({
      agent: a,
      count: counts[a.id] || 0,
      percentage: totalModelMessages > 0 ? ((counts[a.id] || 0) / totalModelMessages) * 100 : 0
    }));

    // Message Velocity (msgs last 5 mins)
    const fiveMinsAgo = Date.now() - 5 * 60 * 1000;
    const recentMessages = messages.filter(m => m.timestamp > fiveMinsAgo).length;

    // Rigor Score
    let rigorSum = 0;
    const scoredMessages = messages.filter(m => m.role === 'model').slice(-10); 
    scoredMessages.forEach(m => {
      let score = Math.min((m.content.length / 500) * 50, 50); 
      if (m.groundingChunks && m.groundingChunks.length > 0) score += 30; 
      rigorSum += score;
    });
    const rigorScore = scoredMessages.length > 0 ? Math.round(rigorSum / scoredMessages.length) : 0; 

    return { participation, recentMessages, rigorScore };
  }, [messages, agents]);

  const currentPhaseIndex = PHASES.indexOf(projectState.phase);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newObjective.trim()) {
      onAddObjective(newObjective.trim());
      setNewObjective('');
    }
  };

  const handleExport = () => {
    const report = `PROJECT STATUS REPORT\nPhase: ${projectState.phase}\n\nObjectives:\n${projectState.objectives.map(o => `- [${o.completed ? 'X' : ' '}] ${o.text}`).join('\n')}\n\nAction Items:\n${projectState.actionItems.map(a => `- [${a.status}] ${a.assigneeName}: ${a.task}`).join('\n')}`;
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'research-status.txt';
    a.click();
  };

  const pendingActions = projectState.actionItems.filter(a => a.status === 'pending');
  const completedActions = projectState.actionItems.filter(a => a.status === 'completed');

  return (
    <div className="w-96 bg-slate-900 border-l border-slate-700 flex flex-col h-full flex-shrink-0 overflow-y-auto custom-scrollbar">
      
      {/* 1. HEADER & PHASE INDICATOR */}
      <div className="p-5 border-b border-slate-800">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Mission Control</h2>
          <button 
            onClick={handleExport}
            className="text-xs text-science-500 hover:text-science-400 font-medium"
          >
            Export Report
          </button>
        </div>

        <div className="mb-2">
          <div className="text-2xl font-bold text-white mb-1">{projectState.phase}</div>
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-science-500 animate-pulse"></span>
            Active Phase • {Math.floor((Date.now() - projectState.phaseStartTime) / 60000)}m elapsed
          </div>
        </div>

        {/* Stepper */}
        <div className="flex gap-1 mt-4">
          {PHASES.map((phase, idx) => (
            <div 
              key={phase}
              onClick={() => { if(confirm(`Switch phase to ${phase}?`)) onPhaseChange(phase); }}
              className={`h-1.5 rounded-full flex-1 cursor-pointer transition-all ${
                idx <= currentPhaseIndex 
                  ? 'bg-science-500' 
                  : 'bg-slate-700 hover:bg-slate-600'
              }`}
              title={phase}
            />
          ))}
        </div>
      </div>

      {/* 2. OBJECTIVES */}
      <div className="p-5 border-b border-slate-800">
        <h3 className="text-xs font-bold text-slate-500 uppercase mb-3 flex justify-between">
          Objectives
          <span className="text-slate-400">{projectState.objectives.filter(o => o.completed).length}/{projectState.objectives.length}</span>
        </h3>
        
        <div className="space-y-2.5">
          {projectState.objectives.map((obj) => (
            <div key={obj.id} className="group flex items-start gap-3">
              <input 
                type="checkbox"
                checked={obj.completed}
                onChange={() => onObjectiveToggle(obj.id)}
                className="mt-1 h-4 w-4 rounded border-slate-600 text-science-600 bg-slate-800 focus:ring-science-600 cursor-pointer"
              />
              <div className="flex-1 min-w-0">
                <p className={`text-sm leading-tight transition-all ${obj.completed ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
                  {obj.text}
                </p>
                {obj.completed && obj.completedBy && (
                   <span className="text-[10px] text-science-500/80 mt-0.5 block">Completed by {obj.completedBy}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleAddSubmit} className="mt-4 flex gap-2">
          <input 
            type="text" 
            value={newObjective}
            onChange={(e) => setNewObjective(e.target.value)}
            placeholder="+ Add objective"
            className="flex-1 bg-slate-950 border border-slate-700 rounded px-2 py-1.5 text-xs text-white focus:border-science-500 outline-none"
          />
        </form>
      </div>

      {/* 3. ACTION ITEMS / DELEGATION */}
      <div className="p-5 border-b border-slate-800 min-h-[150px]">
        <h3 className="text-xs font-bold text-slate-500 uppercase mb-3">
          Delegated Tasks
        </h3>
        
        {projectState.actionItems.length === 0 ? (
          <p className="text-xs text-slate-600 italic">No active tasks delegated...</p>
        ) : (
          <div className="space-y-3">
            {/* Pending */}
            {pendingActions.map((action) => (
              <div key={action.id} className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-2.5 border-l-2 border-l-amber-500">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wide">Pending • {action.assigneeName}</span>
                  <span className="text-[10px] text-slate-500">{new Date(action.timestamp).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</span>
                </div>
                <p className="text-xs text-slate-300 leading-snug">{action.task}</p>
              </div>
            ))}

            {/* Completed */}
            {completedActions.slice(-3).map((action) => (
              <div key={action.id} className="opacity-60 bg-slate-900 border border-slate-800 rounded-lg p-2.5 border-l-2 border-l-emerald-700">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide line-through">Done • {action.assigneeName}</span>
                </div>
                <p className="text-xs text-slate-500 leading-snug line-through">{action.task}</p>
              </div>
            ))}
            
            {completedActions.length > 3 && (
               <p className="text-[10px] text-slate-600 text-center italic">+{completedActions.length - 3} older completed tasks</p>
            )}
          </div>
        )}
      </div>

      {/* 4. ALERTS & HEALTH */}
      <div className="p-5 bg-slate-950/30">
        
        {/* Alerts */}
        {projectState.alerts.length > 0 && (
          <div className="mb-6 space-y-2">
             {projectState.alerts.map(alert => (
               <div key={alert.id} className={`p-3 rounded border text-xs ${
                 alert.level === 'critical' ? 'bg-red-900/20 border-red-800 text-red-300' :
                 alert.level === 'warning' ? 'bg-amber-900/20 border-amber-800 text-amber-300' :
                 'bg-blue-900/20 border-blue-800 text-blue-300'
               }`}>
                 <strong className="block uppercase text-[10px] mb-0.5 tracking-wider">{alert.level}</strong>
                 {alert.message}
               </div>
             ))}
          </div>
        )}

        <h3 className="text-xs font-bold text-slate-500 uppercase mb-4">Panel Health</h3>
        
        {/* Velocity */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs text-slate-400">Velocity (5m)</span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono font-bold text-white">{metrics.recentMessages}</span>
            <span className="text-[10px] text-slate-600">msgs</span>
          </div>
        </div>
        
        {/* Rigor/Focus */}
        <div className="mb-4">
           <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs text-slate-400">Rigor Score</span>
            <span className={`text-xs font-bold ${metrics.rigorScore > 70 ? 'text-emerald-400' : metrics.rigorScore > 40 ? 'text-amber-400' : 'text-red-400'}`}>
              {metrics.rigorScore}%
            </span>
          </div>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
             <div 
               className={`h-full rounded-full transition-all duration-500 ${metrics.rigorScore > 70 ? 'bg-emerald-500' : metrics.rigorScore > 40 ? 'bg-amber-500' : 'bg-red-500'}`} 
               style={{ width: `${metrics.rigorScore}%` }}
             />
          </div>
        </div>

        {/* Participation */}
        <div className="space-y-2">
           <span className="text-xs text-slate-400 block mb-2">Agent Balance</span>
           <div className="flex h-2 w-full rounded-full overflow-hidden bg-slate-800">
             {metrics.participation.map(p => (
               <div 
                 key={p.agent.id}
                 className={`h-full ${p.agent.color}`}
                 style={{ width: `${p.percentage}%` }}
                 title={`${p.agent.name}: ${Math.round(p.percentage)}%`}
               />
             ))}
           </div>
           <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
             {metrics.participation.filter(p => p.percentage > 0).map(p => (
               <div key={p.agent.id} className="flex items-center gap-1.5">
                 <div className={`w-1.5 h-1.5 rounded-full ${p.agent.color}`}></div>
                 <span className="text-[10px] text-slate-400">{p.agent.avatarInitials}</span>
               </div>
             ))}
           </div>
        </div>

      </div>
    </div>
  );
};

export default ProjectTrackingPanel;