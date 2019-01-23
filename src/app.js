import express from 'express';
import usersRouter from './routes/users';
import meetupsRouter from './routes/meetups';
import questionsRouter from './routes/questions';

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.use('/api/v1/auth', usersRouter);
app.use('/api/v1/meetups', meetupsRouter);
app.use('/api/v1/questions', questionsRouter);

export default app;