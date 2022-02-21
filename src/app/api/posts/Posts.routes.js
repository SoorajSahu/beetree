const express = require('express');
const {
    showPosts,
    showPostsBySearch,
    addCategory,
} = require('./Posts.controller');

const route = express.Router();

route.get('/all', showPosts);     // API
route.get('/all-category-one',     showPostsBySearch); // API
route.post('/add', addCategory); // API
// route.get('/delete-category/:id', deleteCategory);     // API

module.exports = route;