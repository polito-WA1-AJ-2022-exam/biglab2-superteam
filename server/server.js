'use strict';

/* ---------- IMPORT ROUTERS ---------- */
const routerFilm = require("./Router/routerFilm");
const routerUser = require("./Router/routerUser");

/* ---------- IMPORT CONTROLLER ---------- */
const DAO               = require('./DB/dao');
const ControllerUser    = require('./Controller/controllerUser');

/* ---------- IMPORT MODULES ---------- */
const express   = require("express");
const morgan    = require('morgan');
const cors      = require("cors");      /* NB: in production mode, use different domains for React and API servers, NEVER allow CORS requests from any origin, always specify origin. */

/* ---------- IMPORT PASSPORT MODULES ---------- */
const passport      = require("passport");
const LocalStrategy = require("passport-local");
const session       = require('express-session');

/* --- CROSS-ORIGIN RESOURCE SHARING OPTION --- */
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
};

/* --- SETTING UP PASSPORT --- */
const dao = new DAO();
const controllerUser = new ControllerUser(dao);
passport.use(new LocalStrategy(
    async function verify (username, password, callback) {
        const user = await controllerUser.getUser(username, password);
        return (!user) ? callback(null, false, 'Incorrect username or password!') : callback(null, user);
    }
));
passport.serializeUser(
    (user, callback) => {
        callback(null, user);
    }
);
passport.deserializeUser(
    (user, callback) => {
        callback(null, user);
    }
);

/* --- SETTING UP EXPRESS APPLICATION --- */
const app = new express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(session(
    {
        secret: "superSecretSecret",
        resave: false,
        saveUninitialized: false
    }
));
app.use(passport.authenticate('session'));

/* --- SETTING UP ROUTES --- */
app.use("/", routerFilm);
app.use("/user", routerUser);


/* ---------- START THE SERVER ---------- */
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`)
});