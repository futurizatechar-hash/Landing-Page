import React from 'react';
import { motion } from 'framer-motion';
import { RocketIcon, TrendingUpIcon, ShieldCheckIcon } from 'lucide-react';

const SuccessStories = () => {
  const levels = [
    {
      title: "Pequeños Negocios y Startups",
      description: "Implementaciones ágiles para dar tu primer paso digital sin comprometer capital operativo.",
      icon: <RocketIcon className="w-10 h-10 text-white drop-shadow-md" />,
      gradient: "bg-gradient-to-br from-brand-accent to-[#eb5a26]",
      hoverShadow: "hover:shadow-[0_20px_40px_rgba(255,107,53,0.3)]",
    },
    {
      title: "Empresas en Crecimiento",
      description: "Integración y automatización de procesos para escalar sin sumar costos fijos.",
      icon: <TrendingUpIcon className="w-10 h-10 text-white drop-shadow-md" />,
      gradient: "bg-gradient-to-br from-brand-cyan to-[#00c4cc]",
      hoverShadow: "hover:shadow-[0_20px_40px_rgba(0,229,255,0.3)]",
    },
    {
      title: "Grandes Corporaciones",
      description: "Arquitecturas robustas, tokenización y bases de datos blindadas para grandes estructuras.",
      icon: <ShieldCheckIcon className="w-10 h-10 text-white drop-shadow-md" />,
      gradient: "bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED]",
      hoverShadow: "hover:shadow-[0_20px_40px_rgba(139,92,246,0.3)]",
    }
  ];

  return (
    <section id="escalabilidad" className="py-24 scroll-mt-20 relative bg-white border-y border-slate-100/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 bg-slate-50 border border-slate-200 rounded-full mb-6 font-bold text-xs uppercase tracking-widest text-slate-500 shadow-sm"
          >
            Escalabilidad Garantizada
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold mb-6 text-brand-dark tracking-tight"
          >
            Soluciones Ágiles para <span className="text-gradient">Cada Etapa</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed font-medium"
          >
            La tecnología no debe ser un club VIP. En Futuriza tenemos la capacidad para abarcar todo el espectro del mercado, desde proyectos de impacto inicial hasta arquitecturas corporativas robustas.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {levels.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className={`bg-white rounded-3xl border border-slate-100 p-10 flex flex-col items-center text-center transition-all duration-500 transform hover:-translate-y-3 shadow-[0_10px_30px_rgb(0,0,0,0.03)] ${item.hoverShadow} group`}
            >
              
              <div className={`mb-8 w-20 h-20 rounded-2xl flex items-center justify-center ${item.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {item.icon}
              </div>

              <h3 className="text-2xl font-extrabold mb-4 text-brand-dark">
                {item.title}
              </h3>
              
              <p className="text-slate-600 text-base leading-relaxed font-medium">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
