import React from 'react';
import { MailIcon, MapPinIcon } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2 space-y-8">
            <div className="flex items-center gap-3">
               {/* Vertical Logo */}
               <div className="flex items-center justify-start">
                  <img 
                    src="/texto-logo-vertical.png" 
                    alt="Futuriza Logo Vertical" 
                    className="h-24 object-contain" 
                    loading="lazy" 
                    decoding="async"
                  />
               </div>
            </div>
            <p className="text-slate-600 max-w-sm leading-relaxed">
              Tu socio tecnológico B2B. Llevamos soluciones corporativas, integraciones e Inteligencia Artificial de Córdoba para el mundo.
            </p>
            <div className="flex gap-4 mt-6">
              <a 
                href="https://www.instagram.com/futurizatech" 
                target="_blank" 
                rel="noopener noreferrer"
                title="Instagram"
                className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-brand-dark hover:text-white hover:bg-brand-accent hover:border-brand-accent transition-all border border-slate-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a 
                href="https://wa.me/5493518046223" 
                target="_blank" 
                rel="noopener noreferrer"
                title="WhatsApp Directo"
                className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-brand-dark hover:text-white hover:bg-brand-accent hover:border-brand-accent transition-all border border-slate-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
              </a>
              <a 
                href="mailto:info@futuriza.com" 
                title="Email Corporativo"
                className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-brand-dark hover:text-white hover:bg-brand-accent hover:border-brand-accent transition-all border border-slate-200"
              >
                <MailIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-sm font-bold text-brand-dark uppercase tracking-widest">Empresa</h4>
            <ul className="space-y-4">
              <li><a href="#soluciones" className="text-slate-600 hover:text-brand-accent font-semibold text-sm transition-colors">Servicios</a></li>
              <li><a href="#sobre-nosotros" className="text-slate-600 hover:text-brand-accent font-semibold text-sm transition-colors">Sobre Nosotros</a></li>
              <li><a href="#escalabilidad" className="text-slate-600 hover:text-brand-accent font-semibold text-sm transition-colors">Escalabilidad</a></li>
              <li><a href="#metodologia" className="text-slate-600 hover:text-brand-accent font-semibold text-sm transition-colors">Metodología</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-sm font-bold text-brand-dark uppercase tracking-widest">Sede Central</h4>
            <div className="flex gap-3 text-slate-600">
               <MapPinIcon className="w-5 h-5 text-brand-accent shrink-0" />
               <p className="text-sm leading-relaxed font-semibold">
                 Córdoba, Argentina<br />
                 Hub Tecnológico para el mundo
               </p>
            </div>
            <p className="text-xs text-brand-cyan font-bold italic">
               "Democratizando la eficiencia corporativa."
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs font-semibold">
            © {new Date().getFullYear()} Futuriza. Todos los derechos reservados.
          </p>
          <div className="flex gap-8">
            <a href="/privacidad.html" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-brand-dark text-xs font-semibold transition-colors">Políticas de Privacidad</a>
            <a href="/terminos.html" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-brand-dark text-xs font-semibold transition-colors">Términos de Servicio</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
