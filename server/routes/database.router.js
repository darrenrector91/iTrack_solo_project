const pool = require('../modules/pool');
const express = require('express');
const router = express.Router();


router.get('/', function (req, res) {
    console.log('hit get events');

    const queryText = 'SELECT * FROM event ORDER BY id';
    pool.query(queryText)
        .then((result) => {
            console.log('query results:', result);
            res.send(result.rows);
        })
        .catch((err) => {
            console.log('error making query:', err);
            res.sendStatus(500);
        });
});

router.get('/:id', function (req, res) {
    console.log('hit get event');

    const queryText = 'SELECT * FROM event WHERE id=$1';
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

router.put('/update/:id', (req, res) => {
    const queryText = 'UPDATE event SET date = $1, city = $2, state = $3, rod = $4, reel = $5, tackle_bait = $6, body_of_water = $7 WHERE id = $8';
    pool.query(queryText, [req.body.date, req.body.city, req.body.state, req.body.rod, req.body.reel, req.body.tackle_bait, req.body.body_of_water, req.params.id])
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
        const queryText = 'INSERT INTO event (date, city, state, rod, reel,tackle_bait,body_of_water) VALUES ($1, $2, $3, $4, $5, $6, $7)';
        pool.query(queryText, [req.body.date, req.body.city, req.body.state, req.body.rod, req.body.reel, req.body.tackle_bait, req.body.body_of_water])
            .then((result) => {
                console.log('result:', result.rows);
                res.send(result.rows);
            })
            .catch((err) => {
                console.log('error:', err);
                res.sendStatus(500);
            });
});

router.delete('/:id', function (req, res) {
    const queryText = 'DELETE FROM event WHERE id = $1';
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