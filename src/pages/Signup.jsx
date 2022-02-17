import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';

function Signup() {
  return (
    <div>
      <h2>Signup</h2>

      <div className='field'>
        <label className='label is-medium'>Email</label>
        <div className='control has-icons-left'>
          <input
            className='input is-dark'
            type='email'
            placeholder='Email input'
            value='hello@'
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
            type='email'
            placeholder='Email input'
            value='hello@'
          />
          <span className='icon is-left'>
            <FontAwesomeIcon icon={faKey} />
          </span>
        </div>

        <p className='help is-danger is-left'>Password is invalid</p>
      </div>
    </div>
  );
}

export default Signup;
