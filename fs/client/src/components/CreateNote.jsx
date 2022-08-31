import React, { useState } from 'react';
import './createnote.css';
import { useDispatch } from 'react-redux';

import { createNote } from '../features/data/dataSlice';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const CreateNote = () => {
  const dispatch = useDispatch();

  const [baslik, setBaslik] = useState('');
  const [aciklama, setAciklama] = useState('');
  const [oncelik, setOncelik] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createNote({ baslik, aciklama, oncelik }));
    setBaslik('');
    setAciklama('');
    setOncelik('');
  };
  return (
    <>
      <section className='form'>
        <form onSubmit={handleSubmit}>
          <div className='form-group createnote'>
            <label htmlFor='baslik'>Tag(s)</label>
            <input
              type='text'
              id='baslik'
              required
              name='baslik'
              maxLength='30'
              value={baslik}
              placeholder='it,fun,art,politic'
              onChange={(e) => setBaslik(e.target.value)}
            />
          </div>
          <div className='form-group createnote'>
            <label htmlFor='aciklama'>Description</label>
            <textarea
              rows='4'
              cols='50'
              type='text'
              id='aciklama'
              required
              name='aciklama'
              maxLength='300'
              value={aciklama}
              onChange={(e) => setAciklama(e.target.value)}
            />
          </div>

          <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id='demo-simple-select-standard-label'>
              Language
            </InputLabel>
            <Select
              required
              labelId='selectId'
              value={oncelik}
              label='Öncelik Sırası'
              onChange={(e) => setOncelik(e.target.value)}
            >
              <MenuItem value='gb'>English</MenuItem>
              <MenuItem value='tr'>Türkçe</MenuItem>
              <MenuItem value='es'>Español</MenuItem>
              <MenuItem value='de'>Deutsch</MenuItem>
              <MenuItem value='ru'>Русский</MenuItem>
              <MenuItem value='fr'>Français</MenuItem>
              <MenuItem value='it'>Italiano</MenuItem>
            </Select>
          </FormControl>

          <div className='form-group createnote'>
            <button className='butoncreate' type='submit'>
              Share with others!
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default CreateNote;
