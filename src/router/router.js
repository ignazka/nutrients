import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SearchFood from '../pages/SearchFood';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import FoodList from '../pages/FoodList';

function AppRouter() {
  return (
    <Routes>
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/search' element={<SearchFood />} />
      <Route path='/list' element={<FoodList />} />
    </Routes>
  );
}

export default AppRouter;
