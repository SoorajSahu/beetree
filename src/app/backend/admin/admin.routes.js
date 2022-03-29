const express = require('express');

const route = express.Router();
const {
    authentication,
    signinPage,
    signupPage,
    register,
    postsDashboardShow,
    showAllPosts,
} = require('./admin.controller');
const { CheckUserIsAdmin, AdminLogout } = require('../../middleware/admin/admin');

const dashboardShow = (req, res) => res.render('categoryOps', { user: req.session.auth });




route.get('/', (req, res) => res.redirect('/admin/signin'));

route.get('/signin', signinPage);

route.get('/signup', signupPage);

route.post('/signup', register);

route.post('/signin', authentication);

route.get('/logout', AdminLogout);

route.get('/category', CheckUserIsAdmin, dashboardShow);

route.get('/posts', CheckUserIsAdmin, postsDashboardShow);

route.get('/all-posts', CheckUserIsAdmin, showAllPosts);

module.exports = route;