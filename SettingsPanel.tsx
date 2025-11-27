import React from 'react';
import { BusinessProfile } from '../types';
import { SAMPLE_PROFILES } from '../constants';
import { Building2, X, AlertTriangle } from 'lucide-react';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: BusinessProfile;
  onUpdateProfile: (profile: BusinessProfile) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ isOpen, onClose, currentProfile, onUpdateProfile }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 bg-black/20 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl p-6 overflow-y-auto animate-in slide-in-from-right duration-300">
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center">
            <Building2 className="mr-2 text-indigo-600" />
            Business Configuration
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Quick Load Templates */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Quick Load Template</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onUpdateProfile(SAMPLE_PROFILES.barber)}
                className={`p-3 border rounded-lg text-sm text-left transition-all ${
                  currentProfile.name === SAMPLE_PROFILES.barber.name 
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                  : 'border-slate-200 hover:border-indigo-300'
                }`}
              >
                <div className="font-medium">Barbershop</div>
                <div className="text-xs text-slate-500 mt-1">Appointments & Services</div>
              </button>
              <button
                onClick={() => onUpdateProfile(SAMPLE_PROFILES.mechanic)}
                className={`p-3 border rounded-lg text-sm text-left transition-all ${
                    currentProfile.name === SAMPLE_PROFILES.mechanic.name 
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                    : 'border-slate-200 hover:border-indigo-300'
                  }`}
              >
                <div className="font-medium">Mobile Mechanic</div>
                <div className="text-xs text-slate-500 mt-1">Travels to customer</div>
              </button>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Edit Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Business Name</label>
              <input 
                type="text" 
                value={currentProfile.name}
                onChange={(e) => onUpdateProfile({...currentProfile, name: e.target.value})}
                className="w-full border border-slate-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Industry</label>
              <input 
                type="text" 
                value={currentProfile.industry}
                onChange={(e) => onUpdateProfile({...currentProfile, industry: e.target.value})}
                className="w-full border border-slate-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Services (One per line)</label>
              <textarea 
                rows={5}
                value={currentProfile.services.join('\n')}
                onChange={(e) => onUpdateProfile({...currentProfile, services: e.target.value.split('\n')})}
                className="w-full border border-slate-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

             <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Pricing Strategy</label>
              <input 
                type="text" 
                value={currentProfile.pricing}
                onChange={(e) => onUpdateProfile({...currentProfile, pricing: e.target.value})}
                className="w-full border border-slate-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start space-x-3">
             <AlertTriangle className="text-amber-500 shrink-0" size={20} />
             <p className="text-xs text-amber-800 leading-relaxed">
                Changes update the AI's "brain" immediately. The next message you send will use this new context.
             </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
