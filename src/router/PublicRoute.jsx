import React from 'react';
import { Auth } from '../pages/Auth';
import { useAuth } from '../context/AuthContext';
import { Main } from '../pages/Main';

function PublicRoute({ children }) {
  const { user } = useAuth();

  return !user ? children : <Main />;
}

export default PublicRoute;
