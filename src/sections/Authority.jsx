import React from 'react';
import { motion } from 'framer-motion';
import { TargetIcon, LineChartIcon, MapPinIcon, BriefcaseIcon } from 'lucide-react';

const Authority = () => {
  return (
    <section id="sobre-nosotros" className="py-20 md:py-28 scroll-mt-20 bg-white relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-brand-cyan/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-brand-accent/5 blur-[100px] rounded-full -z-10" />

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 shadow-sm mb-6">
              <MapPinIcon className="w-4 h-4 text-brand-accent" />
              <span className="text-xs font-bold text-brand-dark tracking-widest uppercase">De Córdoba para el Mundo</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight text-brand-dark">
              Tu <span className="text-gradient">Socio Tecnológico</span>
            </h2>
            <p className="text-slate-600 text-base md:text-lg mb-6 leading-relaxed font-medium">
              Futuriza nació al chocar contra softwares lentos e ineficientes. Si la solución no existía a un precio razonable, la íbamos a crear.
            </p>
            <p className="text-slate-600 text-base md:text-lg mb-8 leading-relaxed font-medium">
              Somos una empresa fundada por empresarios. Hablamos tu mismo idioma: rentabilidad, máxima eficiencia y resultados directos.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mt-10">
              <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 shadow-[0_4px_15px_rgb(0,0,0,0.02)]">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shrink-0 border border-slate-100 shadow-sm">
                  <LineChartIcon className="text-brand-accent w-6 h-6" />
                </div>
                <div className="flex-1 mt-1">
                  <h3 className="text-lg font-bold text-brand-dark">Rentabilidad</h3>
                  <p className="text-xs text-slate-500 font-semibold mt-1">Foco en ROI tecnológico.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 shadow-[0_4px_15px_rgb(0,0,0,0.02)]">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shrink-0 border border-slate-100 shadow-sm">
                  <BriefcaseIcon className="text-brand-cyan w-6 h-6" />
                </div>
                <div className="flex-1 mt-1">
                  <h3 className="text-lg font-bold text-brand-dark">Negocios Reales</h3>
                  <p className="text-xs text-slate-500 font-semibold mt-1">Pensado para operación.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:w-1/2 relative w-full"
          >
             <div className="relative z-10 bg-white p-12 rounded-3xl border border-slate-100 shadow-[0_20px_50px_rgb(0,0,0,0.06)] flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center border border-slate-200 mb-8 shadow-inner">
                  <TargetIcon className="w-12 h-12 text-brand-accent drop-shadow-md" />
                </div>
                <h3 className="text-3xl font-extrabold text-brand-dark mb-6 tracking-tight">Nuestra Promesa</h3>
                <blockquote className="text-xl text-slate-600 italic mb-8 leading-relaxed font-medium px-4">
                  "No vendemos código, vendemos tranquilidad operativa y crecimiento medible."
                </blockquote>
                <div className="w-16 h-2 bg-gradient-to-r from-brand-accent to-brand-cyan rounded-full mx-auto" />
             </div>
             {/* Decorative Frame */}
             <div className="absolute inset-0 bg-gradient-to-tr from-brand-accent/20 to-brand-cyan/20 blur-3xl -z-10 translate-x-6 translate-y-6" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Authority;
