import express from 'express';
import cors from 'cors';
import indexRouter from './routes/index';
import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost:27017/db');
//const usersRouter = require('./routes/users');

const app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

//app.use(logger('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.listen(process.env.PORT || 3001);
