'use strict';

/* ---------- IMPORT MODULES ---------- */
const dayjs     = require('dayjs');
const daoFilm   = require('../DB/daoFilm');

/* ---------- ERROR MESSAGES ---------- */
const MESSG_200 = {code: 200, message: 'OK'}
const MESSG_201 = {code: 201, message: 'CREATED'};
const MESSG_204 = {code: 204, message: 'NO CONTENT'};
const ERROR_404 = {code: 404, message: 'NOT FOUND'};
const ERROR_422 = {code: 422, message: 'UNPROCESSABLE ENTITY'};

/* ---------- CONTROLLER CLASS ---------- */
class FilmController {

    /**
     * CONSTRUCTOR OF THE CONTROLLER
     * -----------------------------
     * @param {DAO Object} input_dao 
     */
    constructor (input_dao) {
        this.dao = new daoFilm(input_dao);
    }

    /**
     * Retrieve the list of all the available films.
     * ---------------------------------------------
     *                API: GET /films
     * =============================================
     * @param {Number} userID user identifier of the current session
    */
    getFilms = async (userID) => {

        try {
            /* retrieving films from DB */
            const films = await this.dao.getFilms(userID);
            return {
                code: 200,
                message: films
            }
        } catch (error) {
            throw error;
        }
    }


    /**
     * Retrieve a list of all the films that fulfill 
     * a given filter (i.e., the same filters 
     * described in BigLab1).
     * ---------------------------------------------
     *          API: GET /films/:filter
     * =============================================
     * @param {String} filter
     * @param {Number} userID user identifier of the current session
    */
    getFilteredFilms = async (filter, userID) => {

        /* retrieving films from DB */
        let films = await this.dao.getFilms(userID);

        /* filtering films */
        if (filter === 'favorites') {
            films = films.filter((film) => (film.favorite == 1));
        } else if (filter === 'best-rated') {
            films = films.filter((film) => (film.rating == 5));
        } else if (filter === 'last-seen') {
            films = films.filter((film) => (dayjs().diff(dayjs(film.watchdate, "YYYY-MM-DD"), 'day') <= 30 && film.watchdate !== "To be seen"));
        } else if (filter === 'unseen') {
            films = films.filter((film) => (film.watchdate === null));
        }

        return {
            code: 200,
            message: films
        }
    }


    /**
     * Retrieve a film, given its “id”.
     * ---------------------------------------------
     *             API: GET /film/:id
     * =============================================
     * @param {Number} id
     * @param {Number} userID user identifier of the current session
    */
    getFilmById = async (id, userID) => {

        try {
            /* retrieving film given ID from DB */
            const film = await this.dao.getFilmByID(id, userID);
            if (film === undefined) {
                return ERROR_404;
            }

            return {
                code: 200,
                message: film
            }
        } catch (error) {
            throw error;
        }
    }


    /**
     * Create a new film, by providing all relevant 
     * information – except the “id” that will be 
     * automatically assigned by the back-end.
     * ---------------------------------------------
     *             API: POST /film
     * =============================================
     * @param {JSON} filmObject 
     * @param {Number} userID user identifier of the current session
    */
    newFilm = async (filmObject, userID) => {

        try {
            /* retrieving lastID */
            const lastID = await this.dao.getLastID();

            /* INSERTION IN THE DATABASE */
            await this.dao.newFilm(lastID+1, filmObject, userID);

            return MESSG_201;
        } catch (error) {
            throw error;
        }
    }


    /**
     * Update an existing film, by providing all the 
     * relevant information, i.e., all the 
     * properties except the “id” will overwrite the 
     * current properties of the existing film. The 
     * “id” will not change after the update.
     * ---------------------------------------------
     *             API: PUT /film/:id
     * =============================================
     * @param {Number} id
     * @param {JSON} filmObject 
     * @param {Number} userID user identifier of the current session
    */
    editFilm = async (id, filmObject, userID) => {

        try {
            /* check if film actually exists in DB */
            const film = await this.dao.getFilmByID(id, userID);
            if (film === undefined) {
                return ERROR_404;
            }

            /* update film in DB */
            await this.dao.editFilmByID(id, filmObject, userID);

            return MESSG_200;
        } catch (error) {
            throw error;
        }
    }


    /**
     * Mark an existing film as favorite/unfavorite.
     * ---------------------------------------------
     *        API: PUT /film/:id/favorite
     * =============================================
     * @param {Number} id 
     * @param {Number} newFavorite 
     * @param {Number} userID user identifier of the current session
    */
    setFilmFavorite = async (id, newFavorite, userID) => {

        try {
            /* check if film actually exists in DB */
            const film = await this.dao.getFilmByID(id, userID);
            if (film === undefined) {
                return ERROR_404;
            }

            /* update film in DB */
            await this.dao.editFilmFavoriteByID(id, newFavorite, userID);

            return MESSG_200;

        } catch (error) {
            throw error;
        }
    }


    /**
     * Delete an existing film, given its “id”.
     * ---------------------------------------------
     *            API: DELETE /film/:id
     * =============================================
     * @param {Number} id 
     * @param {Number} userID user identifier of the current session
    */
    removeFilm = async (id) => {

        try {
            /* remove film from DB */
            await this.dao.removeFilm(id, userID);

            return MESSG_204;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = FilmController;