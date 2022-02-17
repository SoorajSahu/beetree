const express = require('express');

const route = express.Router();

const app = express();
const AdminController = require('../backend/admin/admin.routes')


    
app.use('/', route);

route.get('/', (req, res) => {    
    res.render('Home')
});
route.use('/admin', AdminController);




module.exports = app;