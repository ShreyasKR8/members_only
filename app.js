require("dotenv").config();
require("./config/passport");
const express = require("express");
const indexRouter = require("./routes/indexRouter");
const authRouter = require("./routes/authRouter");
const path = require('node:path');
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const passport = require("passport");
const pool = require('./db/pool');

const app = express();
const PORT = process.env.PORT || 3000;
const FOUR_HOURS = 1000 * 60 * 60 * 4;

const sessionStore = new pgSession({
    pool: pool,
    tableName: "user_sessions",
    createTableIfMissing: true,
});

const sessionConfig = {
    store: sessionStore,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: FOUR_HOURS, //4 hours
    },
}

app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "public")));

//passport middlewares
app.use(session(sessionConfig));
app.use(passport.session());

//set up ejs view engine and path
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// set up router middlewares
app.use('/', indexRouter)
app.use('/auth', authRouter);

app.listen(PORT, () => {
    console.log(`server listening at ${PORT}`);
});