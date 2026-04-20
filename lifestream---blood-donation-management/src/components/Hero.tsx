import { Droplets, Heart, Search, Users } from 'lucide-react';
import { motion } from 'motion/react';

export default function Hero({ onOpenModal, onBecomeDonor }: { onOpenModal: () => void, onBecomeDonor: () => void }) {
  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-natural-bg">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-natural-border rounded-full blur-3xl opacity-30 -z-10" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[400px] h-[400px] bg-natural-primary rounded-full blur-3xl opacity-10 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-natural-secondary text-natural-primary text-[10px] font-bold uppercase tracking-widest mb-6 border border-natural-border">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-natural-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-natural-primary"></span>
              </span>
              Real-time Database Sync Active
            </div>
            <h1 className="text-5xl lg:text-7xl font-light text-natural-ink leading-tight mb-6">
              Every Drop <span className="serif-italic">Saves</span> a Life.
            </h1>
            <p className="text-lg text-natural-muted mb-10 leading-relaxed max-w-xl">
              LifeStream connects blood donors with people in urgent need. Join our community of lifesavers and make an impact today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={onBecomeDonor}
                className="bg-natural-primary text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-opacity-90 transition-all shadow-lg shadow-natural-primary/20 flex items-center justify-center gap-2"
              >
                <Heart className="w-5 h-5 fill-current" />
                Become a Donor
              </button>
              <button 
                onClick={onOpenModal}
                className="bg-white text-natural-ink border border-natural-border px-8 py-4 rounded-full font-medium text-lg hover:bg-natural-bg transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Search className="w-5 h-5" />
                Request Blood
              </button>
            </div>

            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src={`https://picsum.photos/seed/user${i}/100/100`}
                    alt="User"
                    className="w-12 h-12 rounded-full border-4 border-natural-bg object-cover"
                    referrerPolicy="no-referrer"
                  />
                ))}
                <div className="w-12 h-12 rounded-full border-4 border-natural-bg bg-natural-secondary text-natural-muted flex items-center justify-center font-bold text-xs">
                  1k+
                </div>
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-natural-muted">
                <span className="text-natural-ink">1,240+</span> active lifesavors
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-[3rem] overflow-hidden shadow-natural-card border border-natural-border relative">
              <img
                src="https://images.unsplash.com/photo-1615461066841-6116ecaaba7f?auto=format&fit=crop&q=80&w=1000"
                alt="Blood Donation"
                className="w-full h-full object-cover grayscale-[20%]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-natural-ink/20 to-transparent" />
            </div>

            {/* Floating stats card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-[32px] shadow-natural-card border border-natural-border-light max-w-[200px]">
              <div className="w-10 h-10 bg-natural-secondary rounded-full flex items-center justify-center mb-4 text-natural-primary">
                <Users className="w-5 h-5" />
              </div>
              <p className="text-3xl font-semibold text-natural-ink">2,450</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-natural-muted">Lives Saved</p>
            </div>

            {/* Floating blood type pill */}
            <div className="absolute top-10 -right-4 bg-white px-6 py-4 rounded-3xl shadow-natural-card border border-natural-border-light flex items-center gap-3">
              <div className="w-8 h-8 bg-natural-primary rounded-full flex items-center justify-center text-white font-bold">
                O-
              </div>
              <div>
                <p className="text-xs font-bold text-natural-ink uppercase tracking-tight">Critical Need</p>
                <p className="text-[10px] uppercase tracking-widest text-natural-muted font-bold">City Hospital</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
