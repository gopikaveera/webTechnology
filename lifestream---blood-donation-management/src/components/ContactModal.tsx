import React, { useEffect, useState } from 'react';
import { X, Phone, Mail, User, Hospital, MapPin, ExternalLink, MessageCircle } from 'lucide-react';
import { BloodRequest } from '../services/bloodRequestService';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { motion } from 'motion/react';

interface ContactModalProps {
  request: BloodRequest;
  onClose: () => void;
}

export default function ContactModal({ request, onClose }: ContactModalProps) {
  const [requesterProfile, setRequesterProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'users', request.requesterId));
        if (userDoc.exists()) {
          setRequesterProfile(userDoc.data());
        }
      } catch (err) {
        console.error("Error fetching requester profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [request.requesterId]);

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-natural-ink/60 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden border border-natural-border"
      >
        <div className="p-8 border-b border-natural-border bg-natural-bg relative">
          <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-white rounded-full transition-colors border border-natural-border shadow-sm">
            <X className="w-5 h-5 text-natural-muted" />
          </button>
          
          <div className="flex items-center gap-4 mb-4">
             <div className="w-14 h-14 bg-natural-primary text-white rounded-2xl flex items-center justify-center font-bold text-2xl shadow-lg shadow-natural-primary/20">
               {request.bloodGroup}
             </div>
             <div>
               <h2 className="text-2xl font-light text-natural-ink">Contact <span className="serif-italic">Requester</span></h2>
               <p className="text-[10px] font-bold uppercase tracking-widest text-natural-muted">Case ID: {request.id?.slice(0, 8)}</p>
             </div>
          </div>
        </div>

        <div className="p-8 space-y-6">
          {/* Hospital Details */}
          <div className="bg-natural-bg p-5 rounded-3xl border border-natural-border-light space-y-3">
             <div className="flex items-center gap-3 text-natural-ink">
                <Hospital className="w-4 h-4 text-natural-primary" />
                <span className="text-sm font-semibold">{request.hospitalName}</span>
             </div>
             <div className="flex items-center gap-3 text-natural-muted">
                <MapPin className="w-4 h-4 text-natural-primary" />
                <span className="text-xs font-medium uppercase tracking-widest">{request.location}</span>
             </div>
          </div>

          {/* Requester Info */}
          <div className="space-y-4">
             <label className="text-[10px] font-bold uppercase tracking-widest text-natural-muted block mb-2 px-1">Receiver Information</label>
             
             <div className="flex items-center justify-between p-4 bg-white border border-natural-border rounded-2xl shadow-sm">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-natural-secondary flex items-center justify-center">
                      <User className="w-5 h-5 text-natural-primary" />
                   </div>
                   <div>
                      <p className="text-xs font-bold text-natural-muted uppercase tracking-tighter">Person in Charge</p>
                      <p className="text-sm font-semibold text-natural-ink">{request.requesterName}</p>
                   </div>
                </div>
             </div>

             {loading ? (
                <div className="h-20 animate-pulse bg-natural-bg rounded-2xl" />
             ) : requesterProfile ? (
                 <div className="space-y-3">
                    <a 
                      href={`mailto:${requesterProfile.email}`} 
                      className="flex items-center justify-between p-4 bg-white border border-natural-border rounded-2xl hover:bg-natural-bg transition-colors group"
                    >
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                             <Mail className="w-5 h-5 text-blue-500" />
                          </div>
                          <div>
                             <p className="text-xs font-bold text-natural-muted uppercase tracking-tighter">Email Address</p>
                             <p className="text-sm font-semibold text-natural-ink">{requesterProfile.email}</p>
                          </div>
                       </div>
                       <ExternalLink className="w-4 h-4 text-natural-border group-hover:text-natural-primary transition-colors" />
                    </a>

                    <button className="w-full flex items-center gap-3 p-4 bg-[#e8f5e9]/50 border border-[#a5d6a7]/50 rounded-2xl hover:bg-[#c8e6c9] transition-colors">
                        <div className="w-10 h-10 rounded-full bg-[#4caf50] flex items-center justify-center">
                           <MessageCircle className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-left">
                           <p className="text-xs font-bold text-[#2e7d32] uppercase tracking-tighter">Direct Connect</p>
                           <p className="text-sm font-semibold text-[#1b5e20]">Open Chat Interface</p>
                        </div>
                    </button>
                 </div>
             ) : (
                <div className="p-4 bg-orange-50 border border-orange-100 rounded-2xl text-center">
                   <p className="text-xs text-orange-700 font-medium italic">Detailed contact profile hidden for privacy. Join or Login to view full details.</p>
                </div>
             )}
          </div>

          <p className="text-[9px] text-center text-natural-muted font-bold uppercase tracking-widest pt-4">
             Always verify hospital identity before arrival.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
