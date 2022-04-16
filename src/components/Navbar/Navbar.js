import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
function Navbar() {
  const [toggle, setToggle] = React.useState(false);
  const { user, handleLogout } = useAuth();
  const navigateTo = useNavigate();
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
          <Link
            to='/search'
            onClick={() => setToggle(false)}
            className='navbar-item'
          >
            Search Food
          </Link>
          <Link
            to='/list'
            onClick={() => setToggle(false)}
            className='navbar-item'
          >
            Food List
          </Link>
        </div>
        <div className='navbar-end'>
          <div className='navbar-item'>
            {!user ? (
              <div className='buttons'>
                <Link
                  to='/signup'
                  onClick={() => setToggle(false)}
                  className='button auth is-primary'
                >
                  Signup
                </Link>
                <Link
                  to='/login'
                  onClick={() => setToggle(false)}
                  className='button auth is-light'
                >
                  Login
                </Link>
              </div>
            ) : (
              <div className='logged-ctn'>
                <p>logged in: {user.email} </p>
                <button
                  className='button is-danger'
                  onClick={() => {
                    handleLogout();
                    navigateTo('/search');
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
