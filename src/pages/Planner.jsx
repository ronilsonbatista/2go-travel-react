import React from 'react';
import PlannerWizard from '../components/PlannerWizard';

export default function Planner({ onOpenDownload }) {
  return (
    <div className="w-full bg-bg-light">
      
      {/* Planner Hero */}
      <section className="container mx-auto px-6 pt-40 pb-16 text-center">
        <span className="bg-brand-navy/10 text-brand-navy text-[10px] font-extrabold tracking-widest px-3 py-1 rounded-full w-fit mx-auto">
          ALGORITMO INTELIGENTE
        </span>
        <h1 className="font-headers text-4xl md:text-5xl lg:text-6xl font-extrabold text-brand-navy mt-6 mb-6">
          Planeje sua jornada premium
        </h1>
        <p className="text-base md:text-lg text-text-muted max-w-[600px] mx-auto leading-relaxed">
          Escolha suas preferências e deixe nossa tecnologia criar o roteiro perfeito e otimizado para o seu perfil em segundos.
        </p>
      </section>

      {/* Wizard section container */}
      <section className="py-20 border-t border-border-gray bg-bg-light">
        <div className="container mx-auto px-6">
          <PlannerWizard onOpenDownload={onOpenDownload} />
        </div>
      </section>

    </div>
  );
}
