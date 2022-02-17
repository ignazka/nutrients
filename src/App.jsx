import './App.sass';
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useFoodAPI } from './api';

function App() {
  const initialValue = '';

  const [input, setInput] = React.useState(initialValue);
  ChartJS.register(ArcElement, Tooltip, Legend);

  const { nutrients, fetchData, state } = useFoodAPI();
  console.log(nutrients);
  const chartData = {
    labels: ['fat', 'fiber', 'carbs', 'proteins'],
    datasets: [
      {
        label: '# of Votes',
        data: [
          [nutrients][0][0].fat,
          [nutrients][0][1].fiber,
          [nutrients][0][2].carbs,
          [nutrients][0][3].proteins,
        ],
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const handleChange = ({ target }) => {
    const inputValue = target.value;
    setInput({ ...input, inputValue });
  };

  // React.useEffect(() => {
  //   fetchData();
  // }, []);

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
        <div className='ctn-chart'>
          <Pie data={chartData} />
        </div>
      </div>
      <footer>&copy; Philipp Kastl, 2022</footer>
    </div>
  );
}

export default App;
