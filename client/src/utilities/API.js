/* IMPORTING MODULES */
import { Film } from "./film";

/* ENDPOINTS INFORMATION */
const PORT          = 3001 ;
const PREFIX_URL    = `http://localhost:${PORT}`;


class API {

    /*
        + ------------------- +
        |    FRONT-END API    |
        + ------------------- +
    */

    /**
     * Retrieve the whole list of films from the DB
     * ============================================
     * 
     * Connection to endpoint: '/films'
     */
    readFilms = async () => {

        const url = PREFIX_URL + '/films';
        try {
            const response = await fetch(url);
            if (response.ok) {

                /* processing the response */
                const result = await response.json();
                const films = result.map((film) => new Film(film.id, film.title, film.favorite, film.watchdate, film.rating));
                return films;
            } else {

                /* application errors (404, 500, ...) */
                console.log(response.statusText);
                const text = await response.text();
                throw new TypeError(text);
            }
        } catch (error) {
            /* network errors */
            console.log(error);
            throw error;
        }
    }

    /**
     * Retrieve the list of films filtered in according to the parameter `filter` from the DB
     * ======================================================================================
     * @param {String} filter name of the filter
     * 
     * Connection to the endpoint: '/films/:filter'
     */
    readFilteredFilms = async (filter) => {

        const url = PREFIX_URL + '/films/' + filter;
        try {
            const response = await fetch(url);
            if (response.ok) {
                
                /* process the response */
                const result = await response.json();
                const films = result.map((film) => new Film(film.id, film.title, film.favorite, film.watchdate, film.rating));
                return films;
            } else {

                /* application errors (404, 500, ...) */
                console.log(response.statusText);
                const text = await response.text();
                throw new TypeError(text);
            }
        } catch (error) {
            /* network errors */
            console.log(error);
            throw error;
        }
    }

    /**
     * Add the given film to the DB
     * ===============================
     * @param {Film} newFilm new Film object 
     * 
     * Connection to the endpoint: '/film'
     */
    addFilm = async (newFilm) => {

        const url = PREFIX_URL + '/film' ;
        const body = {
            title: newFilm.title,
            favorite: newFilm.favorite,
            watchdate: newFilm.watchdate,
            rating: newFilm.rating
        };
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                
                /* process the response */
                return ;
            } else {

                /* application errors (404, 500, ...) */
                console.log(response.statusText);
                const text = await response.text();
                throw new TypeError(text);
            }
        } catch (error) {
            /* network errors */
            console.log(error);
            throw error;
        }
    }

    /**
     * Edit the given film in the DB
     * ===============================
     * @param {Film} newFilm Film object 
     * 
     * Connection to the endpoint: '/films/:filter'
     */
    editFilm = async (newFilm) => {
        const url = PREFIX_URL + '/film/' + newFilm.id;
        const body = {
            newTitle: newFilm.title,
            newFavorite: newFilm.favorite,
            newWatchdate: newFilm.watchdate,
            newRating: newFilm.rating
        };
        try {
            const response = await fetch(url, {
                method: 'PUT',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {

                /* process the response */
                return ;
            } else {

                /* application errors (404, 500, ...) */
                console.log(response.statusText);
                const text = await response.text();
                throw new TypeError(text);
            }
        } catch (error) {
            /* network errors */
            console.log(error);
            throw error;
        }
    }

    /**
     * Edit the favorite field of the given film in the DB
     * ===================================================
     * @param {Film} newFilm film edited to be stored in the DB
     * 
     * Connection to the endpoint: '/film/:id/favorite'
     */
    editFilmFavorite = async (newFilm) => {

        const url = PREFIX_URL + '/film/' + newFilm.id + '/favorite';
        const body = {newFavorite: newFilm.favorite};
        try {
            const response = await fetch(url, {
                method: 'PUT',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {

                /* process the response */
                return ;
            } else {

                /* application errors (404, 500, ...) */
                console.log(response.statusText);
                const text = await response.text();
                throw new TypeError(text);
            }
        } catch (error) {
            /* network errors */
            console.log(error);
            throw error;
        }
    }

    /**
     * Remove the film with id corresponding to  the given film id in the DB
     * =====================================================================
     * @param {Number} targetID id of the film to be removed 
     * 
     * Connection to the endpoint: '/film/:id'
     */
    removeFilm = async (targetID) => {

        const url = PREFIX_URL + '/film/' + targetID;
        try {
            const response = await fetch(url, {
                method: 'DELETE'
            });
            if (response.ok) {

                /* process the response */
                return ;
            } else {

                /* application errors (404, 500, ...) */
                console.log(response.statusText);
                const text = await response.text();
                throw new TypeError(text);
            }
        } catch (error) {
            /* network errors */
            console.log(error);
            throw error;
        }
    }

}

export { API }