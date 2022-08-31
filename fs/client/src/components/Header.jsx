import React from 'react';
import { FaUserCircle, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import penta from '../assets/images/penta.svg';

import { useSelector, useDispatch } from 'react-redux';

import { logout, reset } from '../features/auth/authSlice';

import './header.css';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  };

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>
          <img src={penta} className='img-header' />
        </Link>
      </div>
      <ul>
        {user ? (
          <>
            <li>
              <NavLink
                className={(navData) => (navData.isActive ? 'active' : 'pasif')}
                to={`/user/${user._id}`}
              >
                My Pentas
              </NavLink>
            </li>
            <li>
              <a
                className='out'
                style={{ cursor: 'pointer' }}
                onClick={handleLogout}
              >
                <FaSignOutAlt />
                Log out
              </a>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to='/login' className='login'>
                <FaSignInAlt /> Sign in
              </Link>
            </li>
            <li>
              <Link to='/register' className='register'>
                <FaUserCircle /> Join us
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
