const express = require('express');
const logger = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient;

const importWeb = require('./src/app/init/web.import');
const importAPI = require('./src/app/init/api.import');


const app = express()

app.use(logger('dev')); // logger
app.set('view engine', 'ejs'); // View engine
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: Date.now() + (30 * 86400 * 1000) },
}))
app.use(cookieParser());
app.use(importWeb);
app.use(importAPI);

async function main() {
    app.listen(8000, () => {
        // eslint-disable-next-line no-console
        console.log('Server is created on 8000');
    });
}

main()
    .catch((e) => {
        // eslint-disable-next-line no-console
        console.log(e);
    })
    .finally(async() => {
        await prisma.$disconnect()
    });
module.exports = app;