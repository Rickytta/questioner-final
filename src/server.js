import express from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

const port = process.env.PORT || 3001;

app.listen(port);
console.log('Server started successfully! app running on port ', port);