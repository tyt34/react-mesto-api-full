const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundAddress = require('./errors/not-found-address');
require('dotenv').config();

const { PORT = 3000 } = process.env;
const app = express();

const options = {
  origin: [ // allowedCors
    'http://localhost:3001', // порт для тестов фронтенда
    'http://localhost:3000',
    'http://good.nomoredomains.work/',
    'https://good.nomoredomains.work/',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

app.use('*', cors(options.origin));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('The server must crash');
  }, 0);
});

app.use('/', require('./routes/app'));

app.use(auth);

app.use('/', require('./routes/user'));
app.use('/', require('./routes/card'));

app.use(errorLogger); // errorLogger нужно подключить после
// обработчиков роутов и до обработчиков ошибок:
app.use(errors());

app.use(() => {
  throw new NotFoundAddress();
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT, () => {
  console.log(PORT);
});
