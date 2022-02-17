import './App.sass';
import React from 'react';
import { Navbar } from './components/Navbar';
import { AppRouter } from './router';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <AppRouter />

      <footer>&copy; Philipp Kastl, 2022</footer>
    </div>
  );
}

export default App;
