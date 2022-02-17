import { foodAPI } from './api';
import React from 'react';
const initialValue = '';

function useFoodAPI() {
  const [state, setState] = React.useState(null);
  const [nutrients, setNutrients] = React.useState([
    { kcal: 0 },
    { fat: 0 },
    { fiber: 0 },
    { carbs: 0 },
    { proteins: 0 },
  ]);

  const API_KEY = process.env.REACT_APP_API_KEY_EDAMAM_FOOD_DATABASE;
  const APP_ID = process.env.REACT_APP_APP_ID;

  async function fetchData(ingredient) {
    try {
      const { data } = await foodAPI.get(
        `parser?ingr=${ingredient}&app_id=${APP_ID}&app_key=${API_KEY}`
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
  }
  return { fetchData, nutrients, state };
}

export default useFoodAPI;
