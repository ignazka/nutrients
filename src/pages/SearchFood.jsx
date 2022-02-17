import React from 'react';
import { Searchbar } from '../components/Searchbar';
import { Chart } from '../components/Chart';
import { FoodCard } from '../components/FoodCard';
import { useFoodAPI } from '../api';

function SearchFood() {
  const { nutrients, state, fetchData } = useFoodAPI();
  return (
    <div>
      <h2>Search for Food</h2>

      <Searchbar onChange={event => fetchData(event)} />

      <div className='section'>
        <div className='container is-mobile column is-6'>
          {state && [state].map(food => <FoodCard food={food} />)}
        </div>

        <Chart nutrients={nutrients} />
      </div>
    </div>
  );
}

export default SearchFood;
