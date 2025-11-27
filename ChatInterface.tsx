import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { BusinessProfile, Message, Sender, AIResponseSchema } from '../types';
import { generateChatResponse } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

interface ChatInterfaceProps {
  profile: BusinessProfile;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ profile }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      text: `Hi there! Thanks for reaching out to ${profile.name}. How can I help you today?`,
      sender: Sender.AI,
      timestamp: Date.now(),
      intent: 'GREETING'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Handle profile change - reset chat or add system note
  useEffect(() => {
    setMessages(prev => [
      ...prev,
      {
        id: `sys-${Date.now()}`,
        text: `*System Note: You are now chatting with ${profile.name}.*`,
        sender: Sender.AI,
        timestamp: Date.now(),
        intent: 'SYSTEM'
      }
    ]);
  }, [profile.name]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      text: inputValue,
      sender: Sender.USER,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response: AIResponseSchema = await generateChatResponse(messages, userMsg.text, profile);
      
      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        text: response.reply,
        sender: Sender.AI,
        timestamp: Date.now(),
        intent: response.intent
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      const errorMsg: Message = {
        id: `err-${Date.now()}`,
        text: "I'm sorry, I encountered a temporary error. Please try again.",
        sender: Sender.AI,
        timestamp: Date.now(),
        intent: 'ERROR'
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-xl overflow-hidden border border-slate-200">
      {/* Header */}
      <div className="bg-slate-900 text-white p-4 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center">
            <Bot size={24} className="text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-lg">{profile.name}</h2>
            <div className="flex items-center space-x-1 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span>Online • Replies instantly</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((msg) => {
          const isUser = msg.sender === Sender.USER;
          const isSystem = msg.intent === 'SYSTEM';

          if (isSystem) {
             return (
                 <div key={msg.id} className="flex justify-center my-4">
                     <span className="text-xs font-medium text-slate-400 bg-slate-100 px-3 py-1 rounded-full">{msg.text.replace(/\*/g, '')}</span>
                 </div>
             )
          }

          return (
            <div
              key={msg.id}
              className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[85%] md:max-w-[75%] ${isUser ? 'flex-row-reverse space-x-reverse' : 'flex-row'} space-x-2`}>
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1 ${isUser ? 'bg-indigo-600' : 'bg-slate-200'}`}>
                   {isUser ? <User size={16} className="text-white" /> : <Sparkles size={16} className="text-slate-600" />}
                </div>
                
                <div className="flex flex-col">
                  <div
                    className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      isUser
                        ? 'bg-indigo-600 text-white rounded-tr-none'
                        : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'
                    }`}
                  >
                    <ReactMarkdown className="prose prose-sm prose-invert break-words">
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                  {msg.intent && !isUser && (
                     <span className="text-[10px] text-slate-400 mt-1 ml-1 uppercase tracking-wider font-medium">
                       {msg.intent.replace('_', ' ')}
                     </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex w-full justify-start animate-pulse">
             <div className="flex max-w-[80%] flex-row space-x-2">
                <div className="shrink-0 w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center mt-1">
                   <Sparkles size={16} className="text-slate-600" />
                </div>
                <div className="px-4 py-3 rounded-2xl rounded-tl-none bg-white border border-slate-100 flex items-center space-x-1">
                   <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                   <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                   <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100 shrink-0">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-3 outline-none transition-all"
            disabled={isTyping}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className={`p-3 rounded-lg flex items-center justify-center transition-colors ${
              !inputValue.trim() || isTyping
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md'
            }`}
          >
            {isTyping ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
          </button>
        </div>
        <div className="text-center mt-2">
            <span className="text-[10px] text-slate-400">
                Click2Chatt can make mistakes. Please verify important details.
            </span>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
