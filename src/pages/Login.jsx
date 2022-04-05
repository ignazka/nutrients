import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';
// import { useAuth } from '../context/AuthContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
function Login() {
  const { handleLogin } = useAuth();
  const [inputTerm, setInputTerm] = React.useState({});
  const [errorMessage, setErrorMessage] = React.useState(null);
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setInputTerm({ ...inputTerm, [name]: value });
  };

  const navigateTo = useNavigate();

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await handleLogin(inputTerm);
      navigateTo('/search');
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }

    // if (error) {
    //   console.log(error.response);
    //   setErrorMessage(error);
    // }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className='field'>
          <label className='label is-medium'>Email</label>
          <div className='control has-icons-left'>
            <input
              className='input is-dark'
              type='email'
              name='email'
              placeholder='example@hello.com'
              onChange={handleChange}
            />
            <span className='icon is-left'>
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
          </div>

          {/* <p className='help is-danger is-left'>This email is invalid</p> */}

          <label className='label is-medium'>Password</label>
          <div className='control has-icons-left'>
            <input
              className='input is-dark'
              type='password'
              name='password'
              placeholder='*********'
              onChange={handleChange}
            />
            <span className='icon is-left'>
              <FontAwesomeIcon icon={faKey} />
            </span>
          </div>

          {/* <p className='help is-danger is-left'>Password is invalid</p> */}
          <button className='button is-primary' type='submit'>
            Login{' '}
          </button>
        </div>
        {errorMessage && (
          <p className='help is-danger is-left'>{errorMessage}</p>
        )}
      </form>
    </div>
  );
}

export default Login;
