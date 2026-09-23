import React from 'react';
import { MailIcon, MapPinIcon } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-10 md:pt-12 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 md:gap-10 mb-10 md:mb-12">
          <div className="col-span-1 md:col-span-2 space-y-4 md:space-y-5">
            <div className="flex items-center gap-3">
               {/* Vertical Logo */}
               <div className="flex items-center justify-start">
                  <img 
                    src="/logo-vertical.webp" 
                    alt="FuturizaTech - Tu Socio Tecnológico B2B en Córdoba Argentina" 
                    className="h-16 md:h-20 w-auto object-contain" 
                    width="128"
                    height="96"
                    loading="lazy" 
                    decoding="async"
                  />
               </div>
            </div>
            <p className="text-slate-600 max-w-sm leading-relaxed text-sm font-medium">
              Ingeniería de software, sistemas de gestión a medida y automatizaciones para empresas. Soluciones robustas y medibles para Latinoamérica.
            </p>
            <div className="flex gap-3 mt-4">
              <a 
                href="https://www.instagram.com/futurizatech" 
                target="_blank" 
                rel="noopener noreferrer" 
                title="Instagram"
                aria-label="Instagram de FuturizaTech"
                className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-brand-dark hover:text-white hover:bg-brand-accent hover:border-brand-accent transition-all border border-slate-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a 
                href="https://wa.me/5493518046223" 
                target="_blank" 
                rel="noopener noreferrer" 
                title="WhatsApp Directo"
                aria-label="Contactar por WhatsApp"
                className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-brand-dark hover:text-white hover:bg-brand-accent hover:border-brand-accent transition-all border border-slate-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
              </a>
              <a 
                href="mailto:info@futurizatech.com" 
                title="Email Corporativo"
                aria-label="Enviar Email Corporativo"
                className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-brand-dark hover:text-white hover:bg-brand-accent hover:border-brand-accent transition-all border border-slate-200"
              >
                <MailIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-brand-dark uppercase tracking-widest">Navegación</h4>
            <ul className="space-y-2.5">
              <li><a href="#soluciones" className="text-slate-600 hover:text-brand-accent font-medium text-sm transition-colors">Servicios Principales</a></li>
              <li><a href="#portfolio" className="text-slate-600 hover:text-brand-accent font-medium text-sm transition-colors">Sistemas en Producción</a></li>
              <li><a href="#faq" className="text-slate-600 hover:text-brand-accent font-medium text-sm transition-colors">Preguntas Frecuentes</a></li>
              <li><a href="#contacto" className="text-slate-600 hover:text-brand-accent font-medium text-sm transition-colors">Solicitar Diagnóstico</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-brand-dark uppercase tracking-widest">Sede Central</h4>
            <div className="flex gap-3 text-slate-600">
               <MapPinIcon className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
               <p className="text-sm leading-relaxed font-semibold">
                 Córdoba, Argentina<br />
                 Atención remota para toda Latinoamérica
               </p>
            </div>
            <p className="text-xs text-brand-accent font-bold">
               Tecnología diseñada para la rentabilidad de su negocio.
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
