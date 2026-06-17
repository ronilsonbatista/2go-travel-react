import React from 'react';
import { ShieldCheck, Sparkles, Cpu, Download } from 'lucide-react';
import heroBg from '../assets/hero-bg.png';
import appMockup from '../assets/app-mockup.png';

export default function About({ onNavigate, onOpenDownload }) {
  return (
    <div className="w-full bg-bg-light">
      
      {/* 1. About Hero */}
      <section className="container mx-auto px-6 pt-40 pb-16 text-center">
        <span className="bg-brand-navy/10 text-brand-navy text-[10px] font-extrabold tracking-widest px-3 py-1 rounded-full w-fit mx-auto">
          NOSSA FILOSOFIA
        </span>
        <h1 className="font-headers text-4xl md:text-5xl lg:text-6xl font-extrabold text-brand-navy mt-6 mb-6">
          Viajar com Propósito: A excelência de cada jornada
        </h1>
        <p className="text-base md:text-lg text-text-muted max-w-[700px] mx-auto leading-relaxed">
          A 2GO não é apenas sobre o destino final. É sobre a excelência da sua jornada, aliando curadoria humana de alto padrão a uma engenharia logística preditiva impecável.
        </p>
      </section>

      {/* 2. Brand Narrative Grid */}
      <section className="py-20 bg-white border-t border-border-gray">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="rounded-[20px] border border-border-gray overflow-hidden shadow-sm">
            <img src={heroBg} alt="Nossa Missão 2GO" className="w-full h-auto object-cover" />
          </div>
          
          <div className="flex flex-col gap-6 text-left">
            <span className="bg-brand-orange/10 text-brand-orange text-[10px] font-extrabold tracking-widest px-3 py-1 rounded-full w-fit">
              ORIGEM
            </span>
            <h2 className="font-headers text-3xl md:text-4xl font-bold text-brand-navy">
              Desenhada por viajantes, para viajantes exigentes
            </h2>
            <p className="text-sm md:text-base text-text-muted leading-relaxed">
              A 2GO surgiu em 2024 a partir da frustração de viajantes assíduos que gastavam horas montando planilhas de itinerários complicados, pesquisando em dezenas de blogs e se deparando com conexões ineficientes.
            </p>
            <p className="text-sm md:text-base text-text-muted leading-relaxed">
              Nossa proposta é simplificar essa jornada. Desenvolvemos um algoritmo avançado que analisa milhares de pontos turísticos, rotas, avaliações reais e horários de funcionamento, cruzando com o seu estilo pessoal para entregar um roteiro perfeito e sob medida em segundos.
            </p>
            <p className="text-sm md:text-base text-text-muted leading-relaxed">
              Mas não paramos por aí: integramos tudo isso em um app de navegação fluida, off-line e interativa, que acompanha você durante cada passo, deixando-o livre para apenas curtir a viagem.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Pillars / Values */}
      <section className="py-20 md:py-28 bg-bg-light border-y border-border-gray">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-[600px] mx-auto mb-16">
            <span className="bg-brand-navy/10 text-brand-navy text-[10px] font-extrabold tracking-widest px-3 py-1 rounded-full w-fit mx-auto">
              PILARES
            </span>
            <h2 className="font-headers text-3xl md:text-4xl font-bold mt-4 text-brand-navy">
              Nossos Compromissos
            </h2>
            <p className="text-sm text-text-muted mt-3">
              Como garantimos que cada viagem planejada na 2GO seja única e de alto padrão.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white border border-border-gray p-8 md:p-10 rounded-[20px] shadow-sm hover:shadow-md hover:translate-y-[-4px] transition-all duration-300 flex flex-col items-start text-left">
              <div className="w-14 h-14 rounded-xl bg-brand-navy/10 text-brand-navy flex items-center justify-center mb-8">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="font-headers text-xl font-bold text-brand-navy mb-3">Curadoria Cirúrgica</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Nenhuma recomendação entra em nossos guias de forma automatizada. Selecionamos e auditamos cada parceiro pessoalmente para garantir relevância absoluta.
              </p>
            </div>

            <div className="bg-white border border-border-gray p-8 md:p-10 rounded-[20px] shadow-sm hover:shadow-md hover:translate-y-[-4px] transition-all duration-300 flex flex-col items-start text-left">
              <div className="w-14 h-14 rounded-xl bg-brand-navy/10 text-brand-navy flex items-center justify-center mb-8">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="font-headers text-xl font-bold text-brand-navy mb-3">Logística Preditiva</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Nosso algoritmo calcula trajetos inteligentes que agrupam pontos de interesse por proximidade, economizando até 3 horas de deslocamentos desnecessários diariamente.
              </p>
            </div>

            <div className="bg-white border border-border-gray p-8 md:p-10 rounded-[20px] shadow-sm hover:shadow-md hover:translate-y-[-4px] transition-all duration-300 flex flex-col items-start text-left">
              <div className="w-14 h-14 rounded-xl bg-brand-navy/10 text-brand-navy flex items-center justify-center mb-8">
                <Cpu className="w-7 h-7" />
              </div>
              <h3 className="font-headers text-xl font-bold text-brand-navy mb-3">Liberdade Desconectada</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                O mundo real não possui Wi-Fi estável em todas as rotas. Nossos mapas, roteiros e vouchers de confirmação funcionam 100% off-line com GPS ativo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Stats Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-[600px] mx-auto mb-16">
            <span className="bg-brand-orange/10 text-brand-orange text-[10px] font-extrabold tracking-widest px-3 py-1 rounded-full w-fit">
              NOSSO IMPACTO
            </span>
            <h2 className="font-headers text-3xl md:text-4xl font-bold mt-4 text-brand-navy">
              A 2GO em Números
            </h2>
            <p className="text-sm text-text-muted mt-3">
              Orgulho do que já construímos e animados com o que está por vir.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-border-gray p-8 rounded-[20px] text-center shadow-sm hover:shadow-md hover:translate-y-[-4px] transition-all duration-300">
              <div className="font-headers text-5xl font-extrabold text-brand-orange mb-3">50K+</div>
              <h4 className="font-headers text-base font-bold text-brand-navy">Roteiros Gerados</h4>
              <p className="text-xs text-text-muted mt-2">Jornadas únicas planejadas no Brasil.</p>
            </div>
            
            <div className="bg-white border border-border-gray p-8 rounded-[20px] text-center shadow-sm hover:shadow-md hover:translate-y-[-4px] transition-all duration-300">
              <div className="font-headers text-5xl font-extrabold text-brand-orange mb-3">98%</div>
              <h4 className="font-headers text-base font-bold text-brand-navy">Satisfação dos Clientes</h4>
              <p className="text-xs text-text-muted mt-2">Aprovado pelos viajantes mais experientes.</p>
            </div>

            <div className="bg-white border border-border-gray p-8 rounded-[20px] text-center shadow-sm hover:shadow-md hover:translate-y-[-4px] transition-all duration-300">
              <div className="font-headers text-5xl font-extrabold text-brand-orange mb-3">4.9★</div>
              <h4 className="font-headers text-base font-bold text-brand-navy">Avaliação nas Lojas</h4>
              <p className="text-xs text-text-muted mt-2">Consolidado como app premium essencial.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA Section in bold Navy background */}
      <section className="py-20 md:py-28 bg-white border-t border-border-gray">
        <div className="container mx-auto px-6">
          <div className="bg-brand-navy border border-brand-navy p-10 md:p-16 rounded-[28px] relative overflow-hidden grid grid-cols-1 lg:grid-cols-2 items-center gap-12 text-left shadow-lg text-white">
            <div className="flex flex-col gap-6 relative z-10">
              <span className="bg-brand-orange text-white text-[10px] font-extrabold tracking-widest px-3 py-1 rounded-full w-fit">
                SUA PRÓXIMA AVENTURA
              </span>
              <h2 className="font-headers text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
                Pronto para mudar a forma como você explora?
              </h2>
              <p className="text-sm md:text-base text-white/80 leading-relaxed">
                Baixe agora o aplicativo 2GO e comece a navegar no seu roteiro personalizado em poucos toques. Descubra locais incríveis com total tranquilidade.
              </p>
              
              <div className="flex flex-wrap gap-4 mt-2">
                <button 
                  onClick={onOpenDownload}
                  className="btn btn-secondary flex items-center gap-2 cursor-pointer hover:bg-white hover:text-brand-navy"
                >
                  <Download className="w-5 h-5" /> Baixar Aplicativo
                </button>
                <button 
                  onClick={() => onNavigate('planner')}
                  className="btn border border-white/30 text-white bg-transparent hover:bg-white/10 hover:border-white transition-all cursor-pointer"
                >
                  Planejar Web
                </button>
              </div>
            </div>
            
            <div className="relative z-10 flex justify-center items-center">
              <img 
                src={appMockup} 
                alt="2GO App Mockup" 
                className="max-h-[440px] w-auto rounded-[20px] shadow-xl rotate-2 transition-transform duration-500 hover:rotate-0 hover:scale-102 bg-transparent"
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
