[![Build Status](https://travis-ci.org/cop1fab/questioner-final.svg?branch=develop)](https://travis-ci.org/cop1fab/questioner-final)
[![Test Coverage](https://api.codeclimate.com/v1/badges/7f62dc4ea6198e1985a1/test_coverage)](https://codeclimate.com/github/cop1fab/questioner-final/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/7f62dc4ea6198e1985a1/maintainability)](https://codeclimate.com/github/cop1fab/questioner-final/maintainability)
![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)
# Questioner
Crowd-source questions for a meetup. ​ Questioner​​ helps the meetup organizer prioritize questions to be answered. Other users can vote on asked questions and they bubble to the top or bottom of the log.

## User interface 
  - HTML
  - CSS
## Hosted Pages
[Questioner-UI](https://cop1fab.github.io/questioner-final/UI/)

[Questioner-API](#)

## Getting Started

   These instructions will get you a copy of the project up and running on your local machine for development  and testing purposes.

## Prerequisites

  To install this API on your your computer, you need to first clone this repository or download the zip file. Once this is set up, you are going to need the following packages.
     ```
     [NodeJs]
     [Express]
     
     [Node Package Installer - NPM] _this usually comes with Node.
     ```
## Installing

  Installing this application is fairly straightforward. After cloning this repository to your local environment,CD into the package folder on your favorite terminal... bash, command prompt or the like and run the following:

      > npm install

  This runs the following script on the background processes;

      > npm install --save-dev babel-watch`

  This command starts the dev server on port 3001.

## Running the api Locally

* clone the repo or download the zip
* Navigate to the folder where you downloaded or cloned the app
* Make sure you are on the Develop branch (Because the Develop branch has all the recent code)
* Run `npm install` from the terminal(make sure the port 3001 is free).
* Run `npm start` from the terminal to start the app.
* With the ideal tool preferably postman, send requests to the endpoints descriped bellow.

## Running the tests locally 
* clone the repo or downoald the zip file(extract the zip and navigate to the folder containing the app)
* Install dependecies with `npm install` (You can also use yarn) from the terminal
* Run tests with `npm run test` (also yarn may work)


## Information on the API
 
> if you are running this app on from the hosted version, the following urls should preced this ``

> if you are running this app from your local computer, the following urls should preced this `http://localhost:3001`


```json
{
  "get all meetups" : {
    "url" : "/api/v1/meetups",
    "method" : "GET"
  },
  "get single meetup" : {
    "url" : "/api/v1/meetups/<meetupId>",
    "method" : "GET"
  },
  "get all upcoming meetups" : {
    "url" : "/api/v1/meetups/upcoming",
    "method" : "GET"
  },
  "create new meetup record" : {
    "url" : "/api/v1/meetups",
    "method" : "POST",
    "objectFormat" : {
      "location" : "The location where the meetup will take place",
      "topic" : "The topic of the meetup",
      "happeningOn" : "The time that the meetup holds",
      "tags" : "optional tags for the meetup.",
    },
    "requirements" : [
      "tags should be an array of strings"
    ]
  },
  "respond Rsvps" : {
    "url" : "/api/v1/meetups/<meetupId>/rsvps",
    "method" : "POST",
    "objectFormat" : {
      "userId" : "The id of the user responding",
      "status" : "The response"
    },
    "requirements" : [
      "The meetup with the provided id should be available",
      "The user with the given id must be present",
      "The response should be yes, no or maybe"
    ]    
  },
  "creating the user" : {
    "url" : "api/v1/auth/signup",
    "method" : "POST",
    "objectFormat" : {
      "firstname" : "user's firstname",
      "lastname" : "user's last name",
      "email" : "user's email",
      "phoneNumber" : "user's phone number",
      "userName" : "user's username"
    },
  },
  "get all questions" : {
    "url" : "/api/v1/questions",
    "method" : "GET",
  },
  "create a new question" : {
    "url" : "/api/v1/questions",
    "method" : "POST",
    "objectFormat" : {
      "meetupId" : "the id of the meetup that correspons to this question",
      "createdBy" : "the id of the user creatin this question",
      "title" : "the title for this question",
      "body" : "the body for this question"
    },
    "requirements" : [
      "the meetup with this id should be present",
      "the user with this id should be present"
    ]
  },
  "upvote a  question": {
    "url" : "/api/v1/questions/<question-id>/upvote",
    "method" : "PATCH",
    "requirements" : [
      "the question with this id should be present"
    ]
  },
  "downvote a  question" : {
    "url" : "/api/v1/questions/<question-id>/downvote",
    "method" : "PATCH",
    "requirements" : [
      "the question with this id should be present"
    ]
  }
}

```


# Author
  Dr. Copain Fabrice Bienaime
