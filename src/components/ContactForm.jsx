import React, { useState } from 'react';
import { Mail, MessageSquare, MapPin, Send } from 'lucide-react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12 w-full">
      
      {/* Left Info side */}
      <div className="flex flex-col gap-6">
        {/* Support Card */}
        <div className="flex gap-4 p-6 rounded-[20px] bg-white border border-border-gray shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all duration-300">
          <div className="w-12 h-12 rounded-xl bg-brand-navy/10 text-brand-navy flex items-center justify-center flex-shrink-0">
            <Mail className="w-5 h-5" />
          </div>
          <div className="text-left">
            <h4 className="font-headers text-base font-bold text-brand-navy">E-mail de Suporte</h4>
            <p className="text-sm text-text-main mt-1 font-medium">vip@2go.travel</p>
            <p className="text-[11px] text-text-muted mt-0.5">Tempo de resposta: até 2 horas</p>
          </div>
        </div>

        {/* Partnership Card */}
        <div className="flex gap-4 p-6 rounded-[20px] bg-white border border-border-gray shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all duration-300">
          <div className="w-12 h-12 rounded-xl bg-brand-navy/10 text-brand-navy flex items-center justify-center flex-shrink-0">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div className="text-left">
            <h4 className="font-headers text-base font-bold text-brand-navy">Parcerias & Imprensa</h4>
            <p className="text-sm text-text-main mt-1 font-medium">parcerias@2go.travel</p>
            <p className="text-[11px] text-text-muted mt-0.5">Para agências de turismo e criadores</p>
          </div>
        </div>

        {/* Location Card */}
        <div className="flex gap-4 p-6 rounded-[20px] bg-white border border-border-gray shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all duration-300">
          <div className="w-12 h-12 rounded-xl bg-brand-navy/10 text-brand-navy flex items-center justify-center flex-shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div className="text-left">
            <h4 className="font-headers text-base font-bold text-brand-navy">Nosso QG</h4>
            <p className="text-sm text-text-main mt-1 font-medium">Av. Brigadeiro Faria Lima, 2200 - Pinheiros</p>
            <p className="text-[11px] text-text-muted mt-0.5">São Paulo - SP, Brasil</p>
          </div>
        </div>

        {/* Pulsing Vector Map container in minimal light design */}
        <div className="relative h-[250px] border border-border-gray rounded-[20px] overflow-hidden bg-bg-light shadow-sm">
          <div 
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: 'linear-gradient(rgba(8, 27, 107, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(8, 27, 107, 0.05) 1px, transparent 1px)',
              backgroundSize: '25px 25px'
            }}
          ></div>
          
          {/* Pulsing Map Pin in brand Orange/Navy */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-5 h-5 bg-brand-orange rounded-full relative z-10 shadow-[0_2px_10px_rgba(244,122,32,0.6)] flex items-center justify-center border-2 border-white">
              <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
            </div>
            {/* Animated Pulses */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-brand-orange rounded-full animate-ping opacity-60"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-brand-navy/20 rounded-full animate-ping opacity-30" style={{ animationDelay: '0.6s' }}></div>
          </div>
        </div>
      </div>

      {/* Right Form side */}
      <div className="bg-white border border-border-gray p-8 md:p-10 rounded-[28px] shadow-md flex flex-col justify-center">
        <h3 className="font-headers text-2xl font-bold text-brand-navy mb-6 text-left">
          Envie uma mensagem
        </h3>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-xs font-bold font-headers text-brand-navy uppercase tracking-wider">
              Nome Completo
            </label>
            <input 
              type="text" 
              id="name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border-gray bg-bg-light text-brand-navy placeholder:text-text-muted/50 focus:outline-none focus:border-brand-navy focus:bg-white focus:ring-2 focus:ring-brand-navy/10 transition-all text-sm"
              placeholder="Seu nome completo" 
              required 
              minLength={3}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-xs font-bold font-headers text-brand-navy uppercase tracking-wider">
              E-mail corporativo
            </label>
            <input 
              type="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border-gray bg-bg-light text-brand-navy placeholder:text-text-muted/50 focus:outline-none focus:border-brand-navy focus:bg-white focus:ring-2 focus:ring-brand-navy/10 transition-all text-sm"
              placeholder="exemplo@email.com" 
              required 
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="subject" className="text-xs font-bold font-headers text-brand-navy uppercase tracking-wider">
              Assunto
            </label>
            <input 
              type="text" 
              id="subject" 
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border-gray bg-bg-light text-brand-navy placeholder:text-text-muted/50 focus:outline-none focus:border-brand-navy focus:bg-white focus:ring-2 focus:ring-brand-navy/10 transition-all text-sm"
              placeholder="Como podemos te ajudar?" 
              required 
              minLength={5}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="text-xs font-bold font-headers text-brand-navy uppercase tracking-wider">
              Mensagem
            </label>
            <textarea 
              id="message" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border-gray bg-bg-light text-brand-navy placeholder:text-text-muted/50 focus:outline-none focus:border-brand-navy focus:bg-white focus:ring-2 focus:ring-brand-navy/10 transition-all text-sm"
              rows={4} 
              placeholder="Escreva sua mensagem aqui..." 
              required 
              minLength={10}
              style={{ resize: 'none' }}
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-full mt-2 py-3.5 flex justify-center gap-2 cursor-pointer shadow-sm"
          >
            Enviar Mensagem <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
}
