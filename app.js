const express = require('express');
require('dotenv').config();
const connectToDb = require('./config/database');
const cookieParser = require('cookie-parser');
const app = express();

const authRouter = require('./router/authRouter');

const nodeMailer = require('./controller/nodeMailer');

app.use(express.json());
app.use(cookieParser());

connectToDb();
app.use('/send',nodeMailer);
app.use('/api/auth/',authRouter)


module.exports = app;