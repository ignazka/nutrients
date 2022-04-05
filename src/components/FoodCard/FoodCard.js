import React from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useFoodAPI } from '../../api';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function FoodCard({ food, setToggle }) {
  const [inputTerm, setInputTerm] = React.useState(0);
  const { resetData } = useFoodAPI();
  const { user } = useAuth();
  const navigateTo = useNavigate();
  const handleClick = async event => {
    try {
      event.preventDefault();
      const { data } = await axios.post(
        'http://localhost:4000/api/food',
        {
          name: food.label,
          kcal: (food.nutrients.ENERC_KCAL * inputTerm) / 100,
          amount: inputTerm,
          image: food.image,
          carb: Math.floor(food.nutrients.CHOCDF * inputTerm) / 100,
          fat: (food.nutrients.FAT * inputTerm) / 100,
          fiber: (food.nutrients.FIBTG * inputTerm) / 100,
          protein: Math.floor(food.nutrients.PROCNT * inputTerm) / 100,
          owner: user._id,
        },
        { withCredentials: true }
      );
      setToggle(true);
      // navigateTo('/search');
    } catch (error) {}
  };

  const handleChange = ({ target }) => {
    setInputTerm(target.value);
  };

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
      {user && (
        <Box component='form'>
          <TextField
            name='grams'
            variant='outlined'
            value={inputTerm}
            onChange={handleChange}
            label='amount (g)'
          />

          <Button variant='text' onClick={handleClick}>
            <AddIcon /> add to list
          </Button>
        </Box>
      )}
    </div>
  );
}

export default FoodCard;
