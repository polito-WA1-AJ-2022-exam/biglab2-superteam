'use strict';

/* ---------- IMPORTS ---------- */
const router_FILM = require("./Router/routerFilm");

/* ---------- EXPRESS MODULE ---------- */
const express   = require("express");
const app       = new express();
app.use(express.json());

/* ---------- CORS MODULE ---------- 

    NB: in production mode, use different domains for React and API servers, 
        NEVER allow CORS requests from any origin, always specify origin.
*/
const cors = require("cors");
app.use(cors());

/* ---------- ENABLING ROUTER TO DISPATCH API ---------- */
app.use("/", router_FILM);

/* ---------- TEST API ---------- */
app.get("/", (request, response) => {
    return response.status(200).send("<h1>Hello World!</h1>");
});

/* ---------- START THE SERVER ---------- */
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`)
});