import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllNotes } from '../features/data/dataSlice';
import Spinner from '../components/Spinner';
import AllNotes from '../components/AllNotes';
import empty from '../assets/images/empty.png';
import { FaSearch } from 'react-icons/fa';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  const { notes, isLoading, isError, message } = useSelector(
    (state) => state.notes
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getAllNotes());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch('');
  };

  return (
    <>
      <section
        className='searchContainer'
        style={{ width: '80%', margin: '0 auto', marginBottom: '20px' }}
      >
        <form onSubmit={handleSubmit}>
          <div className='search-box'>
            <button className='btn-search'>
              <FaSearch />
            </button>
            <input
              id='search'
              name='search'
              maxLength='30'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type='text'
              className='input-search'
              placeholder='Type to Filter...'
            ></input>
          </div>
        </form>
      </section>
      <section className='content'>
        {isLoading ? (
          <Spinner />
        ) : notes.length > 0 ? (
          <div>
            {notes
              .filter(
                (item) =>
                  item.baslik.toLowerCase().includes(search) ||
                  item.aciklama.toLowerCase().includes(search)
              )
              .map((item) => {
                return item ? (
                  <AllNotes key={item._id} note={item} />
                ) : (
                  <h1>Not Found</h1>
                );
              })}
          </div>
        ) : (
          <>
            <img src={empty} className='img' />
            <h3>No one has shared anything yet...</h3>
          </>
        )}
      </section>
    </>
  );
};

export default Dashboard;
