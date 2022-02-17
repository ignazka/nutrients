import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';

function AuthForm({ onSubmit, submitMessage }) {
  const [inputTerm, setInputTerm] = React.useState();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setInputTerm({ ...inputTerm, [name]: value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const { error } = onSubmit(inputTerm);

    if (error) {
      console.log(
        'Error occured while submitting data from auth form: ',
        error.message
      );
    }
  };

  return (
    <div>
      <h2>Signup</h2>

      <form className='field' onSubmit={handleSubmit}>
        <label className='label is-medium'>Email</label>
        <div className='control has-icons-left'>
          <input
            className='input is-dark'
            name='email'
            type='email'
            placeholder='sample@email.com'
            onChange={handleChange}
          />
          <span className='icon is-left'>
            <FontAwesomeIcon icon={faEnvelope} />
          </span>
        </div>
        <p className='help is-danger is-left'>This email is invalid</p>

        <label className='label is-medium'>Password</label>
        <div className='control has-icons-left'>
          <input
            className='input is-dark'
            name='password'
            type='password'
            placeholder='***********'
            onChange={handleChange}
          />
          <span className='icon is-left'>
            <FontAwesomeIcon icon={faKey} />
          </span>
        </div>
        <p className='help is-danger is-left'>Password is invalid</p>
        <button className='button' type='submit'>
          {submitMessage}
        </button>
      </form>
    </div>
  );
}

export default AuthForm;
