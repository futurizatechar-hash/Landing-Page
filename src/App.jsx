import React, { Suspense, lazy } from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';

// Lazy load everything below the fold to eliminate unused JS on initial load
const ProblemSolution = lazy(() => import('./sections/ProblemSolution'));
const Portfolio = lazy(() => import('./sections/Portfolio'));
const FAQ = lazy(() => import('./sections/FAQ'));
const LeadForm = lazy(() => import('./sections/LeadForm'));
const Footer = lazy(() => import('./components/Footer'));

function App() {
  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-white text-slate-900">
        <Navbar />
        <main>
          <Hero />
          <Suspense fallback={<div className="min-h-[100px]" />}>
            <ProblemSolution />
            <Portfolio />
            <FAQ />
            <LeadForm />
          </Suspense>
        </main>
        <Suspense fallback={<div />}>
          <Footer />
        </Suspense>
      </div>
    </LazyMotion>
  );
}

export default App;
