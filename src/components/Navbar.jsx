import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuIcon, XIcon, ArrowRightIcon } from 'lucide-react';
import logoHorizontal from '../assets/texto-logo-horizontal.webp';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Accurate Scroll Spy
      const scrollPosition = window.scrollY + 120; // safe scanning offset
      const sections = document.querySelectorAll('section[id], div[id="contacto"]');
      let current = '';
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const sectionHeight = section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });
      // Highlight end of page
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
        current = 'contacto';
      }
      setActiveSection((prev) => current || prev);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
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
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center"
        >
          {/* Logo */}
          <a href="#" onClick={(e) => handleNavClick(e, '#')} className="flex items-center justify-center transition-transform hover:scale-105">
            <img 
              src={logoHorizontal} 
              alt="Futuriza - Software a Medida, Automatizaciones y Agentes de IA" 
              className="h-10 md:h-12 object-contain" 
              loading="eager" 
              fetchPriority="high"
            />
          </a>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link, i) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <motion.a
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
                  <motion.div
                    layoutId="desktop-nav-underline"
                    className="absolute -bottom-1.5 left-0 right-0 h-[2.5px] bg-brand-accent rounded-t-full shadow-[0_2px_8px_rgba(255,87,34,0.5)]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </motion.a>
            );
          })}
          <motion.a
            href="#contacto"
            onClick={(e) => handleNavClick(e, '#contacto')}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="btn-primary flex items-center gap-2 text-sm py-2 px-6 !rounded-lg shadow-md"
          >
            Solicitar Diagnóstico <ArrowRightIcon className="w-4 h-4" />
          </motion.a>
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
          <motion.div 
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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
