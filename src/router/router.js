import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SearchFood from '../pages/SearchFood';
import Signup from '../pages/Signup';

function AppRouter() {
  return (
    <Routes>
      <Route path='/signup' element={<Signup />} />
      <Route path='/search' element={<SearchFood />} />
    </Routes>
  );
}

export default AppRouter;
