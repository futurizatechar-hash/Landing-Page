import React, { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { 
  CheckCircleIcon, 
  SendIcon, 
  BuildingIcon, 
  UserIcon, 
  MailIcon, 
  PhoneIcon, 
  UsersIcon, 
  CalendarIcon, 
  MessageCircleIcon,
  Loader2Icon,
  AlertCircleIcon
} from 'lucide-react';
import { getSupabase } from '../supabaseClient';

const LeadForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    teamSize: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const leadData = {
      name: formData.name.trim(),
      company: formData.company.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      teamSize: formData.teamSize
    };

    let supabaseSuccess = false;
    let emailSuccess = false;

    // 1. Intento primario con Supabase (con timeout de 4 segundos para no bloquear si está pausado)
    try {
      const supabase = await getSupabase();
      const supabasePromise = supabase
        .from('leads_futuriza')
        .insert([
          {
            nombre: leadData.name.toUpperCase(),
            telefono: leadData.phone,
            empresa: leadData.company.toUpperCase(),
            email: leadData.email.toLowerCase(),
            estado_embudo: 'nuevo',
            resumen_chat: `[Lead Web] Tamaño de equipo/flota: ${leadData.teamSize}`
          }
        ]);

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Timeout en Supabase')), 4000)
      );

      const { error } = await Promise.race([supabasePromise, timeoutPromise]);
      if (!error) {
        supabaseSuccess = true;
        console.log('Lead almacenado exitosamente en leads_futuriza');
      } else {
        console.warn('Supabase retornó error:', error.message);
      }
    } catch (err) {
      console.warn('Fallo o timeout en Supabase:', err.message);
    }

    // 2. Doble respaldo por Email (FormSubmit hacia futuriza.tech.ar@gmail.com)
    try {
      const backupEndpoint = import.meta.env.VITE_BACKUP_EMAIL_ENDPOINT || 'https://formsubmit.co/ajax/futuriza.tech.ar@gmail.com';
      const emailPromise = fetch(backupEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          "Nombre": leadData.name,
          "Empresa": leadData.company,
          "Email": leadData.email,
          "WhatsApp": leadData.phone || 'No especificado',
          "Tamaño de Equipo": leadData.teamSize,
          "_subject": `Nuevo Lead Futuriza: ${leadData.company} (${leadData.name})`,
          "_template": "table",
          "_captcha": "false"
        })
      });

      const emailTimeout = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Timeout en servicio de email')), 4500)
      );

      const response = await Promise.race([emailPromise, emailTimeout]);
      if (response && response.ok) {
        emailSuccess = true;
        console.log('Respaldo de lead enviado por email con éxito');
      } else {
        console.warn('Respaldo por email no completado:', response?.status);
      }
    } catch (err) {
      console.warn('Fallo al enviar correo de respaldo:', err.message);
    }

    setIsSubmitting(false);

    // 3. Validación de entrega (si cualquiera de los dos tuvo éxito, el lead fue capturado)
    if (supabaseSuccess || emailSuccess) {
      setIsSubmitted(true);
    } else {
      setErrorMessage(
        'Tuvimos una dificultad técnica momentánea para conectar con el servidor. Podés enviarnos tus datos ahora mismo por WhatsApp con un solo clic.'
      );
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contacto" className="py-20 md:py-28 scroll-mt-20 relative overflow-hidden bg-slate-50 border-t border-slate-100">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-cyan/5 blur-[150px] rounded-full -z-10" />

      <div className="container mx-auto px-6">

        {/* Encabezado del Bloque de Contacto */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <m.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-4"
          >
            <span className="text-xs font-bold text-brand-dark uppercase tracking-widest">
              Contacto Directo
            </span>
          </m.div>

          <m.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-brand-dark mb-4 tracking-tight"
          >
            Hablemos de su Próximo <span className="text-gradient">Proyecto</span>
          </m.h2>

          <m.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium"
          >
            Coordinemos una conversación breve o envíenos sus datos. Evaluamos su caso y le respondemos en menos de 24 horas con una propuesta clara.
          </m.p>
        </div>

        {/* Formulario (Contacto / CTA) */}
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-[0_20px_60px_rgb(0,0,0,0.08)] overflow-hidden border border-slate-100 flex flex-col md:flex-row">
          {/* Info Panel CTA */}
          <div className="md:w-5/12 bg-brand-dark p-10 md:p-12 flex flex-col justify-between relative overflow-hidden">
             {/* Decorative CTA bg */}
             <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-brand-dark via-brand-dark to-brand-accent/20 opacity-80" />
             <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/20 blur-[80px] rounded-full" />
             
             <div className="relative z-10 space-y-6">
               <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight text-white tracking-tight">
                 ¿Listo para optimizar la gestión de su <span className="text-brand-accent italic">empresa?</span>
               </h3>
               <p className="text-white/80 text-sm sm:text-base leading-relaxed font-medium">
                 Coordinamos una videollamada de 15 minutos sin compromiso. Analizamos la situación operativa de su negocio y le decimos con honestidad qué solución le conviene.
               </p>

               <div className="space-y-3 pt-2">
                 <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">O contáctenos de forma directa:</p>
                 <div className="flex flex-col gap-3">
                   <a 
                     href="https://calendly.com/futuriza-tech-ar" 
                     target="_blank" 
                     rel="noreferrer"
                     className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 py-3 px-5 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] text-sm"
                   >
                     <CalendarIcon size={18} className="text-brand-accent" />
                     Agendar llamada por Calendly
                   </a>
                   <a 
                     href="https://wa.me/5493518046223" 
                     target="_blank" 
                     rel="noreferrer"
                     className="flex items-center justify-center gap-2 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-white border border-[#25D366]/30 py-3 px-5 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] text-sm"
                   >
                     <MessageCircleIcon size={18} className="text-[#25D366]" />
                     Consultar por WhatsApp
                   </a>
                 </div>
               </div>
             </div>

             <div className="relative z-10 pt-8 border-t border-white/10 text-xs text-white/70 space-y-1.5 font-medium">
               <p>✓ Diagnóstico inicial sin costo</p>
               <p>✓ Presupuesto formal cerrado</p>
               <p>✓ Respuesta en menos de 24 horas</p>
             </div>
          </div>

          {/* Form */}
          <div className="md:w-7/12 p-10 md:p-12 relative bg-white">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <m.form 
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
                          placeholder="Ej: Carlos Gómez"
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
                            placeholder="Nombre de su empresa"
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
                        <label htmlFor="phone" className="text-xs font-extrabold text-slate-500 uppercase tracking-widest ml-1">
                          WhatsApp <span className="text-slate-600 font-medium lowercase tracking-normal text-[11px]">(opcional)</span>
                        </label>
                       <div className="relative">
                          <PhoneIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <input 
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
                    <label htmlFor="teamSize" className="text-xs font-extrabold text-slate-500 uppercase tracking-widest ml-1">Tamaño de Equipo / Flota</label>
                    <div className="relative">
                       <UsersIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                       <select 
                        id="teamSize"
                        required
                        name="teamSize"
                        aria-label="Tamaño de Equipo o Flota"
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

                  {errorMessage && (
                    <m.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-sm space-y-3"
                    >
                      <div className="flex items-start gap-3">
                        <AlertCircleIcon className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <p className="font-medium">{errorMessage}</p>
                      </div>
                      <a
                        href={`https://wa.me/5493518046223?text=${encodeURIComponent(
                          `Hola equipo de Futuriza, intenté agendar mi entrevista desde la web:\n- Nombre: ${formData.name}\n- Empresa: ${formData.company}\n- Email: ${formData.email}\n- Teléfono: ${formData.phone || 'No especificado'}\n- Equipo: ${formData.teamSize}`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold transition-all shadow-sm"
                      >
                        <MessageCircleIcon className="w-5 h-5" />
                        Enviar consulta directa por WhatsApp
                      </a>
                    </m.div>
                  )}

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className={`btn-primary w-full py-4 text-lg mt-6 shadow-lg shadow-brand-accent/20 transition-all ${
                      isSubmitting ? 'opacity-80 cursor-not-allowed scale-[0.99]' : 'hover:scale-[1.01]'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2Icon className="w-5 h-5 animate-spin mr-2" />
                        Enviando solicitud...
                      </>
                    ) : (
                      <>
                        Solicitar Diagnóstico sin Cargo <SendIcon className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </button>
                </m.form>
              ) : (
                <m.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-10"
                >
                  <div className="w-20 h-20 bg-brand-cyan/10 rounded-full flex items-center justify-center mb-6 shadow-sm border border-brand-cyan/20">
                    <CheckCircleIcon className="text-brand-cyan w-10 h-10" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold mb-3 text-brand-dark">¡Solicitud Recibida!</h3>
                  <p className="text-slate-600 max-w-sm mb-8 font-medium text-sm leading-relaxed">
                    Gracias por comunicarse con Futuriza. Un especialista de nuestro equipo se pondrá en contacto a la brevedad para coordinar la reunión.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-brand-accent font-bold hover:underline text-sm"
                  >
                    Enviar otra solicitud
                  </button>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadForm;
