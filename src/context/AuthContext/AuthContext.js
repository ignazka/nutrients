import React from 'react';
import { signup, login, isLoggedIn, logout } from '../../api';

function getSessionUser() {
  const rawUser = sessionStorage.getItem('user');
  if (rawUser) {
    return JSON.parse(rawUser);
  }
  return null;
}

function removeUser() {
  sessionStorage.removeItem('user');
}

function saveSessionUser(user) {
  sessionStorage.setItem('user', JSON.stringify(user));
}

export const AuthCtx = React.createContext();

function AuthProvider({ children }) {
  const [auth, setAuth] = React.useState({ user: getSessionUser() });

  const handleLogin = async credentials => {
    try {
      const { data } = await login(credentials);
      saveSessionUser(data);
      setAuth({ user: data });
    } catch (error) {
      setAuth({ user: null });
      return { error };
    }
  };

  const handleSignup = async credentials => {
    try {
      const { data } = await signup(credentials);
      saveSessionUser(data);
      setAuth({ user: data });
    } catch (error) {
      setAuth({ user: null });
      return { error: error };
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      removeUser();
    } catch (error) {
      return { error: error };
    } finally {
      setAuth({ user: null });
    }
  };

  const handleIsLoggedIn = async () => {
    try {
      const { data } = await isLoggedIn();
      setAuth({ user: data });
      saveSessionUser(data);
    } catch (error) {
      setAuth({ user: null });
      removeUser();
    }
  };

  React.useEffect(() => {
    handleIsLoggedIn();
  }, []);

  return (
    <AuthCtx.Provider
      value={{ ...auth, handleLogin, handleLogout, handleSignup }}
    >
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth() {
  return React.useContext(AuthCtx);
}

export default AuthProvider;
