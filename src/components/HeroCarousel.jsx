import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Smartphone, ChevronDown } from 'lucide-react';

import parisImg from '../assets/paris.png';
import japanImg from '../assets/japan.png';
import greeceImg from '../assets/greece.png';
import norwayImg from '../assets/norway.png';
import turkeyImg from '../assets/turkey.png';
import lencoisImg from '../assets/lencois.png';

const slides = [
  {
    id: 'paris',
    badge: 'CURADORIA EXCLUSIVA',
    title: 'O extraordinário desenhado para você',
    desc: 'Não viaje apenas. Experimente Paris por caminhos nunca mapeados, com curadoria gastronômica exclusiva e rotas inteligentes na palma da sua mão.',
    img: parisImg
  },
  {
    id: 'japan',
    badge: 'JORNADAS INTELECTUAIS',
    title: 'A Ásia sob uma nova perspectiva',
    desc: 'Desvende templos milenares em Kyoto e a agitação futurista de Tóquio com itinerários preditivos que maximizam seu tempo de contemplação.',
    img: japanImg
  },
  {
    id: 'greece',
    badge: 'MEDITERRÂNEO VIP',
    title: 'Seu refúgio sob o sol da Grécia',
    desc: 'Acesse mirantes secretos, praias desertas e jantares privativos em Santorini sem o estresse de aglomerações turísticas.',
    img: greeceImg
  },
  {
    id: 'norway',
    badge: 'EXPLORAÇÃO NÓRDICA',
    title: 'A imensidão dos Fjords ao seu alcance',
    desc: 'Roteiros dinâmicos que rastreiam a Aurora Boreal e conduzem você com total segurança pelas estradas cênicas mais espetaculares do norte.',
    img: norwayImg
  },
  {
    id: 'turkey',
    badge: 'AVENTURA CURADA',
    title: 'O nascer do sol mais cobiçado do mundo',
    desc: 'Viva a magia da Capadócia com reservas integradas em hotéis de caverna históricos e rotas arqueológicas com guias especializados.',
    img: turkeyImg
  },
  {
    id: 'lencois',
    badge: 'PARAÍSO BRASILEIRO',
    title: 'Oásis desenhados pelo vento',
    desc: 'Explore as dunas e lagoas sazonais dos Lençóis Maranhenses com guias off-line detalhados e segurança por satélite no app.',
    img: lencoisImg
  }
];

export default function HeroCarousel({ onNavigate, onOpenDownload }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play slides every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-bg-light">
      
      {/* Slide Images Stack */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Image */}
          <img
            src={slide.img}
            alt={slide.title}
            className="w-full h-full object-cover object-center scale-102"
          />
          {/* Bottom fade and top shadow overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg-light via-transparent to-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-bg-light/30 via-transparent to-transparent"></div>
        </div>
      ))}

      {/* Slide Content Overlay inside a floating glassmorphic card */}
      <div className="container mx-auto px-6 relative z-20 max-w-6xl flex flex-col justify-center h-full py-16">
        <div className="max-w-xl bg-white/85 backdrop-blur-xl border border-border-gray rounded-3xl p-8 md:p-10 shadow-lg animate-fade-in-up flex flex-col gap-5 text-left">
          <span className="bg-brand-orange text-white text-[10px] font-extrabold tracking-widest px-3 py-1 rounded-full w-fit">
            {slides[currentSlide].badge}
          </span>
          <h1 className="font-headers text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-brand-navy">
            {slides[currentSlide].title}
          </h1>
          <p className="text-sm sm:text-base text-text-muted leading-relaxed">
            {slides[currentSlide].desc}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-3 w-full">
            <button
              onClick={onOpenDownload}
              className="btn btn-primary flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              Explorar no app <Smartphone className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('planner')}
              className="btn btn-outline flex items-center justify-center cursor-pointer"
            >
              Gerar Roteiro Grátis
            </button>
          </div>
        </div>
      </div>

      {/* Slider navigation controls */}
      <div className="absolute top-1/2 -translate-y-1/2 left-6 z-30 hidden md:block">
        <button
          onClick={handlePrev}
          className="w-12 h-12 rounded-full border border-border-gray bg-white/85 text-brand-navy hover:bg-brand-navy hover:text-white hover:border-brand-navy cursor-pointer backdrop-blur-md shadow-sm transition-all duration-300 flex items-center justify-center"
          aria-label="Slide anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>
      
      <div className="absolute top-1/2 -translate-y-1/2 right-6 z-30 hidden md:block">
        <button
          onClick={handleNext}
          className="w-12 h-12 rounded-full border border-border-gray bg-white/85 text-brand-navy hover:bg-brand-navy hover:text-white hover:border-brand-navy cursor-pointer backdrop-blur-md shadow-sm transition-all duration-300 flex items-center justify-center"
          aria-label="Próximo slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Slide progress indicators (dots) */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
              currentSlide === index ? 'w-8 bg-brand-orange' : 'w-2 bg-brand-navy/20'
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          ></button>
        ))}
      </div>

      {/* Floating Scroll Invite */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 hidden md:flex flex-col items-center gap-0.5 text-[9px] text-text-muted font-headers uppercase tracking-widest font-semibold">
        <span>Role para explorar</span>
        <ChevronDown className="w-3.5 h-3.5 text-brand-orange animate-bounce" />
      </div>

    </section>
  );
}
