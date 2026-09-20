import React, { useState, Suspense, lazy } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { PORTFOLIO_PROJECTS } from '../constants/projects';
import { ExternalLink, Lock } from 'lucide-react';

const ProjectModal = lazy(() => import('../components/ProjectModal'));

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState(null);

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
            <m.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => {
                setSelectedProject(project);
              }}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-slate-200 hover:border-brand-accent/40 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full"
            >
              <div className="relative aspect-[16/10] sm:aspect-video overflow-hidden bg-slate-950 border-b border-slate-100 shrink-0 flex items-center justify-center group">
                {/* Ambient background gradient — replaces duplicate img download */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 z-0 pointer-events-none" />

                <img 
                  src={project.image} 
                  alt={`${project.title} - Proyecto de ${project.type} desarrollado por Futuriza`}
                  loading="lazy"
                  decoding="async"
                  width="750"
                  height="468"
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
            </m.div>
          ))}
        </div>
      </div>

      {/* Modal / Detalle del Proyecto (lazy-loaded) */}
      <AnimatePresence>
        {selectedProject && (
          <Suspense fallback={null}>
            <ProjectModal
              selectedProject={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          </Suspense>
        )}
      </AnimatePresence>
    </section>
  );
}
