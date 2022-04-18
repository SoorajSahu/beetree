const express = require('express');
const {
    showCategories,
    showCategoriesBySearch,
    addCategory,
} = require('./Categories.controller');

const route = express.Router();

route.get('/all', showCategories); // API
route.get('/all-category-one', showCategoriesBySearch); // API
route.post('/add', addCategory); // API
// route.get('/delete-category/:id', deleteCategory);     // API

module.exports = route;