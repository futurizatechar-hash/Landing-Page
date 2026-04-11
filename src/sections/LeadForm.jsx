import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon, CoffeeIcon, FileTextIcon, LaptopIcon, LifeBuoyIcon, SendIcon, BuildingIcon, UserIcon, MailIcon, PhoneIcon, UsersIcon } from 'lucide-react';
import { supabase } from '../supabaseClient';

const LeadForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    teamSize: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('leads_futuriza')
        .insert([
          {
            nombre: formData.name.trim().toUpperCase(),
            telefono: formData.phone.trim(),
            empresa: formData.company.trim().toUpperCase(),
            email: formData.email.trim().toLowerCase(),
            estado_embudo: 'nuevo',
            resumen_chat: `[Lead Web] Tamaño de equipo/flota: ${formData.teamSize}`
          }
        ]);

      if (error) throw error;
      
      console.log('Lead almacenado exitosamente en leads_futuriza');
      setIsSubmitted(true);
    } catch (err) {
      console.error('Error guardando lead en Supabase:', err.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const steps = [
    {
      icon: <CoffeeIcon className="w-8 h-8 text-brand-accent drop-shadow-sm" />,
      title: "1. Entrevista de Descubrimiento",
      desc: "Un café virtual para entender a fondo tus dolores operativos."
    },
    {
      icon: <FileTextIcon className="w-8 h-8 text-brand-cyan drop-shadow-sm" />,
      title: "2. Propuesta Objetiva",
      desc: "Un plan de acción claro, con resultados medibles y sin letra chica."
    },
    {
      icon: <LaptopIcon className="w-8 h-8 text-purple-500 drop-shadow-sm" />,
      title: "3. Desarrollo Colaborativo",
      desc: "Puertas abiertas. Ves crecer tu proyecto en tiempo real paso a paso."
    },
    {
      icon: <LifeBuoyIcon className="w-8 h-8 text-blue-500 drop-shadow-sm" />,
      title: "4. Soporte Incondicional",
      desc: "No te entregamos código y desaparecemos. Te acompañamos siempre."
    }
  ];

  return (
    <section id="metodologia" className="py-24 scroll-mt-20 relative overflow-hidden bg-slate-50 border-t border-slate-100">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-cyan/5 blur-[150px] rounded-full -z-10" />

      <div className="container mx-auto px-6">

        {/* Metodología */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-extrabold mb-4 text-brand-dark"
            >
              Nuestro Método: <span className="text-gradient">Transparencia Total</span>
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white border border-slate-100 p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-shadow duration-300"
              >
                 <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                    {step.icon}
                 </div>
                 <h4 className="text-xl font-extrabold text-brand-dark mb-3 leading-tight">{step.title}</h4>
                 <p className="text-sm text-slate-600 font-medium leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Formulario (Contacto / CTA) */}
        <div id="contacto" className="max-w-5xl mx-auto bg-white rounded-3xl shadow-[0_20px_60px_rgb(0,0,0,0.08)] overflow-hidden border border-slate-100 flex flex-col md:flex-row scroll-mt-32">
          {/* Info Panel CTA */}
          <div className="md:w-5/12 bg-brand-dark p-10 md:p-14 flex flex-col justify-center relative overflow-hidden">
             {/* Decorative CTA bg */}
             <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-brand-dark via-brand-dark to-brand-accent/20 opacity-80" />
             <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/20 blur-[80px] rounded-full" />
             
             <div className="relative z-10">
               <h2 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight text-white tracking-tight">
                 ¿Listo para llevar tu operatividad al <span className="text-brand-accent italic">próximo nivel?</span>
               </h2>
               <p className="text-white/80 text-base md:text-lg mb-0 leading-relaxed font-medium">
                 Agendá una reunión sin cargo. Contanos tu desafío y descubrí cómo optimizamos tu empresa para escalar sin límites.
               </p>
             </div>
          </div>

          {/* Form */}
          <div className="md:w-7/12 p-10 md:p-14 relative bg-white">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-extrabold text-slate-500 uppercase tracking-widest ml-1">Nombre Completo</label>
                      <div className="relative">
                        <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input 
                          required
                          type="text" 
                          name="name" 
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Tu nombre"
                          className="w-full bg-slate-50 border border-slate-200 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent focus:bg-white rounded-xl py-3.5 pl-12 pr-4 text-brand-dark font-medium placeholder-slate-400 transition-all outline-none shadow-sm" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-extrabold text-slate-500 uppercase tracking-widest ml-1">Empresa / Razón Social</label>
                       <div className="relative">
                          <BuildingIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <input 
                            required
                            type="text" 
                            name="company" 
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Nombre de la firma"
                            className="w-full bg-slate-50 border border-slate-200 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent focus:bg-white rounded-xl py-3.5 pl-12 pr-4 text-brand-dark font-medium placeholder-slate-400 transition-all outline-none shadow-sm" 
                          />
                       </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-xs font-extrabold text-slate-500 uppercase tracking-widest ml-1">Email Corporativo</label>
                       <div className="relative">
                          <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <input 
                            required
                            type="email" 
                            name="email" 
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="ejemplo@empresa.com"
                            className="w-full bg-slate-50 border border-slate-200 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent focus:bg-white rounded-xl py-3.5 pl-12 pr-4 text-brand-dark font-medium placeholder-slate-400 transition-all outline-none shadow-sm" 
                          />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-extrabold text-slate-500 uppercase tracking-widest ml-1">WhatsApp</label>
                       <div className="relative">
                          <PhoneIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <input 
                            required
                            type="tel" 
                            name="phone" 
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Ej: +54 9..."
                            className="w-full bg-slate-50 border border-slate-200 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent focus:bg-white rounded-xl py-3.5 pl-12 pr-4 text-brand-dark font-medium placeholder-slate-400 transition-all outline-none shadow-sm" 
                          />
                       </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-extrabold text-slate-500 uppercase tracking-widest ml-1">Tamaño de Equipo / Flota</label>
                    <div className="relative">
                       <UsersIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                       <select 
                        required
                        name="teamSize"
                        value={formData.teamSize}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent focus:bg-white rounded-xl py-3.5 pl-12 pr-4 text-brand-dark font-medium appearance-none transition-all outline-none cursor-pointer shadow-sm"
                       >
                         <option value="" disabled>Seleccionar tamaño...</option>
                         <option value="1-20">1 - 20 personas</option>
                         <option value="21-50">21 - 50 personas</option>
                         <option value="51-100">51 - 100 personas</option>
                         <option value="101-250">101 - 250 personas</option>
                         <option value="250+">Más de 250 personas</option>
                       </select>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="btn-primary w-full py-4 text-lg mt-6 shadow-lg shadow-brand-accent/20"
                  >
                    Agendar mi Entrevista Ahora <SendIcon className="w-5 h-5 ml-2" />
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-10"
                >
                  <div className="w-24 h-24 bg-[#00e5ff]/10 rounded-full flex items-center justify-center mb-6 shadow-sm border border-[#00e5ff]/20">
                    <CheckCircleIcon className="text-[#00e5ff] w-12 h-12" />
                  </div>
                  <h3 className="text-3xl font-extrabold mb-4 text-brand-dark">¡Diagnóstico Solicitado!</h3>
                  <p className="text-slate-600 max-w-sm mb-8 font-medium">
                    Gracias por confiar en Futuriza. Nos pondremos en contacto contigo a la brevedad para agendar la reunión.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-brand-accent font-bold hover:underline"
                  >
                    Enviar otra consulta
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadForm;
