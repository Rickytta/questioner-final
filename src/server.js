import express from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/meetups', meetupsRouter);

const port = process.env.PORT || 3001;

app.listen(port);
console.log('Server started successfully! app running on port ', port);