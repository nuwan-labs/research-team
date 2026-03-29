import React from 'react';
import { Message, GroundingChunk } from '../types';

interface MessageBubbleProps {
  message: Message;
  agentColor?: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, agentColor = 'bg-slate-600' }) => {
  const isUser = message.role === 'user';

  // Format the text to handle basic Markdown-like structure (bullet points, bold)
  // Since we aren't using a markdown library, we do a basic render with whitespace
  
  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
      <div className={`flex max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'} gap-3`}>
        
        {/* Avatar */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm flex-shrink-0 mt-1 ${isUser ? 'bg-indigo-500' : agentColor}`}>
          {isUser ? 'ME' : message.agentName.substring(0, 2).toUpperCase()}
        </div>

        {/* Bubble */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          <div className="flex items-center gap-2 mb-1">
             <span className="text-xs font-bold text-slate-300">
               {message.agentName}
             </span>
             <span className="text-[10px] text-slate-500">
               {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
             </span>
          </div>
          
          <div className={`rounded-xl p-4 text-sm leading-relaxed whitespace-pre-wrap shadow-sm ${
            isUser 
              ? 'bg-indigo-600 text-white rounded-tr-none' 
              : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-none'
          }`}>
            {message.isThinking ? (
               <div className="flex items-center gap-2 text-slate-400 italic">
                 <svg className="animate-spin h-4 w-4 text-science-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                 </svg>
                 Analyzing context & researching...
               </div>
            ) : (
              message.content
            )}
          </div>

          {/* Grounding / Citations */}
          {!message.isThinking && message.groundingChunks && message.groundingChunks.length > 0 && (
            <div className="mt-2 pl-1 max-w-full overflow-hidden">
               <p className="text-[10px] uppercase font-bold text-slate-500 mb-1 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                </svg>
                 Sources & References
               </p>
               <div className="flex flex-wrap gap-2">
                 {message.groundingChunks.map((chunk, idx) => chunk.web?.uri ? (
                   <a 
                    key={idx}
                    href={chunk.web.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[10px] bg-slate-900 border border-slate-700 text-science-500 px-2 py-1 rounded hover:bg-slate-800 hover:border-science-500/30 transition-colors"
                   >
                     <span className="truncate max-w-[150px]">{chunk.web.title || chunk.web.uri}</span>
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                      </svg>
                   </a>
                 ) : null)}
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;