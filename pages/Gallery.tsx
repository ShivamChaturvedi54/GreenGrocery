import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Heart, Trash2, Maximize2, X } from 'lucide-react';

const Gallery: React.FC = () => {
  const { gallery, toggleLike, deleteArt, user } = useApp();
  const [selectedArt, setSelectedArt] = useState<string | null>(null);

  const selectedItem = gallery.find(item => item.id === selectedArt);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-gray-800 pb-6">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white mb-2">Community Gallery</h1>
          <p className="text-gray-400">Discover what others are creating with Aether AI.</p>
        </div>
        <div className="text-sm text-gray-500 mt-4 md:mt-0">
          Showing {gallery.length} masterpieces
        </div>
      </div>

      {gallery.length === 0 ? (
        <div className="text-center py-20 bg-gray-800/30 rounded-2xl border border-gray-800 border-dashed">
          <p className="text-gray-400 text-lg">No artworks found yet.</p>
          <p className="text-gray-600 mt-2">Go to the Create page to start your collection.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {gallery.map((art) => (
            <div key={art.id} className="group relative bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-gray-500 transition-all duration-300">
              <div className="aspect-square overflow-hidden bg-gray-900 cursor-pointer" onClick={() => setSelectedArt(art.id)}>
                <img 
                  src={art.imageUrl} 
                  alt={art.prompt} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Maximize2 className="text-white drop-shadow-lg" />
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                     <p className="text-xs text-indigo-400 font-medium uppercase tracking-wider">{art.style}</p>
                     <p className="text-sm text-gray-300 font-medium truncate w-40" title={art.authorName}>by {art.authorName}</p>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400">
                    <button onClick={() => toggleLike(art.id)} className="hover:text-pink-500 transition-colors">
                      <Heart size={16} className={art.likes > 0 ? "fill-pink-500 text-pink-500" : ""} />
                    </button>
                    <span className="text-xs">{art.likes}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 line-clamp-2 italic">"{art.prompt}"</p>
                
                {user && user.id === art.authorId && (
                  <button 
                    onClick={() => deleteArt(art.id)}
                    className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-red-500/80 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <button 
            onClick={() => setSelectedArt(null)}
            className="absolute top-4 right-4 text-gray-400 hover:text-white p-2"
          >
            <X size={32} />
          </button>
          
          <div className="max-w-5xl w-full bg-gray-900 rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl border border-gray-700 max-h-[90vh]">
            <div className="flex-grow bg-black flex items-center justify-center p-4 overflow-hidden">
              <img 
                src={selectedItem.imageUrl} 
                alt={selectedItem.prompt} 
                className="max-w-full max-h-[80vh] object-contain"
              />
            </div>
            <div className="w-full md:w-80 p-6 flex flex-col border-l border-gray-800 bg-gray-900 overflow-y-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                  {selectedItem.authorName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-white font-medium">{selectedItem.authorName}</h3>
                  <p className="text-xs text-gray-500">{new Date(selectedItem.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div>
                  <h4 className="text-xs text-gray-500 uppercase font-semibold">Prompt</h4>
                  <p className="text-sm text-gray-300 mt-1 leading-relaxed">{selectedItem.prompt}</p>
                </div>
                <div>
                  <h4 className="text-xs text-gray-500 uppercase font-semibold">Style</h4>
                  <span className="inline-block mt-1 px-2 py-1 bg-gray-800 border border-gray-700 rounded text-xs text-indigo-300">
                    {selectedItem.style}
                  </span>
                </div>
                <div>
                  <h4 className="text-xs text-gray-500 uppercase font-semibold">Aspect Ratio</h4>
                  <span className="text-xs text-gray-400">{selectedItem.aspectRatio}</span>
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-gray-800 flex gap-2">
                <button 
                   onClick={() => toggleLike(selectedItem.id)}
                   className="flex-1 flex items-center justify-center gap-2 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors"
                >
                  <Heart className={selectedItem.likes > 0 ? "fill-pink-500 text-pink-500" : ""} size={16} />
                  Like
                </button>
                <a 
                  href={selectedItem.imageUrl} 
                  download={`aether-${selectedItem.id}.png`}
                  className="flex-1 flex items-center justify-center gap-2 py-2 bg-primary hover:bg-indigo-600 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Download
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
