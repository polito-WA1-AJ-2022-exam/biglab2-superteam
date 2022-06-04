'use strict' ;

class FilmDAO {

    /**
     * CONSTRUCTOR: FilmDAO
     * ---------------------------------
     * @param {Object} generalPurposeDAO 
     */
    constructor (generalPurposeDAO) {
        this.dao = generalPurposeDAO;
    }


    /*
        + -------------------- +
        |        METHODS       |
        + -------------------- +
    */


    /**
     * Retrieve the list of films from the DB
     * --------------------------------------
     */
    getFilms = async (userID) => {
        const querySQL = "SELECT * FROM FILMS WHERE FILMS.user == ?";
        return this.dao.all(
            querySQL,
            [
                userID
            ]
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
    getFilmByID = async (id, userID) => {
        const querySQL = "SELECT * FROM FILMS WHERE FILMS.id == ? AND FILMS.user == ?";
        return this.dao.get(
            querySQL,
            [
                id,
                userID
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
        return this.dao.get(
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
    newFilm = async (id, filmObject, userID) => {
        const querySQL = "INSERT INTO films(id, title, favorite, watchdate, rating, user) VALUES (?, ?, ?, ?, ?, ?)";
        return this.dao.run(
            querySQL,
            [
                id,
                filmObject.title,
                filmObject.favorite,
                filmObject.watchdate,
                filmObject.rating,
                userID
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
    editFilmByID = async (id, newFilmObject, userID) => {
        const querySQL = "UPDATE FILMS SET title = ?, favorite = ?, watchdate = ?, rating = ? WHERE id == ? AND FILMS.user == ?";
        return this.dao.run(
            querySQL,
            [
                newFilmObject.newTitle,
                newFilmObject.newFavorite,
                newFilmObject.newWatchdate,
                newFilmObject.newRating,
                id,
                userID
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
    editFilmFavoriteByID = async (id, newFavorite, userID) => {
        const querySQL = "UPDATE FILMS SET favorite = ? WHERE id == ? AND FILMS.user == ?";
        return this.dao.run(
            querySQL,
            [
                newFavorite,
                id,
                userID
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
    removeFilm = async (id, userID) => {
        const querySQL = "DELETE FROM FILMS WHERE FILMS.id == ? AND FILMS.user == ?";
        return this.dao.run(
            querySQL,
            [
                id,
                userID
            ]
        ).then((result) => {
            return result;
        }).catch((error) => {
            throw new Error(error.message);
        });
    }
}

module.exports = FilmDAO;