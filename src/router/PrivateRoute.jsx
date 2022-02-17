import React from 'react';
import { useAuth } from '../context/AuthContext';
import { SearchFood } from '../pages/SearchFood';

function PrivateRoute({ children }) {
  const { user } = useAuth();

  return user ? children : <SearchFood />;
}
export default PrivateRoute;
