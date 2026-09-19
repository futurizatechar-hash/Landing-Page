import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

const FAQ_DATA = [
  {
    question: "¿El sistema y la página web son 100% propiedad de mi empresa?",
    answer: "Sí, absolutamente. A diferencia de las plataformas que cobran mensualidades en dólares por cada empleado que las utiliza, en Futuriza desarrollamos una solución propia para su negocio. Usted no paga suscripciones por cantidad de usuarios ni queda atado a nosotros: el sistema y los datos le pertenecen íntegramente a su empresa."
  },
  {
    question: "¿Cuánto tiempo demora el desarrollo y la puesta en funcionamiento?",
    answer: "Trabajamos mediante entregas funcionales por etapas. Las páginas web y automatizaciones suelen estar operativas entre 1 y 3 semanas. Los sistemas de gestión a medida se estructuran en módulos prioritarios, permitiendo que su equipo cuente con una versión operativa funcional entre las 4 y 8 semanas."
  },
  {
    question: "¿Qué ocurre si hoy usamos planillas de Excel o un sistema viejo?",
    answer: "Nos encargamos de la migración completa. Extraemos, ordenamos y cargamos todos sus datos históricos (clientes, stock, ventas y facturación) en el nuevo sistema. De este modo, la transición se realiza sin interrumpir la actividad diaria de su empresa y sin riesgo de pérdida de información."
  },
  {
    question: "¿Cómo funciona la capacitación de mi equipo y el soporte post-lanzamiento?",
    answer: "Capacitamos a su personal para garantizar que la adopción de la herramienta sea simple e intuitiva desde el primer día. Además, brindamos garantía técnica y esquemas de acompañamiento continuo para resolver dudas y evolucionar el sistema a medida que su empresa crezca."
  },
  {
    question: "¿Cómo se cotiza un proyecto y qué incluye el presupuesto?",
    answer: "Coordinamos una breve conversación de diagnóstico sin cargo para comprender sus necesidades y procesos. Con esa información, le entregamos una propuesta formal con alcance definido, cronograma de entrega y presupuesto cerrado, sin costos imprevistos ni letra chica."
  },
  {
    question: "¿Trabajan con empresas fuera de Córdoba o del país?",
    answer: "Sí. Nuestra sede está en Córdoba, Argentina, pero trabajamos de manera ágil y 100% remota con empresas de todo el país y de Latinoamérica, coordinando reuniones virtuales y canales de comunicación directa con su equipo."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-24 scroll-mt-20 bg-white relative overflow-hidden border-t border-slate-100">
      {/* Background Decorative Blur */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-brand-cyan/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-brand-dark mb-4 tracking-tight"
          >
            Preguntas <span className="text-gradient">Frecuentes</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed font-medium"
          >
            Respuestas directas sobre cómo trabajamos, tiempos de entrega, presupuestos y garantías para su tranquilidad.
          </motion.p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-4">
          {FAQ_DATA.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen
                  ? 'bg-slate-50/80 border-brand-accent/30 shadow-md'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                  }`}
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full px-6 md:px-8 py-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <span className="font-bold text-lg md:text-xl text-brand-dark flex items-center gap-3">
                    <Sparkles className={`w-4 h-4 shrink-0 transition-colors ${isOpen ? 'text-brand-accent' : 'text-slate-400'}`} />
                    {item.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-brand-accent text-white' : 'bg-slate-100 text-slate-500'
                      }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${idx}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 md:px-8 pb-6 pt-1 text-slate-600 leading-relaxed font-medium text-base border-t border-slate-200/50 mt-1">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
