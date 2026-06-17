import React, { useState, useEffect, useRef } from 'react';
import { 
  Compass, 
  Sliders, 
  Navigation, 
  ArrowRight, 
  Clock, 
  Map, 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Calendar,
  Check,
  MessageSquare,
  Sparkles,
  QrCode,
  Heart,
  Plane,
  Utensils
} from 'lucide-react';

// Destinations assets
import gramadoImg from '../assets/gramado.png';
import greeceImg from '../assets/greece.png'; // Santorini
import lencoisImg from '../assets/lencois.png';
import parisImg from '../assets/paris.png';
import norwayImg from '../assets/norway.png';
import amazonasImg from '../assets/amazonas.png';
import japanImg from '../assets/japan.png';
import veadeirosImg from '../assets/veadeiros.png';
import rioImg from '../assets/rio.png';
import turkeyImg from '../assets/turkey.png'; // Capadócia
import noronhaImg from '../assets/noronha.png';
import appMockupImg from '../assets/app-mockup.png';

// Carousel data
const carouselDestinations = [
  {
    id: 'gramado',
    name: 'Gramado, RS',
    phrase: 'Aconchego da serra, arquitetura bávara e chocolates artesanais sob a névoa fria.',
    tags: ['Romance', 'Natureza'],
    img: gramadoImg
  },
  {
    id: 'santorini',
    name: 'Santorini, Grécia',
    phrase: 'Vilarejos de domos azuis sobre penhascos vulcânicos com o pôr do sol mais cobiçado do mundo.',
    tags: ['Praia', 'Romance'],
    img: greeceImg
  },
  {
    id: 'lencois',
    name: 'Lençóis Maranhenses, MA',
    phrase: 'Dunas de areia branca infinitas cercadas por lagoas sazonais de água doce cristalina.',
    tags: ['Natureza', 'Aventura'],
    img: lencoisImg
  },
  {
    id: 'paris',
    name: 'Paris, França',
    phrase: 'Bistrôs charmosos em Montmartre e a elegância clássica das margens do Sena.',
    tags: ['Cultura', 'Romance'],
    img: parisImg
  },
  {
    id: 'norway',
    name: 'Fiordes, Noruega',
    phrase: 'Navegue entre paredões de rocha monumentais e contemple a beleza mágica da Aurora Boreal.',
    tags: ['Natureza', 'Aventura'],
    img: norwayImg
  },
  {
    id: 'amazonas',
    name: 'Manaus & Selva, AM',
    phrase: 'A maior biodiversidade do planeta com hotéis de selva flutuantes e canais misteriosos.',
    tags: ['Natureza', 'Aventura'],
    img: amazonasImg
  },
  {
    id: 'japan',
    name: 'Tóquio, Japão',
    phrase: 'O contraste fascinante entre os templos milenares de Kyoto e as avenidas futuristas de Tóquio.',
    tags: ['Cultura', 'Tecnologia'],
    img: japanImg
  },
  {
    id: 'veadeiros',
    name: 'Chapada dos Veadeiros, GO',
    phrase: 'Cachoeiras de quartzo cristalino e misticismo no coração do Cerrado brasileiro.',
    tags: ['Natureza', 'Aventura'],
    img: veadeirosImg
  },
  {
    id: 'rio',
    name: 'Rio de Janeiro, RJ',
    phrase: 'A energia contagiante de Copacabana, as vistas do Corcovado e o abraço do mar com a montanha.',
    tags: ['Praia', 'Cultura'],
    img: rioImg
  },
  {
    id: 'capadocia',
    name: 'Capadócia, Turquia',
    phrase: 'Flutue em balões de ar quente sobre formações rochosas exóticas nas chaminés de fadas.',
    tags: ['Aventura', 'Romance'],
    img: turkeyImg
  },
  {
    id: 'noronha',
    name: 'Fernando de Noronha, PE',
    phrase: 'Mergulhe com tartarugas marinhas e golfinhos em águas mornas de azul profundo.',
    tags: ['Praia', 'Natureza'],
    img: noronhaImg
  }
];

// Highlight background images for the Hero crossfade effect
const heroBackgrounds = [japanImg, greeceImg, lencoisImg, parisImg, norwayImg, rioImg];

function ScrollReveal({ children, className = '', delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );
    
    const current = domRef.current;
    if (current) {
      observer.observe(current);
    }
    
    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-12'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function Home({ onNavigate, onOpenDownload, scrollTarget, onScrollDone }) {
  // Navigation & Carousel states
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [activeAppTab, setActiveAppTab] = useState('timeline');
  const [heroBgIndex, setHeroBgIndex] = useState(0);

  // Simulation states for "Veja um roteiro nascer"
  const [simProgress, setSimProgress] = useState(0);
  const [simState, setSimState] = useState('idle'); // 'idle' | 'running' | 'done'
  const [visibleDays, setVisibleDays] = useState([]);

  // Auto crossfade background for Hero
  useEffect(() => {
    const bgInterval = setInterval(() => {
      setHeroBgIndex((prev) => (prev + 1) % heroBackgrounds.length);
    }, 5500);
    return () => clearInterval(bgInterval);
  }, []);

  // Smooth scroll logic
  useEffect(() => {
    if (scrollTarget) {
      const element = document.getElementById(scrollTarget);
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          onScrollDone();
        }, 100);
        return () => clearTimeout(timer);
      }
    }
  }, [scrollTarget, onScrollDone]);

  // Destination carousel navigation
  const nextSlide = () => {
    setCarouselIndex((prev) => (prev + 1) % carouselDestinations.length);
  };

  const prevSlide = () => {
    setCarouselIndex((prev) => (prev - 1 + carouselDestinations.length) % carouselDestinations.length);
  };

  // Run real-time IA simulation
  const startSimulation = () => {
    setSimState('running');
    setSimProgress(5);
    setVisibleDays([]);

    // Progress updates
    const timers = [
      setTimeout(() => setSimProgress(25), 600),
      setTimeout(() => {
        setSimProgress(50);
        setVisibleDays(prev => [...prev, 'day1']);
      }, 1500),
      setTimeout(() => {
        setSimProgress(75);
        setVisibleDays(prev => [...prev, 'day2']);
      }, 2700),
      setTimeout(() => {
        setSimProgress(100);
        setVisibleDays(prev => [...prev, 'day3']);
        setSimState('done');
      }, 3800)
    ];

    return () => timers.forEach(clearTimeout);
  };

  return (
    <div className="w-full bg-bg-light transition-colors duration-300">
      
      {/* 1. HERO SECTION (Dynamic destination crossfade + iPhone mockup) */}
      <section className="relative min-h-[95vh] lg:min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden bg-bg-light">
        {/* Background collage crossfade */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          {heroBackgrounds.map((bg, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
                idx === heroBgIndex ? 'opacity-[0.16]' : 'opacity-0'
              }`}
              style={{ backgroundImage: `url(${bg})` }}
            />
          ))}
          {/* Subtle line decorations & gradient for rich aesthetics */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-bg-light/95 to-bg-light z-10" />
          
          {/* Subtle decorative color circles */}
          <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-brand-orange/5 blur-3xl" />
          <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-brand-green/5 blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-20 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Headline and actions */}
            <div className="lg:col-span-7 text-left flex flex-col gap-6 animate-fade-in-up">
              
              {/* Trust Badge */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-1.5">
                  {['AM', 'RF', 'LC', 'TC'].map((initial, i) => (
                    <div key={i} className="w-6.5 h-6.5 rounded-full bg-brand-navy border-2 border-white flex items-center justify-center text-[7.5px] font-extrabold text-white shadow-sm">
                      {initial}
                    </div>
                  ))}
                </div>
                <span className="text-xs font-semibold text-text-muted flex items-center gap-1.5">
                  <span className="text-brand-orange font-bold">★ 4.9/5</span> nas App Stores • +50k roteiros gerados
                </span>
              </div>

              <h1 className="font-headers text-4.5xl sm:text-5.5xl md:text-6.5xl font-extrabold leading-tight text-brand-navy tracking-tight">
                Seu roteiro perfeito.<br/>
                <span className="text-brand-orange relative">
                  Criado em minutos.
                  <span className="absolute left-0 bottom-1 w-full h-1 bg-brand-green/30 rounded-full"></span>
                </span>
              </h1>
              
              <p className="text-sm sm:text-base md:text-lg text-text-muted leading-relaxed max-w-[540px]">
                A 2GO cria roteiros inteligentes com base no seu destino, datas, orçamento e estilo de viagem.
              </p>
              
              {/* Action buttons with Microinteractions */}
              <div className="flex flex-wrap gap-4 mt-2">
                <button 
                  onClick={() => onNavigate('planner')}
                  className="btn btn-primary px-8 py-4 shadow-[0_6px_20px_rgba(8,27,107,0.15)] flex items-center gap-2 cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:bg-brand-orange hover:shadow-[0_6px_20px_rgba(244,122,32,0.25)] active:scale-[0.98]"
                >
                  Gerar roteiro <ArrowRight className="w-4.5 h-4.5" />
                </button>
                <button 
                  onClick={() => {
                    const el = document.getElementById('como-funciona');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn btn-outline px-8 py-4 cursor-pointer text-brand-navy border-brand-navy/30 transition-all duration-300 hover:scale-[1.03] hover:bg-brand-navy hover:text-white active:scale-[0.98]"
                >
                  Ver como funciona
                </button>
              </div>

            </div>

            {/* Right Column: Premium Floating iPhone Timeline Mockup */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end relative animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
              
              {/* Floating destination tags around the mockup to emphasize travel theme */}
              <div className="absolute top-12 -left-8 bg-white border border-border-gray py-2 px-3.5 rounded-2xl shadow-md flex items-center gap-2 animate-[bounce_4.5s_infinite_ease-in-out] z-35 select-none">
                <span className="text-sm">🇯🇵</span>
                <span className="text-[10px] font-bold text-brand-navy">Japão</span>
              </div>
              <div className="absolute bottom-20 -right-4 bg-white border border-border-gray py-2 px-3.5 rounded-2xl shadow-md flex items-center gap-2 animate-[bounce_5.5s_infinite_ease-in-out] z-35 select-none" style={{ animationDelay: '1s' }}>
                <span className="text-sm">🏖️</span>
                <span className="text-[10px] font-bold text-brand-navy">Noronha</span>
              </div>
              <div className="absolute top-1/2 -right-8 bg-white border border-border-gray py-2 px-3.5 rounded-2xl shadow-md flex items-center gap-2 animate-[bounce_5s_infinite_ease-in-out] z-35 select-none" style={{ animationDelay: '0.5s' }}>
                <span className="text-sm">🏔️</span>
                <span className="text-[10px] font-bold text-brand-navy">Noruega</span>
              </div>

              {/* iPhone Frame */}
              <div className="relative w-[285px] h-[575px] bg-brand-navy rounded-[42px] p-3 shadow-2xl border-[3px] border-brand-navy/80 flex flex-col overflow-hidden justify-between animate-[bounce_6s_infinite_ease-in-out]">
                
                {/* iPhone Notch */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-6 bg-brand-navy rounded-full z-30 flex items-center justify-center">
                  <div className="w-3 h-3 bg-black/45 rounded-full mr-2"></div>
                  <div className="w-8 h-1 bg-black/45 rounded-full"></div>
                </div>

                {/* iPhone Screen */}
                <div className="w-full h-full bg-white rounded-[34px] overflow-hidden relative flex flex-col justify-between p-5 pt-12 text-left select-none">
                  <div className="flex flex-col justify-between h-full">
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[8.5px] font-bold text-brand-orange uppercase tracking-wider">ROTEIRO INTELIGENTE</span>
                        <span className="text-[8.5px] font-bold text-brand-green bg-brand-green/10 px-2 py-0.5 rounded">DIA 1</span>
                      </div>
                      <h4 className="font-headers text-sm font-extrabold text-brand-navy">Tóquio Cultural</h4>
                      <p className="text-[9.5px] text-text-muted mt-0.5">Templos e neons sob medida.</p>
                    </div>
                    
                    {/* Floating timeline nodes */}
                    <div className="flex-grow my-3 overflow-y-auto pr-1 flex flex-col gap-3 relative before:content-[''] before:absolute before:top-2 before:left-[17px] before:w-[1.5px] before:h-[80%] before:bg-border-gray">
                      
                      <div className="flex gap-4 items-start relative">
                        <div className="w-[10px] h-[10px] rounded-full bg-brand-navy border-2 border-white ring-2 ring-brand-navy/20 mt-1.5 shrink-0 z-10"></div>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[9.5px] font-bold text-brand-navy">09:00 • Templo Senso-ji</span>
                          <span className="text-[8px] text-text-muted font-medium">Asakusa (Manhã sem filas)</span>
                        </div>
                      </div>

                      <div className="pl-6 flex items-center gap-1.5 text-[7px] text-text-muted font-bold">
                        <span>🚶‍♂️</span>
                        <span className="border-b border-dashed border-border-gray/50 pb-0.5">15 min de caminhada</span>
                      </div>

                      <div className="flex gap-4 items-start relative">
                        <div className="w-[10px] h-[10px] rounded-full bg-brand-orange border-2 border-white ring-2 ring-brand-orange/20 mt-1.5 shrink-0 z-10"></div>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[9.5px] font-bold text-brand-navy">13:00 • Almoço Shabu-Shabu</span>
                          <span className="text-[8px] text-text-muted font-medium">Imahan (Opção tradicional sugerida)</span>
                        </div>
                      </div>

                      <div className="pl-6 flex items-center gap-1.5 text-[7px] text-text-muted font-bold">
                        <span>🚇</span>
                        <span className="border-b border-dashed border-border-gray/50 pb-0.5">20 min de metrô (Linha Ginza)</span>
                      </div>

                      <div className="flex gap-4 items-start relative">
                        <div className="w-[10px] h-[10px] rounded-full bg-brand-green border-2 border-white ring-2 ring-brand-green/20 mt-1.5 shrink-0 z-10"></div>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[9.5px] font-bold text-brand-navy">15:30 • Shibuya Crossing</span>
                          <span className="text-[8px] text-text-muted font-medium">Observação no terraço Shibuya Sky</span>
                        </div>
                      </div>

                    </div>
                    
                    <div className="bg-bg-light p-2.5 rounded-xl border border-border-gray flex items-center justify-between">
                      <span className="text-[9px] font-bold text-brand-navy">📍 GPS Off-line</span>
                      <span className="text-[8.5px] font-bold text-brand-orange uppercase cursor-pointer">Ver Rota</span>
                    </div>

                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. COMO FUNCIONA (Friendly Duolingo style steps with orange/green accents) */}
      <section id="como-funciona" className="py-24 md:py-32 bg-white border-y border-border-gray">
        <ScrollReveal className="container mx-auto px-6">
          <div className="text-center max-w-[600px] mx-auto mb-16">
            <span className="bg-brand-orange/10 text-brand-orange text-[10px] font-extrabold tracking-widest px-3.5 py-1.5 rounded-full w-fit">
              DIVERSÃO E LEVEZA
            </span>
            <h2 className="font-headers text-3xl md:text-4xl font-extrabold mt-4 text-brand-navy tracking-tight">
              Como funciona a 2GO 🗺️
            </h2>
            <p className="text-sm text-text-muted mt-3">
              Criamos o roteiro perfeito para a sua viagem em 3 passos simples.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="group relative bg-bg-light/40 border border-border-gray p-8 md:p-10 rounded-[24px] shadow-sm hover:shadow-md hover:translate-y-[-4px] hover:border-brand-orange/20 transition-all duration-300 flex flex-col items-start text-left">
              <span className="font-headers text-6xl font-extrabold text-brand-orange/10 absolute top-6 right-8 leading-none select-none group-hover:scale-105 transition-transform duration-300">01</span>
              <div className="w-12 h-12 rounded-[16px] bg-brand-orange/10 text-brand-orange flex items-center justify-center mb-8 transition-transform group-hover:rotate-6 duration-300">
                <Compass className="w-6 h-6" />
              </div>
              <span className="bg-brand-green/10 text-brand-green text-[9.5px] font-bold px-2.5 py-0.5 rounded-full mb-3">Rápido</span>
              <h3 className="font-headers text-lg font-bold text-brand-navy mb-2">1. Responda rapidinho 📝</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Destino, datas, orçamento e seu jeito de viajar.
              </p>
            </div>

            {/* Step 2 */}
            <div className="group relative bg-bg-light/40 border border-border-gray p-8 md:p-10 rounded-[24px] shadow-sm hover:shadow-md hover:translate-y-[-4px] hover:border-brand-green/20 transition-all duration-300 flex flex-col items-start text-left">
              <span className="font-headers text-6xl font-extrabold text-brand-green/10 absolute top-6 right-8 leading-none select-none group-hover:scale-105 transition-transform duration-300">02</span>
              <div className="w-12 h-12 rounded-[16px] bg-brand-green/10 text-brand-green flex items-center justify-center mb-8 transition-transform group-hover:rotate-6 duration-300">
                <Sliders className="w-6 h-6" />
              </div>
              <span className="bg-brand-orange/10 text-brand-orange text-[9.5px] font-bold px-2.5 py-0.5 rounded-full mb-3">Exclusivo</span>
              <h3 className="font-headers text-lg font-bold text-brand-navy mb-2">2. A 2GO monta pra você ⚡</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                A IA organiza dias, horários, atrações, restaurantes e deslocamentos.
              </p>
            </div>

            {/* Step 3 */}
            <div className="group relative bg-bg-light/40 border border-border-gray p-8 md:p-10 rounded-[24px] shadow-sm hover:shadow-md hover:translate-y-[-4px] hover:border-brand-navy/20 transition-all duration-300 flex flex-col items-start text-left">
              <span className="font-headers text-6xl font-extrabold text-brand-navy/10 absolute top-6 right-8 leading-none select-none group-hover:scale-105 transition-transform duration-300">03</span>
              <div className="w-12 h-12 rounded-[16px] bg-brand-navy/10 text-brand-navy flex items-center justify-center mb-8 transition-transform group-hover:rotate-6 duration-300">
                <Navigation className="w-6 h-6" />
              </div>
              <span className="bg-brand-navy/10 text-brand-navy text-[9.5px] font-bold px-2.5 py-0.5 rounded-full mb-3">No seu bolso</span>
              <h3 className="font-headers text-lg font-bold text-brand-navy mb-2">3. Edite e leve com você 📲</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Ajuste o roteiro, salve, compartilhe e use durante a viagem.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 3. DESTINATIONS CAROUSEL (Point visual mais forte da home com 11 slides) */}
      <section id="destinos" className="py-24 md:py-32 bg-bg-light border-b border-border-gray relative">
        <ScrollReveal className="container mx-auto px-6">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div className="text-left max-w-xl">
              <span className="bg-brand-orange/10 text-brand-orange text-[10px] font-extrabold tracking-widest px-3.5 py-1.5 rounded-full w-fit">
                EXPLORAÇÃO ILIMITADA
              </span>
              <h2 className="font-headers text-3xl md:text-4xl font-extrabold text-brand-navy mt-4 tracking-tight">
                Escolha um destino e comece seu roteiro ✈️
              </h2>
              <p className="text-sm text-text-muted mt-2">
                Itinerários sob medida para os destinos mais cobiçados do mundo.
              </p>
            </div>
            
            {/* Carousel navigation buttons with microinteractions */}
            <div className="flex gap-3 mt-6 md:mt-0">
              <button 
                onClick={prevSlide} 
                className="w-12 h-12 rounded-full border border-border-gray bg-white text-brand-navy hover:bg-brand-orange hover:text-white hover:border-brand-orange cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center shadow-sm"
                aria-label="Slide anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={nextSlide} 
                className="w-12 h-12 rounded-full border border-border-gray bg-white text-brand-navy hover:bg-brand-orange hover:text-white hover:border-brand-orange cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center shadow-sm"
                aria-label="Próximo slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Carousel Spotlight Card with subtle parallax-like hover scale */}
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-white border border-border-gray rounded-[28px] overflow-hidden p-6 md:p-8 shadow-md">
            
            {/* Slide Image Frame with Gradient Overlay and CTA inside */}
            <div className="lg:col-span-7 h-72 md:h-[400px] rounded-[22px] overflow-hidden shadow-sm relative bg-bg-light">
              <img 
                src={carouselDestinations[carouselIndex].img} 
                alt={carouselDestinations[carouselIndex].name}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              
              {/* Inside-slide CTA badge */}
              <button 
                onClick={() => onNavigate('planner')}
                className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm text-brand-navy border border-white/20 px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-lg cursor-pointer hover:bg-brand-orange hover:text-white transition-all duration-300 active:scale-95"
              >
                <span>Explorar no app 🗺️</span>
              </button>
            </div>

            {/* Slide details */}
            <div className="lg:col-span-5 text-left flex flex-col justify-between p-2 md:p-4 gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                  {carouselDestinations[carouselIndex].tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className={`text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                        i === 0 
                          ? 'bg-brand-orange/10 text-brand-orange' 
                          : 'bg-brand-green/10 text-brand-green'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="font-headers text-2xl md:text-3.5xl font-extrabold text-brand-navy tracking-tight leading-tight">
                  {carouselDestinations[carouselIndex].name}
                </h3>
                
                <p className="text-sm md:text-base text-text-muted leading-relaxed">
                  {carouselDestinations[carouselIndex].phrase}
                </p>
              </div>
              
              <button 
                onClick={() => onNavigate('planner')}
                className="btn btn-primary w-full sm:w-fit py-3.5 px-8 cursor-pointer shadow-md hover:bg-brand-orange flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                Gerar roteiro <ArrowRight className="w-4.5 h-4.5" />
              </button>
            </div>

          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2.5 mt-8">
            {carouselDestinations.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCarouselIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === carouselIndex ? 'w-8 bg-brand-orange' : 'w-2 bg-brand-navy/20'
                }`}
                aria-label={`Ir para slide ${idx + 1}`}
              />
            ))}
          </div>

        </ScrollReveal>
      </section>

      {/* 4. INTERACTIVE SIMULATOR (Veja um roteiro nascer) */}
      <section className="py-24 md:py-32 bg-white border-b border-border-gray">
        <ScrollReveal className="container mx-auto px-6 max-w-5xl">
          
          <div className="text-center max-w-[620px] mx-auto mb-16">
            <span className="bg-brand-green/10 text-brand-green text-[10px] font-extrabold tracking-widest px-3.5 py-1.5 rounded-full w-fit">
              IA EM AÇÃO
            </span>
            <h2 className="font-headers text-3xl md:text-4xl font-extrabold mt-4 text-brand-navy tracking-tight">
              Veja um roteiro nascer ⚡
            </h2>
            <p className="text-sm text-text-muted mt-3">
              Assista à nossa Inteligência Artificial organizar um itinerário ideal para o Japão.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            {/* Input Config Panel */}
            <div className="lg:col-span-5 bg-bg-light border border-border-gray rounded-[24px] p-6 flex flex-col justify-between text-left">
              <div className="flex flex-col gap-4">
                <h4 className="font-headers text-lg font-bold text-brand-navy border-b border-border-gray pb-3">Parâmetros de Viagem</h4>
                
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-wide">Destino</span>
                  <div className="bg-white border border-border-gray px-4 py-2.5 rounded-xl text-sm font-semibold text-brand-navy flex items-center justify-between">
                    <span>Japão 🇯🇵</span>
                    <span className="text-xs font-normal text-text-muted">Tóquio, Hakone, Kyoto</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-wide">Duração</span>
                    <div className="bg-white border border-border-gray px-4 py-2.5 rounded-xl text-sm font-semibold text-brand-navy">
                      14 Dias 📅
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-wide">Estilo</span>
                    <div className="bg-white border border-border-gray px-4 py-2.5 rounded-xl text-sm font-semibold text-brand-navy">
                      Casal 👩‍❤️‍👨
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-wide">Estilo de Viagem</span>
                  <div className="bg-white border border-border-gray px-4 py-2.5 rounded-xl text-sm font-semibold text-brand-navy">
                    Cultura, Gastronomia & Aventura 🍣⛰️
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <button
                  onClick={startSimulation}
                  disabled={simState === 'running'}
                  className={`btn w-full py-3.5 flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
                    simState === 'running' 
                      ? 'bg-brand-navy/10 text-brand-navy/40 border-transparent cursor-not-allowed' 
                      : 'btn-secondary shadow-md hover:bg-brand-orange shadow-[0_4px_14px_rgba(244,122,32,0.25)]'
                  }`}
                >
                  {simState === 'running' ? 'IA Criando Roteiro...' : 'Ver a IA em ação ⚡'}
                </button>
                {simState === 'done' && (
                  <button 
                    onClick={() => onNavigate('planner')}
                    className="btn btn-primary w-full py-3.5 flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-[0_4px_14px_rgba(8,27,107,0.15)] animate-fade-in-up"
                  >
                    Gerar meu próprio roteiro
                  </button>
                )}
              </div>
            </div>

            {/* Real-time Output Board */}
            <div className="lg:col-span-7 bg-[#081B6B]/05 border border-brand-navy/10 rounded-[24px] p-6 flex flex-col min-h-[440px] relative overflow-hidden">
              
              {/* Progress Tracker */}
              {simState !== 'idle' && (
                <div className="mb-6 animate-fade-in-up text-left">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-brand-navy">
                      {simProgress < 25 && '🔍 Analisando preferências de casal e ritmo...'}
                      {simProgress >= 25 && simProgress < 50 && '🚄 Mapeando rotas do trem bala Shinkansen...'}
                      {simProgress >= 50 && simProgress < 75 && '🍣 Selecionando locais de gastronomia japonesa...'}
                      {simProgress >= 75 && simProgress < 100 && '⚙️ Otimizando deslocamentos e caminhadas...'}
                      {simProgress === 100 && '✨ Roteiro Inteligente Gerado com Sucesso!'}
                    </span>
                    <span className="text-xs font-bold text-brand-orange">{simProgress}%</span>
                  </div>
                  <div className="w-full bg-brand-navy/10 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-brand-orange h-full rounded-full transition-all duration-500"
                      style={{ width: `${simProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Steps Output Box */}
              <div className="flex-grow flex flex-col gap-4 overflow-y-auto pr-1">
                {simState === 'idle' && (
                  <div className="flex-grow flex flex-col items-center justify-center text-center p-6 gap-3">
                    <Sparkles className="w-10 h-10 text-brand-orange animate-pulse" />
                    <p className="text-sm font-semibold text-brand-navy">Pronto para a mágica?</p>
                    <p className="text-xs text-text-muted max-w-[280px]">Clique no botão ao lado para assistir a IA construindo o itinerário de viagem em tempo real.</p>
                  </div>
                )}

                {/* Day 1 Reveal */}
                {visibleDays.includes('day1') && (
                  <div className="bg-white border border-border-gray rounded-xl p-4 text-left shadow-sm animate-fade-in-up">
                    <div className="flex justify-between items-center mb-3">
                      <span className="bg-brand-orange/10 text-brand-orange text-[9px] font-bold px-2 py-0.5 rounded">DIA 1</span>
                      <span className="text-[10px] text-text-muted font-medium">Chegada a Tóquio (Shinjuku)</span>
                    </div>
                    <div className="flex flex-col gap-2.5">
                      <div className="flex gap-2.5 items-start text-xs text-brand-navy">
                        <span className="text-base shrink-0">🏨</span>
                        <div>
                          <strong className="block font-semibold">Check-in em Shinjuku</strong>
                          <span className="text-[10px] text-text-muted">Opção central próxima aos principais transportes.</span>
                        </div>
                      </div>
                      <div className="flex gap-2.5 items-start text-xs text-brand-navy">
                        <span className="text-base shrink-0">🗼</span>
                        <div>
                          <strong className="block font-semibold">Asakusa, Skytree e jantar em Shinjuku</strong>
                          <span className="text-[10px] text-text-muted">Roteiro completo do primeiro dia com passeios e gastronomia.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Day 2 Reveal */}
                {visibleDays.includes('day2') && (
                  <div className="bg-white border border-border-gray rounded-xl p-4 text-left shadow-sm animate-fade-in-up">
                    <div className="flex justify-between items-center mb-3">
                      <span className="bg-brand-orange/10 text-brand-orange text-[9px] font-bold px-2 py-0.5 rounded">DIA 2</span>
                      <span className="text-[10px] text-text-muted font-medium">Hakone & Monte Fuji</span>
                    </div>
                    <div className="flex flex-col gap-2.5">
                      <div className="flex gap-2.5 items-start text-xs text-brand-navy">
                        <span className="text-base shrink-0">🗻</span>
                        <div>
                          <strong className="block font-semibold">Hakone e vista do Monte Fuji</strong>
                          <span className="text-[10px] text-text-muted">Organização de rotas com deslocamentos e pontos de observação inclusos.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Day 3 Reveal */}
                {visibleDays.includes('day3') && (
                  <div className="bg-white border border-border-gray rounded-xl p-4 text-left shadow-sm animate-fade-in-up">
                    <div className="flex justify-between items-center mb-3">
                      <span className="bg-brand-orange/10 text-brand-orange text-[9px] font-bold px-2 py-0.5 rounded">DIA 3</span>
                      <span className="text-[10px] text-text-muted font-medium">Kyoto Clássico</span>
                    </div>
                    <div className="flex flex-col gap-2.5">
                      <div className="flex gap-2.5 items-start text-xs text-brand-navy">
                        <span className="text-base shrink-0">⛩️</span>
                        <div>
                          <strong className="block font-semibold">Kyoto clássico</strong>
                          <span className="text-[10px] text-text-muted">Aproveite os melhores templos budistas, ruelas medievais e santuários tradicionais.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </div>

          </div>

        </ScrollReveal>
      </section>

      {/* 5. APP DEMO (Seu roteiro ganha vida) */}
      <section id="demonstracao" className="py-24 md:py-32 bg-bg-light border-b border-border-gray">
        <ScrollReveal className="container mx-auto px-6">
          <div className="text-center max-w-[600px] mx-auto mb-16">
            <span className="bg-brand-orange/10 text-brand-orange text-[10px] font-extrabold tracking-widest px-3.5 py-1.5 rounded-full w-fit">
              DENTRO DO APP
            </span>
            <h2 className="font-headers text-3xl md:text-4xl font-extrabold mt-4 text-brand-navy tracking-tight">
              Seu roteiro ganha vida 📱
            </h2>
            <p className="text-sm text-text-muted mt-3">
              Veja como a 2GO organiza atrações, restaurantes, horários, deslocamentos e experiências em um único lugar.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
            
            {/* Left Column: Switcher buttons */}
            <div className="flex flex-col gap-4 text-left">
              {[
                { 
                  id: 'timeline', 
                  title: 'Linha do Tempo 📅', 
                  desc: 'Acompanhe seu roteiro diário estruturado minuto a minuto com recomendações locais integradas.', 
                  icon: <Clock className="w-5 h-5" /> 
                },
                { 
                  id: 'times', 
                  title: 'Horários, Atrações & Restaurantes 🍽️', 
                  desc: 'Dicas sobre os melhores horários de visitação de museus e indicações gastronômicas exclusivas baseadas no seu bolso.', 
                  icon: <Check className="w-5 h-5" /> 
                },
                { 
                  id: 'map', 
                  title: 'Deslocamentos & Mapa 🗺️', 
                  desc: 'Monitore rotas integradas a pé ou por transporte público. Navegue de forma segura sem depender de sinal de rede celular.', 
                  icon: <Map className="w-5 h-5" /> 
                },
                { 
                  id: 'chat', 
                  title: 'Experiência Personalizada 💬', 
                  desc: 'Tire dúvidas e solicite reservas ou readequações diretamente com guias e consultores parceiros em tempo real.', 
                  icon: <MessageSquare className="w-5 h-5" /> 
                }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveAppTab(tab.id)}
                  className={`p-5 rounded-[20px] border text-left transition-all duration-300 cursor-pointer flex gap-4 ${
                    activeAppTab === tab.id 
                      ? 'bg-white border-brand-navy shadow-md' 
                      : 'bg-transparent border-transparent hover:bg-white/40'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    activeAppTab === tab.id 
                      ? 'bg-brand-navy text-white' 
                      : 'bg-brand-navy/10 text-brand-navy'
                  }`}>
                    {tab.icon}
                  </div>
                  <div>
                    <h4 className="font-headers text-base font-bold text-brand-navy">{tab.title}</h4>
                    <p className="text-xs text-text-muted mt-1 leading-relaxed">{tab.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Right Column: High-Fidelity Bezel-less Smartphone Mockup */}
            <div className="flex justify-center">
              <div className="relative w-[280px] h-[560px] bg-brand-navy rounded-[40px] p-3 shadow-xl border-4 border-brand-navy flex flex-col overflow-hidden justify-between">
                
                {/* Notch */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-6 bg-brand-navy rounded-full z-30 flex items-center justify-center">
                  <div className="w-3.5 h-3.5 bg-black/40 rounded-full mr-2"></div>
                  <div className="w-8 h-1 bg-black/40 rounded-full"></div>
                </div>

                {/* Screen Canvas */}
                <div className="w-full h-full bg-white rounded-[32px] overflow-hidden relative flex flex-col justify-between p-5 pt-12 text-left select-none">
                  
                  {/* Timeline Screen */}
                  {activeAppTab === 'timeline' && (
                    <div className="animate-fade-in-up flex flex-col justify-between h-full">
                      <div>
                        <div className="flex justify-between items-center">
                          <span className="text-[9px] font-extrabold text-brand-orange uppercase tracking-wider">TIMELINE</span>
                          <span className="text-[8px] bg-brand-navy/5 text-brand-navy px-1.5 py-0.5 rounded font-bold">DIA 2</span>
                        </div>
                        <h4 className="font-headers text-base font-bold text-brand-navy mt-0.5">Atrações do Dia</h4>
                      </div>
                      
                      <div className="flex-grow my-4 bg-bg-light/60 rounded-xl border border-border-gray p-3 flex flex-col gap-3 overflow-y-auto">
                        <div className="bg-white p-2.5 rounded-lg border border-border-gray shadow-sm">
                          <div className="flex justify-between">
                            <span className="text-[9px] font-bold text-brand-navy">📍 Museus Capitolinos</span>
                            <span className="text-[8px] text-brand-green font-bold">4.7★</span>
                          </div>
                          <p className="text-[8px] text-text-muted mt-1">Horário recomendado: 10:00 - 12:00</p>
                        </div>
                        <div className="bg-white p-2.5 rounded-lg border border-border-gray shadow-sm">
                          <div className="flex justify-between">
                            <span className="text-[9px] font-bold text-brand-navy">⛲ Piazza Navona</span>
                            <span className="text-[8px] text-brand-green font-bold">4.8★</span>
                          </div>
                          <p className="text-[8px] text-text-muted mt-1">Horário recomendado: 15:30 - 17:00</p>
                        </div>
                      </div>

                      <button 
                        onClick={() => onNavigate('planner')}
                        className="bg-brand-navy text-white p-3 rounded-xl text-center text-[10px] font-bold shadow cursor-pointer border border-transparent hover:bg-brand-orange transition-colors"
                      >
                        Ver no planejador
                      </button>
                    </div>
                  )}

                  {/* Horários, Atrações & Restaurantes Screen */}
                  {activeAppTab === 'times' && (
                    <div className="animate-fade-in-up flex flex-col justify-between h-full">
                      <div>
                        <span className="text-[9px] font-extrabold text-brand-green uppercase tracking-wider">ATRAÇÕES & COMIDA</span>
                        <h4 className="font-headers text-base font-bold text-brand-navy mt-0.5">Parada Restaurante</h4>
                      </div>
                      
                      <div className="flex-grow my-4 bg-white border border-border-gray rounded-xl overflow-hidden shadow-sm flex flex-col justify-between">
                        <div className="p-3 bg-bg-light border-b border-border-gray flex flex-col gap-0.5">
                          <span className="text-[10px] font-bold text-brand-navy">🍽️ Trattoria da Enzo</span>
                          <span className="text-[8px] text-brand-green font-bold">Excelente custo-benefício</span>
                        </div>
                        <div className="p-3 text-[9px] text-text-muted flex flex-col gap-1.5">
                          <div className="flex justify-between"><span>Prato chefe:</span><span className="font-bold text-brand-navy">Pasta Carbonara</span></div>
                          <div className="flex justify-between"><span>Ideal para:</span><span className="font-bold text-brand-orange">13:15 - 14:30</span></div>
                          <div className="flex justify-between"><span>Média:</span><span className="font-bold text-brand-green">$$ • Econômico</span></div>
                        </div>
                      </div>

                      <button 
                        onClick={() => onNavigate('planner')}
                        className="bg-brand-orange text-white p-3 rounded-xl text-center text-[10px] font-bold shadow cursor-pointer border border-transparent hover:bg-brand-navy transition-colors"
                      >
                        Traçar Roteiro
                      </button>
                    </div>
                  )}

                  {/* Deslocamentos & Mapa Screen */}
                  {activeAppTab === 'map' && (
                    <div className="animate-fade-in-up flex flex-col justify-between h-full">
                      <div>
                        <span className="text-[9px] font-extrabold text-brand-navy uppercase tracking-wider">MAP VIEW</span>
                        <h4 className="font-headers text-base font-bold text-brand-navy mt-0.5">Deslocamentos</h4>
                      </div>

                      <div className="flex-grow my-4 bg-bg-light rounded-xl border border-border-gray relative overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 opacity-15" style={{
                          backgroundImage: 'radial-gradient(circle, #081B6B 2px, transparent 2px)',
                          backgroundSize: '12px 12px'
                        }}></div>
                        
                        <svg className="absolute w-full h-full" viewBox="0 0 100 100">
                          <path d="M 15,30 L 45,75 L 85,25" fill="none" stroke="#F47A20" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                          <circle cx="15" cy="30" r="3.5" fill="#081B6B" />
                          <circle cx="45" cy="75" r="3.5" fill="#96AB21" />
                          <circle cx="85" cy="25" r="3.5" fill="#081B6B" />
                        </svg>
                        <span className="bg-white border border-border-gray px-1.5 py-0.5 rounded text-[7px] font-bold text-brand-navy absolute top-4 left-4">Metrô Linha A (12 min)</span>
                      </div>
                    </div>
                  )}

                  {/* Chat / Experiência Personalizada Screen */}
                  {activeAppTab === 'chat' && (
                    <div className="animate-fade-in-up flex flex-col justify-between h-full text-xs">
                      <div className="border-b border-border-gray pb-2">
                        <span className="text-[9px] font-extrabold text-brand-green uppercase tracking-wider">CURADORIA VIP</span>
                        <h4 className="font-headers text-xs font-bold text-brand-navy">Especialista Local</h4>
                      </div>

                      <div className="flex-grow my-3 flex flex-col gap-2.5 overflow-y-auto justify-end pr-1 text-[8.5px]">
                        <div className="bg-[#E9EDF2] text-brand-navy rounded-[14px] rounded-bl-none p-2.5 max-w-[85%] self-start text-left leading-normal">
                          Olá! Notei que você adicionou a travessia pública em Santorini. Recomendo o catamarã rápido que sai 15 min mais cedo e poupa 1h de trajeto. Reservo?
                        </div>
                        <div className="bg-brand-navy text-white rounded-[14px] rounded-br-none p-2.5 max-w-[85%] self-end text-left leading-normal">
                          Perfeito! Já cai automático no app?
                        </div>
                        <div className="bg-[#E9EDF2] text-brand-navy rounded-[14px] rounded-bl-none p-2.5 max-w-[85%] self-start text-left leading-normal">
                          Sim! Travessia confirmada. O bilhete digital já está salvo na sua aba de Vouchers offline. 🎫⛵
                        </div>
                      </div>

                      <div className="bg-bg-light p-2 rounded-lg border border-border-gray flex items-center justify-between">
                        <span className="text-[8px] text-text-muted">Escrever mensagem...</span>
                        <span className="text-[8px] font-bold text-brand-orange uppercase">Enviar</span>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 6. EXPERIÊNCIA PERSONALIZADA (Premium replacement with Specialist support) */}
      <section id="premium" className="py-24 md:py-32 bg-brand-navy text-white relative overflow-hidden">
        {/* Decorative background glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none select-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-green/5 rounded-full blur-[100px] pointer-events-none select-none"></div>

        <ScrollReveal className="container mx-auto px-6">
          <div className="text-center max-w-[600px] mx-auto mb-16">
            <span className="bg-brand-orange text-white text-[10px] font-extrabold tracking-widest px-3.5 py-1 rounded-full w-fit">
              TOQUE HUMANO ESPECIALIZADO
            </span>
            <h2 className="font-headers text-3xl md:text-4xl font-extrabold mt-4 text-white tracking-tight">
              Experiência Personalizada 🌟
            </h2>
            <p className="text-sm text-white/75 mt-3">
              IA para planejar, especialistas locais para aperfeiçoar seu roteiro.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
            
            {/* Left Column: Chat Log Simulation Box */}
            <div className="bg-[#E9EDF2] rounded-[28px] p-6 shadow-xl flex flex-col gap-4 max-w-[420px] mx-auto w-full text-brand-navy relative border border-white/10">
              <div className="flex items-center gap-3 border-b border-brand-navy/10 pb-4">
                <div className="w-10 h-10 rounded-full bg-brand-navy flex items-center justify-center text-white font-headers font-bold text-sm">2GO</div>
                <div className="text-left">
                  <h4 className="text-sm font-bold text-brand-navy">Especialista Local</h4>
                  <span className="text-[10px] text-brand-green font-bold uppercase tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse"></span> Ativo agora
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3.5 h-[230px] pr-1 text-xs select-none justify-end">
                <div className="bg-white text-brand-navy rounded-[18px] rounded-bl-sm p-3.5 max-w-[85%] text-left self-start shadow-sm border border-border-gray leading-relaxed animate-fade-in-up">
                  Olá! Revisei seu roteiro criado por IA. Reparei que a balsa que você incluiu tem horários instáveis na temporada. Sugiro fazermos a travessia de catamarã privado. Posso reservar?
                </div>
                <div className="bg-brand-navy text-white rounded-[18px] rounded-br-sm p-3.5 max-w-[85%] text-left self-end shadow-sm leading-relaxed animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                  Perfeito, por favor reserve! O voucher é sincronizado direto no aplicativo também?
                </div>
                <div className="bg-white text-brand-navy rounded-[18px] rounded-bl-sm p-3.5 max-w-[85%] text-left self-start shadow-sm border border-border-gray leading-relaxed animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                  Confirmado! Travessia reservada e o bilhete digital já está na sua carteira de vouchers offline no app. Boa viagem! 🎫⛵
                </div>
              </div>
            </div>

            {/* Right Column: Curatorial support text */}
            <div className="flex flex-col gap-6 text-left">
              <h3 className="font-headers text-2xl md:text-3.5xl font-extrabold leading-tight text-white">
                IA + Curadoria Humana 🤝
              </h3>
              <p className="text-sm text-white/80 leading-relaxed">
                Para quem quer ir além da IA, a 2GO conecta você com especialistas que refinam seu roteiro com curadoria humana.
              </p>
              <p className="text-sm text-white/80 leading-relaxed">
                Nossos consultores parceiros revisam distâncias reais, garantem acesso prioritário a reservas concorridas e organizam vouchers digitais diretamente na sua conta.
              </p>

              <div className="flex flex-col gap-4 mt-2">
                <div className="flex gap-3 items-center">
                  <div className="w-5 h-5 rounded-full bg-brand-orange text-white flex items-center justify-center shrink-0 text-xs font-bold">✓</div>
                  <span className="text-sm font-semibold">Travessias, ingressos e reservas checados à mão</span>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="w-5 h-5 rounded-full bg-brand-orange text-white flex items-center justify-center shrink-0 text-xs font-bold">✓</div>
                  <span className="text-sm font-semibold">Curadoria VIP baseada no seu perfil de viajante</span>
                </div>
              </div>

              <button 
                onClick={onOpenDownload}
                className="btn btn-secondary w-fit mt-4 cursor-pointer hover:bg-white hover:text-brand-navy shadow-md font-bold text-sm transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
              >
                Consultar especialista 💬
              </button>
            </div>

          </div>
        </ScrollReveal>
      </section>

      {/* 7. AVALIAÇÕES (Verified human testimonials - NO STARS as requested) */}
      <section id="avaliacoes" className="py-24 md:py-32 bg-white border-b border-border-gray">
        <ScrollReveal className="container mx-auto px-6">
          <div className="text-center max-w-[600px] mx-auto mb-16">
            <span className="bg-brand-navy/10 text-brand-navy text-[10px] font-extrabold tracking-widest px-3 py-1 rounded-full w-fit">
              DEPOIMENTOS REAIS
            </span>
            <h2 className="font-headers text-3xl md:text-4xl font-extrabold mt-4 text-brand-navy tracking-tight">
              O que dizem sobre a 2GO 💬
            </h2>
            <p className="text-sm text-text-muted mt-3">
              Relatos honestos de quem planejou de forma inteligente e viajou com facilidade.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5.5xl mx-auto">
            {[
              { 
                name: 'Amanda Martins', 
                initial: 'AM', 
                text: 'Economizei horas de pesquisa.', 
                trip: 'Fernando de Noronha • Curadoria VIP' 
              },
              { 
                name: 'Rodrigo Fonseca', 
                initial: 'RF', 
                text: 'Parecia que o roteiro tinha sido feito por alguém que me conhecia.', 
                trip: 'Tóquio • Itinerário IA' 
              },
              { 
                name: 'Luísa Cavalcanti', 
                initial: 'LC', 
                text: 'Consegui organizar a viagem inteira em poucos minutos.', 
                trip: 'Serra Gaúcha • Consultoria' 
              }
            ].map((review, idx) => (
              <div key={idx} className="group bg-bg-light border border-border-gray p-8 rounded-[24px] shadow-sm hover:shadow-md hover:translate-y-[-4px] transition-all duration-300 flex flex-col text-left">
                <span className="bg-brand-green/10 text-brand-green text-[9px] font-extrabold tracking-widest px-2.5 py-1 rounded w-fit mb-6">FEEDBACK VERIFICADO</span>
                <p className="text-sm md:text-lg italic text-text-main leading-relaxed mb-8 flex-grow font-semibold text-brand-navy">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-border-gray/30">
                  <div className="w-10 h-10 rounded-full bg-brand-navy text-white font-headers font-bold text-sm flex items-center justify-center transition-transform group-hover:scale-105 duration-300">
                    {review.initial}
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-xs font-bold text-brand-navy">{review.name}</h4>
                    <span className="text-[10px] text-text-muted">{review.trip}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* 8. CTA FINAL (Conversion Closure with QR Code) */}
      <section className="py-24 md:py-32 bg-bg-light relative overflow-hidden">
        {/* Subtle orange/green decorative dots */}
        <div className="absolute top-10 left-10 w-2.5 h-2.5 bg-brand-orange/40 rounded-full"></div>
        <div className="absolute bottom-20 left-1/3 w-3 h-3 bg-brand-green/30 rounded-full"></div>
        <div className="absolute top-1/2 right-10 w-2 h-2 bg-brand-orange/30 rounded-full"></div>

        <ScrollReveal className="container mx-auto px-6">
          <div className="bg-gradient-to-br from-brand-orange/5 to-white border border-brand-orange/15 p-10 md:p-16 rounded-[28px] relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center gap-12 text-left shadow-md">
            
            {/* Left Column: CTA Texts */}
            <div className="lg:col-span-7 flex flex-col gap-6 relative z-10 text-brand-navy">
              <span className="bg-brand-orange text-white text-[9px] font-extrabold tracking-widest px-2.5 py-1 rounded-full w-fit">
                EXPLORE O NOVO
              </span>
              <h2 className="font-headers text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-brand-navy">
                Pronto para descobrir seu próximo destino? 🌍
              </h2>
              <p className="text-sm md:text-base text-text-muted leading-relaxed">
                Crie um roteiro com a sua cara e transforme o planejamento em parte da viagem.
              </p>
              
              <div className="flex flex-wrap gap-4 mt-2">
                <button 
                  onClick={() => onNavigate('planner')}
                  className="btn btn-primary flex items-center gap-2 cursor-pointer shadow-sm hover:bg-brand-orange px-8 py-3.5 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
                >
                  Gerar meu roteiro
                </button>
                <button 
                  onClick={onOpenDownload}
                  className="btn btn-outline text-brand-navy border-brand-navy bg-transparent hover:bg-brand-navy hover:text-white transition-all cursor-pointer px-8 py-3.5 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
                >
                  Baixar Aplicativo 📲
                </button>
              </div>
            </div>
            
            {/* Right Column: QR Code + Smartphone Visuals */}
            <div className="lg:col-span-5 relative z-10 flex gap-6 justify-center lg:justify-end items-center">
              
              {/* CSS-rendered QR Code Card */}
              <div className="bg-white p-4 rounded-[20px] border border-border-gray shadow-md flex flex-col items-center justify-center shrink-0 w-36 h-36 select-none hidden sm:flex text-brand-navy transition-transform duration-500 hover:scale-105">
                <div className="w-24 h-24 border-2 border-brand-navy/20 rounded-lg relative overflow-hidden flex items-center justify-center bg-bg-light">
                  <div className="absolute inset-1.5 opacity-20" style={{
                    backgroundImage: 'linear-gradient(#081B6B 2px, transparent 2px), linear-gradient(90deg, #081B6B 2px, transparent 2px)',
                    backgroundSize: '6px 6px'
                  }}></div>
                  <div className="bg-brand-navy text-white text-[8px] font-extrabold px-2 py-0.5 rounded border border-white/20 z-10 shadow-sm">
                    2GO
                  </div>
                </div>
                <span className="text-[8.5px] font-bold text-brand-navy uppercase tracking-wider mt-2 font-headers">Escanear App</span>
              </div>

              {/* Device mockup */}
              <img 
                src={appMockupImg} 
                alt="2GO App Mockup" 
                className="max-h-[380px] w-auto rounded-[20px] shadow-sm rotate-1 transition-transform duration-500 hover:rotate-0 hover:scale-102 bg-transparent"
              />

            </div>

          </div>
        </ScrollReveal>
      </section>

    </div>
  );
}
