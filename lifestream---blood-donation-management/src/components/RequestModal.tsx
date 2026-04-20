import { X, Droplets, MapPin, Hospital, Info } from 'lucide-react';
import { useState } from 'react';
import React from 'react';
import { createBloodRequest } from '../services/bloodRequestService';

interface RequestModalProps {
  onClose: () => void;
}

export default function RequestModal({ onClose }: RequestModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    bloodGroup: 'O+',
    hospitalName: '',
    location: '',
    urgency: 'Normal' as 'Critical' | 'Urgent' | 'Normal',
    reason: '',
    unitsNeeded: 1
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createBloodRequest(formData);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to create request. Please ensure you are logged in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-natural-ink/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 border border-natural-border">
        <div className="p-8 border-b border-natural-border flex justify-between items-center bg-natural-bg">
          <div>
            <h2 className="text-2xl font-light text-natural-ink">Request <span className="serif-italic">Blood</span></h2>
            <p className="text-[10px] font-bold uppercase tracking-widest text-natural-muted">Syncing to regional care network</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors border border-natural-border shadow-sm">
            <X className="w-5 h-5 text-natural-muted" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-natural-muted flex items-center gap-2">
                <Droplets className="w-3.5 h-3.5 text-natural-primary" />
                Blood Group
              </label>
              <select 
                value={formData.bloodGroup}
                onChange={e => setFormData({...formData, bloodGroup: e.target.value})}
                className="w-full bg-natural-bg border border-natural-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-natural-primary text-sm font-medium"
              >
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(group => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-natural-muted flex items-center gap-2">
                <Info className="w-3.5 h-3.5 text-natural-primary" />
                Urgency
              </label>
              <select 
                 value={formData.urgency}
                 onChange={e => setFormData({...formData, urgency: e.target.value as any})}
                 className="w-full bg-natural-bg border border-natural-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-natural-primary text-sm font-medium"
              >
                <option value="Normal">Normal</option>
                <option value="Urgent">Urgent</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-natural-muted flex items-center gap-2">
              <Hospital className="w-3.5 h-3.5 text-natural-primary" />
              Hospital Name
            </label>
            <input 
              required
              placeholder="e.g. City Medical Center"
              value={formData.hospitalName}
              onChange={e => setFormData({...formData, hospitalName: e.target.value})}
              className="w-full bg-natural-bg border border-natural-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-natural-primary text-sm font-medium"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-natural-muted flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-natural-primary" />
              Location / Area
            </label>
            <input 
              required
              placeholder="e.g. Manhattan, NY"
              value={formData.location}
              onChange={e => setFormData({...formData, location: e.target.value})}
              className="w-full bg-natural-bg border border-natural-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-natural-primary text-sm font-medium"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-natural-muted flex items-center gap-2">
              Reason / Message
            </label>
            <textarea 
              placeholder="Briefly explain the requirement..."
              value={formData.reason}
              onChange={e => setFormData({...formData, reason: e.target.value})}
              className="w-full bg-natural-bg border border-natural-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-natural-primary text-sm font-medium h-24 resize-none"
            />
          </div>

          <button 
            disabled={loading}
            className="w-full bg-natural-primary text-white py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-opacity-90 transition-all shadow-lg shadow-natural-primary/20 disabled:opacity-50"
          >
            {loading ? "Syncing Request..." : "Broadcast Request"}
          </button>
        </form>
      </div>
    </div>
  );
}
