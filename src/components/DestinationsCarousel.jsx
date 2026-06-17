import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import parisImg from '../assets/paris.png';
import japanImg from '../assets/japan.png';
import greeceImg from '../assets/greece.png';
import turkeyImg from '../assets/turkey.png';
import gramadoImg from '../assets/gramado.png';

const destinations = [
  {
    id: 'roma',
    badge: 'HISTÓRIA & GASTRONOMIA',
    title: 'Roma, Itália',
    desc: 'Caminhe por ruínas imperiais e saboreie a culinária mais autêntica do Trastevere.',
    duration: 'Roteiro de 3 a 5 dias',
    img: gramadoImg
  },
  {
    id: 'japan',
    badge: 'TRADIÇÃO & NEON',
    title: 'Tóquio e Kyoto, Japão',
    desc: 'O contraste sublime entre templos silenciosos de bambu e avenidas futuristas reluzentes.',
    duration: 'Roteiro de 7 a 12 dias',
    img: japanImg
  },
  {
    id: 'santorini',
    badge: 'ROMANCE NO MEDITERRÂNEO',
    title: 'Santorini, Grécia',
    desc: 'Vilarejos brancos suspensos em penhascos com o pôr do sol mais cobiçado do mundo.',
    duration: 'Roteiro de 3 a 6 dias',
    img: greeceImg
  },
  {
    id: 'istambul',
    badge: 'CRUZAMENTO DE CULTURAS',
    title: 'Istambul, Turquia',
    desc: 'Navegue pelo Bósforo e explore bazares milenares onde o Ocidente abraça o Oriente.',
    duration: 'Roteiro de 3 a 5 dias',
    img: turkeyImg
  },
  {
    id: 'paris',
    badge: 'ARTE & ALTA COSTURA',
    title: 'Paris, França',
    desc: 'Bistrôs sofisticados, ruelas charmosas em Montmartre e a elegância clássica do Sena.',
    duration: 'Roteiro de 3 a 6 dias',
    img: parisImg
  }
];

export default function DestinationsCarousel({ onNavigate }) {
  const scrollerRef = useRef(null);
  const [activeCard, setActiveCard] = useState(0);

  // Set up intersection observer to track which card is snapped in the center
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = scroller.querySelectorAll('.card-entry');
    const observerOptions = {
      root: scroller,
      rootMargin: '0px -49% 0px -49%', // Look at the middle 2% of the container
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-index') || '0', 10);
          setActiveCard(index);
        }
      });
    }, observerOptions);

    cards.forEach(card => observer.observe(card));
    return () => {
      cards.forEach(card => observer.unobserve(card));
    };
  }, []);

  const scrollBy = (amount) => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <section id="destinos" className="relative overflow-hidden py-20 md:py-28 bg-white border-b border-border-gray">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div className="text-left">
            <span className="bg-brand-navy/10 text-brand-navy text-[10px] font-extrabold tracking-widest px-3 py-1 rounded-full w-fit">
              ROTAS SUGERIDAS
            </span>
            <h2 className="font-headers text-3xl md:text-4xl font-bold text-brand-navy mt-3">
              Explore o mundo com a 2GO
            </h2>
            <p className="text-sm text-text-muted mt-2 max-w-[500px]">
              Roteiros otimizados criados por inteligência artificial para os destinos mais emblemáticos do planeta.
            </p>
          </div>
          
          {/* Arrow navigation buttons */}
          <div className="hidden md:flex gap-3">
            <button 
              onClick={() => scrollBy(-350)} 
              className="w-10 h-10 rounded-full border border-border-gray bg-white text-brand-navy hover:bg-brand-navy hover:text-white cursor-pointer transition-all flex items-center justify-center shadow-sm"
              aria-label="Destino anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => scrollBy(350)} 
              className="w-10 h-10 rounded-full border border-border-gray bg-white text-brand-navy hover:bg-brand-navy hover:text-white cursor-pointer transition-all flex items-center justify-center shadow-sm"
              aria-label="Próximo destino"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scroller list */}
      <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-3">
        <div 
          ref={scrollerRef}
          className="flex gap-8 overflow-x-auto snap-x snap-mandatory px-[calc((100vw-1200px)/2+24px)] custom-scrollbar-hide scroll-smooth"
          style={{ scrollPadding: '0 calc((100vw - 1200px)/2 + 24px)' }}
        >
          {destinations.map((dest, idx) => (
            <div 
              key={dest.id}
              data-index={idx}
              onClick={() => onNavigate('planner')}
              className={`card-entry carousel-fallback-item flex-shrink-0 w-[280px] md:w-[320px] snap-center rounded-[20px] overflow-hidden bg-white border border-border-gray shadow-md cursor-pointer transition-all duration-300 ${
                activeCard === idx 
                  ? 'scale-100 opacity-100 shadow-lg border-brand-navy/30' 
                  : 'scale-95 opacity-55'
              } hover:translate-y-[-4px] hover:shadow-lg`}
            >
              {/* Image Container */}
              <div className="relative h-48 md:h-56 overflow-hidden bg-bg-light">
                <img 
                  src={dest.img} 
                  alt={dest.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                />
                <span className="absolute top-4 left-4 bg-brand-navy text-white text-[9px] font-extrabold tracking-widest px-2.5 py-1 rounded shadow-sm">
                  {dest.badge}
                </span>
              </div>
              
              {/* Content Container */}
              <div className="p-5 flex flex-col justify-between h-[180px]">
                <div>
                  <h3 className="font-headers text-xl font-bold text-brand-navy">{dest.title}</h3>
                  <p className="text-xs text-text-muted mt-2 leading-relaxed">{dest.desc}</p>
                </div>
                <div className="pt-4 border-t border-border-gray flex justify-between items-center mt-auto">
                  <span className="text-xs font-medium text-brand-navy/80">{dest.duration}</span>
                  <div className="flex items-center gap-1 text-xs font-semibold text-brand-orange">
                    <span>Criar Roteiro</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
