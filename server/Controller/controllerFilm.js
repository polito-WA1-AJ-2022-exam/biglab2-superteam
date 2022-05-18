'use strict';
const dayjs=require('dayjs');

/* ---------- ERROR MESSAGES ---------- */
const ERROR_400 = {error: 'BAD REQUEST'};
const ERROR_404 = {error: 'NOT FOUND'};
const ERROR_422 = {error: 'UNPROCESSABLE ENTITY'};
const ERROR_500 = {error: 'INTERNAL SERVER ERROR'};
const ERROR_503 = {error: 'SERVICE UNAVAILABLE'};

/* ---------- VALID FILTERS ---------- */
const VALID_FILTERS = ["all", "favorites", "best-rated", "last-seen", "unseen"];

/**
 * 
 * @param {String} filter 
 * @returns 
 */
function validateFilter(filter) {
    var i;
    for (i = 0; i < VALID_FILTERS.length; i++) {
        if (VALID_FILTERS[i] === filter) {
            return true;
        }
    }

    return false;
}

/**
 * 
 * @param {DAO} dao 
 * @param {String} id 
 * @returns "1" if the film is found in the DB, "0" otherwise. "-1" is returned in case of errors.
 */
async function validateId(dao, id) {

    /* QUERYING THE DATABASE TO CHECK IF ID EXISTS */
    let result_SQL;
    try {
        const query_SQL = "SELECT * FROM films WHERE id == ?";
        result_SQL = await dao.all(query_SQL, [id], (error, rows) => {
            if (error) {
                return -1;
            }
        });

        if (result_SQL.length === 0) {
            return 0;
        }
    } catch (error)  {
        console.log(error);
        return -1;
    }

    return 1;
}

/* ---------- CONTROLLER CLASS ---------- */
class FilmController {

    /**
     * CONSTRUCTOR OF THE CONTROLLER
     * -----------------------------
     * @param {DAO Object} input_dao 
     */
    constructor (input_dao) {
        this.dao = input_dao;
        this.dao.new;
    }

    /**
     * Retrieve the list of all the available films.
     * ---------------------------------------------
     *                API: GET /films
     * =============================================
     * @param {callback} request 
     * @param {callback} response 
    */
    getFilms = async (request, response) => {

        /* CHECKING USER REQUEST */
        if (Object.keys(request.body).length !== 0) {
            return response.status(400).json(ERROR_400);
        }

        /* QUERYING THE DATABASE */
        let result_SQL;
        try {
            const query_SQL = "SELECT * FROM films";
            result_SQL = await this.dao.all(query_SQL, (error, rows) => {
                if (error) {
                    return response.status(500).json(ERROR_500);
                }
            });
        } catch (error)  {
            console.log(error);
            return response.status(500).json(ERROR_500);
        }

        /* RETURN 200 ON SUCCESS */
        return response.status(200).json(result_SQL);
    }


    /**
     * Retrieve a list of all the films that fulfill 
     * a given filter (i.e., the same filters 
     * described in BigLab1).
     * ---------------------------------------------
     *          API: GET /films/:filter
     * =============================================
     * @param {callback} request 
     * @param {callback} response 
    */
    getFilteredFilms = async (request, response) => {

        /* CHECKING USER REQUEST */
        if (Object.keys(request.body).length !== 0) {
            return response.status(400).json(ERROR_400);
        } else if (validateFilter(request.params.filter) === false) {
            return response.status(422).json(ERROR_422);
        }

        /* QUERYING THE DATABASE */
        let result_SQL;
        try {
            const query_SQL = "SELECT * FROM films";
            result_SQL = await this.dao.all(query_SQL, (error, rows) => {
                if (error) {
                    return response.status(500).json(ERROR_500);
                }
            });
        } catch (error)  {
            console.log(error);
            return response.status(500).json(ERROR_500);
        }

        /*filtering the films*/
        let films=result_SQL;
        let filterName=request.params.filter;
        if (filterName == "all") {
            films = films;
        } else if (filterName =="favorites") {
            films = films.filter((film) => (film.favorite == 1));
        } else if (filterName == "best-rated") {
            films = films.filter((film) => (film.rating == 5));
        } else if (filterName == "last-seen") {
            films = films.filter((film) => (dayjs().diff(dayjs(film.watchdate, "MMMM DD, YYYY"), 'day') <= 30 && film.watchdate != undefined));
        } else if (filterName =="unseen") {
            films = films.filter((film) => (film.watchdate == undefined));
        }
        /* RETURN 200 ON SUCCESS */
        return response.status(200).json(films);
    }


    /**
     * Retrieve a film, given its “id”.
     * ---------------------------------------------
     *             API: GET /films/:id
     * =============================================
     * @param {callback} request 
     * @param {callback} response 
    */
    getFilmById = async (request, response) => {

        const target_id = request.params.id;

        /* CHECKING USER REQUEST */
        if (Object.keys(request.body).length !== 0) {
            return response.status(400).json(ERROR_400);
        } else if (/^[0-9]+$/.test(target_id) === false) {
            return response.status(422).json(ERROR_422);
        }

        /* QUERYING THE DATABASE */
        let result_SQL;
        try {
            const query_SQL = "SELECT * FROM films WHERE id == ?";
            result_SQL = await this.dao.all(query_SQL, [target_id], (error, rows) => {
                if (error) {
                    return response.status(500).json(ERROR_500);
                }
            });
        } catch (error)  {
            console.log(error);
            return response.status(500).json(ERROR_500);
        }

        /* CHECKING RESULT */
        if (result_SQL.length === 0) {
            return response.status(404).json(ERROR_404);
        }

        /* RETURN 200 ON SUCCESS */
        return response.status(200).json(result_SQL[0]);
    }


    /**
     * Create a new film, by providing all relevant 
     * information – except the “id” that will be 
     * automatically assigned by the back-end.
     * ---------------------------------------------
     *             API: POST /film
     * =============================================
     * @param {callback} request 
     * @param {callback} response 
    */
    newFilm = async (request, response) => {

        const data = request.body;

        /* CHECKING USER REQUEST */
        if (Object.keys(data).length === 0) {
            return response.status(422).json(ERROR_422);
        } else if (data.title === undefined || data.favorite === undefined || data.watchdate === undefined || data.rating === undefined) {
            return response.status(422).json(ERROR_422);
        }

        /* QUERYING THE DATABASE */
        let result_SQL;
        try {
            const query_SQL = "SELECT MAX(id) AS last_id FROM films";
            result_SQL = await this.dao.all(query_SQL, (error, rows) => {
                if (error) {
                    return response.status(500).json(ERROR_500);
                }
            });
        } catch (error)  {
            console.log(error);
            return response.status(500).json(ERROR_500);
        }
        const last_id = result_SQL[0].last_id;

        /* INSERTION IN THE DATABASE */
        /**
         * 
         *  NB: USER IS SET TO 1 AS DEFAULT -------> CHANGE HERE WHEN IMPLEMENTING AUTHENTICATION
         * 
         */
        try {
            const query_newFilm_SQL = "INSERT INTO films(id, title, favorite, watchdate, rating, user) VALUES (?, ?, ?, ?, ?, 1)";
            await this.dao.run(query_newFilm_SQL, [last_id+1, data.title, data.favorite, data.watchdate, data.rating], (error) => {
                if (error) {
                    return response.status(500).json(ERROR_500);
                }
            });
        } catch (error) {
            console.log(error);
            return response.status(500).json(ERROR_500);
        }

        /* RETURN 201 ON SUCCESS */
        return response.status(201).json();
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
    editFilm = async (request, response) => {

        const target_id = request.params.id;
        const data = request.body;

        /* CHECKING USER REQUEST */
        if (Object.keys(data).length === 0) {
            return response.status(422).json(ERROR_422);
        } else if (data.title === undefined || data.favorite === undefined || data.watchdate === undefined || data.rating === undefined) {
            return response.status(422).json(ERROR_422);
        } else if (/^[0-9]+$/.test(target_id) === false) {
            return response.status(422).json(ERROR_422);
        }

        /* QUERYING THE DATABASE TO CHECK IF ID EXISTS */
        let exist = await validateId(this.dao, target_id);
        if (exist === -1) {
            return response.status(500).json(ERROR_500);
        } else if (exist === 0) {
            return response.status(404).json(ERROR_404);
        }

        /* UPDATING THE DATABASE */
        try {
            const query_EditFilm_SQL = "UPDATE films SET title = ?, favorite = ?, watchdate = ?, rating = ? WHERE id == ?";
            await this.dao.run(query_EditFilm_SQL, [data.title, data.favorite, data.watchdate, data.rating, target_id], (error) => {
                if (error) {
                    return response.status(500).json(ERROR_500);
                }
            });
        } catch (error) {
            console.log(error);
            return response.status(500).json(ERROR_500);
        }

        /* RETURN 200 ON SUCCESS */
        return response.status(200).json();
    }


    /**
     * Mark an existing film as favorite/unfavorite.
     * ---------------------------------------------
     *        API: PUT /film/:id/favorite
     * =============================================
     * @param {callback} request 
     * @param {callback} response 
    */
    setFilmFavorite = async (request, response) => {

        const target_id = request.params.id;
        const data = request.body;

        /* CHECKING USER REQUEST */
        if (Object.keys(data).length === 0) {
            return response.status(422).json(ERROR_422);
        } else if (data.favorite === undefined) {
            return response.status(422).json(ERROR_422);
        } else if (/^[0-9]+$/.test(target_id) === false) {
            return response.status(422).json(ERROR_422);
        }

        /* QUERYING THE DATABASE TO CHECK IF ID EXISTS */
        let exist = await validateId(this.dao, target_id);
        if (exist === -1) {
            return response.status(500).json(ERROR_500);
        } else if (exist === 0) {
            return response.status(404).json(ERROR_404);
        }

        /* UPDATING THE DATABASE */
        try {
            const query_EditFilm_SQL = "UPDATE films SET favorite = ? WHERE id == ?";
            await this.dao.run(query_EditFilm_SQL, [data.favorite, target_id], (error) => {
                if (error) {
                    return response.status(500).json(ERROR_500);
                }
            });
        } catch (error) {
            console.log(error);
            return response.status(500).json(ERROR_500);
        }

        /* RETURN 200 ON SUCCESS */
        return response.status(200).json();
    }


    /**
     * Delete an existing film, given its “id”.
     * ---------------------------------------------
     *            API: DELETE /film/:id
     * =============================================
     * @param {callback} request 
     * @param {callback} response 
    */
    removeFilm = async (request, response) => {

        const target_id = request.params.id;

        /* CHECKING USER REQUEST */
        if (Object.keys(request.body).length !== 0) {
            return response.status(422).json(ERROR_422);
        } else if (/^[0-9]+$/.test(target_id) === false) {
            return response.status(422).json(ERROR_422);
        }

        /* QUERYING THE DATABASE TO CHECK IF ID EXISTS */
        let exist = await validateId(this.dao, target_id);
        if (exist === -1) {
            return response.status(500).json(ERROR_500);
        } else if (exist === 0) {
            return response.status(404).json(ERROR_404);
        }

        /* UPDATING THE DATABASE */
        try {
            const query_EditFilm_SQL = "DELETE FROM films WHERE id == ?";
            await this.dao.run(query_EditFilm_SQL, [target_id], (error) => {
                if (error) {
                    return response.status(500).json(ERROR_500);
                }
            });
        } catch (error) {
            console.log(error);
            return response.status(500).json(ERROR_500);
        }

        /* RETURN 200 ON SUCCESS */
        return response.status(200).json();
    }
}

module.exports = FilmController;