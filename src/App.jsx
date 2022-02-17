import './App.sass';
import React from 'react';
import { useFoodAPI } from './api';
import { Chart } from './components/Chart';

function App() {
  const initialValue = '';

  const [input, setInput] = React.useState(initialValue);

  const { nutrients, fetchData, state } = useFoodAPI();
  console.log(nutrients);

  const handleChange = ({ target }) => {
    const inputValue = target.value;
    setInput({ ...input, inputValue });
  };

  return (
    <div className='App'>
      <nav className='navbar is-dark'>
        <div className='navbar-brand'>
          <div className='navbar-item'>
            <p>Nutrients</p>
          </div>
        </div>
      </nav>
      <form
        onSubmit={event => {
          event.preventDefault();
          fetchData(event.target[0].value);
          setInput(initialValue);
        }}
      >
        <label className='label' htmlFor='search'>
          {' '}
          Search Food
        </label>
        <input
          name='search'
          className='input is-dark'
          value={input.inputValue || ''}
          onChange={handleChange}
          type='text'
          placeholder='Potato'
        />

        <button className='button is-dark' type='submit'>
          search
        </button>
      </form>
      <div className='section'>
        <div className='container is-mobile column is-6'>
          {state &&
            [state].map(food => {
              return (
                <div className='card'>
                  <div className='card-image'>
                    <figure className='image is-4by3'>
                      <img src={food.image} alt={food.label} />
                    </figure>
                  </div>
                  <div className='card-content'>
                    <div className='media'>
                      <p className='title is-3'>{food.label}</p>
                    </div>

                    <div className='content'>
                      <p>kcal: {food.nutrients.ENERC_KCAL} / 100g</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <Chart nutrients={nutrients} />
      </div>
      <footer>&copy; Philipp Kastl, 2022</footer>
    </div>
  );
}

export default App;
