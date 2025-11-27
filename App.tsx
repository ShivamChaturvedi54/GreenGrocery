import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Create from './pages/Create';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Auth from './pages/Auth';
import { AppProvider } from './context/AppContext';

const App: React.FC = () => {
  return (
    <AppProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Navigate to="/about" replace />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </HashRouter>
    </AppProvider>
  );
};

export default App;
