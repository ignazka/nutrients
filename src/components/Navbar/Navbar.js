import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [toggle, setToggle] = React.useState(false);

  return (
    <nav className='navbar is-dark'>
      <div className='navbar-brand'>
        <div className='navbar-item'>
          <p>Nutrients</p>
        </div>
        <a
          role='button'
          className={`navbar-burger ${toggle && 'is-active'}`}
          aria-label='menu'
          aria-expanded='false'
          data-target='navBar'
          onClick={() => setToggle(!toggle)}
        >
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
        </a>
      </div>
      <div id='navBar' className={`navbar-menu ${toggle && 'is-active'}`}>
        <div className='navbar-start'>
          <Link to='/search' className='navbar-item'>
            Search Food
          </Link>
          <Link to='' className='navbar-item'>
            Food List
          </Link>
        </div>
        <div className='navbar-end'>
          <div className='navbar-item'>
            <div className='buttons'>
              <Link to='/signup' className='button auth is-primary'>
                Signup
              </Link>
              <Link to='' className='button auth is-light'>
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
