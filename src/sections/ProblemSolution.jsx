import React from 'react';
import { motion } from 'framer-motion';
import { CodeIcon, LayersIcon, BotIcon, LayoutTemplateIcon } from 'lucide-react';

const ProblemSolution = () => {
  return (
    <section id="soluciones" className="pt-20 pb-24 relative overflow-hidden bg-slate-50">
      <div className="container mx-auto px-6">
        
        {/* Sección: Agitación (Problema) */}
        <div className="max-w-4xl mx-auto text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-8 leading-tight text-brand-dark"
          >
            Crecer duele cuando tu tecnología <br className="hidden md:block" />
            <span className="text-brand-accent">no te acompaña</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto font-medium"
          >
            Sistemas lentos y tareas repetitivas consumen a tu equipo. La tecnología está para devolverte el control de tu tiempo, no para ser un dolor de cabeza.
          </motion.p>
        </div>

        {/* Sección: Servicios */}
        <div className="text-center mb-12">
           <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 text-brand-dark"
           >
             Soluciones de <span className="text-gradient">Alto Impacto</span>
           </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {/* Card 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card group"
          >
            <div className="w-14 h-14 bg-brand-cyan/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-sm">
              <CodeIcon className="text-brand-cyan w-7 h-7" />
            </div>
            <h3 className="text-xl font-extrabold mb-4 text-brand-dark group-hover:text-brand-cyan transition-colors">
              Desarrollo de Software a Medida
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              Sistemas y plataformas construidas exactamente para tu negocio. Ni más, ni menos.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card group flex flex-col items-center text-center p-6 md:p-8"
          >
            <div className="w-14 h-14 bg-brand-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:-rotate-3 transition-transform shadow-sm">
              <LayersIcon className="text-brand-accent w-7 h-7" />
            </div>
            <h3 className="text-lg font-extrabold mb-3 text-brand-dark group-hover:text-brand-accent transition-colors">
              Automatización de Procesos
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              Conectamos tus herramientas para que las tareas repetitivas se hagan solas.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card group"
          >
            <div className="w-14 h-14 bg-[#8B5CF6]/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-sm">
              <BotIcon className="text-[#8B5CF6] w-7 h-7" />
            </div>
            <h3 className="text-xl font-extrabold mb-4 text-brand-dark group-hover:text-[#8B5CF6] transition-colors">
              Agentes de Inteligencia Artificial
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              Asistentes que no duermen. Atienden, califican prospectos y gestionan 24/7.
            </p>
          </motion.div>

          {/* Card 4 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="glass-card group flex flex-col items-center text-center p-6 md:p-8"
          >
            <div className="w-14 h-14 bg-[#3B82F6]/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:-rotate-3 transition-transform shadow-sm">
              <LayoutTemplateIcon className="text-[#3B82F6] w-7 h-7" />
            </div>
            <h3 className="text-lg font-extrabold mb-3 text-brand-dark group-hover:text-[#3B82F6] transition-colors">
              Desarrollo Web SEO
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              Sitios de alta performance diseñados para posicionar en Google y captar clientes.
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default ProblemSolution;
