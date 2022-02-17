import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { AuthForm } from '../../components/AuthForm';

function Auth({ isLogin }) {
  const { handleLogin, handleSignup } = useAuth();
  const onSubmit = isLogin ? handleLogin : handleSignup;
  const submitMessage = isLogin ? 'Login' : 'Signup';

  return <AuthForm submitMessage={submitMessage} onSubmit={onSubmit} />;
}

export default Auth;
