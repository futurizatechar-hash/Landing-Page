import React from 'react';
import { motion } from 'framer-motion';
import { CodeIcon, ZapIcon, MessageSquareIcon } from 'lucide-react';

const ProblemSolution = () => {

  return (
    <section id="soluciones" className="pt-6 pb-12 md:pt-8 md:pb-16 scroll-mt-28 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Soluciones Tecnológicas para <span className="text-gradient">Escalar tu Agencia de Seguridad</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-stretch pt-4">
          {/* Card 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card group relative flex flex-col pt-8"
          >
            <div className="w-14 h-14 bg-cyan-500/10 rounded-2xl flex items-center justify-center border border-cyan-500/20 mb-6 group-hover:scale-110 transition-transform">
              <CodeIcon className="text-cyan-400 w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors">
              Sistemas de Gestión y Apps Nativas
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
              Centralizá tu empresa operativa. Control de personal, seguimiento de rondas en tiempo real y metas escalables con arquitectura 100% cloud.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card group relative flex flex-col pt-8"
          >
            <div className="w-14 h-14 bg-neon-green/10 rounded-2xl flex items-center justify-center border border-neon-green/20 mb-6 group-hover:scale-110 transition-transform">
              <ZapIcon className="text-neon-green w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-white group-hover:text-neon-green transition-colors">
              Automatización de Procesos
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
              Integramos tus herramientas como n8n y eliminamos tareas manuales. Sincronizá partes operativos con RRHH al instante y despedite de los Excel.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card group relative flex flex-col pt-8"
          >
            <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20 mb-6 group-hover:scale-110 transition-transform">
              <MessageSquareIcon className="text-blue-400 w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors">
              Captación de Leads Inteligente
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
              Flujos dinámicos con Typebot y chatbots B2B. Filtrá clientes nuevos o automatizá perfiles de guardias postulantes trabajando las 24 horas.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
