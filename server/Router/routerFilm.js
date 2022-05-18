'use strict';

/* ---------- IMPORT MODULES ---------- */
const express           = require("express");
const Controller        = require("../Controller/controllerFilm");
const DAO               = require("../DB/dao");

/* ---------- INITIALIZATIONS ---------- */
const router        = express.Router();
const dao           = new DAO();
const controller    = new Controller(dao);

/* ---------- API DEFINITIONS ---------- */


/**
 *  API:
 *                  GET /films
 *  ---------------------------------------------
 *  Retrieve the list of all the available films.
 *  ---------------------------------------------
*/
router.get("/films", controller.getFilms);


/**
 *  API:
 *           GET /films/filter/:filter
 *  ---------------------------------------------
 *  Retrieve a list of all the films that fulfill 
 *  a given filter (i.e., the same filters 
 *  described in BigLab1).
 *  ---------------------------------------------
*/
router.get("/films/:filter", controller.getFilteredFilms);

/**
 *  API:
 *                  GET /film/:id
 *  ---------------------------------------------
 *  Retrieve a film, given its “id”.
 *  ---------------------------------------------
*/
router.get("/film/:id", controller.getFilmById);

/**
 *  API:
 *                  POST /film
 *  ---------------------------------------------
 *  Create a new film, by providing all relevant 
 *  information – except the “id” that will be 
 *  automatically assigned by the back-end.
 *  ---------------------------------------------
*/
router.post("/film", controller.newFilm);

/**
 *  API:
 *                  PUT /film/:id
 *  ---------------------------------------------
 *  Update an existing film, by providing all the 
 *  relevant information, i.e., all the 
 *  properties except the “id” will overwrite the 
 *  current properties of the existing film. The 
 *  “id” will not change after the update.
 *  ---------------------------------------------
*/
router.put("/film/:id", controller.editFilm);


/**
 *  API:
 *              PUT /film/:id/favorite
 *  ---------------------------------------------
 *  Mark an existing film as favorite/unfavorite.
 *  ---------------------------------------------
*/
router.put("/film/:id/favorite", controller.setFilmFavorite);


/**
 *  API:
 *              DELETE /film/:id
 *  ---------------------------------------------
 *  Delete an existing film, given its “id”.
 *  ---------------------------------------------
*/
router.delete("/film/:id", controller.removeFilm);



module.exports = router;