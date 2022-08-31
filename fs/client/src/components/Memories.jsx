import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CreateNote from './CreateNote';
import { getNote, reset } from '../features/data/dataSlice';
import Spinner from './Spinner';
import Note from './Note';
import leaf from '../assets/images/leaf.png';

const Memories = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { notes, isLoading, isError, message } = useSelector(
    (state) => state.notes
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate('/login');
    }
    dispatch(getNote());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  return (
    <>
      <section className='heading'>
        <p style={{ color: '#666666' }}>
          Welcome back <span className='username'>{user.username}</span>!
        </p>
      </section>
      <CreateNote />
      <section className='content'>
        {isLoading ? (
          <Spinner />
        ) : notes.length > 0 ? (
          <div className='notlar'>
            {notes.map((item) => (
              <Note key={item._id} note={item} user={user} />
            ))}
          </div>
        ) : (
          <div className='myNotes'>
            <img src={leaf} className='img' />
            <h5>You haven't produced anything yet!</h5>
          </div>
        )}
      </section>
    </>
  );
};

export default Memories;
