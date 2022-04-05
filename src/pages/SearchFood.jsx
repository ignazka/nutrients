import React from 'react';
import { Searchbar } from '../components/Searchbar';
import { Chart } from '../components/Chart';
import { FoodCard } from '../components/FoodCard';
import { useFoodAPI } from '../api';

function SearchFood() {
  const { nutrients, state, fetchData } = useFoodAPI();
  const [toggle, setToggle] = React.useState(false);

  const handleChange = event => {
    console.log(event);
    setToggle(true);

    setTimeout(function () {
      setToggle(false);
    }, 2000);
  };
  return (
    <div>
      <Searchbar onChange={event => fetchData(event)} />
      <div className={`note ${toggle && 'opened'}`}>added sucessfully</div>

      <div className='section'>
        <div className='container is-mobile column is-6'>
          {state &&
            [state].map(food => (
              <FoodCard food={food} setToggle={handleChange} />
            ))}
        </div>

        <Chart nutrients={nutrients} />
      </div>
    </div>
  );
}

export default SearchFood;
