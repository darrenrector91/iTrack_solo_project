const express = require('express');
const encryptLib = require('../modules/encryption');
const userStrategy = require('../strategies/sql.localstrategy');
const pool = require('../modules/pool.js');
const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', (req, res) => {
  // check if logged in
  if (req.isAuthenticated()) {
    // send back user object from database
    res.send(req.user);
  } else {
    // failure best handled on the server. do redirect here.
    res.sendStatus(403);
  }
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const city = req.body.city;
  const state = req.body.state;

  var saveUser = {
    username: req.body.username,
    password: encryptLib.encryptPassword(req.body.password),
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    city: req.body.city,
    state: req.body.state,

  };
  console.log('new user:', saveUser);
  pool.query('INSERT INTO users (username, password, first_name, last_name, city, state) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id', [saveUser.username, saveUser.password, saveUser.first_name, saveUser.last_name, saveUser.city, saveUser.state], (err, result) => {
    if (err) {
      console.log("Error inserting data: ", err);
      res.sendStatus(500);
    } else {
      res.sendStatus(201);
    }
  });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.get('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

router.get('/events', (req, res) => {
  // query DB
  const queryText = 'SELECT * FROM events';
  pool.query(queryText)
    // runs on successful query
    .then((result) => {
      console.log('query results', result);
      res.send(result.rows);
    })
    // error handling
    .catch((err) => {
      console.log('error making select query:', err);
      res.sendStatus(500);
    });
});

router.get('/:id', function (req, res) {
  console.log('hit get event');

  const queryText = 'SELECT * FROM events WHERE id=$1';
  pool.query(queryText, [req.params.id])
    .then((result) => {
      console.log('query results:', result);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('error making query:', err);
      res.sendStatus(500);
    });
});

router.put('/user/:id', (req, res) => {
  const queryText = 'UPDATE events SET date = $1, city = $2, state = $3, species = $4, rod = $5, reel = $6, tackle_bait = $7, body_of_water = $8 WHERE id = $9';
  pool.query(queryText, [req.body.date, req.body.city, req.body.state, req.body.species, req.body.rod, req.body.reel, req.body.tackle_bait, req.body.body_of_water, req.params.id])
    .then((result) => {
      console.log('result:', result.rows);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log('error:', err);
      res.sendStatus(500);
    });
});

router.post('/', function (req, res) {
  console.log('in POST router');
  
  const queryText = 'INSERT INTO events (date, city, state, species, rod, reel,tackle_bait,body_of_water) VALUES ($1, $2, $3, $4, $5, $6, $7)';
  pool.query(queryText, [req.body.date, req.body.city, req.body.state, req.body.species, req.body.rod, req.body.reel, req.body.tackle_bait, req.body.body_of_water])
    .then((result) => {
      console.log('result:', result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('error:', err);
      res.sendStatus(500);
    });
});

router.delete('/user/:id', function (req, res) {
  const queryText = 'DELETE FROM events WHERE id = $1';
  pool.query(queryText, [req.params.id])
    .then((result) => {
      console.log('result:', result.rows);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log('error:', err);
      res.sendStatus(500);
    });
});

module.exports = router;