// Create web server to handle comments
// ------------------------------------------------

// Import express module
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Import Comment model
const Comments = require('../models/comments');

// Create a router object
const commentRouter = express.Router();

// Use body-parser to parse JSON data
commentRouter.use(bodyParser.json());

// ------------------------------------------------
// Handle comments
// ------------------------------------------------
// Route: /
// Method: GET
// Desc: Get all comments
// Access: Public
commentRouter.route('/')
.get((req, res, next) => {
    Comments.find({})
    .then((comments) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(comments);
    }, (err) => next(err))
    .catch((err) => next(err));
});

// Route: /
// Method: POST
// Desc: Add new comment
// Access: Public
commentRouter.route('/')
.post((req, res, next) => {
    Comments.create(req.body)
    .then((comment) => {
        console.log('Comment created: ', comment);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(comment);
    }, (err) => next(err))
    .catch((err) => next(err));
});

// Route: /:commentId
// Method: GET
// Desc: Get comment by id
// Access: Public
commentRouter.route('/:commentId')
.get((req, res, next) => {
    Comments.findById(req.params.commentId)
    .then((comment) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(comment);
    }, (err) => next(err))
    .catch((err) => next(err));
});

// Route: /:commentId
// Method: PUT
// Desc: Update comment by id
// Access: Public
commentRouter.route('/:commentId')
.put((req, res, next) => {
    Comments.findByIdAndUpdate(req.params.commentId, {
        $set: req.body
    }, { new: true })
    .then((comment) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(comment);
    }, (err) => next(err))
    .catch((err) => next(err));
});

// Route: /:commentId
// Method: DELETE
// Desc: Delete comment by id
// Access: Public
commentRouter.route('/:commentId')
.delete((req, res, next) => {
    Comments.findByIdAndRemove(req.params.commentId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

// Export commentRouter
module.exports = commentRouter;