import React, { useState, useEffect } from 'react';
import { Menu, X, Map } from 'lucide-react';

export default function Header({ currentPage, onNavigate, onOpenDownload }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Shrink header on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Como Funciona', type: 'section', target: 'como-funciona' },
    { label: 'Destinos', type: 'section', target: 'destinos' },
    { label: 'Seu Roteiro Ganha Vida', type: 'section', target: 'demonstracao' },
    { label: 'Blog', type: 'page', pageId: 'blog' },
    { label: 'Contato', type: 'page', pageId: 'contact' }
  ];

  const handleItemClick = (item) => {
    if (item.type === 'section') {
      onNavigate('home', item.target);
    } else {
      onNavigate(item.pageId);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 flex items-center ${
          isScrolled 
            ? 'h-[70px] bg-white/90 backdrop-blur-md border-b border-border-gray shadow-sm' 
            : 'h-20 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center w-full">
          {/* Wordmark Logo */}
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center text-left font-headers text-2xl font-extrabold tracking-tight text-brand-navy relative cursor-pointer"
          >
            2GO
            <span className="inline-block w-2 h-2 rounded-full bg-brand-orange ml-1 shadow-[0_2px_8px_rgba(244,122,32,0.4)]"></span>
          </button>

          {/* Desktop Navigation Menu */}
          <nav className="hidden md:block">
            <ul className="flex gap-8 items-center list-none">
              {menuItems.map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleItemClick(item)}
                    className="font-body font-medium text-[0.95rem] py-2 relative cursor-pointer transition-colors text-text-muted hover:text-brand-navy after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-brand-orange after:transition-all after:duration-300 after:rounded-full after:w-0 hover:after:w-full"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop Actions */}
          <div className="flex items-center gap-4">
            <a 
              href="/gerar-roteiro"
              onClick={(e) => { e.preventDefault(); onNavigate('planner'); }}
              className="hidden md:inline-flex btn btn-primary btn-sm cursor-pointer"
            >
              Gerar roteiro
            </a>
            <button 
              onClick={onOpenDownload}
              className="btn btn-outline btn-sm cursor-pointer"
            >
              Baixar app
            </button>
            
            {/* Hamburger Burger icon */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-brand-navy cursor-pointer p-1"
              aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Sidebar Drawer Overlay */}
      <div 
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div 
          className={`fixed top-0 right-0 w-[300px] h-screen bg-white/95 backdrop-blur-2xl border-l border-border-gray p-10 pt-24 flex flex-col gap-10 z-50 transition-transform duration-300 shadow-xl ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <ul className="list-none flex flex-col gap-6">
            {menuItems.map((item, idx) => (
              <li key={idx}>
                <button
                  onClick={() => handleItemClick(item)}
                  className="font-headers text-2xl font-bold text-left w-full cursor-pointer text-brand-navy/70 hover:text-brand-navy"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
          
          <div className="mt-auto flex flex-col gap-4">
            <a 
              href="/gerar-roteiro"
              onClick={(e) => { e.preventDefault(); onNavigate('planner'); }}
              className="w-full btn btn-primary py-3 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Map className="w-4.5 h-4.5" /> Gerar roteiro
            </a>
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenDownload();
              }}
              className="w-full btn btn-outline py-3 cursor-pointer"
            >
              Baixar app
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
