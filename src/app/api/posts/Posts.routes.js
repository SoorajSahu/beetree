const express = require('express');
const {
    showPosts,
    showPostsBySearch,
    addPost,
    updatePost,
} = require('./Posts.controller');

const route = express.Router();

route.get('/all',                  showPosts);     // API
route.get('/all-category-one',     showPostsBySearch); // API
route.post('/',                    addPost); 
route.post('/update',              updatePost); // API


module.exports = route;