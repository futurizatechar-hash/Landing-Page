import React from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import ProblemSolution from './sections/ProblemSolution';
import Portfolio from './sections/Portfolio';
import FAQ from './sections/FAQ';
import LeadForm from './sections/LeadForm';
import Footer from './components/Footer';

function App() {
  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-white text-slate-900">
        <Navbar />
        <main>
          <Hero />
          <ProblemSolution />
          <Portfolio />
          <FAQ />
          <LeadForm />
        </main>
        <Footer />
      </div>
    </LazyMotion>
  );
}

export default App;
