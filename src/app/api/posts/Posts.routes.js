const express = require('express');
const {
    showPosts,
    showPostsBySearch,
    addPost,
    updatePost,
    searchByAll,
    deletePosts
} = require('./Posts.controller');

const route = express.Router();

/**
 * @method get all posts - /post/all
 */

route.get('/all', showPosts); // API


route.get('/post', showPostsBySearch); // API


route.post('/', addPost); // API

/**
 * @method GET /search-posts?query=something&type=VIDEO
 */
route.get('/search-posts', showPostsBySearch); // API


route.post('/update', updatePost); // API


route.post('/delete', deletePosts); // API


module.exports = route;