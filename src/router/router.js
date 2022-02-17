import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SearchFood } from '../pages/SearchFood';
import { PublicRoute, PrivateRoute } from '.';
import { Auth } from '../pages/Auth';
import { Main } from '../pages/Main';

function AppRouter() {
  return (
    <Routes>
      <Route
        exact
        path='/login'
        element={
          <PublicRoute>
            <Auth isLogin={true} />
          </PublicRoute>
        }
      />

      <Route
        exact
        path='/signup'
        element={
          <PublicRoute>
            <Auth />
          </PublicRoute>
        }
      />
      <Route path='/' elemen={<Main />} />
      <Route path='/search' element={<SearchFood />} />
    </Routes>
  );
}

export default AppRouter;
