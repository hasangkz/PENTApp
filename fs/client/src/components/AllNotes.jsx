import React from 'react';
import { CircleFlag } from 'react-circle-flags';
import './allnotes.css';

const AllNotes = ({ note }) => {
  let flag = note.oncelik.toLowerCase();

  let tags = note.baslik.split(',');

  let tag = [];

  for (let i = 0; i < tags.length; i++) {
    tag.push('#' + tags[i] + ' ');
  }

  return (
    <div className='wrapper nested'>
      <div className='childfirst'>
        <div>
          <h1>{tag}</h1>
        </div>
        <div>
          <CircleFlag countryCode={flag} style={{ height: '35px' }} />
        </div>
      </div>
      <div className='childsecond'>
        <div>
          <p>{note.aciklama}</p>
        </div>
        <div>{new Date(note.createdAt).toISOString().split('T')[0]}</div>
      </div>
    </div>
  );
};

export default AllNotes;
