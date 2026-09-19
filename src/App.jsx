import React from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import ProblemSolution from './sections/ProblemSolution';
import Portfolio from './sections/Portfolio';
import FAQ from './sections/FAQ';
import LeadForm from './sections/LeadForm';
import Footer from './components/Footer';

function App() {
  return (
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
  );
}

export default App;
