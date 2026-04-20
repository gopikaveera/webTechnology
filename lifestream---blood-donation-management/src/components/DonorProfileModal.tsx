import React, { useState } from 'react';
import { X, Droplets, MapPin, User, Check } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import { updateUserProfile } from '../services/userService';

interface DonorProfileModalProps {
  onClose: () => void;
}

export default function DonorProfileModal({ onClose }: DonorProfileModalProps) {
  const { user, userProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    bloodGroup: userProfile?.bloodGroup || 'O+',
    location: userProfile?.location || '',
    isAvailable: userProfile?.isAvailable ?? true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    try {
      await updateUserProfile(user.uid, formData);
      onClose();
    } catch (error) {
      console.error("Update profile failed:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-natural-ink/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 border border-natural-border">
        <div className="p-8 border-b border-natural-border flex justify-between items-center bg-natural-bg">
          <div>
            <h2 className="text-2xl font-light text-natural-ink">Donor <span className="serif-italic">Registration</span></h2>
            <p className="text-[10px] font-bold uppercase tracking-widest text-natural-muted">Set your availability in the regional network</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors border border-natural-border shadow-sm">
            <X className="w-5 h-5 text-natural-muted" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-natural-muted flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-natural-primary" />
                Full Name
              </label>
              <div className="w-full bg-natural-secondary/30 border border-natural-border rounded-xl px-4 py-3 text-sm font-medium text-natural-muted">
                {user?.displayName || 'N/A'}
              </div>
            </div>

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
                <MapPin className="w-3.5 h-3.5 text-natural-primary" />
                Your Location
              </label>
              <input 
                required
                placeholder="e.g. Los Angeles, CA"
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
                className="w-full bg-natural-bg border border-natural-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-natural-primary text-sm font-medium"
              />
            </div>

            <div className="flex items-center gap-3 p-4 bg-natural-bg rounded-2xl border border-natural-border">
                <input 
                    type="checkbox" 
                    id="isAvailable"
                    checked={formData.isAvailable}
                    onChange={e => setFormData({...formData, isAvailable: e.target.checked})}
                    className="w-5 h-5 text-natural-primary rounded focus:ring-natural-primary"
                />
                <label htmlFor="isAvailable" className="text-sm font-medium text-natural-ink">
                    I am currently available for donation
                </label>
            </div>
          </div>

          <button 
            disabled={loading}
            className="w-full bg-natural-primary text-white py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-opacity-90 transition-all shadow-lg shadow-natural-primary/20 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? "Updating Profile..." : (
                <>
                <Check className="w-4 h-4" />
                Save Donor Details
                </>
            )}
          </button>
          
          <p className="text-[10px] text-center text-natural-muted font-bold uppercase tracking-tighter">
            By saving, you agree to be visible to verified medical seekers.
          </p>
        </form>
      </div>
    </div>
  );
}
