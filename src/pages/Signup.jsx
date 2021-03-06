import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';
function Signup() {
  const { handleSignup } = useAuth();
  const [inputTerm, setInputTerm] = React.useState({});
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setInputTerm({ ...inputTerm, [name]: value });
    console.log(inputTerm);
  };

  return (
    <div>
      <h2>Signup</h2>
      <form
        onSubmit={event => {
          event.preventDefault();
          console.log('test');
          handleSignup(inputTerm);
        }}
      >
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
            Create Account{' '}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
