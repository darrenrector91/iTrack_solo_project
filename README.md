# iTrack Solo Project

ITrack is a MEAN stack application that gives a user the ability to track fishing statistics including gear used, fish caught and location of catch.

## Built With

* Node
* Express
* AngularJS
* Angular Material
* Sweet alerts
* ngTable
* Heroku
* SQL Server


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Link to software that is required to install the app (e.g. node).

- [Node.js](https://nodejs.org/en/)
- List other prerequisites here


### Installing

Steps to get the development environment running.

```sql
CREATE TABLE "users" (
  "id" serial primary key,
  "username" varchar(80) not null UNIQUE,
  "password" varchar(240) not null
);
```

## Screen Shot

Include one or two screen shots of your project here (optional). Remove if unused.

## Documentation

Link to a read-only version of your scope document or other relevant documentation here (optional). Remove if unused.

### Completed Features

High level list of items completed.


- { } Design User Intro/Login View
- {x} Passport, using Local Strategy
- {x} Design and implement Register User View
- { } Add Track/Add Fish View
- { } Add table to Track/Add Fish View with header data,edit button and delete button
- { } Add track catch information form to Track/Add Fish View
- { } Add Edit table row button functionality to Track/Add Fish View table
- { } Add Delete row button functionality to Track/Add Fish View table
- { } Design and implement Edit Catch View
- { } Add edit catch information form to Edit Catch View
- { } Add user notification to verify catch data updated
- { } Add navigation to get user back to Track/Add Fish View after verification notification
- { } Design and implement Edit User Info View
- { } Add edit user information form to Edit User View
- { } Add user notification to verify user data updated
- { } Add navigation to get user back to Track/Add Fish View after verification notification

### Next Steps

Features that you would like to add at some point in the future.

- { } Front-end design and CSS 
- { } Add ability for user to add image of fish and store it
- { } Live testing
- { } Angular Material 
- { } Filestack implementation
- { } Add drop boxes for fishing gear and populate from database instead of using inputs
- { } Google maps API implementation


## Deployment

Add additional notes about how to deploy this on a live system

## Authors

* Darren G. Rector


## Acknowledgments

* Hat tip to anyone who's code was used
