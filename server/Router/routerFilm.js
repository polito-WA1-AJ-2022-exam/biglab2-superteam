'use strict';

/* ---------- IMPORT MODULES ---------- */
const express               = require("express");
const Controller            = require("../Controller/controllerFilm");
const DAO                   = require("../DB/dao");
const { param }             = require('express-validator');
const { header }            = require('express-validator');
const { body }              = require('express-validator');
const { validationHandler } = require("../Validator/validationHandler");
const { isLoggedIn }        = require('../Validator/loginHandler');

/* ---------- INITIALIZATIONS ---------- */
const router        = express.Router();
const dao           = new DAO();
const controller    = new Controller(dao);

/* --------- ERROR MESSAGES --------- */
const ERROR_500 = {code: 500, message: "INTERNAL SERVER ERROR"};
const ERROR_422 = {code: 422, message: "UNPROCESSABLE ENTITY"};

/* ---------- API DEFINITIONS ---------- */


/**
 *  API:
 *                  GET /films
 *  ---------------------------------------------
 *  Retrieve the list of all the available films.
 *  ---------------------------------------------
*/
router.get(
    "/films",
    [
        body().custom(value => {  /* [FROM README.md]: body should be empty */
            if (Object.keys(value).length !== 0) {
                throw new Error('Body should be empty');
            }
            return true;
        })
    ],
    validationHandler,
    isLoggedIn,
    async (request, response) => {
        try {
            const result = await controller.getFilms(request.session.passport.user.id);
            return response.status(result.code).json(result.message);
        } catch (error) {
            console.log(error);
            return response.status(ERROR_500.code).json(ERROR_500.message);
        }
    }
);


/**
 *  API:
 *           GET /films/:filter
 *  ---------------------------------------------
 *  Retrieve a list of all the films that fulfill 
 *  a given filter (i.e., the same filters 
 *  described in BigLab1).
 *  ---------------------------------------------
*/
router.get(
    "/films/:filter",
    [
        param('filter').custom((filter) => { /* [FROM README.md]: filter should be a valid string */
            const VALID_FILTERS = ["all", "favorites", "best-rated", "last-seen", "unseen"];
            for (let i = 0; i < VALID_FILTERS.length; i++) {
                if (VALID_FILTERS[i] === filter) {
                    return true;
                }
            }
            return false;
        }),
        body().custom(value => {  /* [FROM README.md]: body should be empty */
            if (Object.keys(value).length !== 0) {
                throw new Error('Body should be empty');
            }
            return true;
        })
    ],
    validationHandler,
    isLoggedIn,
    async (request, response) => {
        try {
            const result = await controller.getFilteredFilms(request.params.filter, request.session.passport.user.id);
            return response.status(result.code).json(result.message);
        } catch (error) {
            console.log(error);
            return response.status(ERROR_500.code).json(ERROR_500.message);
        }
    }
);

/**
 *  API:
 *                  GET /film/:id
 *  ---------------------------------------------
 *  Retrieve a film, given its “id”.
 *  ---------------------------------------------
*/
router.get(
    "/film/:id",
    [
        param('id').isNumeric(),    /* [FROM README.md]: id should be an number */
        body().custom(value => {    /* [FROM README.md]: body should be empty */
            if (Object.keys(value).length !== 0) {
                throw new Error('Body should be empty');
            }
            return true;
        })
    ],
    validationHandler,
    isLoggedIn,
    async (request, response) => {
        try {
            const result = await controller.getFilmById(request.params.id, request.session.passport.user.id);
            return response.status(result.code).json(result.message);
        } catch (error) {
            console.log(error);
            return response.status(ERROR_500.code).json(ERROR_500.message);
        }
    }
);

/**
 *  API:
 *                  POST /film
 *  ---------------------------------------------
 *  Create a new film, by providing all relevant 
 *  information – except the “id” that will be 
 *  automatically assigned by the back-end.
 *  ---------------------------------------------
*/
router.post(
    "/film",
    [
        header('Content-Type').equals('application/json'),  /* [FROM README.md]: Request header has a line: Content-Type: application/json. */
        body().custom((body) => {                           /* [FROM README.md]: watchdate and rating are optional parameters               */
            return !(body.watchdate === undefined && body.rating !== undefined);
        }),
        body().custom((body) => {                           /* [FROM README.md]: favorite cannot be 1 if the film has not been seen yet      */
            return !(body.watchdate === undefined && body.favorite === 1);
        }),
        body('title').isString(),                           /* [FROM README.md]: title is a string */
        body('favorite').isBoolean(),                       /* [FROM README.md]: favorite is a boolean value (either true/false, 1/0 or yes/no) */
        body('watchdate').custom((value) => {               /* [FROM README.md]: watchdate is in the format YYYY-MM-DD */
            return (value === undefined || (/^\d{4}-\d{2}-\d{2}$/.test(value)));
        }),
        body('rating').custom((value) => {                  /* [FROM README.md]: rating is an integer between 0 and 5 */
            return (value === undefined || (value >= 0 && value <= 5));
        })              
    ],
    validationHandler,
    isLoggedIn,
    async (request, response) => {
        try {
            const result = await controller.newFilm(request.body, request.session.passport.user.id);
            return response.status(result.code).json(result.message);
        } catch (error) {
            console.log(error);
            return response.status(ERROR_500.code).json(ERROR_500.message);
        }
    }
);

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
router.put(
    "/film/:id", 
    [
        header('Content-Type').equals('application/json'),      /* [FROM README.md]: Request header has a line: Content-Type: application/json. */
        body().custom((body) => {                               /* [FROM README.md]: watchdate and rating are optional parameters               */
            return !(body.newWatchdate === undefined && body.newWating !== undefined);
        }),
        body().custom((body) => {                               /* [FROM README.md]: favorite cannot be 1 if the film has not been seen yet      */
            return !(body.newWatchdate === undefined && body.newFavorite === 1);
        }),
        body('newTitle').isString(),                            /* [FROM README.md]: title is a string */
        body('newFavorite').isBoolean(),                        /* [FROM README.md]: newFavorite is a boolean value (either true/false, 1/0 or yes/no) */
        body('newWatchdate').custom((value) => {                /* [FROM README.md]: watchdate is either "To be seen" or in the format YYYY-MM-DD */
            return (value === undefined || (/^\d{4}-\d{2}-\d{2}$/.test(value)));
        }),
        body('newRating').custom((value) => {                   /* [FROM README.md]: rating is an integer between 0 and 5 */
            return (value === undefined || (value >= 0 && value <= 5));
        })              
    ],
    validationHandler,
    isLoggedIn,
    async (request, response) => {
        try {
            const result = await controller.editFilm(request.params.id, request.body, request.session.passport.user.id);
            return response.status(result.code).json(result.message);
        } catch (error) {
            console.log(error);
            return response.status(ERROR_500.code).json(ERROR_500.message);
        }
    }
);


/**
 *  API:
 *              PUT /film/:id/favorite
 *  ---------------------------------------------
 *  Mark an existing film as favorite/unfavorite.
 *  ---------------------------------------------
*/
router.put(
    "/film/:id/favorite", 
    [
        header('Content-Type').equals('application/json'),      /* [FROM README.md]: Request header has a line: Content-Type: application/json. */
        body('newFavorite').isBoolean()                         /* [FROM README.md]: newFavorite is a boolean value (either true/false, 1/0 or yes/no) */          
    ],
    validationHandler,
    async (request, response) => {
        try {
            const result = await controller.setFilmFavorite(request.params.id, request.body.newFavorite, request.session.passport.user.id);
            return response.status(result.code).json(result.message);
        } catch (error) {
            console.log(error);
            return response.status(ERROR_500.code).json(ERROR_500.message);
        }
    }
);


/**
 *  API:
 *              DELETE /film/:id
 *  ---------------------------------------------
 *  Delete an existing film, given its “id”.
 *  ---------------------------------------------
*/
router.delete(
    "/film/:id", 
    [
        param('id').isNumeric(),    /* [FROM README.md]: id should be an number */
        body().custom(value => {    /* [FROM README.md]: body should be empty */
            if (Object.keys(value).length !== 0) {
                throw new Error('Body should be empty');
            }
            return true;
        })
    ],
    validationHandler,
    isLoggedIn,
    async (request, response) => {
        try {
            const result = await controller.removeFilm(request.params.id, request.session.passport.user.id);
            return response.status(result.code).json(result.message);
        } catch (error) {
            console.log(error);
            return response.status(ERROR_500.code).json(ERROR_500.message);
        }
    }
);



module.exports = router;