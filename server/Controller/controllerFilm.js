'use strict';
const dayjs=require('dayjs');

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
        this.dao = input_dao;
    }

    /**
     * Retrieve the list of all the available films.
     * ---------------------------------------------
     *                API: GET /films
     * =============================================
    */
    getFilms = async () => {

        try {
            /* retrieving films from DB */
            const films = await this.dao.getFilms();
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
    */
    getFilteredFilms = async (filter) => {

        /* retrieving films from DB */
        let films = await this.dao.getFilms();

        /* filtering films */
        if (filter === 'favorites') {
            films = films.filter((film) => (film.favorite == 1));
        } else if (filter === 'best-rated') {
            films = films.filter((film) => (film.rating == 5));
        } else if (filter === 'last-seen') {
            films = films.filter((film) => (dayjs().diff(dayjs(film.watchdate, "MMMM DD, YYYY"), 'day') <= 30 && film.watchdate != undefined));
        } else if (filter === 'unseen') {
            films = films.filter((film) => (film.watchdate == undefined));
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
    */
    getFilmById = async (id) => {

        try {
            /* retrieving film given ID from DB */
            const film = await this.dao.getFilmByID(id);
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
    */
    newFilm = async (filmObject) => {

        try {
            /* retrieving lastID */
            const lastID = await this.dao.getLastID();

            /* INSERTION IN THE DATABASE */
            /**
             * 
             *  NB: USER IS SET TO 1 AS DEFAULT -------> CHANGE HERE WHEN IMPLEMENTING AUTHENTICATION
             * 
             */
            await this.dao.newFilm(lastID+1, filmObject);

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
     * @param {callback} request 
     * @param {callback} response 
    */
    editFilm = async (id, filmObject) => {

        try {
            /* check if film actually exists in DB */
            const film = await this.dao.getFilmByID(id);
            if (film === undefined) {
                return ERROR_404;
            }

            /* update film in DB */
            await this.dao.editFilmByID(id, filmObject);

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
    */
    setFilmFavorite = async (id, newFavorite) => {

        try {
            /* check if film actually exists in DB */
            const film = await this.dao.getFilmByID(id);
            if (film === undefined) {
                return ERROR_404;
            }

            /* update film in DB */
            await this.dao.editFilmFavoriteByID(id, newFavorite);

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
    */
    removeFilm = async (id) => {

        try {
            /* remove film from DB */
            await this.dao.removeFilm(id);

            return MESSG_204;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = FilmController;