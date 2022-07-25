require('dotenv');
const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials.js');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
// const passport  = require('passport');
const path = require('path');
const port = process.env.port || 3000;

// CONNECT TO MONGODB

connectDB();

// LOGGER MIDDLEWARE

app.use(logger)

// CREDENTIALS MIDDLEWARE

app.use(credentials)

// CROSS ORIGIN RESOURCE SHARING

app.use(cors(corsOptions));


// PASSPORT MIDDLEWARE

// app.use(passport.initialize());
// require("./config/passport")(passport);

// FORM DATA MIDDLEWARE

app.use(express.urlencoded({ extended: false }));

// JSON MIDDLEWARE

app.use(express.json());

// COOKIE PARSER MIDDLEWARE

app.use(cookieParser());

// SERVE STATIC FILES

app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/visitor', express.static(path.join(__dirname, '/visitor')));

// SET PUBLIC ROUTES

app.use("/", require("./routes/root"))

app.get('/authorized', function (req, res) {
    res.send('Secured Resource');
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/logout", require("./routes/logout"));
app.use("/api/refresh", require("./routes/refresh"));
app.use("/api/register", require("./routes/register"))

// SET PRIVATE ROUTES

app.use(verifyJWT);
app.use("/api/stories", require("./routes/api/stories"))
app.use("/api/users", require("./routes/api/users"))

// SET ERROR ROUTE HANDLER

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

// ASSIGN THE ERROR HANDLER MIDDLEWARE

app.use(errorHandler);

// CONNECT TO MONGODB

mongoose.connection.once(
    'open', () => { 
        console.log('We are in this bih!!')
        app.listen(port, () => console.log(`Server up and running on port ${port}.`))   
    }
)