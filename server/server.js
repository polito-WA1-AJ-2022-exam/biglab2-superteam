'use strict';

/* ---------- IMPORTS ---------- */
const router_FILM = require("./Router/routerFilm");

/* ---------- EXPRESS MODULE ---------- */
const express   = require("express");
const app       = new express();
const PORT      = 3001;
app.use(express.json());

/* ---------- ENABLING ROUTER TO DISPATCH API ---------- */
app.use("/", router_FILM);

/* ---------- TEST API ---------- */
app.get("/", (request, response) => {
    return response.status(200).send("<h1>Hello World!</h1>");
});

/* ---------- START THE SERVER ---------- */
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`)
});