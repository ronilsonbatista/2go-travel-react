import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw, Smartphone, ShieldAlert } from 'lucide-react';

const itineraryDatabase = {
  noronha: {
    title: 'Fernando de Noronha de Alto Padrão',
    desc: 'Um mergulho na exclusividade e na beleza natural do arquipélago mais preservado do Brasil.',
    days: [
      {
        day: 'Dia 1',
        title: 'Chegada ao Paraíso & Sunset Vip',
        events: [
          { time: '14:00', title: 'Check-in na Pousada Boutique (Nannai ou Maria Bonita)' },
          { time: '16:30', title: 'Navegação Privada ao Pôr do Sol com Espumante' },
          { time: '20:30', title: 'Jantar Gourmet no Restaurante Xica da Silva' }
        ]
      },
      {
        day: 'Dia 2',
        title: 'Exploração Subaquática & Baías Icônicas',
        events: [
          { time: '08:30', title: 'Mergulho com tartarugas e tubarões na Baía do Sueste' },
          { time: '12:00', title: 'Almoço com Vista Panorâmica na Baía dos Golfinhos' },
          { time: '14:30', title: 'Trilha Privativa e Descida à Baía do Sancho (Eleita a melhor praia)' },
          { time: '19:30', title: 'Experiência Gastronômica: Festival da Zé Maria' }
        ]
      },
      {
        day: 'Dia 3',
        title: 'Aventura Leve & Mirantes Privados',
        events: [
          { time: '09:00', title: 'Passeio de buggy off-road privativo pelas praias do Mar de Fora' },
          { time: '15:00', title: 'Trilha histórica da Fortaleza de Nossa Senhora dos Remédios' },
          { time: '18:00', title: 'Jantar de despedida no Bar do Meio (Música ao vivo e vista espetacular)' }
        ]
      }
    ]
  },
  rio: {
    title: 'Rio de Janeiro Experiência Exclusiva',
    desc: 'A essência carioca sofisticada, misturando história, natureza urbana e alta gastronomia.',
    days: [
      {
        day: 'Dia 1',
        title: 'Check-In Imperial & Orla no Ocaso',
        events: [
          { time: '13:00', title: 'Hospedagem no Copacabana Palace ou Hotel Emiliano' },
          { time: '16:00', title: 'Passeio Privativo de Helicóptero sobre o Cristo Redentor e Pão de Açúcar' },
          { time: '20:00', title: 'Jantar Harmonizado no Restaurante Michelin ORO (Chef Felipe Bronze)' }
        ]
      },
      {
        day: 'Dia 2',
        title: 'Natureza Imersiva & Arte Contemporânea',
        events: [
          { time: '09:00', title: 'Caminhada Privada com Guia pela Floresta da Tijuca até a Vista Chinesa' },
          { time: '13:00', title: 'Almoço sofisticado no Aprazível (Santa Teresa)' },
          { time: '15:30', title: 'Visita guiada exclusiva ao Museu de Arte Contemporânea (MAC Niterói)' },
          { time: '21:00', title: 'Drinks e Jazz ao vivo no moderníssimo Baretto-Londra (Ipanema)' }
        ]
      },
      {
        day: 'Dia 3',
        title: 'Mar do Rio & Despedida Premium',
        events: [
          { time: '10:00', title: 'Charter de Iate Privado ao longo da Baía de Guanabara e Ilhas Cagarras' },
          { time: '14:30', title: 'Almoço tardio no charmoso Satyricon' },
          { time: '17:30', title: 'Relax no Spa do hotel e check-out' }
        ]
      }
    ]
  },
  veadeiros: {
    title: 'Chapada dos Veadeiros Mística e Luxuosa',
    desc: 'Conexão profunda com a natureza dos cristais com total conforto e bem-estar.',
    days: [
      {
        day: 'Dia 1',
        title: 'Chegada ao Cerrado & Spa Wellness',
        events: [
          { time: '14:00', title: 'Check-in no Glamping de Luxo em Alto Paraíso' },
          { time: '16:30', title: 'Terapia de som e massagem holística no Spa da pousada' },
          { time: '20:00', title: 'Jantar orgânico farm-to-table no L\'Alcofa' }
        ]
      },
      {
        day: 'Dia 2',
        title: 'Canyons de Cristal & Saltos Majestosos',
        events: [
          { time: '08:30', title: 'Trilha Premium ao Parque Nacional: Mirante do Salto e Carrossel' },
          { time: '13:00', title: 'Piquenique gourmet servido à beira das águas na cachoeira' },
          { time: '15:30', title: 'Visita ao Vale da Lua com iluminação de final de tarde' },
          { time: '20:30', title: 'Degustação de cervejas artesanais locais e jantar sofisticado' }
        ]
      },
      {
        day: 'Dia 3',
        title: 'Cachoeira do Segredo & Conexão de Despedida',
        events: [
          { time: '09:00', title: 'Aventura 4x4 e trilha privativa até a belíssima Cachoeira do Segredo' },
          { time: '14:00', title: 'Almoço no Santo Cerrado Risoteria' },
          { time: '17:00', title: 'Transfer privado de retorno' }
        ]
      }
    ]
  },
  amazonas: {
    title: 'Imersão Eco-Luxo na Amazônia',
    desc: 'A grandiosidade da maior floresta tropical do mundo desbravada com sofisticação incomparável.',
    days: [
      {
        day: 'Dia 1',
        title: 'Chegada Flutuante & Encontro das Águas',
        events: [
          { time: '12:00', title: 'Transfer fluvial privado para o Mirante do Gavião Amazon Lodge' },
          { time: '15:30', title: 'Navegação de luxo para avistar o Encontro das Águas' },
          { time: '19:30', title: 'Jantar com culinária regional contemporânea assinada por Chef' }
        ]
      },
      {
        day: 'Dia 2',
        title: 'Despertar da Selva & Trilhas na Copa',
        events: [
          { time: '05:30', title: 'Canoagem matinal silenciosa para observação do nascer do sol e pássaros' },
          { time: '09:30', title: 'Trilha interpretativa de sobrevivência e botânica com guia indígena' },
          { time: '15:00', title: 'Focagem noturna de jacarés e sons da floresta em barco privativo' },
          { time: '20:30', title: 'Jantar na copa das árvores no mirante panorâmico do Lodge' }
        ]
      },
      {
        day: 'Dia 3',
        title: 'Visita Comunitária & Ritual de Despedida',
        events: [
          { time: '09:00', title: 'Visita guiada e intercâmbio cultural em comunidade ribeirinha sustentável' },
          { time: '13:00', title: 'Almoço de peixe assado na brasa na Ilha de Anavilhanas' },
          { time: '16:00', title: 'Retorno com transfer privativo para Manaus' }
        ]
      }
    ]
  },
  gramado: {
    title: 'Gramado e Canela Autêntico Europeu',
    desc: 'Romantismo, névoa, chocolate artesanal e o melhor do vinho nacional na Serra Gaúcha.',
    days: [
      {
        day: 'Dia 1',
        title: 'Chegada Serrana & Alta Gastronomia',
        events: [
          { time: '14:00', title: 'Hospedagem no requintado Hotel Kurotel ou Estalagem St. Hubertus' },
          { time: '16:30', title: 'Chá da tarde colonial privativo com vista para o Lago Negro' },
          { time: '20:30', title: 'Jantar Suíço Tradicional (Fondue Premium) no Belle du Valais' }
        ]
      },
      {
        day: 'Dia 2',
        title: 'Vales Vitivinícolas & Cascata do Caracol',
        events: [
          { time: '09:00', title: 'Tour privativo pelos vinhedos do Vale dos Vinhedos com degustação VIP' },
          { time: '13:30', title: 'Almoço harmonizado na vinícola Casa Valduga' },
          { time: '16:00', title: 'Parada no mirante exclusivo da Cascata do Caracol (Canela)' },
          { time: '20:30', title: 'Jantar contemporâneo no estrelado Wood Lounge Bar' }
        ]
      },
      {
        day: 'Dia 3',
        title: 'Chocolaterias Finas & Caminhos de Pedra',
        events: [
          { time: '10:00', title: 'Workshop privado de produção de trufas em fábrica artesanal boutique' },
          { time: '13:00', title: 'Almoço tipicamente italiano nos Caminhos de Pedra' },
          { time: '16:00', title: 'Check-out e transfer de retorno ao aeroporto de Porto Alegre' }
        ]
      }
    ]
  }
};

export default function PlannerWizard({ onOpenDownload }) {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [showResults, setShowResults] = useState(false);

  // Selections
  const [destination, setDestination] = useState('');
  const [style, setStyle] = useState('');
  const [duration, setDuration] = useState('');
  const [budget, setBudget] = useState('');

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      triggerLoadingSequence();
    }
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  const triggerLoadingSequence = () => {
    setLoading(true);
    const statuses = [
      'Analisando seu perfil de viajante...',
      'Mapeando melhores rotas locais...',
      'Buscando atrações gastronômicas exclusivas...',
      'Otimizando horários e conexões...',
      'Criando experiência premium personalizada...'
    ];

    let currentIdx = 0;
    setLoadingText(statuses[0]);

    const interval = setInterval(() => {
      currentIdx++;
      if (currentIdx < statuses.length) {
        setLoadingText(statuses[currentIdx]);
      } else {
        clearInterval(interval);
        setLoading(false);
        setShowResults(true);
      }
    }, 600);
  };

  const handleReset = () => {
    setStep(0);
    setDestination('');
    setStyle('');
    setDuration('');
    setBudget('');
    setShowResults(false);
  };

  const isNextDisabled = () => {
    if (step === 0) return !destination;
    if (step === 1) return !style;
    if (step === 2) return !duration || !budget;
    return true;
  };

  const activeItinerary = itineraryDatabase[destination] || itineraryDatabase.rio;

  return (
    <div className="max-w-[800px] mx-auto w-full">
      
      {/* 1. Step-by-step Wizard form */}
      {!loading && !showResults && (
        <div className="bg-white border border-border-gray p-8 md:p-12 rounded-[28px] shadow-md min-h-[420px] flex flex-col">
          
          {/* Step 0: Destination */}
          {step === 0 && (
            <div className="animate-fade-in-up">
              <span className="bg-brand-navy/10 text-brand-navy text-[10px] font-extrabold tracking-widest px-3 py-1 rounded-full w-fit">
                PASSO 1 DE 3
              </span>
              <h2 className="font-headers text-2xl md:text-3xl font-bold mt-4 text-brand-navy">
                Para onde você vai viajar?
              </h2>
              <p className="text-sm text-text-muted mt-2">Escolha um de nossos destinos integrados recomendados.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
                {[
                  { id: 'noronha', label: 'Fernando de Noronha', icon: '🏝️', desc: 'Ecoturismo exclusivo e praias.' },
                  { id: 'rio', label: 'Rio de Janeiro', icon: '🏖️', desc: 'Cultura vibrante e charme carioca.' },
                  { id: 'veadeiros', label: 'Chapada dos Veadeiros', icon: '✨', desc: 'Misticismo e cachoeiras de cristal.' },
                  { id: 'amazonas', label: 'Amazônia', icon: '🐆', desc: 'Eco-lodges e imersão profunda.' },
                  { id: 'gramado', label: 'Serra Gaúcha', icon: '🍷', desc: 'Vinho, fondue e charme europeu.' }
                ].map(opt => (
                  <button 
                    key={opt.id}
                    onClick={() => setDestination(opt.id)}
                    className={`text-left p-6 rounded-[20px] border transition-all duration-300 cursor-pointer flex flex-col gap-2 bg-white ${
                      destination === opt.id 
                        ? 'border-brand-navy bg-brand-navy/5 shadow-sm' 
                        : 'border-border-gray hover:border-brand-navy/30 hover:shadow-md'
                    }`}
                  >
                    <span className="text-3xl">{opt.icon}</span>
                    <h4 className="font-headers text-base font-bold text-brand-navy">{opt.label}</h4>
                    <p className="text-xs text-text-muted">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 1: Style */}
          {step === 1 && (
            <div className="animate-fade-in-up">
              <span className="bg-brand-navy/10 text-brand-navy text-[10px] font-extrabold tracking-widest px-3 py-1 rounded-full w-fit">
                PASSO 2 DE 3
              </span>
              <h2 className="font-headers text-2xl md:text-3xl font-bold mt-4 text-brand-navy">
                Qual é o estilo da sua viagem?
              </h2>
              <p className="text-sm text-text-muted mt-2">Personalize a curadoria das atividades sugeridas.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
                {[
                  { id: 'aventura', label: 'Aventura & Ação', icon: '🧗', desc: 'Trilhas, mirantes desafiadores e esportes.' },
                  { id: 'cultura', label: 'Cultural & Histórico', icon: '🏛️', desc: 'Museus, patrimônio e passeios guiados.' },
                  { id: 'natureza', label: 'Natureza & Bem-Estar', icon: '🌿', desc: 'Spas, retiros e águas termais.' },
                  { id: 'gastronomia', label: 'Alta Gastronomia', icon: '🍽️', desc: 'Festivais, risoterias e jantares chef.' }
                ].map(opt => (
                  <button 
                    key={opt.id}
                    onClick={() => setStyle(opt.id)}
                    className={`text-left p-6 rounded-[20px] border transition-all duration-300 cursor-pointer flex flex-col gap-2 bg-white ${
                      style === opt.id 
                        ? 'border-brand-navy bg-brand-navy/5 shadow-sm' 
                        : 'border-border-gray hover:border-brand-navy/30 hover:shadow-md'
                    }`}
                  >
                    <span className="text-3xl">{opt.icon}</span>
                    <h4 className="font-headers text-base font-bold text-brand-navy">{opt.label}</h4>
                    <p className="text-xs text-text-muted">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Duration and budget */}
          {step === 2 && (
            <div className="animate-fade-in-up">
              <span className="bg-brand-navy/10 text-brand-navy text-[10px] font-extrabold tracking-widest px-3 py-1 rounded-full w-fit">
                PASSO 3 DE 3
              </span>
              <h2 className="font-headers text-2xl md:text-3xl font-bold mt-4 text-brand-navy">
                Duração e Orçamento
              </h2>
              <p className="text-sm text-text-muted mt-2">Ajuste o período desejado e nível de conforto da viagem.</p>
              
              <h3 className="text-sm font-headers text-brand-navy/80 font-bold mt-6 mb-3">Duração da Viagem</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: '3', label: 'Curta (3 Dias)', icon: '⏱️', desc: 'Foco no essencial.' },
                  { id: '5', label: 'Padrão (5 Dias)', icon: '🗓️', desc: 'Exploração ideal.' },
                  { id: '7', label: 'Imersiva (7 Dias)', icon: '✈️', desc: 'Sem pressa.' }
                ].map(opt => (
                  <button 
                    key={opt.id}
                    onClick={() => setDuration(opt.id)}
                    className={`text-left p-5 rounded-[20px] border transition-all duration-300 cursor-pointer flex flex-col gap-1 bg-white ${
                      duration === opt.id 
                        ? 'border-brand-navy bg-brand-navy/5 shadow-sm' 
                        : 'border-border-gray hover:border-brand-navy/30 hover:shadow-md'
                    }`}
                  >
                    <span className="text-2xl">{opt.icon}</span>
                    <h4 className="font-headers text-sm font-bold text-brand-navy">{opt.label}</h4>
                    <p className="text-[10px] text-text-muted">{opt.desc}</p>
                  </button>
                ))}
              </div>

              <h3 className="text-sm font-headers text-brand-navy/80 font-bold mt-6 mb-3">Orçamento Estimado</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: 'moderado', label: 'Padrão Moderado', icon: '💳', desc: 'Curadoria gastronômica de ótimo custo.' },
                  { id: 'luxo', label: 'Alto Luxo Premium', icon: '👑', desc: 'Experiências vips exclusivas e iates.' }
                ].map(opt => (
                  <button 
                    key={opt.id}
                    onClick={() => setBudget(opt.id)}
                    className={`text-left p-5 rounded-[20px] border transition-all duration-300 cursor-pointer flex flex-col gap-1 bg-white ${
                      budget === opt.id 
                        ? 'border-brand-navy bg-brand-navy/5 shadow-sm' 
                        : 'border-border-gray hover:border-brand-navy/30 hover:shadow-md'
                    }`}
                  >
                    <span className="text-2xl">{opt.icon}</span>
                    <h4 className="font-headers text-sm font-bold text-brand-navy">{opt.label}</h4>
                    <p className="text-[10px] text-text-muted">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-12 pt-6 border-t border-border-gray">
            <button 
              onClick={handlePrev} 
              disabled={step === 0}
              className="btn btn-outline cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
            </button>
            <button 
              onClick={handleNext} 
              disabled={isNextDisabled()}
              className={`btn cursor-pointer ${
                step === 2 ? 'btn-primary' : 'btn-outline'
              } disabled:opacity-30 disabled:pointer-events-none`}
            >
              {step === 2 ? 'Gerar Roteiro' : 'Avançar'} <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>

        </div>
      )}

      {/* 2. Loading Spinner sequence */}
      {loading && (
        <div className="bg-white border border-border-gray p-12 rounded-[28px] shadow-md flex flex-col items-center justify-center gap-6 py-20 text-center animate-fade-in-up">
          <div className="w-12 h-12 border-4 border-border-gray border-t-brand-orange rounded-full animate-spin"></div>
          <h3 className="font-headers text-xl md:text-2xl font-bold text-brand-navy mt-2">
            {loadingText}
          </h3>
          <p className="text-sm text-text-muted">Processando dados com inteligência artificial...</p>
        </div>
      )}

      {/* 3. Itinerary Results Panel */}
      {showResults && (
        <div className="animate-fade-in-up">
          {/* Results Header block */}
          <div className="bg-white border border-border-gray p-8 rounded-[20px] shadow-md mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="text-left">
              <span className="bg-brand-orange text-white text-[10px] font-extrabold tracking-widest px-3 py-1 rounded-full w-fit">
                ROTEIRO GERADO
              </span>
              <h2 className="font-headers text-2xl md:text-3xl font-bold text-brand-navy mt-3">
                {activeItinerary.title}
              </h2>
              <p className="text-sm text-text-muted mt-2 max-w-[500px]">
                {activeItinerary.desc}
              </p>
            </div>
            
            <div className="flex gap-3 w-full md:w-auto">
              <button 
                onClick={onOpenDownload}
                className="btn btn-primary justify-center shadow-md cursor-pointer hover:bg-brand-orange"
              >
                <Smartphone className="w-4 h-4 mr-2" /> Importar no App
              </button>
              <button 
                onClick={handleReset}
                className="btn btn-outline cursor-pointer"
                aria-label="Refazer roteiro"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Conversion Warning Block */}
          <div className="bg-brand-orange/5 border border-brand-orange/20 p-6 rounded-[20px] mb-8 flex gap-4 text-left items-start">
            <ShieldAlert className="w-6 h-6 text-brand-orange shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1">
              <span className="font-headers text-xs font-bold text-brand-orange uppercase tracking-widest">
                Recurso exclusivo no App
              </span>
              <p className="text-xs md:text-sm text-brand-navy leading-relaxed">
                🔒 **RECURSO EXCLUSIVO NO APP**: Baixe o aplicativo 2GO para ativar a navegação por GPS guiada por áudio, mapas de satélite 3D offline e sincronização de vouchers offline para este roteiro.
              </p>
            </div>
          </div>

          {/* Day-by-Day Timeline */}
          <div className="relative pl-8 flex flex-col gap-6 before:content-[''] before:absolute before:top-0 before:left-3.5 before:w-[2px] before:h-full before:bg-border-gray">
            {activeItinerary.days.map((day, idx) => (
              <div key={idx} className="relative bg-white border border-border-gray p-6 rounded-[20px] shadow-sm hover:shadow-md transition-all duration-300">
                {/* Timeline Dot decoration */}
                <div className="absolute top-8 left-[calc(-32px-8px)] w-6 h-6 rounded-full bg-bg-light border-2 border-brand-navy flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-orange shadow-[0_2px_6px_rgba(244,122,32,0.4)]"></div>
                </div>
                
                <span className="font-headers text-xs font-bold text-brand-orange uppercase tracking-wider">
                  {day.day}
                </span>
                <h3 className="font-headers text-xl font-bold text-brand-navy mt-1 mb-4">
                  {day.title}
                </h3>
                
                <ul className="flex flex-col gap-3.5 list-none">
                  {day.events.map((evt, eIdx) => (
                    <li key={eIdx} className="flex gap-4 text-sm md:text-base text-text-main items-start">
                      <span className="font-headers text-xs font-bold text-brand-navy bg-bg-light border border-border-gray px-2.5 py-1 rounded-md mt-0.5 whitespace-nowrap">
                        {evt.time}
                      </span>
                      <div className="leading-relaxed mt-0.5">{evt.title}</div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Call to Action banner in Navy Background */}
          <div className="bg-brand-navy text-white p-8 md:p-12 rounded-[28px] mt-12 text-center flex flex-col items-center gap-4 shadow-lg border border-brand-navy">
            <h3 className="font-headers text-xl md:text-3xl font-extrabold tracking-tight">
              Sua próxima grande história começa com um download
            </h3>
            <p className="text-sm text-white/80 max-w-[520px] leading-relaxed">
              Junte-se a milhares de viajantes exigentes que redefiniram sua forma de explorar o mundo. Planeje em segundos, viva intensamente com o aplicativo 2GO.
            </p>
            <div className="flex gap-4 mt-4 w-full justify-center max-w-[420px] flex-col sm:flex-row">
              <button 
                onClick={onOpenDownload}
                className="btn btn-secondary py-3.5 px-6 shadow-md cursor-pointer hover:bg-white hover:text-brand-navy"
              >
                Importar para o Celular
              </button>
              <button 
                onClick={handleReset}
                className="btn border border-white/30 text-white bg-transparent py-3.5 px-6 hover:bg-white/10 hover:border-white transition-all cursor-pointer"
              >
                Criar Outro Roteiro
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
