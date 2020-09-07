const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.get('/accounts', (req, res) => {
    db.select('*').from('accounts')
    .then(list => {
        res.status(200).json({ data: list })
    })
    .catch(error => {
        res.status(500).json({error: error.message})
    })
})

server.get('/accounts/:id', (req, res) => {
    db('*').from('accounts')
    .where('id', req.params.id)
    .then(resp => {
        res.status(200).json(resp)
    })
    .catch(error => {
        res.status(500).json({error: error.message})
    })
})

server.post('/accounts/', (req, res) => {
    const post = req.body
    db('accounts').insert(post, 'id')
        .then(ids => {
            res.status(201).json({ insert: ids })
        })
        .catch(error => {
            res.status(500).json({error: error.message})
        })
})

server.put('/accounts/:id', (req, res) => {
    const changes = req.body
    const postid = req.params.ids
    db('accounts').where({ id: postid}).update(changes)
    .then(count => {
        if(count) {
            res.status(200).json({ message: 'updated success'})
        } else {
            res.status(404).json({ message: 'not found'})
        }
    })
    .catch(error => {
        res.status(500).json({ error: error.message})
    })
})

server.delete('/accounts/:id', (req, res) => {
    const postid = req.params.ids
    db('accounts').where({ id: postid}).delete()
    .then(count => {
        if(count) {
            res.status(200).json({ message: 'removed success'})
        } else {
            res.status(404).json({ message: 'not found'})
        }
    })
    .catch(error => {
        res.status(500).json({ error: error.message})
    })
})

module.exports = server;
