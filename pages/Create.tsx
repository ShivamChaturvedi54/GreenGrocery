import React, { useState } from 'react';
import { generateImage } from '../services/geminiService';
import { ArtStyle, AspectRatio, ArtPiece } from '../types';
import { useApp } from '../context/AppContext';
import { Download, Save, RefreshCw, Wand2, Loader2, Palette } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Create: React.FC = () => {
  const { user, saveArt } = useApp();
  const navigate = useNavigate();

  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState<ArtStyle>(ArtStyle.REALISTIC);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>(AspectRatio.SQUARE);
  
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const base64Image = await generateImage(prompt, style, aspectRatio);
      setGeneratedImage(base64Image);
    } catch (err: any) {
      setError(err.message || "Failed to generate image");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    if (generatedImage) {
      const newArt: ArtPiece = {
        id: Date.now().toString(),
        imageUrl: generatedImage,
        prompt,
        style,
        aspectRatio,
        authorId: user.id,
        authorName: user.username,
        createdAt: new Date().toISOString(),
        likes: 0
      };
      saveArt(newArt);
      navigate('/gallery');
    }
  };

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `aether-art-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
        
        {/* Controls Panel */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Wand2 className="text-primary" />
              Creation Studio
            </h2>
            
            <form onSubmit={handleGenerate} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Describe your imagination
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="A futuristic city made of crystal at sunset..."
                  rows={4}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Art Style
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.values(ArtStyle).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setStyle(s)}
                      className={`px-3 py-2 rounded-lg text-sm text-left transition-all ${
                        style === s 
                          ? 'bg-primary text-white ring-2 ring-indigo-400' 
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Aspect Ratio
                </label>
                <select
                  value={aspectRatio}
                  onChange={(e) => setAspectRatio(e.target.value as AspectRatio)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-primary outline-none"
                >
                  {Object.values(AspectRatio).map((ratio) => (
                    <option key={ratio} value={ratio}>{ratio}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-lg font-bold shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 className="animate-spin" /> : <Wand2 />}
                {loading ? 'Dreaming...' : 'Generate Art'}
              </button>
            </form>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="lg:col-span-8">
          <div className="bg-gray-800 rounded-2xl border border-gray-700 shadow-xl h-full min-h-[500px] flex flex-col p-6 relative">
            <div className="flex-grow flex items-center justify-center bg-gray-900/50 rounded-xl overflow-hidden border border-gray-700 border-dashed relative group">
              
              {loading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/80 z-10">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Wand2 className="text-white w-6 h-6 animate-pulse" />
                    </div>
                  </div>
                  <p className="mt-4 text-indigo-300 animate-pulse font-medium">Summoning pixels...</p>
                </div>
              )}

              {generatedImage ? (
                <img 
                  src={generatedImage} 
                  alt="Generated Art" 
                  className="max-w-full max-h-[600px] object-contain shadow-2xl rounded-lg"
                />
              ) : (
                <div className="text-center text-gray-500 p-8">
                  {!loading && !error && (
                    <>
                      <Palette className="w-16 h-16 mx-auto mb-4 opacity-20" />
                      <p>Your masterpiece will appear here.</p>
                      <p className="text-sm mt-2">Select a style and enter a prompt to begin.</p>
                    </>
                  )}
                </div>
              )}

              {error && (
                <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                  <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-6 max-w-md">
                    <p className="text-red-400 font-medium">Error Generation Failed</p>
                    <p className="text-sm text-red-300 mt-2">{error}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Action Bar */}
            {generatedImage && !loading && (
              <div className="mt-6 flex flex-wrap gap-4 justify-between items-center bg-gray-900 p-4 rounded-xl border border-gray-700">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Prompt</span>
                  <p className="text-sm text-gray-200 line-clamp-1 max-w-md">{prompt}</p>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={handleDownload}
                    className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                    title="Download"
                  >
                    <Download size={20} />
                  </button>
                  <button 
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-indigo-600 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    <Save size={18} />
                    {user ? 'Save to Gallery' : 'Login to Save'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;