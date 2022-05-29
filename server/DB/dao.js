/**
 *                              CLASS: DAO
 * ============================================================================
 * Data Access Object (DAO) is used as the lowest level of logic implementation
 * to access directly the DB. It implements all the utility functions required
 * by the controller to access the DB and manage data. To do so, it exploits 
 * three functions:
 *      - run(): it executes a query without returning any result
 *      - get(): it executes a query, returning the first element of the result
 *      - all(): it executes a query, returning all the elements of the result
 */

'use strict'

/* ---------- IMPORT MODULES ---------- */
const sqlite = require('sqlite3');

/* ---------- DAO CLASS ---------- */
class DAO {

    /**
     *  ATTRIBUTES
     */
    static database;

    /**
     *  CONSTRUCTOR
     */
    constructor () {
        this.database = new sqlite.Database('films.db', (error) => {
            if (error) {
                console.log(error);
                throw new Error(error.message);
            }
        });
    }

    /**
     *  PRIVATE METHODS
     */

    #run = (querySQL, params = []) => {
        return new Promise((resolve, reject) => {
            this.database.run(querySQL, params, (error) => {
                if (error) {
                    console.log("[!] ERROR: error running SQL: " + querySQL);
                    reject(error);
                } else {
                    resolve({id: this.lastID});
                }
            });
        });
    }

    #get = (querySQL, params = []) => {
        return new Promise((resolve, reject) => {
            this.database.get(querySQL, params, (error, row) => {
                if (error) {
                    console.log("[!] ERROR: error running SQL: " + querySQL);
                    reject(error);
                } else {
                    resolve(row);
                }
            });
        });
    }

    #all = (querySQL, params = []) => {
        return new Promise((resolve, reject) => {
            this.database.all(querySQL, params, (error, rows) => {
                if (error) {
                    console.log("[!] ERROR: error running SQL: " + querySQL);
                    reject(error);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    /**
     *  PUBLIC METHODS
     */

    /**
     * Retrieve the list of films from the DB
     * --------------------------------------
     */
    getFilms = async () => {
        const querySQL = "SELECT * FROM FILMS";
        return this.#all(
            querySQL
        ).then((result) => {
            return result;
        }).catch((error) => {
            throw new Error(error.message);
        });
    }

    /**
     * Retrieve the film given its ID
     * ------------------------------
     * @param {Number} id 
     */
    getFilmByID = async (id) => {
        const querySQL = "SELECT * FROM FILMS WHERE FILMS.id == ?";
        return this.#get(
            querySQL,
            [
                id
            ]
        ).then((result) => {
            return result;
        }).catch((error) => {
            throw new Error(error.message);
        });
    }

    /**
     * Retrieve lastID of film inserted in the DB
     * ------------------------------------------
     */
    getLastID = async () => {
        const querySQL = "SELECT MAX(id) AS lastID FROM films";
        return this.#get(
            querySQL
        ).then((result) => {
            return result.lastID;
        }).catch((error) => {
            throw new Error(error.message);
        });
    }

    /**
     * Create a new film in the DB
     * ---------------------------
     * @param {Number} id 
     * @param {JSON} filmObject 
     */
    newFilm = async (id, filmObject) => {
        const querySQL = "INSERT INTO films(id, title, favorite, watchdate, rating, user) VALUES (?, ?, ?, ?, ?, 1)";
        return this.#run(
            querySQL,
            [
                id,
                filmObject.title,
                filmObject.favorite,
                filmObject.watchdate,
                filmObject.rating
            ]
        ).then((result) => {
            return result;
        }).catch((error) => {
            throw new Error(error.message);
        });
    }

    /**
     * Update the film corresponding to given id in DB
     * -----------------------------------------------
     * @param {Number} id 
     * @param {JSON} newFilmObject 
     */
    editFilmByID = async (id, newFilmObject) => {
        const querySQL = "UPDATE FILMS SET title = ?, favorite = ?, watchdate = ?, rating = ? WHERE id == ?";
        return this.#run(
            querySQL,
            [
                newFilmObject.newTitle,
                newFilmObject.newFavorite,
                newFilmObject.newWatchdate,
                newFilmObject.newRating,
                id
            ]
        ).then((result) => {
            return result;
        }).catch((error) => {
            throw new Error(error.message);
        });
    }

    /**
     * Update the film favorite field corresponding to 
     * given id in DB
     * -----------------------------------------------
     * @param {Number} id 
     * @param {Number} newFavorite 
     */
    editFilmFavoriteByID = async (id, newFavorite) => {
        const querySQL = "UPDATE FILMS SET favorite = ? WHERE id == ?";
        return this.#run(
            querySQL,
            [
                newFavorite,
                id
            ]
        ).then((result) => {
            return result;
        }).catch((error) => {
            throw new Error(error.message);
        });
    }

    /**
     * Remove a film specified by ID from DB
     * -------------------------------------
     * @param {Number} id 
     */
    removeFilm = async (id) => {
        const querySQL = "DELETE FROM FILMS WHERE FILMS.id == ?";
        return this.#run(
            querySQL,
            [
                id
            ]
        ).then((result) => {
            return result;
        }).catch((error) => {
            throw new Error(error.message);
        });
    }

}

module.exports = DAO;