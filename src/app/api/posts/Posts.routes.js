const express = require('express');
const {
    showPosts,
    showPostsBySearch,
    addPost,
    updatePost,
} = require('./Posts.controller');

const route = express.Router();

// get all posts - /post/all
route.get('/all', showPosts); // API
route.get('/post', showPostsBySearch); // API
route.post('/', addPost); // API
route.post('/update', updatePost); // API


module.exports = route;