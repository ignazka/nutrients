import './App.sass';
import React from 'react';
import Axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

import { Pie } from 'react-chartjs-2';

function App() {
  const initialValue = '';
  const [state, setState] = React.useState(null);
  const [nutrients, setNutrients] = React.useState([
    { kcal: 0 },
    { fat: 0 },
    { fiber: 0 },
    { carbs: 0 },
    { proteins: 0 },
  ]);
  const [input, setInput] = React.useState(initialValue);
  ChartJS.register(ArcElement, Tooltip, Legend);

  const api = Axios.create({
    baseURL: 'https://api.spoonacular.com/food/ingredients/search',
  });
  const API_KEY = process.env.REACT_APP_API_KEY_EDAMAM_FOOD_DATABASE;

  const fetchData = async ingredient => {
    try {
      // `https://api.spoonacular.com/food/ingredients/search?query=apple&number=5&apiKey=${API_KEY}`
      const { data } = await Axios.get(
        `https://api.edamam.com/api/food-database/v2/parser?ingr=${ingredient}&app_id=03d7032c&app_key=344290a004b263d49aece40206c5c59a`
      );
      setState(data.parsed[0].food);
      const nutrientsArr = [
        { fat: data.parsed[0].food.nutrients.FAT },
        { fiber: data.parsed[0].food.nutrients.FIBTG },
        { carbs: data.parsed[0].food.nutrients.CHOCDF },
        { proteins: data.parsed[0].food.nutrients.PROCNT },
      ];
      setNutrients([...nutrientsArr]);
    } catch (error) {
      console.error(`Error while fetching data ${error}`);
    }
  };

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
          className='input is-primary'
          value={input.inputValue || ''}
          onChange={handleChange}
          placeHolder='search for Food'
          type='text'
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
                      <p className='title is-4'>{food.label}</p>
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
    </div>
  );
}

export default App;
