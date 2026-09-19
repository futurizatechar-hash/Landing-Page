import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PORTFOLIO_PROJECTS } from '../constants/projects';
import { X, ExternalLink, Lock, Info } from 'lucide-react';

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="portfolio" className="py-16 md:py-24 scroll-mt-20 bg-slate-50 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-cyan/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-4">
            <span className="text-xs font-bold text-brand-dark uppercase tracking-widest">
              Experiencia & Trayectoria
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-brand-dark mb-4 tracking-tight">
            Proyectos & Desarrollos <span className="text-gradient">a Medida</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
            Conozca algunos de los sistemas de gestión, plataformas web y aplicaciones que desarrollamos y construimos para empresas reales.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {PORTFOLIO_PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => {
                setSelectedProject(project);
                setActiveImage(project.gallery ? project.gallery[0].url : project.image);
              }}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-slate-200 hover:border-brand-accent/40 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full"
            >
              <div className="relative aspect-[16/10] sm:aspect-video overflow-hidden bg-slate-950 border-b border-slate-100 shrink-0 flex items-center justify-center group">
                {/* Dynamic Blurred Background — fills 100% */}
                <img 
                  src={project.image} 
                  className="absolute inset-0 w-full h-full object-cover blur-[60px] scale-[2.5] opacity-100 z-0 pointer-events-none group-hover:scale-[3] transition-transform duration-700" 
                  alt="" 
                />

                <img 
                  src={project.image} 
                  alt={`${project.title} - Proyecto de ${project.type} desarrollado por Futuriza`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain transform group-hover:scale-[1.02] transition-transform duration-700 ease-out relative z-10 drop-shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none" />
                
                {/* Badges de Estado */}
                <div className="absolute top-3 right-3 flex flex-wrap justify-end gap-1.5 z-30">
                  {project.status === "En Desarrollo" && (
                    <div className="bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                      <span className="text-[11px] font-bold text-blue-700">En Desarrollo</span>
                    </div>
                  )}
                  {project.is_private && (
                    <div className="bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                      <Lock size={12} className="text-amber-500" />
                      <span className="text-[11px] font-bold text-slate-700">Uso Interno</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <p className="text-[11px] font-bold text-brand-accent mb-2 uppercase tracking-wider">{project.type}</p>
                <h3 className="text-xl font-bold text-brand-dark mb-4 line-clamp-2">{project.title}</h3>
                
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.technologies.slice(0, 4).map(tech => (
                    <span key={tech} className="px-2.5 py-1 text-[11px] font-semibold rounded-md bg-slate-50 text-slate-600 border border-slate-200">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-2.5 py-1 text-[11px] font-semibold rounded-md bg-slate-50 text-slate-400 border border-slate-200">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

                <div className="mt-auto pt-5 border-t border-slate-100 flex items-center justify-between">
                  {project.links?.live ? (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-accent text-white text-xs font-bold hover:bg-brand-accent/90 transition-all shadow-sm shadow-brand-accent/20 hover:-translate-y-0.5"
                    >
                      <ExternalLink size={13} />
                      <span>{project.status === "En Desarrollo" ? "Avance" : (project.links?.is_demo ? "Demo" : "Visitar")}</span>
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-500 text-xs font-bold">
                      <Lock size={13} />
                      <span>Privado</span>
                    </span>
                  )}
                  <span className="text-[12px] font-bold text-brand-accent opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 flex items-center gap-1">
                    Ver detalle →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal / Detalle del Proyecto */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setSelectedProject(null);
                setActiveImage(null);
              }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white border border-slate-200 rounded-2xl shadow-2xl z-10"
            >
              <button 
                onClick={() => {
                  setSelectedProject(null);
                  setActiveImage(null);
                }}
                className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-slate-100 rounded-full text-slate-600 shadow-sm transition-colors z-20"
              >
                <X size={20} />
              </button>

              <div 
                className="w-full bg-slate-950 border-b border-slate-200 p-6 sm:p-10 flex flex-col items-center justify-center min-h-[300px] relative group overflow-hidden"
              >
                {/* Dynamic Blurred Background — fills 100% */}
                <img 
                  src={activeImage || selectedProject.image} 
                  className="absolute inset-0 w-full h-full object-cover blur-[100px] scale-[4] opacity-100 z-0 pointer-events-none"
                  alt=""
                />
                {/* Subtle darkening overlay to keep image contrast */}
                <div className="absolute inset-0 bg-black/20 z-0 pointer-events-none" />
                
                <div 
                  className="relative cursor-zoom-in group/image z-10 w-full h-full flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(true);
                  }}
                >
                  <img 
                    src={activeImage || selectedProject.image} 
                    alt={`${selectedProject.title} - Vista detallada del proyecto de ${selectedProject.type}`}
                    loading="lazy"
                    decoding="async"
                    className="max-w-full max-h-[55vh] object-contain rounded-xl shadow-2xl transition-transform duration-500 group-hover/image:scale-[1.02] relative z-10"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 z-20 pointer-events-none bg-black/20 rounded-xl backdrop-blur-[2px]">
                    <div className="bg-white/90 text-brand-dark px-4 py-2 rounded-full font-bold text-sm shadow-xl flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                      Click para expandir
                    </div>
                  </div>
                </div>

                {selectedProject.gallery && selectedProject.gallery.length > 1 && (
                  <div className="flex flex-wrap items-center justify-center gap-2 mt-6 max-w-2xl relative z-10">
                    {selectedProject.gallery.map((item, idx) => {
                      const isSelected = (activeImage || selectedProject.image) === item.url;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActiveImage(item.url)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            isSelected
                              ? "bg-brand-accent text-white shadow-md shadow-brand-accent/30 scale-105"
                              : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
                          }`}
                        >
                          <span className={`w-2 h-2 rounded-full ${isSelected ? "bg-white" : "bg-brand-accent"}`} />
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="p-6 sm:p-10 relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <p className="text-brand-accent font-bold">{selectedProject.type}</p>
                      {selectedProject.status === "En Desarrollo" && (
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                          En Desarrollo
                        </span>
                      )}
                      {selectedProject.is_private && (
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
                          <Lock size={12} className="text-amber-500" />
                          Uso Interno
                        </span>
                      )}
                    </div>
                    <h3 className="text-3xl font-extrabold text-brand-dark">{selectedProject.title}</h3>
                  </div>
                  {selectedProject.links?.live && (
                    <div className="flex gap-3">
                      <a 
                        href={selectedProject.links.live} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="flex items-center gap-2 px-5 py-2.5 font-bold text-sm rounded-xl bg-brand-accent hover:bg-brand-accent/90 text-white transition-all shadow-md shadow-brand-accent/30 hover:shadow-lg hover:-translate-y-0.5"
                      >
                        <ExternalLink size={18} /> {selectedProject.status === "En Desarrollo" ? "Ver Avance en Vivo" : (selectedProject.links?.is_demo ? "Explorar Muestra (Demo)" : "Visitar Sitio Web")}
                      </a>
                    </div>
                  )}
                </div>

                {selectedProject.links?.demo_note && (
                  <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
                    <Info size={18} className="text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
                      <strong className="font-bold text-amber-900">Aclaración de Muestra:</strong> {selectedProject.links.demo_note}
                    </p>
                  </div>
                )}

                {selectedProject.description && (
                  <div className="mb-8">
                    <p className="text-slate-600 leading-relaxed text-lg">
                      {selectedProject.description}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-2 space-y-6">
                    <div>
                      <h4 className="text-xl font-bold text-brand-dark mb-4">Highlights Técnicos</h4>
                      <ul className="space-y-3">
                        {selectedProject.technical_highlights.map((highlight, idx) => (
                          <li key={idx} className="flex gap-3 text-slate-600 font-medium">
                            <span className="text-brand-accent mt-1">✦</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-bold text-brand-dark mb-4">Tecnologías</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map(tech => (
                        <span key={tech} className="px-3 py-1.5 text-sm font-medium rounded-lg bg-slate-50 text-slate-600 border border-slate-200 shadow-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Lightbox / Visor de Imagen Expandida */}
      <AnimatePresence>
        {isExpanded && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
            onClick={() => setIsExpanded(false)}
          >
            <motion.button 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpanded(false)}
              className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-[110]"
            >
              <X size={24} />
            </motion.button>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-[95vw] max-h-[95vh] w-full h-full flex items-center justify-center"
            >
              <img 
                src={activeImage || selectedProject?.image} 
                alt="Vista expandida"
                className="max-w-full max-h-full object-contain shadow-2xl rounded-lg cursor-zoom-out"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(false);
                }}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
