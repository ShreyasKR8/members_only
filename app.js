require("dotenv").config();
const express = require("express");
const indexRouter = require("./routes/indexRouter");
const authRouter = require("./routes/authRouter");
const path = require('node:path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "public")));

//set up ejs view engine and path
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', indexRouter)
app.use('/auth', authRouter);

app.listen(PORT, () => {
    console.log(`server listening at ${PORT}`);
});