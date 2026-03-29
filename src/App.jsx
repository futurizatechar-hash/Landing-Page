import React from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import ProblemSolution from './sections/ProblemSolution';
import Authority from './sections/Authority';
import SuccessStories from './sections/SuccessStories';
import LeadForm from './sections/LeadForm';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <Navbar />
      <main>
        <Hero />
        <ProblemSolution />
        <Authority />
        <SuccessStories />
        <LeadForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
