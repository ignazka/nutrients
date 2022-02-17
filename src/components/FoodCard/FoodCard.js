import React from 'react';

function FoodCard({ food }) {
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
}

export default FoodCard;
