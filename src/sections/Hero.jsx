import React from 'react';
import { m } from 'framer-motion';
import { ArrowRightIcon, CheckCircle2Icon, ShieldCheckIcon, SparklesIcon } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative pt-36 md:pt-44 pb-20 md:pb-28 overflow-hidden bg-white">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-brand-cyan/10 via-brand-accent/5 to-transparent blur-[140px] rounded-full -z-10 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-5xl text-center">
        <div className="space-y-6 md:space-y-8">
          {/* Minimalist Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200/80 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-brand-accent animate-pulse" />
            <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">
              Ingeniería de Software & Automatizaciones B2B
            </span>
          </div>

          {/* Clean, Punchy H1 (2 lines) */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-brand-dark tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Sistemas de gestión, plataformas web y <span className="text-gradient">automatizaciones a medida</span>
          </h1>

          {/* Concise Subtitle (2 lines) */}
          <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            Desarrollamos software, sitios web ultrarrápidos y flujos automáticos para empresas que buscan orden y rentabilidad.
          </p>

          {/* Primary & Secondary Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href="#contacto"
              className="btn-primary w-full sm:w-auto text-base md:text-lg font-bold shadow-lg shadow-brand-accent/25 hover:shadow-glow-accent"
            >
              Solicitar Diagnóstico sin Cargo <ArrowRightIcon className="w-5 h-5 ml-2" />
            </a>
            <a
              href="#portfolio"
              className="btn-secondary w-full sm:w-auto text-base md:text-lg font-bold"
            >
              Ver Trabajos Realizados
            </a>
          </div>

          {/* Minimal Trust Line */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 pt-4 text-xs sm:text-sm text-slate-500 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2Icon className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Propiedad 100% de su empresa</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheckIcon className="w-4 h-4 text-brand-cyan shrink-0" />
              <span>Garantias por contrato</span>
            </div>
            <div className="flex items-center gap-1.5">
              <SparklesIcon className="w-4 h-4 text-brand-accent shrink-0" />
              <span>Financiacion propia con opciones de pago</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

