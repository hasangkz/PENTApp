const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const notesRoutes = require('./routes/notes');
const userRoutes = require('./routes/user');
const handleError = require('./middlewares/error');
//!POST İŞLEMLERİNDE VERİ KAYBI OLMAMASI İÇİN AŞAĞIDAKİ MIDDLEWARELERI YAZIYORUZ
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
dotenv.config();

const PORT = process.env.PORT;
const URL = process.env.CONNECTION_URL;

app.get('/', (req, res) => {
  res.send('Başladık...');
});

app.use('/api/notes', notesRoutes);
app.use('/api/users', userRoutes);
//!HATA YAKALAMA MIDDLEWARE'LAR HER ZAMAN EN SONA YAZILIR
app.use(handleError);

const connectDB = async () => {
  await mongoose
    .connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server ${PORT} portunda ayağa kalktı...`);
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
};
connectDB();
