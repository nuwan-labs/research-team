import React, { useState } from 'react';
import { Agent, AgentRole } from '../types';

interface AgentSidebarProps {
  agents: Agent[];
  onToggleAgent: (id: string) => void;
  onAddCustomAgent: (agent: Agent) => void;
}

const AgentSidebar: React.FC<AgentSidebarProps> = ({ agents, onToggleAgent, onAddCustomAgent }) => {
  const [showModal, setShowModal] = useState(false);
  const [newAgentName, setNewAgentName] = useState('');
  const [newAgentPrompt, setNewAgentPrompt] = useState('');
  const [newAgentDesc, setNewAgentDesc] = useState('');

  const handleCreateAgent = () => {
    if (!newAgentName || !newAgentPrompt) return;

    const newAgent: Agent = {
      id: `custom-${Date.now()}`,
      name: newAgentName,
      role: AgentRole.CUSTOM,
      systemPrompt: newAgentPrompt,
      shortDescription: newAgentDesc || 'Custom Specialist',
      color: 'bg-pink-600',
      avatarInitials: newAgentName.substring(0, 2).toUpperCase(),
      isActive: true,
      isCustom: true
    };

    onAddCustomAgent(newAgent);
    setShowModal(false);
    setNewAgentName('');
    setNewAgentPrompt('');
    setNewAgentDesc('');
  };

  return (
    <div className="w-80 bg-slate-900 border-r border-slate-700 flex flex-col h-full flex-shrink-0">
      <div className="p-4 border-b border-slate-700">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-science-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Expert Panel
        </h2>
        <p className="text-xs text-slate-400 mt-1">Activate experts to join the session.</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {agents.map((agent) => (
          <div 
            key={agent.id} 
            className={`flex items-start gap-3 p-3 rounded-lg border transition-all duration-200 ${
              agent.isActive 
                ? 'bg-slate-800 border-science-500/50 shadow-md' 
                : 'bg-slate-900 border-slate-800 opacity-60 hover:opacity-100'
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm flex-shrink-0 ${agent.color}`}>
              {agent.avatarInitials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-medium text-white truncate">{agent.name}</h3>
                <input 
                  type="checkbox" 
                  checked={agent.isActive}
                  onChange={() => onToggleAgent(agent.id)}
                  className="mt-1 h-4 w-4 rounded border-slate-600 text-science-600 focus:ring-science-600 bg-slate-700"
                />
              </div>
              <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{agent.shortDescription}</p>
            </div>
          </div>
        ))}

        <button 
          onClick={() => setShowModal(true)}
          className="w-full mt-4 py-3 border-2 border-dashed border-slate-700 rounded-lg text-slate-400 hover:text-science-400 hover:border-science-500/50 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Create Specialist
        </button>
      </div>

      {/* Modal for Custom Agent */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-2xl w-full max-w-md p-6">
            <h3 className="text-lg font-bold text-white mb-4">Design Custom Specialist</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Agent Name</label>
                <input 
                  type="text" 
                  value={newAgentName}
                  onChange={(e) => setNewAgentName(e.target.value)}
                  placeholder="e.g. Metabolic Engineer"
                  className="w-full bg-slate-900 border border-slate-600 rounded-md p-2 text-white text-sm focus:border-science-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Short Description</label>
                <input 
                  type="text" 
                  value={newAgentDesc}
                  onChange={(e) => setNewAgentDesc(e.target.value)}
                  placeholder="e.g. Focuses on flux balance analysis"
                  className="w-full bg-slate-900 border border-slate-600 rounded-md p-2 text-white text-sm focus:border-science-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">System Prompt (Expertise)</label>
                <textarea 
                  value={newAgentPrompt}
                  onChange={(e) => setNewAgentPrompt(e.target.value)}
                  placeholder="Define the agent's expertise, personality, and knowledge base..."
                  className="w-full bg-slate-900 border border-slate-600 rounded-md p-2 text-white text-sm h-32 focus:border-science-500 focus:outline-none resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => setShowModal(false)}
                className="flex-1 py-2 px-4 bg-slate-700 hover:bg-slate-600 text-white rounded-md text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreateAgent}
                className="flex-1 py-2 px-4 bg-science-600 hover:bg-science-500 text-white rounded-md text-sm font-medium transition-colors"
              >
                Create Agent
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentSidebar;