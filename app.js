'use strict';

if (process.env.NODE_ENV === 'development') require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT;
const { router } = require('./router');
const { ErrorHandler } = require('./middlewares/errorHandler');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', router);
app.use(ErrorHandler.errHandling);

app.listen(PORT, () => {
  console.log(`Port Connected: ${PORT}`);
});
