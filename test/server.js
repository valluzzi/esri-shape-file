//import express from 'express';
//import morgan from 'morgan';
//import path from 'path';
//import { fileURLToPath } from 'url';

const express = require('express');
const morgan = require('morgan');
const path = require('path');

//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);
const app = express();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '..')));

const server = app.listen(4000, () => {
  console.log('go to http://localhost:4000/test/ to test in the browser');
  console.log('or `npm run test` in another window');
});



