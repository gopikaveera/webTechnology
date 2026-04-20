import { Droplets as Blood, Search, User, Menu, X, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../lib/AuthContext';
import { loginWithGoogle } from '../lib/firebase';
import { auth } from '../lib/firebase';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, userProfile } = useAuth();

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => auth.signOut();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-natural-bg border-b border-natural-border px-4 sm:px-10 h-20 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-natural-primary rounded-full flex items-center justify-center">
          <Blood className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-semibold tracking-tight">
          LifeStream <span className="font-normal text-natural-muted">System</span>
        </span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-natural-muted">
        <a href="#" className="text-natural-primary border-b-2 border-natural-primary pb-1 transition-all">Home</a>
        <a href="#" className="hover:text-natural-primary transition-colors">Find Donors</a>
        <a href="#" className="hover:text-natural-primary transition-colors">Request Blood</a>
        
        {user ? (
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold uppercase tracking-widest text-natural-muted leading-none">
                {userProfile?.bloodGroup || '??'} Station
              </span>
              <span className="text-sm font-medium text-natural-ink">{user.displayName}</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-natural-secondary border border-natural-border-light flex items-center justify-center overflow-hidden">
               {user.photoURL ? (
                 <img src={user.photoURL} alt={user.displayName || ''} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
               ) : (
                 <span className="text-natural-muted font-bold text-xs uppercase">
                    {user.displayName?.split(' ').map(n => n[0]).join('') || 'U'}
                 </span>
               )}
            </div>
            <button 
              onClick={handleLogout}
              className="p-2 text-natural-muted hover:text-natural-primary transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <button 
            onClick={handleLogin}
            className="bg-natural-primary text-white px-6 py-2 rounded-full font-medium shadow-lg hover:bg-opacity-90 transition-all flex items-center gap-2"
          >
            <User className="w-4 h-4" />
            Login
          </button>
        )}
      </div>

      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="text-natural-ink px-2">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-natural-bg border-b border-natural-border p-6 space-y-4 md:hidden shadow-xl animate-in slide-in-from-top duration-300">
          <a href="#" className="block text-natural-muted hover:text-natural-primary font-medium text-sm">Home</a>
          <a href="#" className="block text-natural-muted hover:text-natural-primary font-medium text-sm">Find Donors</a>
          <a href="#" className="block text-natural-muted hover:text-natural-primary font-medium text-sm">Request Blood</a>
          
          {user ? (
             <div className="pt-4 border-t border-natural-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-natural-secondary flex items-center justify-center font-bold text-xs text-natural-muted uppercase">
                    {userProfile?.bloodGroup || '??'}
                  </div>
                  <span className="text-sm font-medium text-natural-ink">{user.displayName}</span>
                </div>
                <button onClick={handleLogout} className="text-natural-primary text-sm font-bold uppercase tracking-widest">Logout</button>
             </div>
          ) : (
            <button 
              onClick={handleLogin}
              className="w-full bg-natural-primary text-white py-3 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4" />
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

