const express = require('express');
const {
    register,
    authentication,
} = require('./user.controller');

const route = express.Router();

route.get('/', authentication);
route.post('/register', register);


module.exports = route;