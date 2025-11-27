import React, { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import SettingsPanel from './components/SettingsPanel';
import { BusinessProfile } from './types';
import { DEFAULT_PROFILE } from './constants';
import { Settings, MessageCircle } from 'lucide-react';

const App: React.FC = () => {
  const [profile, setProfile] = useState<BusinessProfile>(DEFAULT_PROFILE);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="relative w-full h-full flex flex-col md:flex-row max-w-6xl mx-auto md:p-6 lg:p-8">
      
      {/* Mobile/Tablet Header & Settings Trigger */}
      <div className="md:hidden bg-slate-900 text-white p-4 flex justify-between items-center shrink-0">
          <div className="flex items-center space-x-2">
            <MessageCircle className="text-indigo-400" />
            <h1 className="font-bold text-lg tracking-tight">Click2Chatt</h1>
          </div>
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors"
          >
            <Settings size={20} />
          </button>
      </div>

      {/* Sidebar Info (Desktop Only) */}
      <div className="hidden md:flex flex-col w-1/3 pr-6 space-y-6 overflow-y-auto">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
             <div className="flex items-center space-x-2">
                <div className="bg-indigo-100 p-2 rounded-lg">
                    <MessageCircle className="text-indigo-600" size={24} />
                </div>
                <div>
                    <h1 className="font-bold text-xl text-slate-900">Click2Chatt</h1>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">AI Receptionist Demo</p>
                </div>
             </div>
          </div>
          <p className="text-slate-600 text-sm mb-6 leading-relaxed">
            I am a context-aware AI designed to handle booking inquiries and lead collection for local service businesses.
          </p>
          
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-lg flex items-center justify-center space-x-2 transition-colors"
          >
            <Settings size={16} />
            <span>Configure Business</span>
          </button>
        </div>

        {/* Current Profile Summary */}
        <div className="bg-slate-100 rounded-xl border border-slate-200 p-6">
           <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Active Profile</h3>
           <div className="space-y-3">
              <div>
                  <div className="text-xs text-slate-500">Business Name</div>
                  <div className="text-sm font-medium text-slate-900">{profile.name}</div>
              </div>
              <div>
                  <div className="text-xs text-slate-500">Industry</div>
                  <div className="text-sm font-medium text-slate-900">{profile.industry}</div>
              </div>
              <div>
                  <div className="text-xs text-slate-500">Services Count</div>
                  <div className="text-sm font-medium text-slate-900">{profile.services.length} services listed</div>
              </div>
           </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 h-full md:h-[800px] relative">
        <ChatInterface profile={profile} />
      </div>

      {/* Settings Modal/Slide-over */}
      <SettingsPanel 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)}
        currentProfile={profile}
        onUpdateProfile={setProfile}
      />

    </div>
  );
};

export default App;
