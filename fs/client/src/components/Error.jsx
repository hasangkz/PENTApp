import React from 'react';
import { Link } from 'react-router-dom';
import notFound from '../assets/images/notFound.png';
import './error.css';

export const Error = () => {
  return (
    <div>
      <img src={notFound} className='img' />
      <h2 style={{ textAlign: 'center' }}>
        <Link to='/' className='goHome'>
          Go to Home
        </Link>
      </h2>
    </div>
  );
};
