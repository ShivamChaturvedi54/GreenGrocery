import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, ArtPiece } from '../types';

interface AppContextType {
  user: User | null;
  gallery: ArtPiece[];
  login: (username: string) => void;
  logout: () => void;
  saveArt: (art: ArtPiece) => void;
  toggleLike: (artId: string) => void;
  deleteArt: (artId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [gallery, setGallery] = useState<ArtPiece[]>([]);

  // Load from local storage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('aether_user');
    const storedGallery = localStorage.getItem('aether_gallery');
    
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedGallery) setGallery(JSON.parse(storedGallery));
  }, []);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem('aether_gallery', JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('aether_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('aether_user');
    }
  }, [user]);

  const login = (username: string) => {
    const newUser: User = {
      id: Date.now().toString(),
      username,
      email: `${username.toLowerCase()}@example.com`, // Mock email
      joinedDate: new Date().toISOString()
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const saveArt = (art: ArtPiece) => {
    setGallery(prev => [art, ...prev]);
  };

  const deleteArt = (artId: string) => {
    setGallery(prev => prev.filter(item => item.id !== artId));
  }

  const toggleLike = (artId: string) => {
    setGallery(prev => prev.map(art => {
      if (art.id === artId) {
        // Toggle logic: In a real app, we'd check if specific user liked it.
        // Here we just increment/decrement to simulate activity
        return { ...art, likes: art.likes + 1 };
      }
      return art;
    }));
  };

  return (
    <AppContext.Provider value={{ user, gallery, login, logout, saveArt, toggleLike, deleteArt }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};