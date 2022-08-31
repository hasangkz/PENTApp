import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteNote } from '../features/data/dataSlice';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './note.css';

const Note = ({ note }) => {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteNote(id));
  };

  let tags = note.baslik.split(',');

  let tag = [];

  for (let i = 0; i < tags.length; i++) {
    tag.push('#' + tags[i] + ' ');
  }

  const language = note.oncelik;
  let lang;
  switch (language) {
    case 'fr':
      lang = 'Français';
      break;
    case 'tr':
      lang = 'Türkçe';
      break;
    case 'ru':
      lang = 'Русский';
      break;
    case 'es':
      lang = 'Español';
      break;
    case 'it':
      lang = 'Italiano';
      break;
    case 'gb':
      lang = 'English';
      break;
    case 'de':
      lang = 'Deutsch';
      break;

    default:
      lang = 'English';
      break;
  }
  return (
    <div className='box'>
      <Card className='inbox'>
        <CardContent>
          <Typography className='typ' color='text.secondary' id='lang'>
            {lang}
            <hr />
          </Typography>
          <Typography className='typ' variant='h5' component='div'>
            {tag}
          </Typography>
          <Typography className='typ' variant='body1'>
            {note.aciklama.length > 278 ? (
              <div className='metin'>{note.aciklama.substring(0, 278)}...</div>
            ) : (
              <div className='metin'>{note.aciklama}</div>
            )}
          </Typography>
          <Typography className='typ' variant='body2' id='tarih'>
            {new Date(note.createdAt).toLocaleString()}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size='small'
            onClick={() => {
              handleDelete(note._id);
            }}
          >
            Discard
          </Button>
        </CardActions>
      </Card>
    </div>
  );
  // .substring(0, 100)...
  //   return (
  //     <div className='not'>
  //       <div>
  //         {new Date(note.createdAt).toLocaleString()}
  //         <h1>{note.baslik}</h1>
  //         <p>{note.aciklama}</p>
  //         <p>{note.oncelik}</p>
  //         <p>{user.username}</p>

  //       </div>
  //     </div>
  //   );
};
export default Note;
