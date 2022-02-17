import React from 'react';
import { signup, login, logout, isLoggedIn } from '../../api';

function getSessionUser() {
  const rawUser = sessionStorage.getItem('user');
  if (rawUser) {
    return JSON.parse(rawUser);
  }
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

  const handleSignup = async credentials => {
    try {
      console.log('signup');
      const { data } = await signup(credentials);
      console.log(data);
      saveSessionUser(data);
      setAuth({ user: data });
    } catch (error) {
      setAuth({ user: null });
      return { error: error };
    }
  };

  const handleLogin = async credentials => {
    try {
      const { data } = await login(credentials);
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
    } catch (error) {
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
      value={{ ...auth, handleLogin, handleSignup, handleLogout }}
    >
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth() {
  return React.useContext(AuthCtx);
}

export default AuthProvider;
