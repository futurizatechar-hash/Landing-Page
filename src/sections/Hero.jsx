import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon, CodeIcon, GitMergeIcon, BotIcon } from 'lucide-react';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="relative min-h-[100dvh] pt-32 pb-24 md:pb-32 flex items-center overflow-hidden bg-white">
      {/* Background Blobs (Light Version) */}
      <div className="absolute top-0 -left-20 w-[600px] h-[600px] bg-brand-cyan/10 blur-[120px] rounded-full -z-10 animate-pulse" />
      <div className="absolute bottom-10 -right-20 w-[500px] h-[500px] bg-brand-accent/10 blur-[150px] rounded-full -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0%,rgba(255,255,255,1)_100%)] -z-10" />

      <div className="w-full flex flex-col justify-center gap-16 md:gap-24">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-left"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 shadow-sm mb-8"
          >
            <span className="flex h-2 w-2 rounded-full bg-brand-accent animate-ping" />
            <span className="text-xs font-bold text-brand-dark uppercase tracking-widest">
              Tu Socio Tecnológico B2B
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold mb-8 leading-tight tracking-tight text-brand-dark"
          >
            Transformamos la Complejidad de tu Empresa en <span className="text-gradient">Eficiencia Digital</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-slate-600 mb-8 max-w-xl leading-relaxed font-medium"
          >
            Dejá de perder tiempo en procesos manuales. Desarrollamos software a medida, automatizaciones y agentes de IA que operan 24/7 para reducir costos y escalar tu rentabilidad.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a href="#contacto" className="btn-primary shadow-lg shadow-brand-accent/30 font-extrabold text-base md:text-lg w-full sm:w-auto">
              Agendar Diagnóstico Gratuito <ArrowRightIcon className="w-5 h-5 ml-2" />
            </a>
          </motion.div>
        </motion.div>

        {/* Visual Element (Light Mockup) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative hidden md:block"
        >
          <div className="relative z-10 p-4 bg-white/40 rounded-3xl border border-slate-200 shadow-[0_20px_50px_rgb(0,0,0,0.05)] backdrop-blur-xl group overflow-hidden">
            {/* Animated UI Mockup Interface */}
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
              <div className="h-10 bg-slate-50 border-b border-slate-100 px-4 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="p-8 space-y-6">
                <div className="h-5 w-1/3 bg-slate-100 rounded-md animate-pulse" />
                <div className="grid grid-cols-3 gap-6">
                  <div className="h-28 bg-brand-cyan/5 border border-brand-cyan/20 rounded-xl relative overflow-hidden flex items-center justify-center">
                     <CodeIcon className="w-8 h-8 text-brand-cyan" />
                  </div>
                  <div className="h-28 bg-brand-accent/5 border border-brand-accent/20 rounded-xl relative flex items-center justify-center">
                     <GitMergeIcon className="w-8 h-8 text-brand-accent" />
                  </div>
                  <div className="h-28 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center">
                     <BotIcon className="w-8 h-8 text-slate-300" />
                  </div>
                </div>
                <div className="h-40 bg-slate-50 border border-slate-100 rounded-xl p-6 flex flex-col justify-end">
                  <div className="h-3 w-full bg-slate-200 mb-3 rounded-md" />
                  <div className="h-3 w-2/3 bg-slate-200 rounded-md" />
                </div>
              </div>
            </div>

            {/* Floating Elements (Light) */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 p-5 bg-white rounded-2xl border border-slate-100 shadow-xl"
            >
              <BotIcon className="w-10 h-10 text-brand-cyan" />
            </motion.div>

            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-10 -left-6 p-5 bg-white rounded-2xl border border-slate-100 shadow-xl flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-brand-accent/20 flex items-center justify-center">
                <div className="w-3 h-3 bg-brand-accent rounded-full animate-ping" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-brand-dark tracking-widest uppercase">IA Activa</span>
                <span className="text-xs text-slate-500 font-semibold">Operando 24/7</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
