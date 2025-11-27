import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Palette } from 'lucide-react';

const Auth: React.FC = () => {
  const [username, setUsername] = useState('');
  const { login } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      login(username);
      navigate('/');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-md bg-gray-800 border border-gray-700 p-8 rounded-2xl shadow-2xl">
        <div className="text-center mb-8">
          <Palette className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white">Welcome to Aether</h2>
          <p className="text-gray-400 text-sm mt-2">Sign in to save and share your art</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300">
              Choose a Username
            </label>
            <input
              id="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-md text-white shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="Artist123"
            />
          </div>

          <div className="bg-indigo-900/30 border border-indigo-500/30 rounded-lg p-4 text-xs text-indigo-300">
             <p><strong>Note:</strong> This is a demo application. No password is required. Data is stored locally on your browser.</p>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-900 transition-colors"
          >
            Start Creating
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
