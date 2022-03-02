const express = require('express');
const CategoriesRoute = require('../api/categories/Categories.routes')
const PostsRoute = require('../api/posts/Posts.routes');
const UserRoutes = require('../api/users/user.routes')

const route = express.Router();
const app = express();




app.use('/api', route);


route.use('/categories', CategoriesRoute);

route.use('/post', PostsRoute);

route.use('/user', UserRoutes);




module.exports = app;