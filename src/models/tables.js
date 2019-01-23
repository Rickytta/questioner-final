import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const env = (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'dev') ? `_${process.env.NODE_ENV}` : '';

const pool = new pg.Pool({
  connectionString: process.env[`DATABASE_URL${env}`],
});

pool.on('connect', () => {
  console.log('connected to the Database');
});

const drop = () => {
  const usersTable = 'DROP TABLE IF EXISTS users CASCADE';
  const meetupsTable = 'DROP TABLE IF EXISTS meetups CASCADE';
  const questionsTable = 'DROP TABLE IF EXISTS questions CASCADE';
  const rsvpsTable = 'DROP TABLE IF EXISTS rsvps';
  const votesTable = 'DROP TABLE IF EXISTS votes';


  const dropQueries = `${usersTable}; ${questionsTable}; ${rsvpsTable}; ${votesTable}; ${meetupsTable};`;

  pool.query(dropQueries)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
  pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
  });
};

const create = () => {
  const usersTable = `CREATE TABLE IF NOT EXISTS
      users(
        id SERIAL PRIMARY KEY,
        "firstName" VARCHAR(50) NOT NULL,
        "lastName" VARCHAR(50) NOT NULL,
        "otherName" VARCHAR(50) NOT NULL,
        email VARCHAR(100) NULL,
        phone VARCHAR(15) NOT NULL,
        username VARCHAR(50) NOT NULL,
        password TEXT NOT NULL,
        registered TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "isAdmin" BOOLEAN NOT NULL DEFAULT false
      )`;

  const meetupsTable = `CREATE TABLE IF NOT EXISTS
      meetups(
        id SERIAL PRIMARY KEY,
        "createdOn" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        location VARCHAR(100) NOT NULL,
        images TEXT [] NULL,
        topic VARCHAR(50) NOT NULL,
        "happeningOn" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        tags TEXT [] NULL
      )`;

  const questionsTable = `CREATE TABLE IF NOT EXISTS
      questions(
        id SERIAL PRIMARY KEY,
        "createdOn" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "createdBy" INT NOT NULL REFERENCES users(id),
        meetup INT NOT NULL REFERENCES meetups(id),
        title VARCHAR(100) NOT NULL,
        body TEXT NULL
      )`;

  const rsvpsTable = `CREATE TABLE IF NOT EXISTS
      rsvps(
        id SERIAL PRIMARY KEY,
        meetup INT NOT NULL REFERENCES meetups(id),
        "createdBy" INT NOT NULL REFERENCES users(id),
        response VARCHAR(15) NOT NULL
      )`;

  const votesTable = `CREATE TABLE IF NOT EXISTS
      votes(
        id SERIAL PRIMARY KEY,
        question INT NOT NULL REFERENCES questions(id),
        "userId" INT NOT NULL REFERENCES users(id),
        upvotes INT NOT NULL DEFAULT 0,
        downvotes INT NOT NULL DEFAULT 0
      )`;

  const createQueries = `${usersTable}; ${meetupsTable}; ${questionsTable}; ${rsvpsTable}; ${votesTable};`;

  pool.query(createQueries)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
  pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
  });
};

export {
  drop,
  create,
  pool
};

require('make-runnable');