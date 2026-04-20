import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { MapPin, Clock, ArrowRight, Droplets as Blood, Droplets, Heart, Search, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AuthProvider, useAuth } from './lib/AuthContext';
import { useEffect, useState } from 'react';
import { BloodRequest, subscribeToRequests } from './services/bloodRequestService';
import RequestModal from './components/RequestModal';
import DonorProfileModal from './components/DonorProfileModal';
import ContactModal from './components/ContactModal';
import { loginWithGoogle } from './lib/firebase';

function AppContent() {
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDonorModalOpen, setIsDonorModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<BloodRequest | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const unsubscribe = subscribeToRequests((newRequests) => {
      setRequests(newRequests);
    });
    return () => unsubscribe();
  }, []);

  const handleBecomeDonor = async () => {
    if (!user) {
      try {
        await loginWithGoogle();
        // After login, AuthContext will update and we can open the modal
        setIsDonorModalOpen(true);
      } catch (err) {
        console.error("Login failed:", err);
      }
    } else {
      setIsDonorModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-natural-bg">
      <Navbar />
      <Hero 
        onOpenModal={() => setIsModalOpen(true)} 
        onBecomeDonor={handleBecomeDonor} 
      />

      <AnimatePresence>
        {isModalOpen && <RequestModal onClose={() => setIsModalOpen(false)} />}
        {isDonorModalOpen && <DonorProfileModal onClose={() => setIsDonorModalOpen(false)} />}
        {selectedRequest && <ContactModal request={selectedRequest} onClose={() => setSelectedRequest(null)} />}
      </AnimatePresence>

      {/* Statistics Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-[32px] shadow-natural-card border border-natural-border-light">
              <p className="text-[10px] font-bold text-natural-muted uppercase tracking-widest mb-1">Available Units</p>
              <p className="text-3xl font-semibold text-natural-ink">1,248 <span className="text-sm font-normal text-natural-primary">ml</span></p>
              <div className="mt-4 h-1 w-full bg-natural-border rounded-full overflow-hidden">
                <div className="h-full bg-natural-primary w-[72%]"></div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-[32px] shadow-natural-card border border-natural-border-light">
              <p className="text-[10px] font-bold text-natural-muted uppercase tracking-widest mb-1">Active Donors</p>
              <p className="text-3xl font-semibold text-natural-ink">842</p>
              <p className="text-[10px] text-natural-success font-bold mt-2 uppercase">+12 since yesterday</p>
            </div>
            <div className="bg-white p-6 rounded-[32px] shadow-natural-card border border-natural-border-light">
              <p className="text-[10px] font-bold text-natural-muted uppercase tracking-widest mb-1">Weekly Targets</p>
              <p className="text-3xl font-semibold text-natural-primary">94%</p>
              <p className="text-[10px] text-natural-muted mt-2 font-bold uppercase tracking-tighter">Near completion</p>
            </div>
            <div className="bg-natural-ink p-6 rounded-[32px] text-white shadow-xl">
              <p className="text-[10px] font-bold text-natural-muted uppercase tracking-widest mb-1">Registry Health</p>
              <p className="text-xl font-light leading-snug mt-2">Server: <span className="text-natural-success">Online</span><br/>DB: <span className="text-natural-success">Connected</span></p>
            </div>
          </div>
        </div>
      </section>

      {/* Active Requests */}
      <section className="py-24 bg-[#fcfaf7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-light mb-2 text-natural-ink">Urgent <span className="serif-italic">Requests</span></h2>
              <p className="text-natural-muted font-medium">The database is syncing in real-time.</p>
            </div>
            <button className="hidden sm:flex items-center gap-2 text-natural-primary font-bold text-xs uppercase tracking-widest hover:gap-3 transition-all">
              View All Activity <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {requests.length > 0 ? (
              requests.map((request) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={request.id} 
                  className="bg-white p-8 rounded-[40px] border border-natural-border-light shadow-natural-card group transition-all hover:-translate-y-1"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-natural-secondary text-natural-primary rounded-2xl flex items-center justify-center font-bold text-xl group-hover:bg-natural-primary group-hover:text-white transition-colors border border-natural-border">
                        {request.bloodGroup}
                      </div>
                      <div>
                        <h3 className="font-semibold text-natural-ink">{request.hospitalName}</h3>
                        <p className="text-xs font-bold text-natural-muted uppercase tracking-widest">{request.location}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-[10px] font-bold rounded-md ${
                      request.urgency === 'Critical' ? 'bg-[#f9ebeb] text-[#d64545]' : 'bg-orange-50 text-orange-600'
                    }`}>
                      {request.urgency.toUpperCase()}
                    </span>
                  </div>
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-2 text-xs font-medium text-natural-muted">
                      <MapPin className="w-3.5 h-3.5 text-natural-primary" />
                      {request.location}
                    </div>
                    {request.reason && (
                       <p className="text-sm text-natural-ink opacity-70 serif-italic">"{request.reason}"</p>
                    )}
                  </div>
                  <button 
                    onClick={() => setSelectedRequest(request)}
                    className="w-full bg-natural-bg border border-natural-border text-natural-ink py-3 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-natural-primary hover:text-white hover:border-natural-primary transition-all shadow-sm"
                  >
                    Contact Now
                  </button>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center bg-white rounded-[40px] border border-dashed border-natural-border shadow-sm">
                <Droplets className="w-12 h-12 text-natural-border mx-auto mb-4" />
                <p className="text-natural-muted font-bold uppercase tracking-widest text-xs">No active requests logged</p>
                <button onClick={() => setIsModalOpen(true)} className="mt-4 text-natural-primary font-bold text-sm underline underline-offset-4">Post new requirement</button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
       <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 text-natural-ink">
            <h2 className="text-4xl font-light mb-4">Why use <span className="serif-italic">LifeStream?</span></h2>
            <p className="text-lg text-natural-muted max-w-2xl mx-auto">Streamlined donation pipelines with secure encryption and regional coordination.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: Droplets, title: "Regional Inventory", desc: "Real-time blood bank mapping across all partner hospitals and regional care centers." },
              { icon: Heart, title: "Donor Badges", desc: "Verified donor status marks contributors with distinctive credentials in the registry." },
              { icon: Search, title: "Secure Search", desc: "Advanced lookups protected by encrypted auth layers and regional permission systems." }
            ].map((feature, i) => (
              <div key={i} className="text-center group">
                <div className="w-16 h-16 bg-natural-secondary text-natural-primary rounded-full flex items-center justify-center mx-auto mb-8 border border-natural-border transition-transform group-hover:scale-110">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-natural-ink mb-4">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-natural-muted">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-natural-border">
        <div className="max-w-7xl mx-auto px-10 flex flex-col md:flex-row items-center justify-between text-[10px] uppercase tracking-[2px] font-bold text-natural-muted">
           <div className="flex items-center gap-3 mb-4 md:mb-0">
             <div className="w-6 h-6 bg-natural-primary rounded-full flex items-center justify-center">
               <Blood className="w-4 h-4 text-white" />
             </div>
             <span>LifeStream Management</span>
           </div>
           
           <div className="flex gap-8 mb-4 md:mb-0">
             <a href="#" className="hover:text-natural-primary">Donors</a>
             <a href="#" className="hover:text-natural-primary">Requests</a>
             <a href="#" className="hover:text-natural-primary">Privacy</a>
           </div>

           <div>© {new Date().getFullYear()} LifeStream · Secure Env</div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}


