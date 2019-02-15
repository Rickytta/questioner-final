import express from 'express';
import usersRouter from './routes/users';
import meetupsRouter from './routes/meetups';
import questionsRouter from './routes/questions';
import rsvpsRouter from './routes/rsvps';
import commentsRouter from './routes/comments';
import swaggerUi from 'swagger-ui-express';
import apiDocumentation from './api-documentation.json';

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(apiDocumentation));
app.use('/api/v1/auth', usersRouter);
app.use('/api/v1/meetups', meetupsRouter);
app.use('/api/v1/questions', questionsRouter);
app.use('/api/v1/rsvps', rsvpsRouter);
app.use('/api/v1/comments', commentsRouter);

export default app;