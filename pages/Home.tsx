import React from 'react';
import { Link } from 'react-router-dom';
import { Wand2, Share2, Shield, Zap } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight text-white mb-6">
            Turn Words into <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Masterpieces</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-400">
            Unleash your creativity with the power of Gemini AI. Generate high-quality, unique artwork in seconds just by describing what you see in your mind.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link 
              to="/create" 
              className="px-8 py-4 bg-primary hover:bg-indigo-600 text-white rounded-full font-semibold text-lg transition-all shadow-lg hover:shadow-indigo-500/30 flex items-center gap-2"
            >
              <Wand2 size={20} />
              Start Creating
            </Link>
            <Link 
              to="/gallery" 
              className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-full font-semibold text-lg transition-all border border-gray-700"
            >
              Explore Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-800 rounded-2xl border border-gray-700 hover:border-gray-600 transition-colors">
              <div className="w-12 h-12 bg-indigo-500/20 rounded-lg flex items-center justify-center mb-4">
                <Zap className="text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Lightning Fast Generation</h3>
              <p className="text-gray-400">Powered by the Gemini 2.5 Flash model, experience near-instant creation of high-fidelity images.</p>
            </div>
            <div className="p-6 bg-gray-800 rounded-2xl border border-gray-700 hover:border-gray-600 transition-colors">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <Share2 className="text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Community Gallery</h3>
              <p className="text-gray-400">Save your creations to your profile and share them with the Aether community. Get inspired by others.</p>
            </div>
            <div className="p-6 bg-gray-800 rounded-2xl border border-gray-700 hover:border-gray-600 transition-colors">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                <Shield className="text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Safe & Ethical</h3>
              <p className="text-gray-400">Built with robust safety guidelines. We ensure a creative environment that respects copyright and content safety.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
         <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to create something amazing?</h2>
            <Link to="/auth" className="text-primary hover:text-white underline underline-offset-4 decoration-2">
                Join now to save your art
            </Link>
         </div>
      </section>
    </div>
  );
};

export default Home;
