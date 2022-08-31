import axios from 'axios';
const BASE_URL = '/api/notes/';
const GUEST_URL = '/api/notes/guest/';

const createNote = async (noteData, token) => {
  const configToken = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(BASE_URL, noteData, configToken);
  return response.data;
};

const getNote = async (token) => {
  const configToken = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(BASE_URL, configToken);
  return response.data;
};
const getAllNotes = async () => {
  const response = await axios.get(GUEST_URL);
  return response.data;
};

const deleteNote = async (noteID, token) => {
  const configToken = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(BASE_URL + noteID, configToken);
  return response.data;
};

const dataServices = {
  createNote,
  getNote,
  deleteNote,
  getAllNotes,
};

export default dataServices;
