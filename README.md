[![Build Status](https://travis-ci.org/cop1fab/questioner-final.svg?branch=develop)](https://travis-ci.org/cop1fab/questioner-final)
[![Coverage Status](https://coveralls.io/repos/github/cop1fab/questioner-final/badge.svg?branch=develop)](https://coveralls.io/github/cop1fab/questioner-final?branch=develop)
[![Test Coverage](https://api.codeclimate.com/v1/badges/7f62dc4ea6198e1985a1/test_coverage)](https://codeclimate.com/github/cop1fab/questioner-final/test_coverage)
![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)
# QUESTIONER 

Crowd-source questions for a meetup. ​ Questioner​​ helps the meetup organizer prioritize questions to be answered. Other users can vote on asked questions and they bubble to the top or bottom of the log.

## Hosted Pages
[Questioner-UI](https://cop1fab.github.io/questioner-final/UI/)

[Questioner-API](https://copa1fab.heroku.com)


## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Prerequisites

You need to install the following to be able to run the project on your local machine. 

To check if you have Node.js installed, run this command in your terminal:

node -v

To confirm that you have npm installed you can run this command in your terminal:

npm -v

## Then 

npm install npm@latest -g

## Installing

  Installing this application is fairly straightforward. After cloning this repository to your local environment,CD into the package folder on your favorite terminal... bash, command prompt or the like and run the following:

      > npm install

  This runs the following script on the background processes;

      > npm install --save-dev babel-watch`

  This command starts the dev server on port 3001.

## Running the api & tests Locally

* To clone this repo: in your terminal => use git clone https://github.com/cop1fab/questioner-final.git
* Switch to develop branch with => git checkout develop 
* Run `npm run dev` You should see: "Server started successfully! App runing on port 3001.
* Run `npm run test` to check if tests are passing.
* Run `npm run cover` to check the coverage.
* With Postman, test if all endpoints work (Find a list of endpoint in the table at the bottom of this page)



 ## RESTful API Routes.

| Method | Endpoint | Description
| --- | --- | -- |
| GET | /api/v1/meetups | List all meetups |
| GET | /api/v1/meetups/:meetupId | Query specific meetup |
| POST | /api/v1/meetups | Create a meetup |
| PUT | /api/v1/meetups/:meetupId | update meetup |
| DELETE | /api/v1/meetups/:meetupId | Delete a meetup |
| GET | /api/v1/users | List all users |
| POST | /api/v1/users | add a new user |
| GET | /api/v1/users/:userId | Query specfic user|
| PUT | /api/v1/users/:userId | Update user |
| DELETE | /api/v1/users/:userId | Delete user|
| GET | /api/v1/questions | List all questions |
| GET | /api/v1/questions/:questionId | Query specific question |
| POST | /api/v1/questions/meetup/meetupId | create a question |
| PUT | /api/v1/questions/:questionId | update upvote or downvote |
| DELETE | /api/v1/questions/:questionId | delete a question |


# Author
  Dr. Copain Fabrice Bienaime
  
## Contributors 

* Muchai Mercy
* Angela Lehru
