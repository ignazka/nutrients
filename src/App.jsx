import './App.sass';
import React from 'react';
import { useFoodAPI } from './api';
import { Chart } from './components/Chart';
import { Searchbar } from './components/Searchbar';
import { Navbar } from './components/Navbar';
import { FoodCard } from './components/FoodCard';

function App() {
  const { nutrients, state, fetchData } = useFoodAPI();

  console.log(nutrients);

  return (
    <div className='App'>
      <Navbar />
      <Searchbar onChange={event => fetchData(event)} />

      <div className='section'>
        <div className='container is-mobile column is-6'>
          {state && [state].map(food => <FoodCard food={food} />)}
        </div>

        <Chart nutrients={nutrients} />
      </div>
      <footer>&copy; Philipp Kastl, 2022</footer>
    </div>
  );
}

export default App;
