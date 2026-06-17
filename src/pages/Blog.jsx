import React from 'react';
import { ArrowRight } from 'lucide-react';

import noronhaImg from '../assets/noronha.png';
import rioImg from '../assets/rio.png';
import veadeirosImg from '../assets/veadeiros.png';
import amazonasImg from '../assets/amazonas.png';
import gramadoImg from '../assets/gramado.png';
import heroBg from '../assets/hero-bg.png';
import appMockup from '../assets/app-mockup.png';

const blogPosts = [
  {
    id: 1,
    title: 'O guia gastronômico definitivo do Rio: Do botequim raiz ao Michelin',
    desc: 'Onde comer no Leblon, Copacabana e Santa Teresa para vivenciar a verdadeira alma culinária carioca. (Roteiro disponível no App)',
    category: 'GASTRONOMIA',
    date: '10 Jun, 2026',
    author: 'Ricardo Santos',
    readTime: '4 min',
    img: rioImg
  },
  {
    id: 2,
    title: 'Glampings na Chapada dos Veadeiros: Acampando com luxo absoluto',
    desc: 'Os melhores refúgios com domos geodésicos, banheiras de imersão e vista para o céu estrelado do Cerrado. (Roteiro disponível no App)',
    category: 'ECOTURISMO',
    date: '08 Jun, 2026',
    author: 'Mariana Lima',
    readTime: '5 min',
    img: veadeirosImg
  },
  {
    id: 3,
    title: 'Como planejar sua primeira imersão de luxo na Floresta Amazônica',
    desc: 'Checklist de preparação, vacinas, roupas recomendadas e a escolha perfeita do hotel de selva sustentável. (Roteiro disponível no App)',
    category: 'AVENTURA',
    date: '05 Jun, 2026',
    author: 'Thiago Costa',
    readTime: '7 min',
    img: amazonasImg
  },
  {
    id: 4,
    title: 'Roteiro de Inverno: As melhores vinícolas da Serra Gaúcha',
    desc: 'Degustações guiadas por sommeliers, almoços harmonizados e hospedagens charmosas nos arredores de Canela. (Roteiro disponível no App)',
    category: 'VINHOS',
    date: '02 Jun, 2026',
    author: 'Sofia Müller',
    readTime: '4 min',
    img: gramadoImg
  },
  {
    id: 5,
    title: 'Como viajar mais leve sem abrir mão do conforto e sofisticação',
    desc: 'Dicas práticas de organização de mala inteligente para viagens de fim de semana ou roteiros mais extensos.',
    category: 'DICAS',
    date: '28 Mai, 2026',
    author: 'Amanda Melo',
    readTime: '3 min',
    img: heroBg
  },
  {
    id: 6,
    title: 'Tecnologia na estrada: Como o app 2GO elimina o estresse de rotas',
    desc: 'Entenda os bastidores da nossa inteligência artificial e de como os mapas off-line funcionam no seu celular.',
    category: 'TECNOLOGIA',
    date: '25 Mai, 2026',
    author: 'Time de Tecnologia',
    readTime: '5 min',
    img: appMockup
  }
];

export default function Blog({ onNavigate }) {
  return (
    <div className="w-full bg-bg-light">
      
      {/* Blog Hero */}
      <section className="container mx-auto px-6 pt-40 pb-16 text-center">
        <span className="bg-brand-navy/10 text-brand-navy text-[10px] font-extrabold tracking-widest px-3 py-1 rounded-full w-fit mx-auto">
          BLOG EDITORIAL
        </span>
        <h1 className="font-headers text-4xl md:text-5xl lg:text-6xl font-extrabold text-brand-navy mt-6 mb-6">
          Descubra seu próximo destino
        </h1>
        <p className="text-base md:text-lg text-text-muted max-w-[600px] mx-auto leading-relaxed">
          Curadoria exclusiva de dicas de viagem, gastronomia de alto padrão e roteiros detalhados elaborados por quem entende de verdade.
        </p>
      </section>

      {/* Featured Cover Story */}
      <section className="container mx-auto px-6 mb-20">
        <div className="bg-white border border-border-gray grid grid-cols-1 lg:grid-cols-12 rounded-[28px] overflow-hidden min-h-[420px] shadow-sm hover:shadow-md transition-all duration-300">
          <div className="lg:col-span-7 h-64 lg:h-auto overflow-hidden bg-bg-light">
            <img 
              src={noronhaImg} 
              alt="Fernando de Noronha Sancho" 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-102"
            />
          </div>
          <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-center text-left">
            <div className="flex gap-3 text-xs text-text-muted mb-4 items-center font-medium">
              <span className="bg-brand-navy text-white text-[9px] font-extrabold tracking-widest px-2.5 py-1 rounded">CURADORIA</span>
              <span>12 Jun, 2026</span>
              <span>• 6 min de leitura</span>
            </div>
            <h2 className="font-headers text-2xl md:text-3xl font-bold text-brand-navy mb-4 leading-snug">
              5 segredos de Fernando de Noronha que você não encontra em guias comuns
            </h2>
            <p className="text-sm text-text-muted leading-relaxed mb-6">
              Do mirante secreto da Baía dos Porcos às mesas mais reservadas da Vila dos Remédios, listamos os caminhos exclusivos recomendados por especialistas locais. Importe esta rota diretamente no app 2GO.
            </p>
            <button 
              onClick={() => onNavigate('planner')}
              className="btn btn-outline btn-sm w-fit inline-flex items-center gap-2 cursor-pointer"
            >
              Ver Roteiro no App <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Filter and Grid articles */}
      <section className="py-20 border-t border-border-gray bg-bg-light">
        <div className="container mx-auto px-6">
          
          {/* Category Tabs Mockup */}
          <div className="flex gap-3 overflow-x-auto pb-4 mb-10 custom-scrollbar-hide">
            {['Todos os posts', 'Dicas de Viagem', 'Destinos Curados', 'Gastronomia VIP'].map((tab, idx) => (
              <button 
                key={idx}
                onClick={() => alert(`Filtrando por: ${tab}`)}
                className={`px-5 py-2.5 rounded-full border text-xs font-headers font-bold cursor-pointer transition-all ${
                  idx === 0 
                    ? 'bg-brand-navy text-white border-brand-navy' 
                    : 'bg-white border-border-gray text-brand-navy/70 hover:border-brand-navy hover:text-brand-navy hover:shadow-sm'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Grid list of articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map(post => (
              <article 
                key={post.id} 
                onClick={() => onNavigate('planner')}
                className="bg-white border border-border-gray flex flex-col rounded-[20px] overflow-hidden cursor-pointer shadow-sm hover:shadow-md hover:translate-y-[-4px] transition-all duration-300"
              >
                <div className="h-56 overflow-hidden bg-bg-light">
                  <img 
                    src={post.img} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6 flex flex-col gap-4 text-left flex-grow">
                  <div className="flex justify-between text-xs text-text-muted items-center font-medium">
                    <span className="bg-brand-orange/10 text-brand-orange text-[9px] font-extrabold tracking-widest px-2 py-0.5 rounded">{post.category}</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="font-headers text-lg font-bold text-brand-navy leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {post.desc}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-border-gray flex justify-between text-[10px] text-text-muted font-medium">
                    <span>{post.author}</span>
                    <span>{post.readTime} de leitura</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
