import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Palette, User as UserIcon, LogOut } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useApp();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? 'text-primary' : 'text-gray-300 hover:text-white';

  return (
    <div className="min-h-screen flex flex-col bg-dark text-gray-100">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-dark/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Palette className="h-8 w-8 text-primary" />
              <span className="font-serif text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                Aether
              </span>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link to="/" className={`${isActive('/')} px-3 py-2 rounded-md text-sm font-medium transition-colors`}>Home</Link>
                <Link to="/create" className={`${isActive('/create')} px-3 py-2 rounded-md text-sm font-medium transition-colors`}>Create</Link>
                <Link to="/gallery" className={`${isActive('/gallery')} px-3 py-2 rounded-md text-sm font-medium transition-colors`}>Gallery</Link>
                <Link to="/about" className={`${isActive('/about')} px-3 py-2 rounded-md text-sm font-medium transition-colors`}>About</Link>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <UserIcon size={16} />
                    <span>{user.username}</span>
                  </div>
                  <button 
                    onClick={logout}
                    className="p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-red-400 transition-colors"
                    title="Logout"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <Link to="/auth" className="bg-primary hover:bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-all">
                  Sign In
                </Link>
              )}
            </div>

            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900 border-b border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</Link>
              <Link to="/create" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Create</Link>
              <Link to="/gallery" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Gallery</Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">About</Link>
              {user ? (
                <button onClick={() => { logout(); setIsMenuOpen(false); }} className="text-left w-full text-red-400 hover:bg-gray-800 block px-3 py-2 rounded-md text-base font-medium">Logout ({user.username})</button>
              ) : (
                <Link to="/auth" onClick={() => setIsMenuOpen(false)} className="text-primary hover:text-indigo-400 block px-3 py-2 rounded-md text-base font-medium">Sign In</Link>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Aether Art. Powered by Google Gemini.
          </div>
          <div className="flex space-x-6 text-gray-400 text-sm">
             <Link to="/about" className="hover:text-white">Privacy</Link>
             <Link to="/about" className="hover:text-white">Terms</Link>
             <Link to="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
