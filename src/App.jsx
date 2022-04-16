import './App.sass';
import React from 'react';
import { Navbar } from './components/Navbar';
import { AppRouter } from './router';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <AppRouter />
      <Footer />
    </div>
  );
}

export default App;
