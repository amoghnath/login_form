const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const morgan = require("morgan");

const HOST = "127.0.0.1";
const PORT = 3000;

mongoose.connect("mongodb://localhost:27017/wikilicky", 
    {useNewUrlParser: true,
     useUnifiedTopology: true,
     useCreateIndex: true
})

// require("./config/passport")(passport)

app.use(morgan("dev"))
app.use(cookieParser());

app.set('view engine', 'ejs');
app.use(session({
    secret: "k%pS5I5WuYWrU0csbkGdlLmV@#30N@&&O",
    resave: true,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// require("./app/routes.js")(app, passport);

app.listen(PORT, function(err){
    if (err) console.log("Error in setting up the server");
    console.log(`server listening on http://${HOST}:${PORT}`)
})