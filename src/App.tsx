import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Database from './components/Database';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen bg-gray-900">
            <Navbar />
            <Hero />
            <About />
            <Services />
            <Contact />
            <Footer />
          </div>
        } />
        <Route path="/database" element={<Database />} />
      </Routes>
    </Router>
  );
}

export default App;
