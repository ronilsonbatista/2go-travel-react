import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import AppDownloadModal from './components/AppDownloadModal';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Planner from './pages/Planner';
import Blog from './pages/Blog';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [scrollTarget, setScrollTarget] = useState(null);

  // Scroll to top on page navigation (if not targetting a section)
  useEffect(() => {
    if (!scrollTarget) {
      window.scrollTo(0, 0);
    }
  }, [currentPage, scrollTarget]);

  const handleNavigate = (pageId, sectionId = null) => {
    if (sectionId) {
      setScrollTarget(sectionId);
      setCurrentPage('home');
    } else {
      setScrollTarget(null);
      setCurrentPage(pageId);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Home 
            onNavigate={handleNavigate} 
            onOpenDownload={() => setIsDownloadOpen(true)} 
            scrollTarget={scrollTarget}
            onScrollDone={() => setScrollTarget(null)}
          />
        );
      case 'about':
        return (
          <About 
            onNavigate={handleNavigate} 
            onOpenDownload={() => setIsDownloadOpen(true)} 
          />
        );
      case 'planner':
        return (
          <Planner 
            onOpenDownload={() => setIsDownloadOpen(true)} 
          />
        );
      case 'blog':
        return (
          <Blog 
            onNavigate={handleNavigate} 
          />
        );
      case 'contact':
        return <Contact />;
      default:
        return (
          <Home 
            onNavigate={handleNavigate} 
            onOpenDownload={() => setIsDownloadOpen(true)} 
            scrollTarget={scrollTarget}
            onScrollDone={() => setScrollTarget(null)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-bg-light text-text-main flex flex-col justify-between selection:bg-brand-orange/20 selection:text-brand-navy">
      
      {/* Sticky Global Navigation */}
      <Header 
        currentPage={currentPage} 
        onNavigate={handleNavigate} 
        onOpenDownload={() => setIsDownloadOpen(true)} 
      />

      {/* Main Page Layout Content */}
      <main className="flex-grow">
        {renderPage()}
      </main>

      {/* Footer Navigation bar */}
      <Footer 
        onNavigate={handleNavigate} 
        onOpenDownload={() => setIsDownloadOpen(true)} 
      />

      {/* Shared Popup download Modal */}
      <AppDownloadModal 
        isOpen={isDownloadOpen} 
        onClose={() => setIsDownloadOpen(false)} 
      />
      
    </div>
  );
}

export default App;
