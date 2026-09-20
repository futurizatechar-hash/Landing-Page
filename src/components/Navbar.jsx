import React, { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { MenuIcon, XIcon, ArrowRightIcon } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Lightweight scroll listener — only checks scrollY, no layout queries
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver-based scroll spy — zero layout thrashing
  useEffect(() => {
    const sectionIds = ['soluciones', 'portfolio', 'faq', 'contacto'];
    const visibleSections = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('id');
          if (entry.isIntersecting) {
            visibleSections.set(id, entry.intersectionRatio);
          } else {
            visibleSections.delete(id);
          }
        });

        // Pick the section with the highest visibility
        let best = '';
        let bestRatio = 0;
        visibleSections.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        });

        if (best) {
          setActiveSection(best);
        }
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { name: 'Servicios', href: '#soluciones' },
    { name: 'Casos Reales', href: '#portfolio' },
    { name: 'Preguntas Frecuentes', href: '#faq' },
  ];

  const handleNavClick = (e, href) => {
    if (href.startsWith('#') && href.length > 1) {
      e.preventDefault();
      const targetId = href.substring(1);

      const doScroll = () => {
        const element = document.getElementById(targetId);
        if (element) {
          const headerOffset = 75;
          const elementPosition = element.getBoundingClientRect().top;
          const currentScroll = window.pageYOffset || window.scrollY || document.documentElement.scrollTop;
          const offsetPosition = elementPosition + currentScroll - headerOffset;

          try {
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          } catch {
            window.scrollTo(0, offsetPosition);
          }
        }
      };

      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        // Pequeño retardo para que termine la transición del menú móvil
        // y el navegador móvil (Safari iOS / Chrome) no aborte el scroll suave
        setTimeout(doScroll, 180);
      } else {
        doScroll();
      }
    } else if (href === '#' || href === '') {
      e.preventDefault();
      if (isMobileMenuOpen) setIsMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-slate-100 py-3 shadow-sm' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <m.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center"
        >
          {/* Logo */}
          <a href="#" onClick={(e) => handleNavClick(e, '#')} className="flex items-center justify-center transition-transform hover:scale-105">
            <img 
              src="/logo-horizontal.webp" 
              alt="Futuriza - Software a Medida, Automatizaciones y Agentes de IA" 
              className="h-10 md:h-12 w-auto object-contain" 
              width="180"
              height="48"
              loading="eager" 
              fetchPriority="high"
            />
          </a>
        </m.div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link, i) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <m.a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`relative text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                  isActive ? 'text-brand-accent scale-105 drop-shadow-sm' : 'text-slate-600 hover:text-brand-accent'
                }`}
              >
                {link.name}
                {isActive && (
                  <m.div
                    initial={{ opacity: 0, scaleX: 0.5 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    className="absolute -bottom-1.5 left-0 right-0 h-[2.5px] bg-brand-accent rounded-t-full shadow-[0_2px_8px_rgba(255,87,34,0.5)] origin-center"
                    transition={{ duration: 0.2 }}
                  />
                )}
              </m.a>
            );
          })}
          <m.a
            href="#contacto"
            onClick={(e) => handleNavClick(e, '#contacto')}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="btn-primary flex items-center gap-2 text-sm py-2 px-6 !rounded-lg shadow-md"
          >
            Solicitar Diagnóstico <ArrowRightIcon className="w-4 h-4" />
          </m.a>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-brand-dark p-2"
            aria-label="Abrir menú de navegación"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <m.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
            className="lg:hidden bg-white border-b border-slate-100 overflow-hidden shadow-lg"
          >
            <div className="flex flex-col p-6 gap-3">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`font-bold transition-all duration-200 block py-2.5 px-3 rounded-lg text-base ${
                      isActive ? 'text-brand-accent bg-brand-accent/5 border-l-4 border-brand-accent font-extrabold' : 'text-slate-700 hover:text-brand-accent hover:bg-slate-50'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
              <a href="#contacto" onClick={(e) => handleNavClick(e, '#contacto')} className="btn-primary w-full flex items-center justify-center py-3.5 mt-2 shadow-md">
                Solicitar Diagnóstico
              </a>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
