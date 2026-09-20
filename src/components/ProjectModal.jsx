import React, { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Lock, Info } from 'lucide-react';

export default function ProjectModal({ selectedProject, onClose }) {
  const [activeImage, setActiveImage] = useState(
    selectedProject.gallery ? selectedProject.gallery[0].url : selectedProject.image
  );
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {/* Modal / Detalle del Proyecto */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <m.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => onClose()}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        />
        
        <m.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white border border-slate-200 rounded-2xl shadow-2xl z-10"
        >
          <button 
            onClick={() => onClose()}
            className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-slate-100 rounded-full text-slate-600 shadow-sm transition-colors z-20"
          >
            <X size={20} />
          </button>

          <div 
            className="w-full bg-slate-950 border-b border-slate-200 p-6 sm:p-10 flex flex-col items-center justify-center min-h-[300px] relative group overflow-hidden"
          >
            {/* Dynamic Blurred Background */}
            <img 
              src={activeImage || selectedProject.image} 
              className="absolute inset-0 w-full h-full object-cover blur-[100px] scale-[4] opacity-100 z-0 pointer-events-none"
              alt=""
            />
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
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${isSelected ? "bg-brand-accent text-white shadow-md shadow-brand-accent/30 scale-105" : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"}`}
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
                        <span className="text-brand-accent mt-1">&#10038;</span>
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
        </m.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isExpanded && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
            onClick={() => setIsExpanded(false)}
          >
            <m.button 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpanded(false)}
              className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-[110]"
            >
              <X size={24} />
            </m.button>
            <m.div
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
            </m.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
