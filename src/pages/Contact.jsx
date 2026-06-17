import React from 'react';
import ContactForm from '../components/ContactForm';

export default function Contact() {
  return (
    <div className="w-full bg-bg-light">
      
      {/* Contact Hero */}
      <section className="container mx-auto px-6 pt-40 pb-16 text-center">
        <span className="bg-brand-navy/10 text-brand-navy text-[10px] font-extrabold tracking-widest px-3 py-1 rounded-full w-fit mx-auto">
          FALE CONOSCO
        </span>
        <h1 className="font-headers text-4xl md:text-5xl lg:text-6xl font-extrabold text-brand-navy mt-6 mb-6">
          Estamos aqui para ajudar
        </h1>
        <p className="text-base md:text-lg text-text-muted max-w-[600px] mx-auto leading-relaxed">
          Dúvidas sobre o aplicativo, sugestões ou suporte VIP? Nossa equipe de atendimento premium responderá o mais rápido possível.
        </p>
      </section>

      {/* Main Grid Wrapper */}
      <section className="py-20 border-t border-border-gray bg-white">
        <div className="container mx-auto px-6">
          <ContactForm />
        </div>
      </section>

    </div>
  );
}
