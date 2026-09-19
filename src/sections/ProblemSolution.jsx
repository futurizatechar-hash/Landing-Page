import React from 'react';
import { motion } from 'framer-motion';
import { DatabaseIcon, ZapIcon, BotIcon, CheckCircle2Icon } from 'lucide-react';

const ProblemSolution = () => {
  const services = [
    {
      icon: <DatabaseIcon className="w-6 h-6 text-brand-accent" />,
      tag: "Desarrollo Exclusivo",
      tagColor: "bg-brand-accent/10 text-brand-accent",
      title: "Software & Sistemas a Medida",
      description: "Plataformas y sistemas desarrollados desde cero para digitalizar, ordenar y centralizar la operativa exacta de su organización.",
      benefits: [
        "Desarrollado 100% a la medida de sus procesos",
        "Propiedad total de su empresa, sin costos por usuario",
        "Acceso seguro en la nube desde cualquier dispositivo"
      ]
    },
    {
      icon: <ZapIcon className="w-6 h-6 text-brand-cyan" />,
      tag: "Presencia Digital & SEO",
      tagColor: "bg-brand-cyan/10 text-brand-cyan",
      title: "Plataformas Web & Sitios Corporativos",
      description: "Sitios web y aplicaciones web modernas de carga ultrarrápida, diseñadas para proyectar solidez y convertir visitas en clientes.",
      benefits: [
        "Velocidad de carga instantánea y optimización en Google",
        "Diseño intuitivo y enfocado en la experiencia de usuario",
        "Arquitectura moderna, robusta y escalable"
      ]
    },
    {
      icon: <BotIcon className="w-6 h-6 text-purple-500" />,
      tag: "Eficiencia Operativa",
      tagColor: "bg-purple-500/10 text-purple-600",
      title: "Automatización & Soluciones con IA",
      description: "Integración de herramientas y flujos automáticos para conectar sus sistemas y eliminar tareas operativas repetitivas.",
      benefits: [
        "Integración fluida entre sus canales y bases de datos",
        "Asistentes y respuestas automatizadas disponibles 24/7",
        "Reducción drástica de tiempos y errores de carga manual"
      ]
    }
  ];

  return (
    <section id="soluciones" className="py-16 md:py-20 bg-slate-50/70 border-y border-slate-100 scroll-mt-20">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Encabezado Conciso */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-accent bg-brand-accent/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Servicios Principales
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-brand-dark tracking-tight mb-3">
            Soluciones de Software <span className="text-gradient">a Medida</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-medium">
            Desarrollo robusto de alta performance con el respaldo de las tecnologias mas modernas.
          </p>
        </div>

        {/* 3 Tarjetas Minimalistas */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch mb-10">
          {services.map((srv, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl border border-slate-200/80 p-6 lg:p-7 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-sm">
                    {srv.icon}
                  </div>
                  <span className={`text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md ${srv.tagColor}`}>
                    {srv.tag}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-brand-dark mb-2">
                  {srv.title}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed font-medium mb-6">
                  {srv.description}
                </p>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-slate-100">
                {srv.benefits.map((b, bIdx) => (
                  <div key={bIdx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                    <CheckCircle2Icon className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Directo de 1 línea */}
        <div className="text-center">
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-dark hover:text-brand-accent transition-colors"
          >
            ¿Necesita evaluar su caso particular? <span className="text-brand-accent underline">Solicite un diagnóstico sin cargo →</span>
          </a>
        </div>

      </div>
    </section>
  );
};

export default ProblemSolution;

